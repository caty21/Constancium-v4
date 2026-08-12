import { useState, useMemo, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Calculator, TrendingUp, PiggyBank, Percent, Clock,
  Info, Download, Calendar, RefreshCw, TableIcon,
  ChevronDown, ChevronUp, Minus, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Types ─────────────────────────────────────────── */
interface YearlyData {
  year: number;
  deposits: number;
  interest: number;
  total: number;
  totalWithdrawn: number;
}

/* ─── Constants ─────────────────────────────────────── */
const VP_FREQS = [
  { label: "Mensuel",     value: 12 },
  { label: "Bimestriel",  value: 6  },
  { label: "Trimestriel", value: 4  },
  { label: "Semestriel",  value: 2  },
  { label: "Annuel",      value: 1  },
];

const INTEREST_FREQS = [
  { label: "Mensuel",     value: 1  },
  { label: "Trimestriel", value: 3  },
  { label: "Semestriel",  value: 6  },
  { label: "Annuel",      value: 12 },
];

const RACHAT_FREQS = [
  { label: "Mensuel",     value: 1  },
  { label: "Trimestriel", value: 3  },
  { label: "Semestriel",  value: 6  },
  { label: "Annuel",      value: 12 },
];

/* ─── Helpers ────────────────────────────────────────── */
const fmt = (v: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(v));

const frequencyLabel = (months: number) => {
  if (months === 1)  return "mensuelle";
  if (months === 3)  return "trimestrielle";
  if (months === 6)  return "semestrielle";
  if (months === 12) return "annuelle";
  return `tous les ${months} mois`;
};

/* ─── SVG Chart ──────────────────────────────────────── */
const CW = 560, CH = 190;
const PAD = { top: 12, right: 16, bottom: 30, left: 62 };
const IW = CW - PAD.left - PAD.right;
const IH = CH - PAD.top - PAD.bottom;

function AreaChart({ data, hoveredIdx, onHover }: {
  data: YearlyData[];
  hoveredIdx: number | null;
  onHover: (idx: number | null) => void;
}) {
  const maxVal = data.length > 0 ? data[data.length - 1].total : 1;

  const xOf = (i: number) => PAD.left + (i / (data.length - 1 || 1)) * IW;
  const yOf = (v: number) => PAD.top + IH - (v / maxVal) * IH;

  // Y-axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(r => ({ r, val: maxVal * r }));

  // X-axis ticks
  const xTicks: number[] = [];
  const step = data.length <= 10 ? 1 : data.length <= 20 ? 5 : 10;
  for (let i = step; i <= data.length; i += step) xTicks.push(i - 1);
  if (xTicks[xTicks.length - 1] !== data.length - 1) xTicks.push(data.length - 1);

  // Polygon points
  const totalPts = data.map((d, i) => `${xOf(i)},${yOf(d.total)}`).join(" ");
  const depositPts = data.map((d, i) => `${xOf(i)},${yOf(d.deposits)}`).join(" ");
  const bottomL = `${xOf(0)},${PAD.top + IH}`;
  const bottomR = `${xOf(data.length - 1)},${PAD.top + IH}`;

  const depositPolygon = `${bottomL} ${depositPts} ${bottomR}`;
  const interestPolygon = `${depositPts} ${data.map((d, i) => `${xOf(data.length - 1 - i)},${yOf(data[data.length - 1 - i].total)}`).join(" ")}`;

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (CW / rect.width) - PAD.left;
    const idx = Math.round((x / IW) * (data.length - 1));
    onHover(Math.max(0, Math.min(data.length - 1, idx)));
  }, [data.length, onHover]);

  return (
    <svg
      viewBox={`0 0 ${CW} ${CH}`}
      className="w-full"
      style={{ height: CH }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => onHover(null)}
    >
      <defs>
        <linearGradient id="gradDeposit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0F1729" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0F1729" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#D4AF37" stopOpacity="0.90" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.45" />
        </linearGradient>
        <clipPath id="chartClip">
          <rect x={PAD.left} y={PAD.top} width={IW} height={IH} />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {yTicks.map(({ r, val }) => (
        <g key={r}>
          <line
            x1={PAD.left} x2={PAD.left + IW}
            y1={yOf(val)} y2={yOf(val)}
            stroke="#E8E5DC" strokeWidth={r === 0 ? 1.5 : 0.75}
          />
          <text
            x={PAD.left - 8} y={yOf(val) + 4}
            textAnchor="end" fontSize={9.5}
            fill="#9CA3AF" fontFamily="Inter, sans-serif"
          >
            {val >= 1_000_000
              ? `${(val / 1_000_000).toFixed(1)}M€`
              : val >= 1_000
              ? `${Math.round(val / 1_000)}k€`
              : `${Math.round(val)}€`}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {xTicks.map(i => (
        <text key={i}
          x={xOf(i)} y={CH - 4}
          textAnchor="middle" fontSize={9.5}
          fill="#9CA3AF" fontFamily="Inter, sans-serif"
        >
          {data[i].year}a
        </text>
      ))}

      {/* Area: deposits (navy) */}
      <polygon
        points={depositPolygon}
        fill="url(#gradDeposit)"
        clipPath="url(#chartClip)"
      />

      {/* Area: interest (gold) */}
      <polygon
        points={interestPolygon}
        fill="url(#gradInterest)"
        clipPath="url(#chartClip)"
      />

      {/* Top line (total) */}
      <polyline
        points={totalPts}
        fill="none"
        stroke="#D4AF37"
        strokeWidth={2}
        strokeLinejoin="round"
        clipPath="url(#chartClip)"
      />

      {/* Deposit line */}
      <polyline
        points={depositPts}
        fill="none"
        stroke="#0F1729"
        strokeWidth={1.5}
        strokeDasharray="4 3"
        strokeLinejoin="round"
        clipPath="url(#chartClip)"
      />

      {/* Hover crosshair */}
      {hoveredIdx !== null && (
        <>
          <line
            x1={xOf(hoveredIdx)} x2={xOf(hoveredIdx)}
            y1={PAD.top} y2={PAD.top + IH}
            stroke="#D4AF37" strokeWidth={1} strokeDasharray="3 3"
          />
          <circle cx={xOf(hoveredIdx)} cy={yOf(data[hoveredIdx].total)}
            r={4} fill="#D4AF37" stroke="white" strokeWidth={1.5} />
          <circle cx={xOf(hoveredIdx)} cy={yOf(data[hoveredIdx].deposits)}
            r={3} fill="#0F1729" stroke="white" strokeWidth={1.5} />
        </>
      )}
    </svg>
  );
}

/* ─── Segmented Button ────────────────────────────────── */
function SegBtn<T extends number>({ options, value, onChange }: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
            value === o.value
              ? "bg-[#0F1729] text-white shadow-sm"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
export default function CompoundInterestCalculator() {
  const [initialCapital, setInitialCapital]         = useState(10000);
  const [vpAmount, setVpAmount]                     = useState(200);
  const [vpFreqPerYear, setVpFreqPerYear]            = useState<number>(12);
  const [years, setYears]                            = useState(20);
  const [interestRate, setInterestRate]              = useState(7);
  const [interestFreqMonths, setInterestFreqMonths] = useState<number>(12);
  const [vpEnabled, setVpEnabled]                    = useState(false);
  const [rachatEnabled, setRachatEnabled]            = useState(false);
  const [rachatAmount, setRachatAmount]              = useState(200);
  const [rachatFreqMonths, setRachatFreqMonths]      = useState<number>(1);
  const [hoveredIdx, setHoveredIdx]                  = useState<number | null>(null);
  const [showTable, setShowTable]                    = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ─── Simulation (month by month) ─── */
  const results = useMemo(() => {
    const annualRate = interestRate / 100;
    const ratePerPeriod = Math.pow(1 + annualRate, interestFreqMonths / 12) - 1;
    const vpIntervalMonths = 12 / vpFreqPerYear;
    const totalMonths = years * 12;
    // Quand le toggle est désactivé, le montant VP est strictement nul
    // pour tout le recalcul. La valeur saisie reste conservée pour une
    // éventuelle réactivation, mais aucun cumul précédent ne persiste.
    const effectiveVp = vpEnabled ? vpAmount : 0;

    let balance        = initialCapital;
    let totalDeposited = initialCapital;
    let totalWithdrawn = 0;
    const yearlyData: YearlyData[] = [];

    for (let m = 1; m <= totalMonths; m++) {
      // VP deposit (démarre à partir de l'an 2)
      if (effectiveVp > 0 && m > 12 && m % vpIntervalMonths === 0) {
        balance        += effectiveVp;
        totalDeposited += effectiveVp;
      }
      // La première année sert de période de référence :
      // aucun VP ni intérêt n'est pris en compte avant l'an 2.
      if (m > 12 && m % interestFreqMonths === 0) {
        balance *= (1 + ratePerPeriod);
      }
      // Rachat (withdrawal)
      if (rachatEnabled && rachatAmount > 0 && m > 12 && m % rachatFreqMonths === 0) {
        const withdraw = Math.min(balance, rachatAmount);
        balance        -= withdraw;
        totalWithdrawn += withdraw;
      }

      if (m % 12 === 0) {
        const netTotal = Math.max(0, balance);
        yearlyData.push({
          year: m / 12,
          deposits: totalDeposited,
          interest: Math.max(0, netTotal - totalDeposited + totalWithdrawn),
          total: netTotal,
          totalWithdrawn,
        });
      }
    }

    const last = yearlyData[yearlyData.length - 1] ?? {
      year: years, deposits: initialCapital, interest: 0,
      total: initialCapital, totalWithdrawn: 0
    };

    return { yearlyData, last };
  }, [initialCapital, vpAmount, vpFreqPerYear, years, interestRate, interestFreqMonths, vpEnabled, rachatEnabled, rachatAmount, rachatFreqMonths]);

  const { yearlyData, last } = results;
  const multiplier = last.deposits > 0 ? last.total / last.deposits : 1;
  const effectiveVpAmount = vpEnabled ? vpAmount : 0;
  const annualVP   = effectiveVpAmount * vpFreqPerYear;
  const annualWithdrawal = rachatEnabled ? rachatAmount * (12 / rachatFreqMonths) : 0;

  /* ─── Download PNG ─── */
  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const dpr = 2, W = 700, H = 420;
    canvas.width = W * dpr; canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#0F1729"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#D4AF37"; ctx.font = "bold 20px Georgia, serif";
    ctx.fillText("Simulation — Intérêts Composés", 28, 40);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "12px Inter, sans-serif";
    const d = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
    ctx.fillText(`Constancium · ${d}`, 28, 60);
    ctx.strokeStyle = "#D4AF37"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(28, 72); ctx.lineTo(W - 28, 72); ctx.stroke();

    const params = [
      ["Capital initial", fmt(initialCapital)],
      ["VP / occurrence", vpEnabled ? fmt(vpAmount) : "Désactivé"],
      ["Fréquence VP", vpEnabled ? (VP_FREQS.find(f => f.value === vpFreqPerYear)?.label ?? "") : "—"],
      ["Durée", `${years} ans`],
      ["Taux annuel", `${interestRate} %`],
      ["Capitalisation", frequencyLabel(interestFreqMonths)],
      ...(rachatEnabled ? [["Rachat", `${fmt(rachatAmount)} / ${frequencyLabel(rachatFreqMonths)}`]] : []),
    ];

    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "11px Inter, sans-serif";
    const colW = (W - 56) / 3;
    params.forEach(([lbl, val], i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 28 + col * colW, y = 96 + row * 42;
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(x, y - 14, colW - 8, 34);
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px Inter, sans-serif";
      ctx.fillText(lbl, x + 8, y);
      ctx.fillStyle = "#fff"; ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillText(val, x + 8, y + 14);
    });

    ctx.strokeStyle = "#D4AF37"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(28, 196); ctx.lineTo(W - 28, 196); ctx.stroke();

    ctx.fillStyle = "rgba(212,175,55,0.12)";
    ctx.fillRect(28, 208, W - 56, 88);
    ctx.strokeStyle = "rgba(212,175,55,0.4)"; ctx.lineWidth = 1;
    ctx.strokeRect(28, 208, W - 56, 88);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center"; ctx.fillText("Capital final estimé", W / 2, 230);
    ctx.fillStyle = "#D4AF37"; ctx.font = "bold 32px Georgia, serif";
    ctx.fillText(fmt(last.total), W / 2, 268);
    if (multiplier > 1) {
      ctx.fillStyle = "rgba(212,175,55,0.7)"; ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`× ${multiplier.toFixed(1)} votre mise`, W / 2, 288);
    }
    ctx.textAlign = "left";

    const cards = [
      ["Total versé", fmt(last.deposits), "#fff"],
      ["Intérêts générés", `+${fmt(last.interest)}`, "#4ade80"],
      ...(rachatEnabled ? [["Total retiré", `-${fmt(last.totalWithdrawn)}`, "#f87171"]] : []),
    ];
    const cw = (W - 56 - (cards.length - 1) * 12) / cards.length;
    cards.forEach(([lbl, val, col], i) => {
      const x = 28 + i * (cw + 12);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(x, 316, cw, 60);
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px Inter, sans-serif";
      ctx.fillText(lbl, x + 10, 336);
      ctx.fillStyle = col; ctx.font = "bold 14px Georgia, serif";
      ctx.fillText(val, x + 10, 358);
    });

    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Simulation indicative. Les performances passées ne préjugent pas des performances futures.", W / 2, 400);

    const link = document.createElement("a");
    link.download = "simulation-interets-composes-constancium.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  /* ─── Export CSV ─── */
  const handleExportCSV = () => {
    const header = ["Année", "VP cumulés (€)", "Capital versé (€)", "Rachats cumulés (€)", "Intérêts cumulés (€)", "Capital net (€)"];
    const rows = yearlyData.map(d => [d.year, Math.round(d.deposits - initialCapital), Math.round(d.deposits), Math.round(d.totalWithdrawn), Math.round(d.interest), Math.round(d.total)]);
    const csv = [header, ...rows].map(r => r.join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.download = "amortissement-interets-composes-constancium.csv";
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  /* ─── Render ─── */
  return (
    <div className="w-full" ref={resultsRef}>
      <div className="grid lg:grid-cols-2 gap-6">

        {/* ── Paramètres ── */}
        <div className="rounded-2xl border border-gray-100 bg-[#FAFAF9] p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-[#0F1729] rounded-xl">
              <Calculator className="h-4.5 w-4.5 text-white" style={{ width: "1.1rem", height: "1.1rem" }} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#0F1729]">Paramètres</h3>
          </div>

          {/* Capital initial */}
          <Row icon={<PiggyBank className="h-4 w-4 text-[#0F1729]/50" />} label="Capital initial">
            <NumInput value={initialCapital} onChange={setInitialCapital} suffix="€" testId="input-initial-capital" />
          </Row>

          {/* ── Versement programmé ── */}
          <div className={`rounded-xl border transition-all ${vpEnabled ? "border-[#0F1729]/20 bg-[#0F1729]/5" : "border-dashed border-gray-200 bg-white"}`}>
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#0F1729]"
              onClick={() => setVpEnabled(v => !v)}
              data-testid="toggle-vp"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#0F1729]/60" />
                Versement programmé
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                vpEnabled ? "bg-[#0F1729] text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {vpEnabled ? "Activé" : "Désactivé"}
              </span>
            </button>

            {vpEnabled && (
              <div className="px-4 pb-4 space-y-3 border-t border-[#0F1729]/10 pt-3">
                <Row icon={null} label="Montant par occurrence">
                  <NumInput value={vpAmount} onChange={setVpAmount} suffix="€" testId="input-monthly-vp" />
                </Row>
                <Block icon={null} label="Fréquence du versement programmé">
                  <SegBtn options={VP_FREQS} value={vpFreqPerYear as any} onChange={setVpFreqPerYear as any} />
                  {annualVP > 0 && (
                    <p className="text-xs text-gray-400 mt-1.5">
                      Soit <span className="text-[#0F1729] font-semibold">{fmt(annualVP)}</span> versés / an
                    </p>
                  )}
                </Block>
              </div>
            )}
          </div>

          {/* Durée */}
          <Row icon={<Clock className="h-4 w-4 text-[#0F1729]/50" />} label="Durée">
            <NumInput value={years} onChange={v => setYears(Math.max(1, v))} suffix="ans" testId="input-years" />
          </Row>

          {/* Taux */}
          <Row icon={<Percent className="h-4 w-4 text-[#0F1729]/50" />} label="Taux annuel">
            <NumInput value={interestRate} onChange={setInterestRate} suffix="%" step="0.1" testId="input-interest-rate" />
          </Row>

          {/* Capitalisation */}
          <Block icon={<Calendar className="h-4 w-4 text-[#0F1729]/50" />} label="Versement des intérêts">
            <SegBtn options={INTEREST_FREQS} value={interestFreqMonths as any} onChange={setInterestFreqMonths as any} />
          </Block>

          {/* ── Rachat ── */}
          <div className={`rounded-xl border transition-all ${rachatEnabled ? "border-[#D4AF37]/40 bg-[#D4AF37]/5" : "border-dashed border-gray-200 bg-white"}`}>
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#0F1729]"
              onClick={() => setRachatEnabled(v => !v)}
              data-testid="toggle-rachat"
            >
              <span className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-[#D4AF37]" />
                Rachat programmé
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                rachatEnabled ? "bg-[#D4AF37] text-[#0F1729]" : "bg-gray-100 text-gray-400"
              }`}>
                {rachatEnabled ? "Activé" : "Désactivé"}
              </span>
            </button>

            {rachatEnabled && (
              <div className="px-4 pb-4 space-y-3 border-t border-[#D4AF37]/20 pt-3">
                <Row icon={null} label="Montant du rachat">
                  <NumInput value={rachatAmount} onChange={setRachatAmount} suffix="€" testId="input-rachat-amount" />
                </Row>
                <Block icon={null} label="Fréquence des rachats">
                  <SegBtn options={RACHAT_FREQS} value={rachatFreqMonths as any} onChange={setRachatFreqMonths as any} />
                  {annualWithdrawal > 0 && (
                    <p className="text-xs text-gray-400 mt-1.5">
                      Soit <span className="text-[#D4AF37] font-semibold">{fmt(annualWithdrawal)}</span> retirés / an
                    </p>
                  )}
                </Block>
              </div>
            )}
          </div>
        </div>

        {/* ── Résultats ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#0F1729] rounded-xl">
                <TrendingUp className="h-4.5 w-4.5 text-white" style={{ width: "1.1rem", height: "1.1rem" }} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F1729]">Résultats</h3>
            </div>
            <Button
              size="sm"
              onClick={handleDownload}
              className="bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold text-xs h-8 gap-1.5 shadow-sm"
              data-testid="button-download-result"
            >
              <Download className="h-3.5 w-3.5" />
              Télécharger
            </Button>
          </div>

          {/* Capital final */}
          <div className="rounded-xl bg-gradient-to-br from-[#0F1729] to-[#1e3a5f] p-5 text-center">
            <p className="text-white/50 text-xs tracking-wider uppercase mb-1">Capital final estimé</p>
            <p className="font-serif text-4xl font-bold text-white" data-testid="text-final-capital">
              {fmt(last.total)}
            </p>
            {multiplier > 1 && (
              <span className="inline-block mt-2 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/15 px-3 py-0.5 rounded-full">
                × {multiplier.toFixed(1)} votre mise
              </span>
            )}
          </div>

          {/* Stat cards */}
          <div className={`grid gap-3 ${rachatEnabled ? "grid-cols-3" : "grid-cols-2"}`}>
            <StatCard label="Total versé"        value={fmt(last.deposits)}                 color="navy" testId="text-total-deposits" />
            <StatCard label="Intérêts générés"   value={`+${fmt(last.interest)}`}           color="green" testId="text-total-interest" />
            {rachatEnabled && (
              <StatCard label="Total retiré"     value={`-${fmt(last.totalWithdrawn)}`}     color="amber" />
            )}
          </div>

          {/* Chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#0F1729]/50 uppercase tracking-wider">Évolution du capital</p>
              <div className="flex items-center gap-3">
                <LegendDot color="#0F1729" label="Capital versé" dashed />
                <LegendDot color="#D4AF37" label="Intérêts" />
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 overflow-hidden bg-[#FAFAF9]">
              <AreaChart data={yearlyData} hoveredIdx={hoveredIdx} onHover={setHoveredIdx} />
            </div>

            {/* Hover tooltip (shown below chart) */}
            {hoveredIdx !== null && yearlyData[hoveredIdx] && (
              <div className="mt-2 flex items-center gap-4 px-3 py-2 rounded-lg bg-[#0F1729] text-white text-xs animate-in fade-in">
                <span className="text-[#D4AF37] font-semibold">An {yearlyData[hoveredIdx].year}</span>
                <span className="text-white/60">Capital&nbsp;<span className="text-white font-semibold">{fmt(yearlyData[hoveredIdx].total)}</span></span>
                <span className="text-white/60">Versé&nbsp;<span className="text-white font-semibold">{fmt(yearlyData[hoveredIdx].deposits)}</span></span>
                <span className="text-white/60">Intérêts&nbsp;<span className="text-[#D4AF37] font-semibold">+{fmt(yearlyData[hoveredIdx].interest)}</span></span>
                {rachatEnabled && <span className="text-white/60">Rachats&nbsp;<span className="text-red-300 font-semibold">-{fmt(yearlyData[hoveredIdx].totalWithdrawn)}</span></span>}
              </div>
            )}
            {hoveredIdx === null && (
              <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Survolez le graphique pour voir le détail annuel
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Tableau d'amortissement ── */}
      <div className="mt-6 rounded-2xl border border-gray-100 overflow-hidden bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#D4AF37]/10 rounded-lg">
              <TableIcon className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-[#0F1729] text-sm">Tableau d'amortissement</h4>
              <p className="text-[10px] text-gray-400">Progression année par année</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleExportCSV}
              className="bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold text-xs h-7 px-3 gap-1"
              data-testid="button-export-csv">
              <Download className="h-3 w-3" />Exporter CSV
            </Button>
            <button onClick={() => setShowTable(v => !v)}
              className="flex items-center gap-1 text-[#0F1729]/50 hover:text-[#0F1729] text-xs font-medium border border-gray-200 rounded-lg px-2.5 py-1.5 transition-colors"
              data-testid="button-toggle-table">
              {showTable ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {showTable ? "Réduire" : "Afficher"}
            </button>
          </div>
        </div>

        {showTable && (
          <div className="overflow-x-auto max-h-72 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-[#0F1729]">Année</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-[#0F1729]">Capital versé</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-emerald-700">Intérêts cumulés</th>
                  {rachatEnabled && <th className="text-right px-4 py-2.5 font-semibold text-amber-600">Rachats cumulés</th>}
                  <th className="text-right px-4 py-2.5 font-semibold text-[#0F1729]">Capital net</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((d, i) => (
                  <tr key={d.year}
                    className={`border-b border-gray-50 hover:bg-[#D4AF37]/5 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                    data-testid={`row-amortization-${d.year}`}>
                    <td className="px-4 py-2 font-semibold text-[#0F1729]">An {d.year}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(d.deposits)}</td>
                    <td className="px-4 py-2 text-right text-emerald-600 font-medium">+{fmt(d.interest)}</td>
                    {rachatEnabled && <td className="px-4 py-2 text-right text-amber-600 font-medium">-{fmt(d.totalWithdrawn)}</td>}
                    <td className="px-4 py-2 text-right font-bold text-[#0F1729]">{fmt(d.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-gray-400 text-center" data-testid="text-disclaimer">
        Simulation indicative. Capitalisation {frequencyLabel(interestFreqMonths)}. Les performances passées ne préjugent pas des performances futures.
      </p>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────── */
function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 px-3 py-2.5">
      <span className="flex items-center gap-2 text-sm font-medium text-[#0F1729]/70">
        {icon}
        {label}
      </span>
      {children}
    </div>
  );
}

function Block({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-3 py-2.5">
      <span className="flex items-center gap-2 text-sm font-medium text-[#0F1729]/70 mb-2">
        {icon}
        {label}
      </span>
      {children}
    </div>
  );
}

function NumInput({ value, onChange, suffix, step, testId }: {
  value: number; onChange: (v: number) => void; suffix: string; step?: string; testId?: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        value={value}
        onChange={e => onChange(Math.max(0, Number(e.target.value)))}
        step={step}
        className="w-24 text-right bg-gray-50 border border-gray-200 rounded-lg text-[#0F1729] font-semibold text-sm h-8 px-2 focus:outline-none focus:border-[#D4AF37]"
        data-testid={testId}
      />
      <span className="text-gray-400 text-sm">{suffix}</span>
    </div>
  );
}

function StatCard({ label, value, color, testId }: { label: string; value: string; color: "navy"|"green"|"amber"; testId?: string }) {
  const colors = {
    navy:  "bg-[#0F1729]/5  border-[#0F1729]/10 text-[#0F1729]",
    green: "bg-emerald-50   border-emerald-100   text-emerald-700",
    amber: "bg-amber-50     border-amber-100     text-amber-600",
  };
  return (
    <div className={`rounded-xl border p-3 text-center ${colors[color]}`}>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className={`font-serif text-base font-semibold ${colors[color].split(" ")[2]}`} data-testid={testId}>
        {value}
      </p>
    </div>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-gray-400">
      <span className="inline-flex items-center" style={{ width: 16 }}>
        {dashed
          ? <svg width="16" height="2"><line x1="0" y1="1" x2="16" y2="1" stroke={color} strokeWidth="2" strokeDasharray="3 2"/></svg>
          : <svg width="16" height="2"><line x1="0" y1="1" x2="16" y2="1" stroke={color} strokeWidth="2"/></svg>
        }
      </span>
      {label}
    </span>
  );
}
