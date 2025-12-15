import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Wallet, Euro, Clock, Percent, CheckCircle, Shield } from "lucide-react";

export default function MortgageCalculator() {
  const [netMonthlySalary, setNetMonthlySalary] = useState(3000);
  const [loanDuration, setLoanDuration] = useState(20);
  const [interestRate, setInterestRate] = useState(3.45);
  const [insuranceRate, setInsuranceRate] = useState(0.34);

  const maxDebtRatio = 0.35;
  
  const maxMonthlyPayment = netMonthlySalary * maxDebtRatio;
  
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanDuration * 12;
  
  const monthlyInsurancePerEuro = (insuranceRate / 100) / 12;
  
  let maxLoanAmount: number;
  if (monthlyRate === 0) {
    maxLoanAmount = maxMonthlyPayment * numberOfPayments;
  } else {
    const loanPaymentFactor = (1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate;
    const insuranceFactor = monthlyInsurancePerEuro;
    maxLoanAmount = maxMonthlyPayment / (1/loanPaymentFactor + insuranceFactor);
  }

  const monthlyLoanPayment = monthlyRate === 0 
    ? maxLoanAmount / numberOfPayments 
    : maxLoanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  const monthlyInsurance = maxLoanAmount * monthlyInsurancePerEuro;
  const totalMonthlyPayment = monthlyLoanPayment + monthlyInsurance;
  
  const totalCost = (totalMonthlyPayment * numberOfPayments) - maxLoanAmount;
  const totalInterest = (monthlyLoanPayment * numberOfPayments) - maxLoanAmount;
  const totalInsurance = monthlyInsurance * numberOfPayments;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(Math.round(value));
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
            <h3 className="font-serif text-xl font-bold text-[#1e3a5f]">Paramètres</h3>
          </div>

          <div className="space-y-3">
            {/* Net Monthly Salary */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Euro className="h-4 w-4 text-[#1e3a5f]" />
                Salaire net mensuel
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={netMonthlySalary}
                  onChange={(e) => setNetMonthlySalary(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-net-salary"
                />
                <span className="text-gray-500 text-sm">€</span>
              </div>
            </div>

            {/* Loan Duration */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-[#1e3a5f]" />
                Durée du prêt
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  data-testid="input-loan-duration"
                />
                <span className="text-gray-500 text-sm">ans</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Percent className="h-4 w-4 text-[#1e3a5f]" />
                Taux d'intérêt
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  step="0.05"
                  data-testid="input-interest-rate-mortgage"
                />
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>

            {/* Insurance Rate */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <Label className="text-[#1e3a5f] flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-[#1e3a5f]" />
                Assurance
              </Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={insuranceRate}
                  onChange={(e) => setInsuranceRate(Math.max(0, Number(e.target.value)))}
                  className="w-20 text-right bg-gray-50 border-gray-300 text-[#1e3a5f] font-medium h-9"
                  step="0.01"
                  data-testid="input-insurance-rate"
                />
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>

            {/* Fixed Parameters Info */}
            <div className="pt-3 border-t border-gray-200">
              <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">
                <span className="text-xs text-gray-500">Taux d'endettement maximum</span>
                <span className="font-semibold text-[#1e3a5f] ml-2">35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="p-5 rounded-lg bg-white border border-gray-200 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-[#1e3a5f] rounded-md">
              <Home className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1e3a5f]">Résultat</h3>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Main Result */}
            <div className="text-center p-5 bg-gradient-to-br from-[#1e3a5f]/5 to-[#1e3a5f]/10 rounded-lg border border-[#1e3a5f]/20 mb-4">
              <p className="text-xs text-gray-500 mb-2">Crédit maximum autorisé</p>
              <p className="font-serif text-4xl font-bold text-[#1e3a5f] mb-1" data-testid="text-max-loan">
                {formatCurrency(maxLoanAmount)}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full">
                <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-medium text-green-700">Capacité validée</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600">Mensualité maximale</span>
                <span className="font-semibold text-[#1e3a5f]" data-testid="text-monthly-payment">
                  {formatCurrency(totalMonthlyPayment)}/mois
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500">dont assurance</span>
                <span className="font-medium text-[#1e3a5f] text-sm">
                  {formatCurrency(monthlyInsurance)}/mois
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600">Coût total du crédit</span>
                <span className="font-semibold text-[#1e3a5f]">
                  {formatCurrency(totalCost)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <span className="text-xs text-gray-500 block">Intérêts</span>
                  <span className="font-medium text-[#1e3a5f] text-sm">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <span className="text-xs text-gray-500 block">Assurance totale</span>
                  <span className="font-medium text-[#1e3a5f] text-sm">{formatCurrency(totalInsurance)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 text-center" data-testid="text-mortgage-disclaimer">
          Simulation indicative basée sur un taux d'endettement de 35%. Le montant réel dépend de votre situation personnelle, de vos charges et de la politique de la banque.
        </p>
      </div>
    </div>
  );
}
