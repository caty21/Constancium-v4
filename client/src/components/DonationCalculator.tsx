import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark, Euro, Users, CalendarClock, Info, ArrowRight, ShieldCheck, BadgePercent } from "lucide-react";

/* ── Fiscal data ─────────────────────────────────────── */
const LIENS = [
  { id: "enfant",          label: "Enfant",                 abattement: 100_000, bareme: "directe" },
  { id: "petit_enfant",    label: "Petit-enfant",           abattement:  31_865, bareme: "directe" },
  { id: "arriere_pf",     label: "Arrière-petit-enfant",   abattement:   5_310, bareme: "directe" },
  { id: "conjoint_succ",  label: "Conjoint / PACS (succ.)",abattement:  80_724, bareme: "conjoint" },
  { id: "frere_soeur",    label: "Frère / Sœur",           abattement:  15_932, bareme: "frere" },
  { id: "neveu_niece",    label: "Neveu / Nièce",          abattement:   7_967, bareme: "tiers60" },
  { id: "tiers",          label: "Tiers (non parent)",     abattement:   1_594, bareme: "tiers60" },
];

// Barème ligne directe
function droitsDirecte(base: number): number {
  const tranches = [
    [8_072,    0.05],
    [12_109,   0.10],
    [15_932,   0.15],
    [552_324,  0.20],
    [902_838,  0.30],
    [1_805_677, 0.40],
    [Infinity, 0.45],
  ];
  let tax = 0, prev = 0;
  for (const [ceiling, rate] of tranches) {
    if (base <= prev) break;
    tax += (Math.min(base, ceiling as number) - prev) * (rate as number);
    prev = ceiling as number;
  }
  return tax;
}

// Barème frère/sœur
function droitsFrere(base: number): number {
  if (base <= 0) return 0;
  if (base <= 24_430) return base * 0.35;
  return 24_430 * 0.35 + (base - 24_430) * 0.45;
}

// Tiers / neveu = 60%
function droitsTiers(base: number): number {
  return Math.max(0, base) * 0.60;
}

// Conjoint PACS en succession = exonéré
function droitsConjoint(_base: number): number {
  return 0;
}

function calculDroits(bareme: string, base: number): number {
  if (base <= 0) return 0;
  switch (bareme) {
    case "directe":  return droitsDirecte(base);
    case "frere":    return droitsFrere(base);
    case "conjoint": return droitsConjoint(base);
    case "tiers60":  return droitsTiers(base);
    default:         return 0;
  }
}

// Valeur nue-propriété par tranche d'âge (barème fiscal art. 669 CGI)
function valuationNuePropriete(age: number): number {
  if (age < 21)  return 0.10;
  if (age < 31)  return 0.20;
  if (age < 41)  return 0.30;
  if (age < 51)  return 0.40;
  if (age < 61)  return 0.50;
  if (age < 71)  return 0.60;
  if (age < 81)  return 0.70;
  if (age < 91)  return 0.80;
  return 0.90;
}

/* ── Component ───────────────────────────────────────── */
export default function DonationCalculator() {
  const [lienId, setLienId] = useState("enfant");
  const [assetValue, setAssetValue] = useState(300_000);
  const [donorAge, setDonorAge] = useState(65);
  const [abattUsed, setAbattUsed] = useState(0);
  const [mode, setMode] = useState<"pleine" | "nue">("pleine");

  const lien = LIENS.find((l) => l.id === lienId) ?? LIENS[0];

  const results = useMemo(() => {
    const abattDisponible = Math.max(0, lien.abattement - abattUsed);

    // ── Pleine propriété ──────────────────────────────
    const basePleine = Math.max(0, assetValue - abattDisponible);
    const droitsPleine = calculDroits(lien.bareme, basePleine);

    // ── Nue-propriété ─────────────────────────────────
    const npRatio = valuationNuePropriete(donorAge);
    const valeurNP = assetValue * npRatio;
    const valeurUsufruit = assetValue * (1 - npRatio);
    const baseNue = Math.max(0, valeurNP - abattDisponible);
    const droitsNue = calculDroits(lien.bareme, baseNue);

    // Économie liée au démembrement
    const economieDemembrement = droitsPleine - droitsNue;

    // Taux effectif
    const tauxPleine = assetValue > 0 ? (droitsPleine / assetValue) * 100 : 0;
    const tauxNue    = assetValue > 0 ? (droitsNue    / assetValue) * 100 : 0;

    return {
      abattDisponible,
      basePleine,
      droitsPleine,
      tauxPleine,
      npRatio,
      valeurNP,
      valeurUsufruit,
      baseNue,
      droitsNue,
      tauxNue,
      economieDemembrement,
      droitsActifs: mode === "pleine" ? droitsPleine : droitsNue,
      baseActifs:   mode === "pleine" ? basePleine    : baseNue,
    };
  }, [lienId, assetValue, donorAge, abattUsed, mode, lien]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(v));

  const fmtPct = (v: number) =>
    `${v.toFixed(1).replace(".", ",")} %`;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-6">

        {/* ── Inputs ── */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-slate-50 to-gray-50 p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-[#1e3a5f] rounded-lg">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a5f]">Paramètres</h3>
              <p className="text-xs text-gray-400">Simulation de transmission patrimoniale</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Mode toggle */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="text-sm font-medium text-[#1e3a5f] mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#1e3a5f]/60" />
                Mode de transmission
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {(["pleine", "nue"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    data-testid={`button-mode-${m}`}
                    className={`py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                      mode === m
                        ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-md"
                        : "bg-gray-50 text-[#1e3a5f]/70 border-gray-200 hover:border-[#1e3a5f]/40"
                    }`}
                  >
                    {m === "pleine" ? "Pleine propriété" : "Nue-propriété"}
                  </button>
                ))}
              </div>
            </div>

            {/* Lien de parenté */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="text-sm font-medium text-[#1e3a5f] mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-[#1e3a5f]/60" />
                Lien de parenté / bénéficiaire
              </Label>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {LIENS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLienId(l.id)}
                    data-testid={`button-lien-${l.id}`}
                    className={`py-2 px-2 rounded-lg text-xs font-medium transition-all border text-left ${
                      lienId === l.id
                        ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                        : "bg-gray-50 text-[#1e3a5f]/70 border-gray-200 hover:border-[#1e3a5f]/40"
                    }`}
                  >
                    {l.label}
                    <span className={`block text-[10px] mt-0.5 ${lienId === l.id ? "text-white/60" : "text-gray-400"}`}>
                      Abatt. {fmt(l.abattement)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Valeur du patrimoine */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-2">
                <Euro className="h-4 w-4 text-[#1e3a5f]/60" />
                Valeur du patrimoine transmis
                <span className="ml-auto font-bold">{fmt(assetValue)}</span>
              </Label>
              <Slider
                min={10_000}
                max={5_000_000}
                step={5_000}
                value={[assetValue]}
                onValueChange={([v]) => setAssetValue(v)}
                data-testid="slider-asset-value"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10 000 €</span>
                <span>5 000 000 €</span>
              </div>
            </div>

            {/* Âge du donateur (nue-propriété) */}
            {mode === "nue" && (
              <div className="p-3 bg-white rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-2">
                  <CalendarClock className="h-4 w-4 text-[#1e3a5f]/60" />
                  Âge du donateur
                  <span className="ml-auto font-bold">{donorAge} ans</span>
                </Label>
                <Slider
                  min={20}
                  max={95}
                  step={1}
                  value={[donorAge]}
                  onValueChange={([v]) => setDonorAge(v)}
                  data-testid="slider-donor-age"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>20 ans</span>
                  <span>95 ans</span>
                </div>
                <p className="text-xs text-[#D4AF37] mt-2 font-medium">
                  → Nue-propriété = {Math.round(results.npRatio * 100)} % de la valeur
                  <span className="text-gray-400 font-normal ml-1">(barème art. 669 CGI)</span>
                </p>
              </div>
            )}

            {/* Abattement déjà utilisé */}
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Label className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] mb-2">
                <BadgePercent className="h-4 w-4 text-[#1e3a5f]/60" />
                Abattement déjà utilisé
                <span className="text-xs text-gray-400 font-normal ml-1">(15 dernières années)</span>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={lien.abattement}
                  step={1000}
                  value={abattUsed}
                  onChange={(e) => setAbattUsed(Math.min(lien.abattement, Math.max(0, Number(e.target.value))))}
                  className="flex-1 text-right bg-gray-50 border-gray-200 text-[#1e3a5f] font-semibold h-9 text-sm"
                  data-testid="input-abattement-used"
                />
                <span className="text-gray-400 text-sm">€</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Abattement restant disponible : <strong className="text-[#1e3a5f]">{fmt(results.abattDisponible)}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#1e3a5f] rounded-lg">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a5f]">Résultats</h3>
              <p className="text-xs text-gray-400">
                {mode === "pleine" ? "Donation en pleine propriété" : "Donation en nue-propriété"} · {lien.label}
              </p>
            </div>
          </div>

          {/* Main result */}
          <div className="rounded-xl bg-[#1e3a5f] p-4 text-center">
            <p className="text-xs text-white/60 mb-1">
              Droits de donation estimés
              {mode === "nue" ? " (sur nue-propriété)" : ""}
            </p>
            <p className="font-serif text-4xl font-bold text-[#D4AF37]" data-testid="text-donation-tax">
              {fmt(results.droitsActifs)}
            </p>
            <p className="text-xs text-white/50 mt-1">
              Taux effectif : {fmtPct(mode === "pleine" ? results.tauxPleine : results.tauxNue)}
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-xs text-slate-500/80 mb-0.5">Valeur transmise</p>
              <p className="font-serif font-bold text-[#1e3a5f] text-lg" data-testid="text-asset-value">
                {fmt(assetValue)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">en {mode === "pleine" ? "pleine propriété" : "nue-propriété"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-xs text-slate-500/80 mb-0.5">Base taxable</p>
              <p className="font-serif font-bold text-[#1e3a5f] text-lg" data-testid="text-taxable-base">
                {fmt(results.baseActifs)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">après abattement {fmt(results.abattDisponible)}</p>
            </div>
          </div>

          {/* Nue-propriété detail */}
          {mode === "nue" && (
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 space-y-1.5">
              <p className="text-xs font-semibold text-amber-800 mb-2">Démembrement — répartition</p>
              <div className="flex justify-between text-xs">
                <span className="text-amber-700">Nue-propriété ({Math.round(results.npRatio * 100)} %)</span>
                <span className="font-semibold text-amber-800">{fmt(results.valeurNP)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-amber-700">Usufruit conservé ({Math.round((1 - results.npRatio) * 100)} %)</span>
                <span className="font-semibold text-amber-800">{fmt(results.valeurUsufruit)}</span>
              </div>
            </div>
          )}

          {/* Comparison pleine vs nue */}
          <div className="rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/20 border border-[#D4AF37]/25 p-4">
            <p className="text-xs font-semibold text-[#1e3a5f]/70 mb-3">Comparaison des deux stratégies</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Pleine propriété</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{fmtPct(results.tauxPleine)}</span>
                  <span className="font-semibold text-[#1e3a5f] text-sm" data-testid="text-tax-pleine">
                    {fmt(results.droitsPleine)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Nue-propriété (âge {donorAge} ans)</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{fmtPct(results.tauxNue)}</span>
                  <span className="font-semibold text-[#1e3a5f] text-sm" data-testid="text-tax-nue">
                    {fmt(results.droitsNue)}
                  </span>
                </div>
              </div>
              <div className="border-t border-[#D4AF37]/30 pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-green-700">Économie par démembrement</span>
                <span className={`font-bold text-base ${results.economieDemembrement >= 0 ? "text-green-600" : "text-red-500"}`} data-testid="text-saving-demembrement">
                  {results.economieDemembrement >= 0 ? "−" : "+"}{fmt(Math.abs(results.economieDemembrement))}
                </span>
              </div>
            </div>
          </div>

          {/* Flow */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-[#1e3a5f]">{fmt(assetValue)}</span>
            <ArrowRight className="h-3 w-3" />
            <span>− abatt. {fmt(results.abattDisponible)}</span>
            <ArrowRight className="h-3 w-3" />
            <span>base {fmt(results.baseActifs)}</span>
            <ArrowRight className="h-3 w-3" />
            <span className="font-semibold text-[#D4AF37]">droits {fmt(results.droitsActifs)}</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400" data-testid="text-donation-disclaimer">
          Simulation indicative basée sur le barème fiscal en vigueur (art. 777 et 669 CGI). Abattements applicables tous les 15 ans. Pour le conjoint survivant, la succession est totalement exonérée. Cette simulation ne tient pas compte des éventuels abattements spéciaux (handicap, don de sommes d'argent…) ni de l'IFI. Consultez un notaire ou un conseiller en gestion de patrimoine pour une analyse personnalisée.
        </p>
      </div>
    </div>
  );
}
