import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Users, Target, HeartHandshake, ArrowRight } from "lucide-react";

export default function Demarche() {
  const steps = [
    {
      icon: Users,
      title: "Premier rendez-vous",
      description: "Un échange approfondi pour comprendre votre situation personnelle, professionnelle et vos objectifs de vie."
    },
    {
      icon: Stethoscope,
      title: "Diagnostic patrimonial",
      description: "Comme un médecin qui ne prescrit pas avant d'avoir posé un diagnostic, nous analysons en profondeur votre patrimoine."
    },
    {
      icon: Target,
      title: "Stratégie sur-mesure",
      description: "Élaboration de recommandations personnalisées et adaptées à vos besoins spécifiques."
    },
    {
      icon: HeartHandshake,
      title: "Accompagnement continu",
      description: "Un suivi régulier pour ajuster vos stratégies en fonction de l'évolution de votre vie."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ConstanciumHeader />
      
      <section className="pt-24 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Notre Philosophie</span>
              <div className="h-px w-12 bg-[#D4AF37]"></div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#D4AF37]" data-testid="text-demarche-headline">
              La Démarche Relationnelle
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Une approche centrée sur l'humain pour construire ensemble votre avenir patrimonial
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-8 mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 mt-0">
                Pourquoi une démarche relationnelle ?
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-0">
                Chez Constancium, nous pratiquons ce que nous appelons la <strong className="text-[#D4AF37]">démarche relationnelle</strong>. 
                Cette approche repose sur une conviction simple : avant de proposer des solutions financières, 
                il est essentiel de comprendre en profondeur qui vous êtes, vos aspirations, vos contraintes et vos projets de vie.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Le premier rendez-vous : un moment clé
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Tout comme un médecin ne prescrit pas de traitement avant d'avoir établi un diagnostic précis, 
              nous ne recommandons aucune solution patrimoniale sans avoir pris le temps de vous connaître. 
              Ce premier échange est fondamental pour établir une relation de confiance durable.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8">
              Durant cette rencontre, nous explorons ensemble vos <strong>objectifs de vie</strong>, 
              votre <strong>parcours personnel et professionnel</strong>, vos préoccupations et vos aspirations. 
              Cette compréhension globale nous permet ensuite de dégager les stratégies les plus pertinentes 
              et adaptées à votre situation unique.
            </p>
          </div>

          <h2 className="font-serif text-2xl font-bold text-center text-foreground mb-8">
            Notre processus en 4 étapes
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all" data-testid={`step-card-${index}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-lg flex-shrink-0">
                    <step.icon className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0F1729] font-bold text-xs leading-none">{index + 1}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground leading-tight">{step.title}</h3>
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
