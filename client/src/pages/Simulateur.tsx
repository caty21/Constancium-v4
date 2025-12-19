import { useState, useEffect } from "react";
import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import LeverageCalculator from "@/components/LeverageCalculator";
import SimulatorAuthModal from "@/components/SimulatorAuthModal";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, ArrowDown, Scale, Lock } from "lucide-react";

export default function Simulateur() {
  const [isLeverageAuthenticated, setIsLeverageAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("leverage-authenticated");
    if (authStatus === "true") {
      setIsLeverageAuthenticated(true);
    }
  }, []);

  const handleLeverageAuthenticated = () => {
    sessionStorage.setItem("leverage-authenticated", "true");
    setIsLeverageAuthenticated(true);
    setShowAuthModal(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <ConstanciumHeader />
      
      <section className="pt-32 pb-20 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
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

            {/* Quick Navigation Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground gap-2"
                onClick={() => scrollToSection('interets-composes')}
                data-testid="button-nav-compound"
              >
                <TrendingUp className="h-4 w-4" />
                Intérêts composés
                <ArrowDown className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground gap-2"
                onClick={() => scrollToSection('effet-levier')}
                data-testid="button-nav-leverage"
              >
                <Scale className="h-4 w-4" />
                Effet levier
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Compound Interest Calculator Section */}
          <div id="interets-composes" className="mb-20 pt-8 scroll-mt-24">
            <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground" data-testid="text-compound-interest-title">
                  Calculatrice d'intérêts composés
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-1"
                onClick={() => scrollToSection('effet-levier')}
              >
                Effet levier
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
            <CompoundInterestCalculator />
          </div>

          {/* Educational Content */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-muted/30 p-8 rounded-lg border border-primary/10">
              <h3 className="font-serif text-xl font-bold mb-4 text-primary">Comment fonctionnent les intérêts composés ?</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les intérêts composés sont le mécanisme par lequel vos intérêts génèrent eux-mêmes des intérêts. 
                C'est ce qu'Einstein aurait appelé "la huitième merveille du monde".
              </p>
              <p className="text-foreground/80 leading-relaxed">
                La formule des intérêts composés : <strong className="text-primary">Vf = Vi × (1 + r/n)^(n×t)</strong>
              </p>
              <ul className="mt-4 space-y-2 text-foreground/70 text-sm">
                <li><strong>Vf</strong> : Valeur future de l'investissement</li>
                <li><strong>Vi</strong> : Valeur initiale (capital de départ)</li>
                <li><strong>r</strong> : Taux d'intérêt annuel</li>
                <li><strong>n</strong> : Nombre de fois que l'intérêt est composé par an</li>
                <li><strong>t</strong> : Nombre d'années d'investissement</li>
              </ul>
            </div>

            <div className="bg-muted/30 p-8 rounded-lg border border-primary/10">
              <h3 className="font-serif text-xl font-bold mb-4 text-primary">Le pouvoir du temps</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Plus vous commencez tôt, plus l'effet de composition joue en votre faveur. 
                Le temps est votre meilleur allié pour faire fructifier votre patrimoine.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                <strong>Exemple concret :</strong> Un investissement de 10 000 € à 7% par an devient :
              </p>
              <ul className="space-y-2 text-foreground/70">
                <li>• Après 10 ans : 19 672 €</li>
                <li>• Après 20 ans : 38 697 €</li>
                <li>• Après 30 ans : 76 123 €</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Votre capital initial a été multiplié par <strong className="text-primary">7,6</strong> en 30 ans !
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-primary/20 my-12" />

          {/* Leverage Calculator Section */}
          <div id="effet-levier" className="mb-16 pt-8 scroll-mt-24">
            <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground" data-testid="text-leverage-title">
                  Simulateur d'effet levier du crédit
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-1"
                onClick={() => scrollToSection('interets-composes')}
              >
                Intérêts composés
                <ArrowDown className="h-3 w-3 rotate-180" />
              </Button>
            </div>
            {isLeverageAuthenticated ? (
              <LeverageCalculator />
            ) : (
              <div className="bg-muted/30 p-12 rounded-lg border border-primary/20 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Accès réservé
                </h3>
                <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                  Ce simulateur est réservé à nos clients en consultation. 
                  Veuillez vous authentifier pour y accéder.
                </p>
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-primary text-primary-foreground"
                  data-testid="button-unlock-leverage"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Débloquer l'accès
                </Button>
              </div>
            )}
          </div>

          {/* Auth Modal for Leverage Calculator */}
          {showAuthModal && (
            <SimulatorAuthModal 
              onAuthenticated={handleLeverageAuthenticated}
              onClose={() => setShowAuthModal(false)}
            />
          )}

        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
