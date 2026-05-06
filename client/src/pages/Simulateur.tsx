import { useState, useEffect } from "react";
import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import LeverageCalculator from "@/components/LeverageCalculator";
import DonationCalculator from "@/components/DonationCalculator";
import SimulatorAuthModal from "@/components/SimulatorAuthModal";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, ArrowDown, Scale, Lock, Landmark } from "lucide-react";

export default function Simulateur() {
  const [isLeverageAuthenticated, setIsLeverageAuthenticated] = useState(false);
  const [isDonationAuthenticated, setIsDonationAuthenticated] = useState(false);
  const [showLeverageModal, setShowLeverageModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("leverage-authenticated") === "true") setIsLeverageAuthenticated(true);
    if (sessionStorage.getItem("donation-authenticated") === "true") setIsDonationAuthenticated(true);
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
    <div className="bg-muted/30 p-12 rounded-lg border border-primary/20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
        <Lock className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Accès réservé</h3>
      <p className="text-foreground/70 mb-6 max-w-md mx-auto">
        Ce simulateur est réservé à nos clients en consultation. Veuillez vous authentifier pour y accéder.
      </p>
      <Button onClick={onUnlock} className="bg-primary text-primary-foreground" data-testid={testId}>
        <Lock className="w-4 h-4 mr-2" />
        Débloquer l'accès
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <ConstanciumHeader />

      <section className="pt-32 pb-20 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* ── Hero ── */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#D4AF37]" data-testid="text-simulator-headline">
                Simulateurs
              </h1>
            </div>
            <p className="font-serif text-2xl md:text-3xl text-foreground max-w-4xl leading-relaxed font-light mb-8" data-testid="text-simulator-subtitle">
              Outils de simulation pour planifier vos investissements
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground gap-2" onClick={() => scrollToSection("interets-composes")} data-testid="button-nav-compound">
                <TrendingUp className="h-4 w-4" /> Intérêts composés <ArrowDown className="h-3 w-3" />
              </Button>
              <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground gap-2" onClick={() => scrollToSection("effet-levier")} data-testid="button-nav-leverage">
                <Scale className="h-4 w-4" /> Effet levier {!isLeverageAuthenticated && <Lock className="h-3 w-3 opacity-60" />} <ArrowDown className="h-3 w-3" />
              </Button>
              <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground gap-2" onClick={() => scrollToSection("transmission-patrimoniale")} data-testid="button-nav-donation">
                <Landmark className="h-4 w-4" /> Transmission {!isDonationAuthenticated && <Lock className="h-3 w-3 opacity-60" />} <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* ── Intérêts composés ── */}
          <div id="interets-composes" className="mb-20 pt-8 scroll-mt-24">
            <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md"><TrendingUp className="h-6 w-6 text-primary" /></div>
                <h2 className="font-serif text-3xl font-bold text-foreground" data-testid="text-compound-interest-title">Calculatrice d'intérêts composés</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1" onClick={() => scrollToSection("effet-levier")}>
                Effet levier <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
            <CompoundInterestCalculator />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-muted/30 p-8 rounded-lg border border-primary/10">
              <h3 className="font-serif text-xl font-bold mb-4 text-primary">Comment fonctionnent les intérêts composés ?</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">Les intérêts composés sont le mécanisme par lequel vos intérêts génèrent eux-mêmes des intérêts. C'est ce qu'Einstein aurait appelé "la huitième merveille du monde".</p>
              <p className="text-foreground/80 leading-relaxed">La formule : <strong className="text-primary">Vf = Vi × (1 + r/n)^(n×t)</strong></p>
              <ul className="mt-4 space-y-2 text-foreground/70 text-sm">
                <li><strong>Vf</strong> : Valeur future</li>
                <li><strong>Vi</strong> : Capital initial</li>
                <li><strong>r</strong> : Taux annuel</li>
                <li><strong>n</strong> : Fréquence de capitalisation</li>
                <li><strong>t</strong> : Durée en années</li>
              </ul>
            </div>
            <div className="bg-muted/30 p-8 rounded-lg border border-primary/10">
              <h3 className="font-serif text-xl font-bold mb-4 text-primary">Le pouvoir du temps</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">Plus vous commencez tôt, plus l'effet de composition joue en votre faveur.</p>
              <p className="text-foreground/80 leading-relaxed mb-4"><strong>Exemple :</strong> 10 000 € à 7 %/an :</p>
              <ul className="space-y-2 text-foreground/70">
                <li>• Après 10 ans : 19 672 €</li>
                <li>• Après 20 ans : 38 697 €</li>
                <li>• Après 30 ans : 76 123 €</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">Capital multiplié par <strong className="text-primary">7,6</strong> en 30 ans.</p>
            </div>
          </div>

          <div className="border-t border-primary/20 my-12" />

          {/* ── Effet levier ── */}
          <div id="effet-levier" className="mb-16 pt-8 scroll-mt-24">
            <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md"><Scale className="h-6 w-6 text-primary" /></div>
                <h2 className="font-serif text-3xl font-bold text-foreground" data-testid="text-leverage-title">Simulateur d'effet levier du crédit</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1" onClick={() => scrollToSection("interets-composes")}>
                Intérêts composés <ArrowDown className="h-3 w-3 rotate-180" />
              </Button>
            </div>
            {isLeverageAuthenticated ? <LeverageCalculator /> : <LockedSection onUnlock={() => setShowLeverageModal(true)} testId="button-unlock-leverage" />}
          </div>

          {showLeverageModal && <SimulatorAuthModal onAuthenticated={handleLeverageAuthenticated} onClose={() => setShowLeverageModal(false)} />}

          <div className="border-t border-primary/20 my-12" />

          {/* ── Transmission patrimoniale ── */}
          <div id="transmission-patrimoniale" className="mb-16 pt-8 scroll-mt-24">
            <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md"><Landmark className="h-6 w-6 text-primary" /></div>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground" data-testid="text-donation-title">Transmission &amp; Donation patrimoniale</h2>
                  <p className="text-sm text-foreground/60 mt-0.5">Abattements · droits de donation · optimisation par nue-propriété</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1" onClick={() => scrollToSection("interets-composes")}>
                Haut de page <ArrowDown className="h-3 w-3 rotate-180" />
              </Button>
            </div>
            {isDonationAuthenticated ? <DonationCalculator /> : <LockedSection onUnlock={() => setShowDonationModal(true)} testId="button-unlock-donation" />}
          </div>

          {showDonationModal && <SimulatorAuthModal onAuthenticated={handleDonationAuthenticated} onClose={() => setShowDonationModal(false)} />}

        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
