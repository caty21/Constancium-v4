import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, PiggyBank, Percent, Clock, Info } from "lucide-react";

interface YearlyData {
  year: number;
  deposits: number;
  interest: number;
  total: number;
}

export default function CompoundInterestCalculator() {
  const [initialCapital, setInitialCapital] = useState(10000);
  const [annualDeposit, setAnnualDeposit] = useState(0);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(7);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const results = useMemo(() => {
    const rate = interestRate / 100;
    const yearlyData: YearlyData[] = [];
    
    for (let year = 1; year <= years; year++) {
      const totalDeposits = initialCapital + annualDeposit * year;
      
      let balance: number;
      if (rate === 0) {
        // No interest: just sum up deposits
        balance = totalDeposits;
      } else if (annualDeposit === 0) {
        balance = initialCapital * Math.pow(1 + rate, year);
      } else {
        const principalGrowth = initialCapital * Math.pow(1 + rate, year);
        const annuityGrowth = annualDeposit * ((Math.pow(1 + rate, year) - 1) / rate);
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
  }, [initialCapital, annualDeposit, years, interestRate]);

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

  return (
    <div className="w-full">
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

            {/* Annual Deposit */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4 text-[#1e3a5f]" />
                Versement annuel
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={annualDeposit}
                  onChange={(e) => setAnnualDeposit(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-annual-deposit"
                />
                <span className="text-gray-500 text-sm">€</span>
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
          </div>
        </div>

        {/* Results Section */}
        <div className="p-5 rounded-lg bg-white border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-[#1e3a5f] rounded-md">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1e3a5f]">Résultats</h3>
          </div>

          {/* Main Result */}
          <div className="text-center mb-4 p-4 bg-gradient-to-br from-[#1e3a5f]/5 to-[#1e3a5f]/10 rounded-lg border border-[#1e3a5f]/20">
            <p className="text-xs text-gray-500 mb-1">Capital final estimé</p>
            <p className="font-serif text-3xl font-bold text-[#1e3a5f]" data-testid="text-final-capital">
              {formatCurrency(results.finalCapital)}
            </p>
            {multiplier > 1 && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#D4AF37]/20 rounded-full">
                <span className="text-xs font-medium text-[#1e3a5f]">x{multiplier.toFixed(1)} votre mise</span>
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
          Simulation indicative basée sur une capitalisation annuelle. Les performances passées ne préjugent pas des performances futures.
        </p>
      </div>
    </div>
  );
}
