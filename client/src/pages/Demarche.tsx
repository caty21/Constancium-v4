import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { ArrowRight, Stethoscope, Users, Target, HeartHandshake } from "lucide-react";

export default function Demarche() {
  const steps = [
    {
      icon: Users,
      num: "01",
      title: "Premier rendez-vous",
      description: "Un échange approfondi pour comprendre votre situation personnelle, professionnelle et vos objectifs de vie. Gratuit, sans engagement."
    },
    {
      icon: Stethoscope,
      num: "02",
      title: "Diagnostic patrimonial",
      description: "Comme un médecin qui ne prescrit pas avant d'avoir posé un diagnostic, nous analysons en profondeur votre patrimoine financier et immobilier."
    },
    {
      icon: Target,
      num: "03",
      title: "Stratégie sur-mesure",
      description: "Élaboration de recommandations personnalisées et adaptées à vos besoins spécifiques, votre fiscalité et vos projets."
    },
    {
      icon: HeartHandshake,
      num: "04",
      title: "Accompagnement continu",
      description: "Un suivi régulier pour ajuster vos stratégies en fonction de l'évolution de votre vie et des marchés financiers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ConstanciumHeader />

      {/* Hero banner */}
      <section className="pt-[109px] bg-[#0F1729]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Notre Philosophie</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl" data-testid="text-demarche-headline">
            La Démarche<br />
            <span className="text-[#D4AF37]">Relationnelle</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl">
            Une approche centrée sur l'humain pour construire ensemble votre avenir patrimonial
          </p>
        </div>
      </section>

      {/* Why section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Pourquoi cette approche</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F1729] leading-tight mb-8">
                Avant les solutions,<br />la connaissance de votre situation
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Chez Constancium, nous pratiquons ce que nous appelons la <strong className="text-[#0F1729]">démarche relationnelle</strong>. 
                  Cette approche repose sur une conviction simple : avant de proposer des solutions financières, 
                  il est essentiel de comprendre en profondeur qui vous êtes.
                </p>
                <p>
                  Tout comme un médecin ne prescrit pas de traitement avant d'avoir établi un diagnostic précis, 
                  nous ne recommandons aucune solution patrimoniale sans avoir pris le temps de vous connaître. 
                  Ce premier échange est fondamental pour établir une relation de confiance durable.
                </p>
                <p>
                  Durant cette rencontre, nous explorons ensemble vos <strong className="text-[#0F1729]">objectifs de vie</strong>, 
                  votre <strong className="text-[#0F1729]">parcours personnel et professionnel</strong>, vos préoccupations 
                  et vos aspirations. Cette compréhension globale nous permet ensuite de dégager les stratégies 
                  les plus pertinentes et adaptées à votre situation unique.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="lg:pt-16">
              <div className="border-l-4 border-[#D4AF37] pl-8 py-4 mb-8">
                <p className="font-serif text-2xl text-[#0F1729] leading-snug italic">
                  "La clé de notre démarche est d'anticiper — comprendre avant d'agir, pour conseiller avec justesse."
                </p>
                <p className="text-[#D4AF37] font-semibold text-sm mt-4">— Capucine Gest, Fondatrice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps — dark */}
      <section className="bg-[#0F1729] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Le processus</span>
              <div className="h-px w-8 bg-[#D4AF37]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Notre processus en 4 étapes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#D4AF37]/30 hover:bg-white/8 transition-all duration-300 group"
                  data-testid={`step-card-${index}`}
                >
                  {/* Number */}
                  <span className="font-serif text-4xl font-bold text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors leading-none block mb-4">
                    {step.num}
                  </span>
                  {/* Icon */}
                  <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg flex items-center justify-center mb-4">
                    <StepIcon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <div className="w-6 h-px bg-[#D4AF37]/40 mb-4" />
                  <h3 className="font-serif text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>

                  {/* Connector arrow (not on last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-px bg-[#D4AF37]/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
