import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Wallet, Euro, Clock, Percent, TrendingUp, PiggyBank, Calendar } from "lucide-react";

export default function LeverageCalculator() {
  const [creditAmount, setCreditAmount] = useState(200000);
  const [monthlyRent, setMonthlyRent] = useState(800);
  const [monthlyPayment, setMonthlyPayment] = useState(1100);
  const [loanDuration, setLoanDuration] = useState(20);
  const [resaleYear, setResaleYear] = useState(15);
  const [appreciationRate, setAppreciationRate] = useState(1);
  const [interestRate, setInterestRate] = useState(3.5);

  const monthlySavingsEffort = monthlyPayment - monthlyRent;
  const cumulativeSavingsEffort = monthlySavingsEffort * resaleYear * 12;
  const averageMonthlySavingsEffort = monthlySavingsEffort;

  const propertyValueAtResale = creditAmount * Math.pow(1 + appreciationRate / 100, resaleYear);

  const monthlyRate = interestRate / 100 / 12;
  const paymentsAtResale = resaleYear * 12;
  
  // Calculate remaining balance using user-provided monthly payment
  let remainingLoanBalance: number;
  if (monthlyRate === 0) {
    // Zero interest: simple linear paydown
    remainingLoanBalance = creditAmount - (monthlyPayment * paymentsAtResale);
  } else {
    // Standard amortization formula using user's monthly payment:
    // Balance(n) = P*(1+r)^n - M*((1+r)^n - 1)/r
    const compoundFactor = Math.pow(1 + monthlyRate, paymentsAtResale);
    remainingLoanBalance = creditAmount * compoundFactor 
      - monthlyPayment * (compoundFactor - 1) / monthlyRate;
  }
  remainingLoanBalance = Math.max(0, remainingLoanBalance);

  const netGain = propertyValueAtResale - remainingLoanBalance - cumulativeSavingsEffort;

  const calculateIRR = () => {
    const cashFlows: number[] = [];
    
    for (let month = 0; month < paymentsAtResale; month++) {
      cashFlows.push(-monthlySavingsEffort);
    }
    
    const finalCashFlow = propertyValueAtResale - remainingLoanBalance;
    cashFlows[cashFlows.length - 1] += finalCashFlow;

    let irr = 0.05;
    const maxIterations = 100;
    const tolerance = 0.0001;

    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let npvDerivative = 0;
      
      for (let t = 0; t < cashFlows.length; t++) {
        const discountFactor = Math.pow(1 + irr / 12, t + 1);
        npv += cashFlows[t] / discountFactor;
        npvDerivative -= (t + 1) * cashFlows[t] / (12 * Math.pow(1 + irr / 12, t + 2));
      }

      if (Math.abs(npv) < tolerance || Math.abs(npvDerivative) < tolerance) {
        break;
      }

      irr = irr - npv / npvDerivative;
      
      if (irr < -0.99) irr = -0.99;
      if (irr > 10) irr = 10;
    }

    return irr * 100;
  };

  const irrAnnualized = calculateIRR();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(Math.round(value));
  };

  const formatPercent = (value: number) => {
    if (!isFinite(value) || isNaN(value)) return "N/A";
    return new Intl.NumberFormat('fr-FR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="p-5 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-[#1e3a5f] rounded-md">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1e3a5f]">Parametres</h3>
          </div>

          <div className="space-y-3">
            {/* Credit Amount */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Euro className="h-4 w-4 text-[#1e3a5f]" />
                Montant du credit
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(Math.max(0, Number(e.target.value)))}
                  className="w-32 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-credit-amount"
                />
                <span className="text-gray-500 text-sm">EUR</span>
              </div>
            </div>

            {/* Monthly Rent */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Building2 className="h-4 w-4 text-[#1e3a5f]" />
                Loyer mensuel percu
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-monthly-rent"
                />
                <span className="text-gray-500 text-sm">EUR</span>
              </div>
            </div>

            {/* Monthly Payment */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <PiggyBank className="h-4 w-4 text-[#1e3a5f]" />
                Mensualites du pret
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-monthly-payment"
                />
                <span className="text-gray-500 text-sm">EUR</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Percent className="h-4 w-4 text-[#1e3a5f]" />
                Taux d'interet
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  step="0.1"
                  data-testid="input-interest-rate-leverage"
                />
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>

            {/* Loan Duration */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-[#1e3a5f]" />
                Duree du pret
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-loan-duration-leverage"
                />
                <span className="text-gray-500 text-sm">ans</span>
              </div>
            </div>

            {/* Resale Year */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4 text-[#1e3a5f]" />
                Revente apres
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={resaleYear}
                  onChange={(e) => setResaleYear(Math.max(1, Math.min(Number(e.target.value), loanDuration)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-resale-year"
                />
                <span className="text-gray-500 text-sm">ans</span>
              </div>
            </div>

            {/* Appreciation Rate */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4 text-[#1e3a5f]" />
                Plus-value annuelle
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(Number(e.target.value))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  step="0.5"
                  data-testid="input-appreciation-rate"
                />
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="p-5 rounded-lg bg-white border border-gray-200 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-[#1e3a5f] rounded-md">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1e3a5f]">Resultats</h3>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            {/* Savings Effort */}
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-700 mb-1">Effort d'epargne mensuel</p>
              <p className="font-serif text-2xl font-bold text-amber-800" data-testid="text-monthly-savings-effort">
                {formatCurrency(averageMonthlySavingsEffort)}
                <span className="text-sm font-normal text-amber-600">/mois</span>
              </p>
              <p className="text-xs text-amber-600 mt-1">
                = Mensualites ({formatCurrency(monthlyPayment)}) - Loyer ({formatCurrency(monthlyRent)})
              </p>
            </div>

            {/* Property Value at Resale */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Valeur du bien a {resaleYear} ans</p>
                <p className="font-semibold text-[#1e3a5f]" data-testid="text-property-value">
                  {formatCurrency(propertyValueAtResale)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Capital restant du</p>
                <p className="font-semibold text-[#1e3a5f]" data-testid="text-remaining-balance">
                  {formatCurrency(remainingLoanBalance)}
                </p>
              </div>
            </div>

            {/* Cumulative Savings */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Effort d'epargne cumule sur {resaleYear} ans</p>
              <p className="font-semibold text-[#1e3a5f]" data-testid="text-cumulative-savings">
                {formatCurrency(cumulativeSavingsEffort)}
              </p>
            </div>

            {/* Net Gain - Main Result */}
            <div className="text-center p-5 bg-gradient-to-br from-[#1e3a5f]/5 to-[#1e3a5f]/10 rounded-lg border border-[#1e3a5f]/20">
              <p className="text-xs text-gray-500 mb-2">Gain net a la revente</p>
              <p className={`font-serif text-3xl font-bold ${netGain >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="text-net-gain">
                {formatCurrency(netGain)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                = Valeur bien - Capital restant - Effort cumule
              </p>
            </div>

            {/* IRR */}
            <div className="p-4 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/20 rounded-lg border border-[#D4AF37]/30">
              <p className="text-xs text-[#1e3a5f]/70 mb-1">Taux de Rendement Interne (TRI) brut</p>
              <p className={`font-serif text-2xl font-bold ${irrAnnualized >= 0 ? 'text-[#D4AF37]' : 'text-red-600'}`} data-testid="text-irr">
                {formatPercent(irrAnnualized)}
              </p>
              <p className="text-xs text-[#1e3a5f]/60 mt-1">
                Rendement annualise de votre investissement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 text-center" data-testid="text-leverage-disclaimer">
          Simulation indicative. Le TRI brut ne tient pas compte des frais de notaire, taxes foncieres, charges de copropriete, travaux, vacance locative et fiscalite. Consultez un conseiller pour une analyse personnalisee.
        </p>
      </div>
    </div>
  );
}
