import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2, Euro, Clock, Percent, TrendingUp, Calendar,
  Info, ChevronDown, ChevronUp, BadgePercent,
} from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────────
const SOCIAL_CHARGES = 17.2; // prélèvements sociaux France (taux 2024)
const TMI_OPTIONS = [
  { label: "11 %", value: 11 },
  { label: "30 %", value: 30 },
  { label: "45 %", value: 45 },
];

// ─── Excel-faithful helpers ────────────────────────────────────────────────────

/**
 * CUMIPMT equivalent (Excel formula M5 col):
 * -CUMIPMT(annualRate/12, loanMonths, loan, 12*(year-1)+1, 12*year, 0)
 * Uses SIMPLE monthly rate = annualRate / 12 (not actuarial), matching Excel.
 */
function annualInterestCUMIPMT(
  annualRate: number,
  loanMonths: number,
  loan: number,
  year: number,
  simpleRatePmt: number, // pre-computed PMT with simple rate, passed in for efficiency
  balanceAtYearStart: number
): number {
  const simpleRate = annualRate / 12;
  let bal = balanceAtYearStart;
  let total = 0;
  for (let m = 0; m < 12; m++) {
    const interest = bal * simpleRate;
    total += interest;
    bal = Math.max(0, bal - (simpleRatePmt - interest));
  }
  return total;
}

/**
 * Capital restant dû using Excel formula:
 * B30 = loan + CUMPRINC((1+annualRate)^(1/12)-1, loanMonths, loan, 1, resaleMonths, 0)
 * Uses ACTUARIAL monthly rate, payment derived from loan params (not user-entered).
 */
function computeCRD(annualRate: number, loanMonths: number, loan: number, resaleMonths: number): number {
  const r = Math.pow(1 + annualRate, 1 / 12) - 1; // actuarial
  const pmt = loan * r / (1 - Math.pow(1 + r, -loanMonths));
  let balance = loan;
  for (let m = 0; m < resaleMonths; m++) {
    const interest = balance * r;
    balance = Math.max(0, balance - (pmt - interest));
  }
  return Math.max(0, balance);
}

// ─── Sub-components (OUTSIDE parent to prevent remount / focus loss) ───────────

function LevTooltip({ text }: { text: string }) {
  return (
    <span className="group relative ml-1 inline-flex flex-shrink-0">
      <span className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-[#1e3a5f] text-white text-[8px] font-bold flex items-center justify-center cursor-help transition-colors">
        i
      </span>
      <span className="absolute left-0 bottom-full mb-1.5 w-60 bg-[#1e3a5f] text-white text-xs rounded-xl px-2.5 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-xl leading-relaxed">
        {text}
      </span>
    </span>
  );
}

interface InputRowProps {
  icon: React.ElementType;
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
  step?: number;
  testId: string;
  min?: number;
  tooltip?: string;
}

function LevInputRow({
  icon: Icon, label, value, onChange, suffix, step = 1, testId, min = 0, tooltip,
}: InputRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
      <Label className="text-[#1e3a5f] flex items-center gap-1.5 text-sm font-medium shrink-0">
        <Icon className="h-4 w-4 text-[#1e3a5f]/60 flex-shrink-0" />
        {label}
        {tooltip && <LevTooltip text={tooltip} />}
      </Label>
      <div className="flex items-center gap-1.5">
        <Input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "" || raw === "-") return;
            const parsed = parseFloat(raw);
            if (!isNaN(parsed)) onChange(Math.max(min, parsed));
          }}
          className="w-28 text-right bg-gray-50 border-gray-200 text-[#1e3a5f] font-semibold h-9 text-sm"
          data-testid={testId}
        />
        <span className="text-gray-400 text-sm w-8 flex-shrink-0">{suffix}</span>
      </div>
    </div>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface YearlyRow {
  year: number;
  mensualitesAnn: number;   // K — mensualité × 12
  dividendeBrut: number;    // L — grows by partEvolution each year
  interets: number;         // M — CUMIPMT with simple rate
  bilanFoncier: number;     // S — L - M
  impactFiscal: number;     // Y — S × (TMI + charges sociales), can be negative
  dividendeNet: number;     // AA — L - Y (= L - impactFiscal)
  effortEpargne: number;    // AD — dividendeNet - mensualitesAnn
  tresorerieNetteCumulee: number; // AF — cumulative effort
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function LeverageCalculator() {
  const [loanAmount, setLoanAmount] = useState(200_000);
  const [monthlyPayment, setMonthlyPayment] = useState(1_170);
  const [monthlyRent, setMonthlyRent] = useState(800);
  const [partEvolution, setPartEvolution] = useState(1);
  const [loanDuration, setLoanDuration] = useState(20);
  const [resaleYear, setResaleYear] = useState(15);
  const [interestRate, setInterestRate] = useState(3.5);
  const [tmi, setTmi] = useState(30);
  const [showTable, setShowTable] = useState(false);
  const [showNetGainInfo, setShowNetGainInfo] = useState(false);

  const { yearlyData, summary } = useMemo(() => {
    const annualRate = interestRate / 100;
    const simpleMonthlyRate = annualRate / 12; // Excel CUMIPMT rate
    const fiscalRate = (tmi + SOCIAL_CHARGES) / 100;
    const loanMonths = loanDuration * 12;
    const resaleMonths = Math.max(1, Math.min(resaleYear, loanDuration)) * 12;
    const years = resaleMonths / 12;

    // Pre-compute PMT with simple rate (used for interest column)
    const pmtSimple = simpleMonthlyRate > 0
      ? loanAmount * simpleMonthlyRate / (1 - Math.pow(1 + simpleMonthlyRate, -loanMonths))
      : loanAmount / loanMonths;

    // Single pass for annual interests (simple rate, matching CUMIPMT)
    let balSimple = loanAmount;
    const annualInterests: number[] = [];
    for (let y = 0; y < years; y++) {
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        const intM = balSimple * simpleMonthlyRate;
        yearInterest += intM;
        balSimple = Math.max(0, balSimple - (pmtSimple - intM));
      }
      annualInterests.push(yearInterest);
    }

    // CRD using actuarial rate + loan params (matching Excel CUMPRINC formula)
    const remainingBalance = computeCRD(annualRate, loanMonths, loanAmount, resaleMonths);

    // Build yearly rows
    const rows: YearlyRow[] = [];
    let cumulativeEffort = 0;

    for (let y = 0; y < years; y++) {
      const mensualitesAnn = monthlyPayment * 12;

      // L column: year 1 = rent×12, subsequent years × (1 + evolution)
      const dividendeBrut =
        y === 0
          ? monthlyRent * 12
          : rows[y - 1].dividendeBrut * (1 + partEvolution / 100);

      const interets = annualInterests[y];

      // S = bilan foncier (can be negative → déficit foncier)
      const bilanFoncier = dividendeBrut - interets;

      // Y = impact fiscal = S × (TMI + charges sociales) — can be negative (tax saving)
      const impactFiscal = bilanFoncier * fiscalRate;

      // AA = dividende net = dividende brut - impact fiscal
      const dividendeNet = dividendeBrut - impactFiscal;

      // AD = effort épargne
      const effortEpargne = dividendeNet - mensualitesAnn;

      cumulativeEffort += effortEpargne;

      rows.push({
        year: y + 1,
        mensualitesAnn,
        dividendeBrut,
        interets,
        bilanFoncier,
        impactFiscal,
        dividendeNet,
        effortEpargne,
        tresorerieNetteCumulee: cumulativeEffort,
      });
    }

    // Valeur du bien à la revente (same rate as SCPI evolution)
    const propertyValue = loanAmount * Math.pow(1 + partEvolution / 100, resaleYear);
    const netSaleProceeds = propertyValue - remainingBalance;
    const netGain = netSaleProceeds + cumulativeEffort; // cumulativeEffort is negative

    // TRI (XIRR equivalent) — linear interpolation on annual net cash flows
    const cashFlows = rows.map((r) => r.effortEpargne);
    if (cashFlows.length > 0) cashFlows[cashFlows.length - 1] += netSaleProceeds;

    const npvFn = (rate: number) =>
      cashFlows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t + 1), 0);

    let r1 = 0.001, r2 = 0.5;
    let van1 = npvFn(r1), van2 = npvFn(r2);
    let att = 0;
    while (van1 * van2 > 0 && att < 60) { r2 *= 2; van2 = npvFn(r2); att++; }

    let irrAnnual = 0;
    if (van1 * van2 < 0) {
      for (let i = 0; i < 120; i++) {
        const rNew = r1 + (van1 / (van1 - van2)) * (r2 - r1);
        const vanNew = npvFn(rNew);
        if (Math.abs(vanNew) < 0.01) { irrAnnual = rNew * 100; break; }
        if (vanNew * van1 < 0) { r2 = rNew; van2 = vanNew; }
        else { r1 = rNew; van1 = vanNew; }
        irrAnnual = rNew * 100;
      }
    }

    return {
      yearlyData: rows,
      summary: {
        remainingBalance,
        propertyValue,
        cumulativeEffort,
        netSaleProceeds,
        netGain,
        irr: irrAnnual,
      },
    };
  }, [loanAmount, monthlyPayment, monthlyRent, partEvolution, loanDuration, resaleYear, interestRate, tmi]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(v));

  const fmtPct = (v: number) => {
    if (!isFinite(v) || isNaN(v)) return "N/A";
    return new Intl.NumberFormat("fr-FR", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v / 100);
  };

  const totalFiscalRate = tmi + SOCIAL_CHARGES;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-6">

        {/* ── Inputs ── */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-slate-50 to-gray-50 p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-[#1e3a5f] rounded-lg"><Building2 className="h-5 w-5 text-white" /></div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a5f]">Paramètres</h3>
              <p className="text-xs text-gray-400">Simulation immobilière à crédit (SCPI / locatif)</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <LevInputRow
              icon={Euro} label="Montant du prêt" value={loanAmount}
              onChange={setLoanAmount} suffix="€" testId="input-credit-amount"
            />
            <LevInputRow
              icon={Euro} label="Mensualité du prêt" value={monthlyPayment}
              onChange={setMonthlyPayment} suffix="€" testId="input-monthly-payment"
              tooltip="Mensualité réelle du prêt AVEC assurance emprunteur incluse dans le montant total versé chaque mois."
            />
            <LevInputRow
              icon={Building2} label="Dividende net / Loyer mensuel" value={monthlyRent}
              onChange={setMonthlyRent} suffix="€" testId="input-monthly-rent"
            />
            <LevInputRow
              icon={TrendingUp} label="Évolution valeur de la part / Valorisation" value={partEvolution}
              onChange={setPartEvolution} suffix="%" step={0.1} testId="input-part-evolution"
              tooltip="Taux d'évolution annuel des dividendes/loyers ET de la valeur du bien à la revente (revalorisation annuelle)."
            />
            <LevInputRow
              icon={Percent} label="Taux d'intérêt annuel (TAEG)" value={interestRate}
              onChange={setInterestRate} suffix="%" step={0.1} testId="input-interest-rate-leverage"
            />
            <LevInputRow
              icon={Clock} label="Durée du prêt" value={loanDuration}
              onChange={setLoanDuration} suffix="ans" min={1} testId="input-loan-duration-leverage"
            />
            <LevInputRow
              icon={Calendar} label="Revente après" value={resaleYear}
              onChange={(v) => setResaleYear(Math.min(v, loanDuration))}
              suffix="ans" min={1} testId="input-resale-year"
            />

            {/* TMI */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="text-sm font-medium text-[#1e3a5f] mb-2 flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-[#1e3a5f]/60" />
                Tranche marginale d'imposition
                <span className="text-[10px] text-gray-400">+ {SOCIAL_CHARGES}% prélèvements sociaux</span>
              </Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {TMI_OPTIONS.map((opt) => (
                  <button
                    key={opt.value} onClick={() => setTmi(opt.value)}
                    data-testid={`button-tmi-${opt.value}`}
                    className={`py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                      tmi === opt.value
                        ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-md"
                        : "bg-gray-50 text-[#1e3a5f]/70 border-gray-200 hover:border-[#1e3a5f]/40"
                    }`}
                  >
                    <span className="block">{opt.label}</span>
                    <span className="block text-[10px] opacity-70">= {opt.value + SOCIAL_CHARGES}%</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#1e3a5f] rounded-lg"><TrendingUp className="h-5 w-5 text-white" /></div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a5f]">Résultats</h3>
              <p className="text-xs text-gray-400">Revente à {resaleYear} an{resaleYear > 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Effort cumulé */}
          <div className={`rounded-xl border p-4 transition-all duration-200 ${showNetGainInfo ? "bg-amber-100 border-amber-300 ring-2 ring-amber-200/60 shadow-md" : "bg-amber-50 border-amber-100"}`}>
            <p className="text-xs text-amber-600/80 mb-0.5">Total effort d'épargne sur {resaleYear} ans</p>
            <p className="font-serif font-bold text-amber-700 text-2xl" data-testid="text-cumulative-savings">
              {fmt(summary.cumulativeEffort)}
            </p>
            <p className="text-[10px] text-amber-500 mt-1">
              trésorerie nette cumulée · déficit foncier inclus
            </p>
          </div>

          {/* Valeur du bien + CRD */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-blue-50 border-blue-200 ring-2 ring-blue-200/50 shadow-md" : "bg-slate-50 border-slate-100"}`}>
              <p className="text-xs text-slate-500/80 mb-0.5">Valeur à la revente</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-property-value">{fmt(summary.propertyValue)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">+{partEvolution}%/an</p>
            </div>
            <div className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-orange-50 border-orange-200 ring-2 ring-orange-200/50 shadow-md" : "bg-slate-50 border-slate-100"}`}>
              <p className="text-xs text-slate-500/80 mb-0.5">Capital restant dû</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-remaining-balance">{fmt(summary.remainingBalance)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">CUMPRINC · taux actuariel</p>
            </div>
          </div>

          {/* Gain net */}
          <div className={`rounded-xl border p-4 text-center ${summary.netGain >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <p className="text-xs text-gray-500">Bénéfice net de l'opération</p>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowNetGainInfo(true)}
                  onMouseLeave={() => setShowNetGainInfo(false)}
                  onFocus={() => setShowNetGainInfo(true)}
                  onBlur={() => setShowNetGainInfo(false)}
                  className="w-4 h-4 rounded-full bg-gray-300 hover:bg-[#1e3a5f] text-white text-[9px] font-bold flex items-center justify-center transition-colors cursor-help focus:outline-none"
                  data-testid="button-net-gain-info"
                >i</button>
                {showNetGainInfo && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-68 pointer-events-none">
                    <div className="bg-white border border-[#1e3a5f]/20 rounded-xl shadow-2xl p-3 text-left w-72">
                      <p className="text-xs font-semibold text-[#1e3a5f] mb-2">Détail — formule Excel B33</p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />Valeur à la revente
                          </span>
                          <span className="font-semibold text-[#1e3a5f]">+{fmt(summary.propertyValue)}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />Capital restant dû
                          </span>
                          <span className="font-semibold text-red-500">−{fmt(summary.remainingBalance)}</span>
                        </div>
                        <div className="border-t pt-1 flex justify-between text-[10px] text-gray-400">
                          <span>= Solde remboursement</span>
                          <span className="font-semibold text-[#1e3a5f]">{fmt(summary.netSaleProceeds)}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Effort cumulé net
                          </span>
                          <span className="font-semibold text-red-500">{fmt(summary.cumulativeEffort)}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-1.5 flex justify-between">
                          <span className="font-semibold text-gray-700">= Bénéfice net</span>
                          <span className={`font-bold ${summary.netGain >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {summary.netGain >= 0 ? "+" : ""}{fmt(summary.netGain)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#1e3a5f]/20 rotate-45 -mt-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className={`font-serif text-3xl font-bold ${summary.netGain >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-net-gain">
              {summary.netGain >= 0 ? "+" : ""}{fmt(summary.netGain)}
            </p>
          </div>

          {/* TRI */}
          <div className="rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/20 border border-[#D4AF37]/25 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#1e3a5f]/60 mb-0.5">TRI brut annualisé</p>
              <p className={`font-serif text-2xl font-bold ${summary.irr >= 0 ? "text-[#D4AF37]" : "text-red-500"}`} data-testid="text-irr">
                {fmtPct(summary.irr)}
              </p>
              <p className="text-[10px] text-[#1e3a5f]/40 mt-0.5">XIRR · interpolation linéaire · flux annuels</p>
            </div>
            <div className="text-right text-xs text-[#1e3a5f]/50">
              <p>Rendement annualisé</p>
              <p>de l'effort net d'épargne</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Yearly Table ── */}
      <div className="mt-6 rounded-xl border border-[#D4AF37]/30 overflow-hidden shadow-sm bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF37]/20 bg-gradient-to-r from-white to-[#D4AF37]/5">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#D4AF37]/15 rounded-lg">
              <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-[#1e3a5f] text-sm">Tableau de flux annuels détaillé</h4>
              <p className="text-[10px] text-gray-400">
                Dividendes · intérêts (CUMIPMT) · fiscalité {totalFiscalRate}% · effort net · trésorerie cumulée
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTable((v) => !v)}
            className="flex items-center gap-1.5 text-[#1e3a5f]/60 hover:text-[#1e3a5f] text-xs font-medium transition-colors border border-gray-200 rounded-lg px-2.5 py-1.5 hover:border-[#1e3a5f]/30 bg-white"
            data-testid="button-toggle-table"
          >
            {showTable ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {showTable ? "Réduire" : "Afficher"}
          </button>
        </div>

        {showTable && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-3 py-2.5 font-semibold text-[#1e3a5f] whitespace-nowrap">Année</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-[#1e3a5f] whitespace-nowrap">
                    Mensualités<br /><span className="text-gray-400 font-normal">annualisées</span>
                  </th>
                  <th className="text-right px-3 py-2.5 font-semibold text-[#1e3a5f] whitespace-nowrap">
                    Dividende brut<br /><span className="text-gray-400 font-normal">annuel</span>
                  </th>
                  <th className="text-right px-3 py-2.5 font-semibold text-orange-600 whitespace-nowrap">
                    Intérêts<br /><span className="text-gray-400 font-normal">CUMIPMT</span>
                  </th>
                  <th className="text-right px-3 py-2.5 font-semibold text-[#1e3a5f] whitespace-nowrap">
                    Bilan<br /><span className="text-gray-400 font-normal">foncier</span>
                  </th>
                  <th className="text-right px-3 py-2.5 font-semibold text-red-600 whitespace-nowrap">
                    Impact fiscal<br /><span className="text-gray-400 font-normal">({totalFiscalRate}%)</span>
                  </th>
                  <th className="text-right px-3 py-2.5 font-semibold text-green-700 whitespace-nowrap">
                    Dividende<br /><span className="text-gray-400 font-normal">net</span>
                  </th>
                  <th className="text-right px-3 py-2.5 font-semibold text-amber-700 whitespace-nowrap">
                    Effort<br /><span className="text-gray-400 font-normal">annuel</span>
                  </th>
                  <th className="text-right px-3 py-2.5 font-semibold text-slate-600 whitespace-nowrap">
                    Trésorerie<br /><span className="text-gray-400 font-normal">cumulée</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((row, i) => (
                  <tr
                    key={row.year}
                    className={`border-b border-gray-100 hover:bg-[#D4AF37]/5 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                    data-testid={`row-leverage-${row.year}`}
                  >
                    <td className="px-3 py-2 font-semibold text-[#1e3a5f]">A.{row.year}</td>
                    <td className="px-3 py-2 text-right text-[#1e3a5f] font-medium">{fmt(row.mensualitesAnn)}</td>
                    <td className="px-3 py-2 text-right text-[#1e3a5f] font-medium">{fmt(row.dividendeBrut)}</td>
                    <td className="px-3 py-2 text-right text-orange-600">{fmt(row.interets)}</td>
                    <td className={`px-3 py-2 text-right font-medium ${row.bilanFoncier >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {row.bilanFoncier >= 0 ? "+" : ""}{fmt(row.bilanFoncier)}
                    </td>
                    <td className={`px-3 py-2 text-right ${row.impactFiscal > 0 ? "text-red-500" : "text-green-600"}`}>
                      {row.impactFiscal > 0 ? `−${fmt(row.impactFiscal)}` : row.impactFiscal < 0 ? `+${fmt(Math.abs(row.impactFiscal))}` : "—"}
                    </td>
                    <td className="px-3 py-2 text-right text-green-700 font-medium">{fmt(row.dividendeNet)}</td>
                    <td className={`px-3 py-2 text-right font-bold ${row.effortEpargne >= 0 ? "text-green-600" : "text-amber-700"}`}>
                      {row.effortEpargne >= 0 ? "+" : ""}{fmt(row.effortEpargne)}
                    </td>
                    <td className={`px-3 py-2 text-right font-semibold ${row.tresorerieNetteCumulee >= 0 ? "text-green-600" : "text-slate-500"}`}>
                      {row.tresorerieNetteCumulee >= 0 ? "+" : ""}{fmt(row.tresorerieNetteCumulee)}
                    </td>
                  </tr>
                ))}
                {/* Totals */}
                <tr className="bg-[#1e3a5f]/5 border-t-2 border-[#1e3a5f]/20 font-bold text-xs">
                  <td className="px-3 py-2.5 text-[#1e3a5f]">TOTAL</td>
                  <td className="px-3 py-2.5 text-right text-[#1e3a5f]">{fmt(yearlyData.reduce((a, r) => a + r.mensualitesAnn, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-[#1e3a5f]">{fmt(yearlyData.reduce((a, r) => a + r.dividendeBrut, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-orange-600">{fmt(yearlyData.reduce((a, r) => a + r.interets, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-[#1e3a5f]">{fmt(yearlyData.reduce((a, r) => a + r.bilanFoncier, 0))}</td>
                  <td className={`px-3 py-2.5 text-right ${yearlyData.reduce((a, r) => a + r.impactFiscal, 0) > 0 ? "text-red-500" : "text-green-600"}`}>
                    {fmt(yearlyData.reduce((a, r) => a + r.impactFiscal, 0))}
                  </td>
                  <td className="px-3 py-2.5 text-right text-green-700">{fmt(yearlyData.reduce((a, r) => a + r.dividendeNet, 0))}</td>
                  <td className={`px-3 py-2.5 text-right ${summary.cumulativeEffort >= 0 ? "text-green-600" : "text-amber-700"}`}>
                    {summary.cumulativeEffort >= 0 ? "+" : ""}{fmt(summary.cumulativeEffort)}
                  </td>
                  <td className={`px-3 py-2.5 text-right ${summary.cumulativeEffort >= 0 ? "text-green-600" : "text-slate-500"}`}>
                    {summary.cumulativeEffort >= 0 ? "+" : ""}{fmt(summary.cumulativeEffort)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400" data-testid="text-leverage-disclaimer">
          Formules conformes au modèle Excel de référence. <strong>Intérêts</strong> : CUMIPMT(taux/12) — taux simple mensuel. <strong>Capital restant dû</strong> : CUMPRINC((1+taux)^(1/12)−1) — taux actuariel, amortissement théorique hors assurance. <strong>Impact fiscal</strong> : bilan foncier × (TMI + {SOCIAL_CHARGES}% prélèvements sociaux) — déficit foncier déductible si négatif. Simulation indicative, hors frais de notaire, de gestion et vacance locative.
        </p>
      </div>
    </div>
  );
}
