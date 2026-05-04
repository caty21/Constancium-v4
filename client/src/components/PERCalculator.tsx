import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Euro, Percent, Clock, TrendingUp, Info, Wallet, BadgePercent, CalendarClock } from "lucide-react";

const TMI_OPTIONS = [
  { label: "11 %", value: 11 },
  { label: "30 %", value: 30 },
  { label: "41 %", value: 41 },
  { label: "45 %", value: 45 },
];

// PASS 2026
const PASS = 47_100;

export default function PERCalculator() {
  const [netIncome, setNetIncome] = useState(60_000);
  const [contribution, setContribution] = useState(5_000);
  const [tmi, setTmi] = useState(30);
  const [yearsToRetirement, setYearsToRetirement] = useState(25);
  const [annualReturn, setAnnualReturn] = useState(5);

  const results = useMemo(() => {
    // Deduction ceiling (employee): max(10% × net income, 10% × PASS) capped at 10% × 8 × PASS
    const minCeiling = 0.1 * PASS; // ~4 710 €
    const maxCeiling = 0.1 * 8 * PASS; // ~37 680 €
    const rawCeiling = 0.1 * netIncome;
    const deductionCeiling = Math.min(Math.max(rawCeiling, minCeiling), maxCeiling);

    // Effective deductible amount
    const deductibleAmount = Math.min(contribution, deductionCeiling);

    // Tax savings
    const taxSavings = deductibleAmount * (tmi / 100);

    // Net cost after tax gain
    const netCost = contribution - taxSavings;

    // Effective yield on net cost (first year)
    const effectiveYield = netCost > 0 ? (taxSavings / netCost) * 100 : 0;

    // Capital at retirement (future value of annuity, end of period)
    const r = annualReturn / 100;
    let capitalAtRetirement: number;
    if (r === 0) {
      capitalAtRetirement = contribution * yearsToRetirement;
    } else {
      capitalAtRetirement = contribution * ((Math.pow(1 + r, yearsToRetirement) - 1) / r);
    }

    // Capital at retirement net cost equivalent
    let netCapital: number;
    if (r === 0) {
      netCapital = netCost * yearsToRetirement;
    } else {
      netCapital = netCost * ((Math.pow(1 + r, yearsToRetirement) - 1) / r);
    }

    // Total contributions and total tax savings over period
    const totalContributions = contribution * yearsToRetirement;
    const totalTaxSavings = taxSavings * yearsToRetirement;
    const totalNetCost = netCost * yearsToRetirement;

    const isCapped = contribution > deductionCeiling;

    return {
      deductionCeiling,
      deductibleAmount,
      taxSavings,
      netCost,
      effectiveYield,
      capitalAtRetirement,
      netCapital,
      totalContributions,
      totalTaxSavings,
      totalNetCost,
      isCapped,
    };
  }, [netIncome, contribution, tmi, yearsToRetirement, annualReturn]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(v));

  const fmtPct = (v: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(v / 100);

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── Inputs ── */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-slate-50 to-gray-50 p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-[#1e3a5f] rounded-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a5f]">Paramètres</h3>
              <p className="text-xs text-gray-400">Plan d'Épargne Retraite (PER individuel)</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Net income */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-2">
                <Euro className="h-4 w-4 text-[#1e3a5f]/60" />
                Revenu net imposable annuel
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={netIncome}
                  min={0}
                  step={1000}
                  onChange={(e) => setNetIncome(Math.max(0, Number(e.target.value)))}
                  className="flex-1 text-right bg-gray-50 border-gray-200 text-[#1e3a5f] font-semibold h-9 text-sm"
                  data-testid="input-per-net-income"
                />
                <span className="text-gray-400 text-sm w-4">€</span>
              </div>
            </div>

            {/* TMI selector */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-3">
                <BadgePercent className="h-4 w-4 text-[#1e3a5f]/60" />
                Tranche marginale d'imposition (TMI)
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {TMI_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTmi(opt.value)}
                    data-testid={`button-tmi-${opt.value}`}
                    className={`py-2 rounded-lg text-sm font-semibold transition-all border ${
                      tmi === opt.value
                        ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-md"
                        : "bg-gray-50 text-[#1e3a5f]/70 border-gray-200 hover:border-[#1e3a5f]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual contribution */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-2">
                <Wallet className="h-4 w-4 text-[#1e3a5f]/60" />
                Versement annuel PER
                <span className="ml-auto font-bold text-[#1e3a5f]">{fmt(contribution)}</span>
              </Label>
              <Slider
                min={500}
                max={Math.min(results.deductionCeiling * 1.2, 50000)}
                step={100}
                value={[contribution]}
                onValueChange={([v]) => setContribution(v)}
                className="mt-2"
                data-testid="slider-per-contribution"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>500 €</span>
                <span>Plafond déductible : {fmt(results.deductionCeiling)}</span>
              </div>
              {results.isCapped && (
                <p className="text-xs text-amber-600 mt-1.5 bg-amber-50 rounded-lg p-2">
                  ⚠ Versement supérieur au plafond — seuls {fmt(results.deductionCeiling)} seront déduits.
                </p>
              )}
            </div>

            {/* Years to retirement */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-2">
                <CalendarClock className="h-4 w-4 text-[#1e3a5f]/60" />
                Horizon retraite
                <span className="ml-auto font-bold text-[#1e3a5f]">{yearsToRetirement} ans</span>
              </Label>
              <Slider
                min={1}
                max={40}
                step={1}
                value={[yearsToRetirement]}
                onValueChange={([v]) => setYearsToRetirement(v)}
                className="mt-2"
                data-testid="slider-per-years"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 an</span>
                <span>40 ans</span>
              </div>
            </div>

            {/* Annual return */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-2">
                <TrendingUp className="h-4 w-4 text-[#1e3a5f]/60" />
                Rendement annuel estimé
                <span className="ml-auto font-bold text-[#1e3a5f]">{annualReturn} %</span>
              </Label>
              <Slider
                min={0}
                max={12}
                step={0.5}
                value={[annualReturn]}
                onValueChange={([v]) => setAnnualReturn(v)}
                className="mt-2"
                data-testid="slider-per-return"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0 %</span>
                <span>12 %</span>
              </div>
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
              <p className="text-xs text-gray-400">Économie fiscale et capital retraite</p>
            </div>
          </div>

          {/* Annual savings highlight */}
          <div className="rounded-xl bg-[#1e3a5f] p-4 text-center">
            <p className="text-xs text-white/60 mb-1">Économie d'impôt annuelle</p>
            <p className="font-serif text-4xl font-bold text-[#D4AF37]" data-testid="text-per-tax-savings">
              {fmt(results.taxSavings)}
            </p>
            <p className="text-xs text-white/50 mt-1">
              TMI {tmi}% × {fmt(results.deductibleAmount)} déductibles
            </p>
          </div>

          {/* Cost breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-xs text-slate-500/80 mb-0.5">Versement brut</p>
              <p className="font-serif font-bold text-[#1e3a5f] text-lg" data-testid="text-per-contribution">
                {fmt(contribution)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">par an</p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-100 p-3">
              <p className="text-xs text-green-600/80 mb-0.5">Coût réel net</p>
              <p className="font-serif font-bold text-green-700 text-lg" data-testid="text-per-net-cost">
                {fmt(results.netCost)}
              </p>
              <p className="text-[10px] text-green-500 mt-0.5">après déduction fiscale</p>
            </div>
          </div>

          {/* Effective yield */}
          <div className="rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/20 border border-[#D4AF37]/25 p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#1e3a5f]/60 mb-0.5">Rendement fiscal immédiat</p>
              <p className="font-serif text-2xl font-bold text-[#D4AF37]" data-testid="text-per-effective-yield">
                +{results.effectiveYield.toFixed(1).replace(".", ",")} %
              </p>
            </div>
            <div className="text-right text-xs text-[#1e3a5f]/50">
              <p>Gain fiscal</p>
              <p>sur coût net</p>
            </div>
          </div>

          {/* Projection at retirement */}
          <div className="rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-100 p-4">
            <p className="text-xs text-gray-500 mb-3 font-medium">Projection à {yearsToRetirement} ans · {annualReturn}%/an</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Capital brut accumulé</span>
                <span className="font-serif font-bold text-[#1e3a5f] text-base" data-testid="text-per-capital">
                  {fmt(results.capitalAtRetirement)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600">dont économies fiscales cumulées</span>
                <span className="font-semibold text-green-600 text-sm" data-testid="text-per-total-tax">
                  {fmt(results.totalTaxSavings)}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Coût net total sur {yearsToRetirement} ans</span>
                <span className="font-semibold text-[#1e3a5f] text-sm" data-testid="text-per-total-cost">
                  {fmt(results.totalNetCost)}
                </span>
              </div>
            </div>
          </div>

          {/* Bar visual */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
            <p className="text-xs text-gray-400 mb-2">Répartition du versement annuel</p>
            <div className="flex rounded-full overflow-hidden h-4">
              <div
                className="bg-[#D4AF37] transition-all"
                style={{ width: `${(results.taxSavings / contribution) * 100}%` }}
                title="Gain fiscal"
              />
              <div
                className="bg-[#1e3a5f] transition-all"
                style={{ width: `${(results.netCost / contribution) * 100}%` }}
                title="Coût net"
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" />
                Gain fiscal ({Math.round((results.taxSavings / contribution) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#1e3a5f]" />
                Votre apport net ({Math.round((results.netCost / contribution) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400" data-testid="text-per-disclaimer">
          Simulation indicative basée sur le PASS 2026 ({fmt(PASS)}). Plafond de déduction : 10% du revenu net (min. 10% du PASS, max. 10% × 8 PASS = {fmt(0.1 * 8 * PASS)}). La fiscalité à la sortie (rente ou capital) dépend de votre situation. Consultez un conseiller en gestion de patrimoine.
        </p>
      </div>
    </div>
  );
}
