import { useState, useEffect } from "react";
import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import LeverageCalculator from "@/components/LeverageCalculator";
import DonationCalculator from "@/components/DonationCalculator";
import SimulatorAuthModal from "@/components/SimulatorAuthModal";
import { TrendingUp, Scale, Lock, Landmark, ArrowRight } from "lucide-react";

export default function Simulateur() {
  const [isLeverageAuthenticated, setIsLeverageAuthenticated] = useState(false);
  const [isDonationAuthenticated, setIsDonationAuthenticated] = useState(false);
  const [showLeverageModal, setShowLeverageModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("leverage-authenticated") === "true") setIsLeverageAuthenticated(true);
    if (sessionStorage.getItem("donation-authenticated") === "true") setIsDonationAuthenticated(true);

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const handleLeverageAuthenticated = () => {
    sessionStorage.setItem("leverage-authenticated", "true");
    setIsLeverageAuthenticated(true);
    setShowLeverageModal(false);
  };

  const handleDonationAuthenticated = () => {
    sessionStorage.setItem("donation-authenticated", "true");
    setIsDonationAuthenticated(true);
    setShowDonationModal(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const LockedSection = ({ onUnlock, testId }: { onUnlock: () => void; testId: string }) => (
    <div className="bg-[#FAFAF8] p-12 rounded-2xl border border-[#D4AF37]/20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center">
        <Lock className="w-7 h-7 text-[#D4AF37]" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-[#0F1729] mb-3">Accès réservé</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm leading-relaxed">
        Ce simulateur est réservé à nos clients en consultation. Veuillez vous authentifier pour y accéder.
      </p>
      <button
        onClick={onUnlock}
        className="inline-flex items-center gap-2 bg-[#0F1729] hover:bg-[#1e3a5f] text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors"
        data-testid={testId}
      >
        <Lock className="w-4 h-4" />
        Débloquer l'accès
      </button>
    </div>
  );

  const simulators = [
    { id: "interets-composes", icon: TrendingUp, label: "Intérêts composés", locked: false },
    { id: "effet-levier", icon: Scale, label: "Effet levier", locked: !isLeverageAuthenticated },
    { id: "transmission-patrimoniale", icon: Landmark, label: "Transmission", locked: !isDonationAuthenticated },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ConstanciumHeader />

      {/* Hero banner */}
      <section className="pt-[109px] bg-[#0F1729]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-18">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Outils de projection</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight" data-testid="text-simulator-headline">
                Nos <span className="text-[#D4AF37]">Simulateurs</span>
              </h1>
              <p className="text-white/60 mt-3 text-base max-w-md" data-testid="text-simulator-subtitle">
                Projetez et planifiez vos investissements avec nos outils de simulation patrimoniaux.
              </p>
            </div>

            {/* Quick nav pills */}
            <div className="flex flex-wrap gap-2">
              {simulators.map((sim) => {
                const SimIcon = sim.icon;
                return (
                  <button
                    key={sim.id}
                    onClick={() => scrollToSection(sim.id)}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4AF37]/50 text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-all"
                    data-testid={`button-nav-${sim.id}`}
                  >
                    <SimIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
                    {sim.label}
                    {sim.locked && <Lock className="h-3 w-3 text-white/40" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Simulators */}
      <section className="bg-[#FAFAF8] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-14">

          {/* ── Intérêts composés ── */}
          <div id="interets-composes" className="scroll-mt-[109px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white border border-[#D4AF37]/20 rounded-xl flex items-center justify-center shadow-sm">
                <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F1729]" data-testid="text-compound-interest-title">
                  Intérêts composés
                </h2>
                <p className="text-gray-500 text-sm">Calculez la croissance de votre capital dans le temps</p>
              </div>
            </div>
            <CompoundInterestCalculator />

            {/* Explainer cards */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-serif text-base font-bold text-[#D4AF37] mb-3">Comment fonctionnent les intérêts composés ?</h3>
                <p className="text-gray-500 leading-relaxed text-sm mb-3">
                  Les intérêts composés sont le mécanisme par lequel vos intérêts génèrent eux-mêmes des intérêts. 
                  C'est ce qu'Einstein aurait appelé "la huitième merveille du monde".
                </p>
                <p className="text-gray-500 text-sm">
                  Formule : <span className="font-mono font-semibold text-[#0F1729] text-xs bg-gray-50 px-2 py-1 rounded">Vf = Vi × (1 + r/n)^(n×t)</span>
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-serif text-base font-bold text-[#D4AF37] mb-3">Le pouvoir du temps</h3>
                <p className="text-gray-500 text-sm mb-3">10 000 € à 7 % / an :</p>
                <div className="space-y-2">
                  {[
                    { label: "Après 10 ans", value: "19 672 €" },
                    { label: "Après 20 ans", value: "38 697 €" },
                    { label: "Après 30 ans", value: "76 123 €" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500">{row.label}</span>
                      <span className="font-semibold text-[#0F1729] text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#D4AF37] font-medium mt-3">Capital multiplié par ×7,6 en 30 ans</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* ── Effet levier ── */}
          <div id="effet-levier" className="scroll-mt-[109px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white border border-[#D4AF37]/20 rounded-xl flex items-center justify-center shadow-sm">
                <Scale className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F1729]" data-testid="text-leverage-title">
                  Effet levier du crédit
                </h2>
                <p className="text-gray-500 text-sm">Simulez l'impact du financement sur votre rendement immobilier</p>
              </div>
              {!isLeverageAuthenticated && (
                <div className="ml-auto flex items-center gap-1.5 text-xs text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-lg font-medium">
                  <Lock className="h-3 w-3" />
                  Accès restreint
                </div>
              )}
            </div>
            {isLeverageAuthenticated ? <LeverageCalculator /> : <LockedSection onUnlock={() => setShowLeverageModal(true)} testId="button-unlock-leverage" />}
          </div>

          {showLeverageModal && (
            <SimulatorAuthModal onAuthenticated={handleLeverageAuthenticated} onClose={() => setShowLeverageModal(false)} />
          )}

          <div className="border-t border-gray-200" />

          {/* ── Transmission patrimoniale ── */}
          <div id="transmission-patrimoniale" className="scroll-mt-[109px] pb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white border border-[#D4AF37]/20 rounded-xl flex items-center justify-center shadow-sm">
                <Landmark className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F1729]" data-testid="text-donation-title">
                  Transmission & Donation
                </h2>
                <p className="text-gray-500 text-sm">Abattements · droits de donation · optimisation par nue-propriété</p>
              </div>
              {!isDonationAuthenticated && (
                <div className="ml-auto flex items-center gap-1.5 text-xs text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-lg font-medium">
                  <Lock className="h-3 w-3" />
                  Accès restreint
                </div>
              )}
            </div>
            {isDonationAuthenticated ? <DonationCalculator /> : <LockedSection onUnlock={() => setShowDonationModal(true)} testId="button-unlock-donation" />}
          </div>

          {showDonationModal && (
            <SimulatorAuthModal onAuthenticated={handleDonationAuthenticated} onClose={() => setShowDonationModal(false)} />
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0F1729] py-14">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">Conseil personnalisé</p>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Besoin d'une analyse sur-mesure ?
          </h2>
          <p className="text-white/55 mb-8 max-w-lg mx-auto text-sm">
            Ces simulateurs donnent des projections indicatives. Pour une stratégie précise adaptée à votre situation, 
            prenez rendez-vous avec Capucine.
          </p>
          <a
            href="https://zcal.co/i/constancium"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm"
          >
            Prendre rendez-vous
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
