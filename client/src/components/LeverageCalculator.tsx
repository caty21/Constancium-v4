import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Euro, Clock, Percent, TrendingUp, Calendar, Info, ArrowRight } from "lucide-react";

export default function LeverageCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [monthlyRent, setMonthlyRent] = useState(800);
  const [loanDuration, setLoanDuration] = useState(20);
  const [resaleYear, setResaleYear] = useState(15);
  const [appreciationRate, setAppreciationRate] = useState(1);
  const [interestRate, setInterestRate] = useState(3.5);

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
    // CRD(N) = P*(1+r)^N - M*((1+r)^N - 1)/r
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

    // Total interest paid over loan
    const totalInterestPaid = monthlyPayment * totalMonths - loanAmount;

    // Net gain at resale
    const netGain = propertyValue - remainingBalance - cumulativeSavingsEffort;

    // IRR calculation
    const cashFlows: number[] = [];
    for (let m = 0; m < resaleMonths; m++) {
      cashFlows.push(-monthlySavingsEffort);
    }
    cashFlows[cashFlows.length - 1] += propertyValue - remainingBalance;

    let irr = 0.05;
    for (let i = 0; i < 100; i++) {
      let npv = 0, npvD = 0;
      for (let t = 0; t < cashFlows.length; t++) {
        const df = Math.pow(1 + irr / 12, t + 1);
        npv += cashFlows[t] / df;
        npvD -= (t + 1) * cashFlows[t] / (12 * Math.pow(1 + irr / 12, t + 2));
      }
      if (Math.abs(npv) < 0.0001 || Math.abs(npvD) < 0.0001) break;
      irr = irr - npv / npvD;
      if (irr < -0.99) irr = -0.99;
      if (irr > 10) irr = 10;
    }

    return {
      monthlyPayment,
      remainingBalance,
      propertyValue,
      monthlySavingsEffort,
      cumulativeSavingsEffort,
      totalInterestPaid,
      netGain,
      irr: irr * 100,
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
            <InputRow icon={Percent} label="Taux d'intérêt annuel" value={interestRate} onChange={setInterestRate} suffix="%" step={0.1} testId="input-interest-rate-leverage" />
            <InputRow icon={Clock} label="Durée du prêt" value={loanDuration} onChange={setLoanDuration} suffix="ans" min={1} testId="input-loan-duration-leverage" />
            <InputRow icon={Calendar} label="Revente après" value={resaleYear} onChange={(v) => setResaleYear(Math.min(v, loanDuration))} suffix="ans" min={1} testId="input-resale-year" />
            <InputRow icon={TrendingUp} label="Valorisation annuelle" value={appreciationRate} onChange={setAppreciationRate} suffix="%" step={0.5} testId="input-appreciation-rate" />
          </div>

          {/* Auto-computed monthly payment info */}
          <div className="mt-4 p-3 bg-[#1e3a5f]/5 rounded-xl border border-[#1e3a5f]/10 flex items-center gap-3">
            <div className="p-1.5 bg-[#1e3a5f]/10 rounded-lg">
              <Euro className="h-3.5 w-3.5 text-[#1e3a5f]" />
            </div>
            <div>
              <p className="text-xs text-[#1e3a5f]/60">Mensualité calculée (taux actuariel)</p>
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
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
              <p className="text-xs text-amber-600/80 mb-0.5">Effort mensuel</p>
              <p className="font-serif font-bold text-amber-700 text-lg" data-testid="text-monthly-savings-effort">
                {fmt(results.monthlySavingsEffort)}
              </p>
              <p className="text-[10px] text-amber-500 mt-0.5">mensualité − loyer</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-xs text-slate-500/80 mb-0.5">Effort cumulé</p>
              <p className="font-serif font-bold text-[#1e3a5f] text-lg" data-testid="text-cumulative-savings">
                {fmt(results.cumulativeSavingsEffort)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">sur {resaleYear} ans</p>
            </div>
          </div>

          {/* Value + CRD */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-xs text-slate-500/80 mb-0.5">Valeur du bien</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-property-value">
                {fmt(results.propertyValue)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">+{appreciationRate}%/an</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-xs text-slate-500/80 mb-0.5">Capital restant dû</p>
              <p className="font-serif font-semibold text-[#1e3a5f] text-base" data-testid="text-remaining-balance">
                {fmt(results.remainingBalance)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">à {resaleYear} ans (actuariel)</p>
            </div>
          </div>

          {/* Flow arrows */}
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-[#1e3a5f]">{fmt(results.propertyValue)}</span>
            <ArrowRight className="h-3 w-3" />
            <span>− {fmt(results.remainingBalance)}</span>
            <ArrowRight className="h-3 w-3" />
            <span>− {fmt(results.cumulativeSavingsEffort)}</span>
          </div>

          {/* Net gain */}
          <div className={`rounded-xl border p-4 text-center ${results.netGain >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
            <p className="text-xs text-gray-500 mb-1">Gain net à la revente</p>
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
            </div>
            <div className="text-right text-xs text-[#1e3a5f]/50">
              <p>Rendement annualisé</p>
              <p>de votre apport en effort</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400" data-testid="text-leverage-disclaimer">
          Simulation indicative. La mensualité et le capital restant dû sont calculés avec le taux mensuel actuariel : <em>r = (1 + taux annuel)^(1/12) − 1</em>. Le TRI brut exclut frais de notaire, taxes, charges, vacance locative et fiscalité.
        </p>
      </div>
    </div>
  );
}
