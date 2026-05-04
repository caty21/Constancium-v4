import { useState, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, PiggyBank, Percent, Clock, Info, Download, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface YearlyData {
  year: number;
  deposits: number;
  interest: number;
  total: number;
}

export default function CompoundInterestCalculator() {
  const [initialCapital, setInitialCapital] = useState(10000);
  const [monthlyVP, setMonthlyVP] = useState(0);
  const [vpRecurrencesPerYear, setVpRecurrencesPerYear] = useState(12);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(7);
  const [interestFrequencyMonths, setInterestFrequencyMonths] = useState(12);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const annualRate = interestRate / 100;
    const n = 12 / interestFrequencyMonths;
    const r_n = annualRate / n;
    const annualVP = monthlyVP * vpRecurrencesPerYear;
    const depositPerPeriod = annualVP / n;

    const yearlyData: YearlyData[] = [];

    for (let year = 1; year <= years; year++) {
      const periods = n * year;
      const totalDeposits = initialCapital + annualVP * year;

      let balance: number;
      if (annualRate === 0) {
        balance = totalDeposits;
      } else if (depositPerPeriod === 0) {
        balance = initialCapital * Math.pow(1 + r_n, periods);
      } else {
        const principalGrowth = initialCapital * Math.pow(1 + r_n, periods);
        const annuityGrowth = depositPerPeriod * ((Math.pow(1 + r_n, periods) - 1) / r_n);
        balance = principalGrowth + annuityGrowth;
      }

      yearlyData.push({
        year,
        deposits: totalDeposits,
        interest: balance - totalDeposits,
        total: balance
      });
    }

    const finalData = yearlyData[yearlyData.length - 1];

    return {
      finalCapital: finalData?.total || initialCapital,
      totalDeposits: finalData?.deposits || initialCapital,
      totalInterest: finalData?.interest || 0,
      yearlyData
    };
  }, [initialCapital, monthlyVP, vpRecurrencesPerYear, years, interestRate, interestFrequencyMonths]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(Math.round(value));
  };

  const maxChartValue = results.yearlyData.length > 0
    ? results.yearlyData[results.yearlyData.length - 1].total
    : 0;

  const getXAxisLabels = () => {
    const labels: { year: number; position: number }[] = [];
    if (years <= 10) {
      for (let i = 1; i <= years; i++) {
        labels.push({ year: i, position: ((i - 1) / (years - 1)) * 100 });
      }
    } else if (years <= 20) {
      for (let i = 0; i <= years; i += 5) {
        if (i === 0) continue;
        labels.push({ year: i, position: ((i - 1) / (years - 1)) * 100 });
      }
      if (years % 5 !== 0) {
        labels.push({ year: years, position: 100 });
      }
    } else {
      for (let i = 0; i <= years; i += 10) {
        if (i === 0) continue;
        labels.push({ year: i, position: ((i - 1) / (years - 1)) * 100 });
      }
      if (years % 10 !== 0) {
        labels.push({ year: years, position: 100 });
      }
    }
    return labels;
  };

  const multiplier = results.totalDeposits > 0 ? results.finalCapital / results.totalDeposits : 1;

  const frequencyLabel = (months: number) => {
    if (months === 1) return "mensuelle";
    if (months === 3) return "trimestrielle";
    if (months === 6) return "semestrielle";
    if (months === 12) return "annuelle";
    return `tous les ${months} mois`;
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const dpr = 2;
    const W = 700;
    const H = 520;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const gold = "#D4AF37";
    const navy = "#0F1729";
    const navy2 = "#1e3a5f";
    const green = "#16a34a";
    const white = "#ffffff";
    const muted = "rgba(255,255,255,0.6)";

    ctx.fillStyle = navy;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fillRect(0, 0, W, 90);

    ctx.fillStyle = gold;
    ctx.font = "bold 22px Georgia, serif";
    ctx.fillText("Simulation — Intérêts Composés", 28, 38);

    ctx.fillStyle = muted;
    ctx.font = "13px Inter, sans-serif";
    const date = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
    ctx.fillText(`Constancium  ·  ${date}`, 28, 60);

    ctx.strokeStyle = gold;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(28, 80);
    ctx.lineTo(W - 28, 80);
    ctx.stroke();

    ctx.fillStyle = white;
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText("PARAMÈTRES", 28, 108);

    const params = [
      ["Capital initial", formatCurrency(initialCapital)],
      ["VP mensuelle", formatCurrency(monthlyVP)],
      ["Récurrences VP / an", `${vpRecurrencesPerYear}x`],
      ["Durée", `${years} ans`],
      ["Taux annuel", `${interestRate} %`],
      ["Capitalisation", frequencyLabel(interestFrequencyMonths)],
    ];

    ctx.font = "13px Inter, sans-serif";
    const colW = (W - 56) / 3;
    params.forEach(([label, val], i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 28 + col * colW;
      const y = 132 + row * 44;

      ctx.fillStyle = "rgba(255,255,255,0.05)";
      roundRect(ctx, x, y - 18, colW - 8, 36, 6);
      ctx.fill();

      ctx.fillStyle = muted;
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText(label, x + 10, y - 2);
      ctx.fillStyle = white;
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.fillText(val, x + 10, y + 14);
    });

    ctx.fillStyle = white;
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText("RÉSULTATS", 28, 240);

    ctx.strokeStyle = gold;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(28, 250);
    ctx.lineTo(W - 28, 250);
    ctx.stroke();

    ctx.fillStyle = "rgba(212,175,55,0.12)";
    roundRect(ctx, 28, 264, W - 56, 100, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(212,175,55,0.4)";
    ctx.lineWidth = 1;
    roundRect(ctx, 28, 264, W - 56, 100, 10);
    ctx.stroke();

    ctx.fillStyle = muted;
    ctx.font = "13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Capital final estimé", W / 2, 289);
    ctx.fillStyle = gold;
    ctx.font = "bold 36px Georgia, serif";
    ctx.fillText(formatCurrency(results.finalCapital), W / 2, 328);
    if (multiplier > 1) {
      ctx.fillStyle = "rgba(212,175,55,0.8)";
      ctx.font = "13px Inter, sans-serif";
      ctx.fillText(`× ${multiplier.toFixed(1)} votre mise`, W / 2, 350);
    }

    ctx.textAlign = "left";
    const cardW = (W - 56 - 16) / 2;

    ctx.fillStyle = "rgba(255,255,255,0.05)";
    roundRect(ctx, 28, 384, cardW, 64, 8);
    ctx.fill();
    ctx.fillStyle = muted;
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText("Total versé", 38, 404);
    ctx.fillStyle = white;
    ctx.font = "bold 15px Georgia, serif";
    ctx.fillText(formatCurrency(results.totalDeposits), 38, 428);

    ctx.fillStyle = "rgba(22,163,74,0.12)";
    roundRect(ctx, 28 + cardW + 16, 384, cardW, 64, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(22,163,74,0.3)";
    ctx.lineWidth = 1;
    roundRect(ctx, 28 + cardW + 16, 384, cardW, 64, 8);
    ctx.stroke();
    ctx.fillStyle = muted;
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText("Intérêts générés", 28 + cardW + 26, 404);
    ctx.fillStyle = green;
    ctx.font = "bold 15px Georgia, serif";
    ctx.fillText(`+${formatCurrency(results.totalInterest)}`, 28 + cardW + 26, 428);

    ctx.fillStyle = muted;
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "Simulation indicative. Capitalisation " + frequencyLabel(interestFrequencyMonths) + ". Les performances passées ne préjugent pas des performances futures.",
      W / 2,
      498
    );

    const link = document.createElement("a");
    link.download = `simulation-interets-composes-constancium.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  return (
    <div className="w-full" ref={resultsRef}>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs Section */}
        <div className="p-5 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-[#1e3a5f] rounded-md">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1e3a5f]">Paramètres</h3>
          </div>

          <div className="space-y-3">
            {/* Initial Capital */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <PiggyBank className="h-4 w-4 text-[#1e3a5f]" />
                Capital initial
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-initial-capital"
                />
                <span className="text-gray-500 text-sm">€</span>
              </div>
            </div>

            {/* Monthly VP */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4 text-[#1e3a5f]" />
                VP mensuelle
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={monthlyVP}
                  onChange={(e) => setMonthlyVP(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-monthly-vp"
                />
                <span className="text-gray-500 text-sm">€</span>
              </div>
            </div>

            {/* VP Recurrences per year */}
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between gap-3 mb-2">
                <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                  <RefreshCw className="h-4 w-4 text-[#1e3a5f]" />
                  Récurrences VP / an
                </Label>
                <span className="text-[#1e3a5f] font-bold text-sm bg-[#1e3a5f]/10 px-2 py-0.5 rounded">
                  {vpRecurrencesPerYear}x
                </span>
              </div>
              <Slider
                min={1}
                max={12}
                step={1}
                value={[vpRecurrencesPerYear]}
                onValueChange={(val) => setVpRecurrencesPerYear(val[0])}
                className="w-full"
                data-testid="slider-vp-recurrences"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">1× (annuel)</span>
                <span className="text-xs text-gray-400">12× (mensuel)</span>
              </div>
            </div>

            {/* Investment Horizon */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-[#1e3a5f]" />
                Durée
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-years"
                />
                <span className="text-gray-500 text-sm">ans</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Percent className="h-4 w-4 text-[#1e3a5f]" />
                Taux annuel
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  step="0.1"
                  data-testid="input-interest-rate"
                />
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>

            {/* Interest Frequency Slider */}
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between gap-3 mb-2">
                <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-[#1e3a5f]" />
                  Versement des intérêts
                </Label>
                <span className="text-[#1e3a5f] font-bold text-sm bg-[#1e3a5f]/10 px-2 py-0.5 rounded capitalize">
                  {frequencyLabel(interestFrequencyMonths)}
                </span>
              </div>
              <Slider
                min={1}
                max={12}
                step={1}
                value={[interestFrequencyMonths]}
                onValueChange={(val) => setInterestFrequencyMonths(val[0])}
                className="w-full"
                data-testid="slider-interest-frequency"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">1 mois</span>
                <span className="text-xs text-gray-400">12 mois</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-5 rounded-lg bg-white border border-gray-200">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#1e3a5f] rounded-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1e3a5f]">Résultats</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-1.5 border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 text-xs h-8"
              data-testid="button-download-result"
            >
              <Download className="h-3.5 w-3.5" />
              Télécharger
            </Button>
          </div>

          {/* Main Result */}
          <div className="text-center mb-4 p-4 bg-gradient-to-br from-[#1e3a5f]/5 to-[#1e3a5f]/10 rounded-lg border border-[#1e3a5f]/20">
            <p className="text-xs text-gray-500 mb-1">Capital final estimé</p>
            <p className="font-serif text-3xl font-bold text-[#1e3a5f]" data-testid="text-final-capital">
              {formatCurrency(results.finalCapital)}
            </p>
            {multiplier > 1 && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#D4AF37]/20 rounded-full">
                <span className="text-xs font-medium text-[#1e3a5f]">×{multiplier.toFixed(1)} votre mise</span>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-0.5">Total versé</p>
              <p className="font-serif text-lg font-semibold text-[#1e3a5f]" data-testid="text-total-deposits">
                {formatCurrency(results.totalDeposits)}
              </p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-gray-500 mb-0.5">Intérêts gagnés</p>
              <p className="font-serif text-lg font-semibold text-green-600" data-testid="text-total-interest">
                +{formatCurrency(results.totalInterest)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-3 relative">
            <p className="text-xs text-gray-500 mb-2 font-medium">Évolution du capital</p>
            <div className="h-28 flex items-end gap-[2px] bg-gradient-to-t from-gray-100 to-gray-50 rounded p-2 relative border border-gray-200">
              {results.yearlyData.map((data, index) => {
                const totalHeight = maxChartValue > 0 ? (data.total / maxChartValue) * 100 : 0;
                const depositRatio = data.total > 0 ? data.deposits / data.total : 1;
                const interestRatio = data.total > 0 ? data.interest / data.total : 0;
                const isHovered = hoveredBar === index;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col justify-end relative cursor-pointer"
                    style={{ height: '100%' }}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                        <div className="bg-white border border-[#1e3a5f]/20 rounded-lg shadow-xl px-3 py-2 min-w-[120px]">
                          <p className="text-xs text-[#D4AF37] font-semibold mb-0.5">Année {data.year}</p>
                          <p className="font-serif text-sm font-bold text-[#1e3a5f]">{formatCurrency(data.total)}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs">
                            <span className="text-gray-500">Capital:</span>
                            <span className="text-[#1e3a5f] font-medium">{formatCurrency(data.deposits)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-gray-500">Intérêts:</span>
                            <span className="text-green-600 font-medium">{formatCurrency(data.interest)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className={`w-full flex flex-col transition-all duration-150 ${isHovered ? 'opacity-100 scale-105' : 'opacity-90'}`}
                      style={{ height: `${totalHeight}%`, minHeight: totalHeight > 0 ? '2px' : '0' }}
                    >
                      <div
                        className="w-full bg-green-500 rounded-t-sm"
                        style={{ flex: interestRatio }}
                      />
                      <div
                        className="w-full bg-[#1e3a5f]"
                        style={{ flex: depositRatio }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative h-5 mt-1">
              {getXAxisLabels().map((label, idx) => (
                <span
                  key={idx}
                  className="absolute text-xs text-gray-500 -translate-x-1/2"
                  style={{ left: `${label.position}%` }}
                >
                  {label.year}a
                </span>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#1e3a5f] rounded-sm" />
              <span>Capital</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-sm" />
              <span>Intérêts</span>
            </div>
          </div>

          {/* Info note */}
          <div className="mt-3 p-2 bg-gray-50 rounded-lg flex items-start gap-2 border border-gray-200">
            <Info className="h-3.5 w-3.5 text-[#1e3a5f] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              Survolez les barres pour le détail année par année
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 text-center" data-testid="text-disclaimer">
          Simulation indicative basée sur une capitalisation {frequencyLabel(interestFrequencyMonths)}. Les performances passées ne préjugent pas des performances futures.
        </p>
      </div>
    </div>
  );
}
