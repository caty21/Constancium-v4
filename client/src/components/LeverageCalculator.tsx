import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Euro, Clock, Percent, TrendingUp, Calendar, Info, ChevronDown, ChevronUp, BadgePercent } from "lucide-react";

const SOCIAL_CHARGES = 18.6;
const TMI_OPTIONS = [
  { label: "11 %", value: 11 },
  { label: "30 %", value: 30 },
  { label: "45 %", value: 45 },
];

interface YearlyRow {
  year: number;
  mensualitesAnn: number;
  dividendeBrut: number;
  interets: number;
  bilanFoncier: number;
  impactFiscal: number;
  dividendeNet: number;
  effortEpargne: number;
}

export default function LeverageCalculator() {
  const [loanAmount, setLoanAmount] = useState(200_000);
  const [monthlyPayment, setMonthlyPayment] = useState(1_170);
  const [monthlyRent, setMonthlyRent] = useState(800);
  const [partEvolution, setPartEvolution] = useState(1);
  const [loanDuration, setLoanDuration] = useState(20);
  const [resaleYear, setResaleYear] = useState(15);
  const [appreciationRate, setAppreciationRate] = useState(1);
  const [interestRate, setInterestRate] = useState(3.5);
  const [tmi, setTmi] = useState(30);
  const [showTable, setShowTable] = useState(false);
  const [showNetGainInfo, setShowNetGainInfo] = useState(false);

  const { yearlyData, summary } = useMemo(() => {
    const annualRate = interestRate / 100;
    const r = Math.pow(1 + annualRate, 1 / 12) - 1; // actuarial monthly rate
    const fiscalRate = (tmi + SOCIAL_CHARGES) / 100;
    const years = Math.min(resaleYear, loanDuration);

    let balance = loanAmount;
    const rows: YearlyRow[] = [];

    for (let y = 0; y < years; y++) {
      const mensualitesAnn = monthlyPayment * 12;

      // Dividende brut: year 1 = rent*12, following years grow by partEvolution
      const dividendeBrut =
        y === 0
          ? monthlyRent * 12
          : rows[y - 1].dividendeBrut * (1 + partEvolution / 100);

      // Sum of monthly interest for this year (based on actual balance)
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        const intM = balance * r;
        yearInterest += intM;
        balance = Math.max(0, balance - (monthlyPayment - intM));
      }

      const bilanFoncier = dividendeBrut - yearInterest;
      // Tax only on positive bilan foncier
      const impactFiscal = bilanFoncier > 0 ? bilanFoncier * fiscalRate : 0;
      const dividendeNet = dividendeBrut - impactFiscal;
      const effortEpargne = dividendeNet - mensualitesAnn;

      rows.push({
        year: y + 1,
        mensualitesAnn,
        dividendeBrut,
        interets: yearInterest,
        bilanFoncier,
        impactFiscal,
        dividendeNet,
        effortEpargne,
      });
    }

    const remainingBalance = Math.max(0, balance);
    const propertyValue = loanAmount * Math.pow(1 + appreciationRate / 100, resaleYear);
    const cumulativeEffort = rows.reduce((acc, row) => acc + row.effortEpargne, 0);
    const netSaleProceeds = propertyValue - remainingBalance;
    const netGain = netSaleProceeds + cumulativeEffort; // cumulativeEffort is negative

    // TRI — linear interpolation on annual cash flows
    const cashFlows = rows.map((row) => row.effortEpargne);
    if (cashFlows.length > 0) cashFlows[cashFlows.length - 1] += netSaleProceeds;

    const npvFn = (rate: number) =>
      cashFlows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t + 1), 0);

    let r1 = 0.001, r2 = 0.5;
    let van1 = npvFn(r1), van2 = npvFn(r2);
    let attempts = 0;
    while (van1 * van2 > 0 && attempts < 50) { r2 *= 2; van2 = npvFn(r2); attempts++; }

    let irrAnnual = 0;
    if (van1 * van2 < 0) {
      for (let i = 0; i < 100; i++) {
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
      summary: { remainingBalance, propertyValue, cumulativeEffort, netSaleProceeds, netGain, irr: irrAnnual },
    };
  }, [loanAmount, monthlyPayment, monthlyRent, partEvolution, loanDuration, resaleYear, appreciationRate, interestRate, tmi]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(v));

  const fmtPct = (v: number) => {
    if (!isFinite(v) || isNaN(v)) return "N/A";
    return new Intl.NumberFormat("fr-FR", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v / 100);
  };

  const Tooltip = ({ text }: { text: string }) => (
    <span className="group relative ml-1 inline-flex">
      <span className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-[#1e3a5f] text-white text-[8px] font-bold flex items-center justify-center cursor-help transition-colors">
        i
      </span>
      <span className="absolute left-0 bottom-full mb-1.5 w-56 bg-[#1e3a5f] text-white text-xs rounded-xl px-2.5 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-xl leading-relaxed">
        {text}
      </span>
    </span>
  );

  const InputRow = ({
    icon: Icon, label, value, onChange, suffix, step = 1, testId, min = 0, tooltip,
  }: {
    icon: React.ElementType; label: string; value: number; onChange: (v: number) => void;
    suffix: string; step?: number; testId: string; min?: number; tooltip?: string;
  }) => (
    <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
      <Label className="text-[#1e3a5f] flex items-center gap-1.5 text-sm font-medium">
        <Icon className="h-4 w-4 text-[#1e3a5f]/60 flex-shrink-0" />
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </Label>
      <div className="flex items-center gap-1.5">
        <Input
          type="number" value={value} min={min} step={step}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
          className="w-28 text-right bg-gray-50 border-gray-200 text-[#1e3a5f] font-semibold h-9 text-sm"
          data-testid={testId}
        />
        <span className="text-gray-400 text-sm w-8">{suffix}</span>
      </div>
    </div>
  );

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
            <InputRow icon={Euro} label="Montant du prêt" value={loanAmount} onChange={setLoanAmount} suffix="€" testId="input-credit-amount" />
            <InputRow
              icon={Euro} label="Mensualité du prêt" value={monthlyPayment}
              onChange={setMonthlyPayment} suffix="€" testId="input-monthly-payment"
              tooltip="Mensualité réelle du prêt AVEC assurance emprunteur incluse dans le montant total versé chaque mois."
            />
            <InputRow icon={Building2} label="Dividende net / Loyer mensuel" value={monthlyRent} onChange={setMonthlyRent} suffix="€" testId="input-monthly-rent" />
            <InputRow
              icon={TrendingUp} label="Évolution valeur de la part" value={partEvolution}
              onChange={setPartEvolution} suffix="%" step={0.1} testId="input-part-evolution"
              tooltip="Taux d'évolution annuel des dividendes/loyers : chaque année les revenus sont multipliés par (1 + ce taux)."
            />
            <InputRow icon={Percent} label="Taux d'intérêt annuel (TAEG)" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} testId="input-interest-rate-leverage" />
            <InputRow icon={Clock} label="Durée du prêt" value={loanDuration} onChange={setLoanDuration} suffix="ans" min={1} testId="input-loan-duration-leverage" />
            <InputRow icon={Calendar} label="Revente après" value={resaleYear} onChange={(v) => setResaleYear(Math.min(v, loanDuration))} suffix="ans" min={1} testId="input-resale-year" />
            <InputRow icon={TrendingUp} label="Valorisation du bien" value={appreciationRate} onChange={setAppreciationRate} suffix="%" step={0.5} testId="input-appreciation-rate" />

            {/* TMI */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="text-sm font-medium text-[#1e3a5f] mb-3 flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-[#1e3a5f]/60" />
                Tranche marginale d'imposition
                <span className="text-[10px] text-gray-400">+ 18,6% charges sociales</span>
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
            <p className="text-xs text-amber-600/80 mb-0.5">Effort d'épargne cumulé sur {resaleYear} ans</p>
            <p className="font-serif font-bold text-amber-700 text-2xl" data-testid="text-cumulative-savings">
              {fmt(summary.cumulativeEffort)}
            </p>
            <p className="text-[10px] text-amber-500 mt-1">somme des efforts annuels nets (dividendes − fiscalité − mensualités)</p>
          </div>

          {/* Value + CRD */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-blue-50 border-blue-200 ring-2 ring-blue-200/50 shadow-md" : "bg-slate-50 border-slate-100"}`}>
              <p className="text-xs text-slate-500/80 mb-0.5">Valeur du bien</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-property-value">{fmt(summary.propertyValue)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">+{appreciationRate}%/an</p>
            </div>
            <div className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-orange-50 border-orange-200 ring-2 ring-orange-200/50 shadow-md" : "bg-slate-50 border-slate-100"}`}>
              <p className="text-xs text-slate-500/80 mb-0.5">Capital restant dû</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-remaining-balance">{fmt(summary.remainingBalance)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">à {resaleYear} ans</p>
            </div>
          </div>

          {/* Net gain */}
          <div className={`rounded-xl border p-4 text-center ${summary.netGain >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <p className="text-xs text-gray-500">Gain net à la revente</p>
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
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 pointer-events-none">
                    <div className="bg-white border border-[#1e3a5f]/20 rounded-xl shadow-2xl p-3 text-left">
                      <p className="text-xs font-semibold text-[#1e3a5f] mb-2">Détail du calcul</p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />Valeur du bien</span>
                          <span className="font-semibold text-[#1e3a5f]">+{fmt(summary.propertyValue)}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />Capital restant dû</span>
                          <span className="font-semibold text-red-500">−{fmt(summary.remainingBalance)}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Effort cumulé net</span>
                          <span className="font-semibold text-red-500">{fmt(summary.cumulativeEffort)}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-1.5 flex justify-between">
                          <span className="font-semibold text-gray-700">= Gain net</span>
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

          {/* IRR */}
          <div className="rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/20 border border-[#D4AF37]/25 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#1e3a5f]/60 mb-0.5">TRI brut annualisé</p>
              <p className={`font-serif text-2xl font-bold ${summary.irr >= 0 ? "text-[#D4AF37]" : "text-red-500"}`} data-testid="text-irr">
                {fmtPct(summary.irr)}
              </p>
              <p className="text-[10px] text-[#1e3a5f]/40 mt-0.5">interpolation linéaire · flux annuels nets</p>
            </div>
            <div className="text-right text-xs text-[#1e3a5f]/50">
              <p>Rendement annualisé</p>
              <p>de votre effort net</p>
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
              <p className="text-[10px] text-gray-400">Dividendes · intérêts · fiscalité {totalFiscalRate}% · effort net annuel</p>
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
                    Intérêts<br /><span className="text-gray-400 font-normal">payés</span>
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
                    Effort<br /><span className="text-gray-400 font-normal">épargne</span>
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
                    <td className="px-3 py-2 text-right text-red-500">
                      {row.impactFiscal > 0 ? `−${fmt(row.impactFiscal)}` : "—"}
                    </td>
                    <td className="px-3 py-2 text-right text-green-700 font-medium">{fmt(row.dividendeNet)}</td>
                    <td className={`px-3 py-2 text-right font-bold ${row.effortEpargne >= 0 ? "text-green-600" : "text-amber-700"}`}>
                      {row.effortEpargne >= 0 ? "+" : ""}{fmt(row.effortEpargne)}
                    </td>
                  </tr>
                ))}
                {/* Totals row */}
                <tr className="bg-[#1e3a5f]/5 border-t-2 border-[#1e3a5f]/20 font-bold text-xs">
                  <td className="px-3 py-2.5 text-[#1e3a5f]">TOTAL</td>
                  <td className="px-3 py-2.5 text-right text-[#1e3a5f]">{fmt(yearlyData.reduce((a, r) => a + r.mensualitesAnn, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-[#1e3a5f]">{fmt(yearlyData.reduce((a, r) => a + r.dividendeBrut, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-orange-600">{fmt(yearlyData.reduce((a, r) => a + r.interets, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-[#1e3a5f]">{fmt(yearlyData.reduce((a, r) => a + r.bilanFoncier, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-red-500">{fmt(yearlyData.reduce((a, r) => a + r.impactFiscal, 0))}</td>
                  <td className="px-3 py-2.5 text-right text-green-700">{fmt(yearlyData.reduce((a, r) => a + r.dividendeNet, 0))}</td>
                  <td className={`px-3 py-2.5 text-right ${summary.cumulativeEffort >= 0 ? "text-green-600" : "text-amber-700"}`}>
                    {summary.cumulativeEffort >= 0 ? "+" : ""}{fmt(summary.cumulativeEffort)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400" data-testid="text-leverage-disclaimer">
          Simulation indicative. Mensualité saisie inclut l'assurance emprunteur. Intérêts calculés avec le taux mensuel actuariel <em>r = (1+TAEG)^(1/12)−1</em>. Dividendes revalorisés chaque année selon l'évolution de la part. Fiscalité : TMI + 18,6% charges sociales sur le bilan foncier positif. Hors frais de notaire, charges de gestion, vacance locative et impact global sur la fiscalité SCPI.
        </p>
      </div>
    </div>
  );
}
