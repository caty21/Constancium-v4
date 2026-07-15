import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { ArrowRight, Award, Users, Target } from "lucide-react";
import capucinePhoto from "@assets/version finale (1)_1764178750894.jpg";

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Audace",
      description: "Nous proposons des stratégies innovantes et réfléchies pour maximiser votre potentiel patrimonial, sans jamais sacrifier la prudence."
    },
    {
      icon: Users,
      title: "Sérénité",
      description: "Un accompagnement rassurant basé sur la transparence totale. Vous avancez en toute sérénité, guidé par une expertise solide."
    },
    {
      icon: Target,
      title: "Accessibilité",
      description: "Rendre la gestion de patrimoine compréhensible et accessible à tous, sans compromis sur la qualité du conseil."
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
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase" data-testid="text-about-overline">Notre Histoire</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl" data-testid="text-about-headline">
            À Propos de<br />
            <span className="text-[#D4AF37]">Constancium</span>
          </h1>
        </div>
      </section>

      {/* Bio section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Photo */}
            <div className="relative" data-testid="about-image-container">
              <img
                src={capucinePhoto}
                alt="Capucine Gest"
                className="w-full rounded-2xl shadow-xl object-cover"
                style={{ maxHeight: "600px", objectPosition: "center top" }}
              />
              {/* Decorative gold border — top right */}
              <div className="absolute -top-4 -right-4 w-2/3 h-full border-2 border-[#D4AF37]/20 rounded-2xl pointer-events-none" />
            </div>

            {/* Text */}
            <div className="lg:pt-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Fondatrice</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0F1729] mb-2" data-testid="text-bio-title">
                Capucine Gest
              </h2>
              <div className="w-10 h-0.5 bg-[#D4AF37] mb-8" />

              <div className="space-y-5 text-gray-600 leading-relaxed text-base" data-testid="text-bio-content">
                <p>
                  Diplômée de l'ITEEM, école de Centrale Lille Institut, j'ai construit mon parcours 
                  à la croisée de l'ingénierie, de la finance et du conseil.
                </p>
                <p>
                  Après plusieurs expériences professionnelles, dont l'audit financier dans les services 
                  bancaires chez MAZARS à Dublin, j'ai choisi de mettre mon expertise et ma passion 
                  au service de l'accompagnement patrimonial.
                </p>
                <p>
                  <strong className="text-[#0F1729]">Constancium</strong>, créée en novembre 2025, représente l'aboutissement 
                  de cette conviction : l'excellence patrimoniale ne devrait pas être un privilège. 
                  À travers cette structure, je m'engage à rendre la gestion de patrimoine à la fois 
                  audacieuse, sereine et accessible.
                </p>
                <p className="font-serif text-xl font-semibold text-[#0F1729] pt-2">
                  Capucine.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="https://www.linkedin.com/in/capucinegest/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D4AF37] text-[#0F1729] font-medium text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  LinkedIn
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-[#0F1729] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase" data-testid="text-values-overline">
                Les Piliers de Notre Approche
              </span>
              <div className="h-px w-8 bg-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-white" data-testid="text-values-title">
              Nos Valeurs
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const ValueIcon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#D4AF37]/30 hover:bg-white/8 transition-all duration-300"
                  data-testid={`value-card-${index}`}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ValueIcon className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <span className="text-[#D4AF37]/40 text-xs font-mono">0{index + 1}</span>
                      <h4 className="font-serif text-xl font-bold text-white leading-tight" data-testid="text-value-title">
                        {value.title}
                      </h4>
                    </div>
                  </div>
                  <div className="w-6 h-px bg-[#D4AF37]/40 mb-4" />
                  <p className="text-white/60 leading-relaxed text-sm" data-testid="text-value-description">
                    {value.description}
                  </p>
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
