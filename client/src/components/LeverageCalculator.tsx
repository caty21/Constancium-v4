import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Euro, Clock, Percent, TrendingUp, Calendar, Info } from "lucide-react";

export default function LeverageCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [monthlyRent, setMonthlyRent] = useState(800);
  const [loanDuration, setLoanDuration] = useState(20);
  const [resaleYear, setResaleYear] = useState(15);
  const [appreciationRate, setAppreciationRate] = useState(1);
  const [interestRate, setInterestRate] = useState(3.5);
  const [showNetGainInfo, setShowNetGainInfo] = useState(false);

  const results = useMemo(() => {
    const annualRate = interestRate / 100;
    const totalMonths = loanDuration * 12;
    const resaleMonths = Math.min(resaleYear, loanDuration) * 12;

    // Actuarial monthly rate: (1 + annual)^(1/12) - 1
    const r = Math.pow(1 + annualRate, 1 / 12) - 1;

    // Monthly payment via actuarial formula
    let monthlyPayment: number;
    if (r === 0) {
      monthlyPayment = loanAmount / totalMonths;
    } else {
      monthlyPayment = (loanAmount * r) / (1 - Math.pow(1 + r, -totalMonths));
    }

    // Capital restant dû after resaleMonths using actuarial formula
    let remainingBalance: number;
    if (r === 0) {
      remainingBalance = Math.max(0, loanAmount - monthlyPayment * resaleMonths);
    } else {
      const factor = Math.pow(1 + r, resaleMonths);
      remainingBalance = loanAmount * factor - monthlyPayment * (factor - 1) / r;
    }
    remainingBalance = Math.max(0, remainingBalance);

    // Property value at resale
    const propertyValue = loanAmount * Math.pow(1 + appreciationRate / 100, resaleYear);

    // Effort d'épargne = mensualité - loyer
    const monthlySavingsEffort = monthlyPayment - monthlyRent;
    const cumulativeSavingsEffort = monthlySavingsEffort * resaleMonths;

    // Net gain at resale
    const netGain = propertyValue - remainingBalance - cumulativeSavingsEffort;

    // ── IRR via linear interpolation (méthode sécante) ─────────────────────
    // Cash flows mensuel: effort négatif chaque mois, + produit net à la revente
    const cashFlows: number[] = [];
    for (let m = 0; m < resaleMonths; m++) {
      cashFlows.push(-monthlySavingsEffort);
    }
    if (cashFlows.length > 0) {
      cashFlows[cashFlows.length - 1] += propertyValue - remainingBalance;
    }

    const npvFn = (monthlyRate: number) =>
      cashFlows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + monthlyRate, t + 1), 0);

    // Bracket: find r1 (VAN > 0) and r2 (VAN < 0)
    let r1 = 0.0001, r2 = 0.03;
    let van1 = npvFn(r1), van2 = npvFn(r2);

    // Expand r2 if both same sign
    let attempts = 0;
    while (van1 * van2 > 0 && attempts < 60) {
      r2 *= 2;
      van2 = npvFn(r2);
      attempts++;
    }

    let irrMonthly = 0;
    if (van1 * van2 < 0) {
      // Linear interpolation (secant): TRI ≈ r1 + VAN1/(VAN1-VAN2) × (r2-r1)
      for (let i = 0; i < 100; i++) {
        const rNew = r1 + (van1 / (van1 - van2)) * (r2 - r1);
        const vanNew = npvFn(rNew);
        if (Math.abs(vanNew) < 0.01) { irrMonthly = rNew; break; }
        if (vanNew * van1 < 0) { r2 = rNew; van2 = vanNew; }
        else { r1 = rNew; van1 = vanNew; }
        irrMonthly = rNew;
      }
    }

    // Annualise: (1 + r_mensuel)^12 - 1
    const irrAnnual = (Math.pow(1 + irrMonthly, 12) - 1) * 100;

    return {
      monthlyPayment,
      remainingBalance,
      propertyValue,
      monthlySavingsEffort,
      cumulativeSavingsEffort,
      netGain,
      irr: irrAnnual,
    };
  }, [loanAmount, monthlyRent, loanDuration, resaleYear, appreciationRate, interestRate]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(v));

  const fmtPct = (v: number) => {
    if (!isFinite(v) || isNaN(v)) return "N/A";
    return new Intl.NumberFormat("fr-FR", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v / 100);
  };

  const InputRow = ({
    icon: Icon, label, value, onChange, suffix, step, testId, min = 0
  }: {
    icon: React.ElementType; label: string; value: number;
    onChange: (v: number) => void; suffix: string; step?: number;
    testId: string; min?: number;
  }) => (
    <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
      <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium whitespace-nowrap">
        <Icon className="h-4 w-4 text-[#1e3a5f]/60 flex-shrink-0" />
        {label}
      </Label>
      <div className="flex items-center gap-1.5">
        <Input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
          className="w-28 text-right bg-gray-50 border-gray-200 text-[#1e3a5f] font-semibold h-9 text-sm"
          data-testid={testId}
        />
        <span className="text-gray-400 text-sm w-8">{suffix}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── Inputs ── */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-slate-50 to-gray-50 p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-[#1e3a5f] rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a5f]">Paramètres</h3>
              <p className="text-xs text-gray-400">Simulation immobilière à crédit</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <InputRow icon={Euro} label="Montant du prêt" value={loanAmount} onChange={setLoanAmount} suffix="€" testId="input-credit-amount" />
            <InputRow icon={Building2} label="Loyer mensuel perçu" value={monthlyRent} onChange={setMonthlyRent} suffix="€" testId="input-monthly-rent" />
            <InputRow icon={Percent} label="Taux annuel (TAEG)" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} testId="input-interest-rate-leverage" />
            <InputRow icon={Clock} label="Durée du prêt" value={loanDuration} onChange={setLoanDuration} suffix="ans" min={1} testId="input-loan-duration-leverage" />
            <InputRow icon={Calendar} label="Revente après" value={resaleYear} onChange={(v) => setResaleYear(Math.min(v, loanDuration))} suffix="ans" min={1} testId="input-resale-year" />
            <InputRow icon={TrendingUp} label="Valorisation annuelle" value={appreciationRate} onChange={setAppreciationRate} suffix="%" step={0.5} testId="input-appreciation-rate" />
          </div>

          {/* Auto-computed monthly payment */}
          <div className="mt-4 p-3 bg-[#1e3a5f]/5 rounded-xl border border-[#1e3a5f]/10 flex items-center gap-3">
            <div className="p-1.5 bg-[#1e3a5f]/10 rounded-lg">
              <Euro className="h-3.5 w-3.5 text-[#1e3a5f]" />
            </div>
            <div>
              <p className="text-xs text-[#1e3a5f]/60">
                Mensualité calculée · taux actuariel · hors différé · assurance incluse dans le TAEG
              </p>
              <p className="font-serif font-bold text-[#1e3a5f] text-base" data-testid="text-monthly-payment">
                {fmt(results.monthlyPayment)}<span className="text-xs font-normal text-[#1e3a5f]/60">/mois</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#1e3a5f] rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a5f]">Résultats</h3>
              <p className="text-xs text-gray-400">Revente à {resaleYear} an{resaleYear > 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Effort mensuel */}
          <div className="grid grid-cols-2 gap-3">
            <div
              id="card-effort-mensuel"
              className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-amber-100 border-amber-300 shadow-md ring-2 ring-amber-300/50" : "bg-amber-50 border-amber-100"}`}
            >
              <p className="text-xs text-amber-600/80 mb-0.5">Effort mensuel</p>
              <p className="font-serif font-bold text-amber-700 text-lg" data-testid="text-monthly-savings-effort">
                {fmt(results.monthlySavingsEffort)}
              </p>
              <p className="text-[10px] text-amber-500 mt-0.5">mensualité − loyer</p>
            </div>
            <div
              id="card-effort-cumule"
              className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-slate-100 border-slate-300 shadow-md ring-2 ring-slate-300/50" : "bg-slate-50 border-slate-100"}`}
            >
              <p className="text-xs text-slate-500/80 mb-0.5">Effort cumulé</p>
              <p className="font-serif font-bold text-[#1e3a5f] text-lg" data-testid="text-cumulative-savings">
                {fmt(results.cumulativeSavingsEffort)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">sur {resaleYear} ans</p>
            </div>
          </div>

          {/* Value + CRD */}
          <div className="grid grid-cols-2 gap-3">
            <div
              id="card-valeur-bien"
              className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-blue-50 border-blue-200 shadow-md ring-2 ring-blue-200/50" : "bg-slate-50 border-slate-100"}`}
            >
              <p className="text-xs text-slate-500/80 mb-0.5">Valeur du bien</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-property-value">
                {fmt(results.propertyValue)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">+{appreciationRate}%/an</p>
            </div>
            <div
              id="card-capital-restant"
              className={`rounded-xl border p-3 transition-all duration-200 ${showNetGainInfo ? "bg-orange-50 border-orange-200 shadow-md ring-2 ring-orange-200/50" : "bg-slate-50 border-slate-100"}`}
            >
              <p className="text-xs text-slate-500/80 mb-0.5">Capital restant dû</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-remaining-balance">
                {fmt(results.remainingBalance)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">à {resaleYear} ans (actuariel)</p>
            </div>
          </div>

          {/* Net gain */}
          <div className={`rounded-xl border p-4 text-center relative ${results.netGain >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <p className="text-xs text-gray-500">Gain net à la revente</p>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowNetGainInfo(true)}
                  onMouseLeave={() => setShowNetGainInfo(false)}
                  onFocus={() => setShowNetGainInfo(true)}
                  onBlur={() => setShowNetGainInfo(false)}
                  className="w-4 h-4 rounded-full bg-gray-300 hover:bg-[#1e3a5f] text-white text-[9px] font-bold flex items-center justify-center transition-colors cursor-help focus:outline-none"
                  aria-label="Détail du calcul"
                  data-testid="button-net-gain-info"
                >
                  i
                </button>
                {showNetGainInfo && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 pointer-events-none">
                    <div className="bg-white border border-[#1e3a5f]/20 rounded-xl shadow-2xl p-3 text-left">
                      <p className="text-xs font-semibold text-[#1e3a5f] mb-2">Détail du calcul</p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                            <span className="text-gray-600">Valeur du bien</span>
                          </span>
                          <span className="font-semibold text-[#1e3a5f]">+{fmt(results.propertyValue)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                            <span className="text-gray-600">Capital restant dû</span>
                          </span>
                          <span className="font-semibold text-red-500">−{fmt(results.remainingBalance)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                            <span className="text-gray-600">Effort cumulé</span>
                          </span>
                          <span className="font-semibold text-red-500">−{fmt(results.cumulativeSavingsEffort)}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between">
                          <span className="font-semibold text-gray-700">= Gain net</span>
                          <span className={`font-bold ${results.netGain >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {results.netGain >= 0 ? "+" : ""}{fmt(results.netGain)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#1e3a5f]/20 rotate-45 -mt-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className={`font-serif text-3xl font-bold ${results.netGain >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-net-gain">
              {results.netGain >= 0 ? "+" : ""}{fmt(results.netGain)}
            </p>
          </div>

          {/* IRR */}
          <div className="rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/20 border border-[#D4AF37]/25 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#1e3a5f]/60 mb-0.5">TRI brut annualisé</p>
              <p className={`font-serif text-2xl font-bold ${results.irr >= 0 ? "text-[#D4AF37]" : "text-red-500"}`} data-testid="text-irr">
                {fmtPct(results.irr)}
              </p>
              <p className="text-[10px] text-[#1e3a5f]/40 mt-0.5">
                via interpolation linéaire · (1+r<sub>m</sub>)^12−1
              </p>
            </div>
            <div className="text-right text-xs text-[#1e3a5f]/50">
              <p>Rendement annualisé</p>
              <p>de votre effort d'épargne</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400" data-testid="text-leverage-disclaimer">
          Simulation indicative. Mensualité et capital restant dû calculés avec le taux mensuel actuariel <em>r = (1+TAEG)^(1/12)−1</em>, hors période de différé, assurance emprunteur incluse dans le TAEG. Le TRI est calculé par interpolation linéaire (méthode sécante) et annualisé par <em>(1+r<sub>mensuel</sub>)^12−1</em>. Exclut frais de notaire, taxes, charges et fiscalité.
        </p>
      </div>
    </div>
  );
}
