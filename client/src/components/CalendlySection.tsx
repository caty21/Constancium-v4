import { Check, Handshake, ArrowRight } from "lucide-react";
import capucinPhoto from "@assets/version finale cut (1)_1764274562139.jpg";

export default function CalendlySection() {
  return (
    <section className="bg-white" data-testid="section-calendly">
      <div className="grid lg:grid-cols-2">
        {/* Photo — left on large screens */}
        <div className="relative h-[400px] lg:h-auto overflow-hidden order-2 lg:order-1">
          <img
            src={capucinPhoto}
            alt="Capucine Gest — Fondatrice de Constancium"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
            data-testid="capucine-photo"
          />
          {/* Name card overlay */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-5 py-3 shadow-xl">
            <p className="font-serif font-bold text-[#0F1729] text-base leading-tight">Capucine Gest</p>
            <p className="text-[#D4AF37] text-xs font-medium tracking-wide uppercase mt-0.5">Fondatrice & Conseillère</p>
          </div>
        </div>

        {/* Text — right */}
        <div className="bg-[#0F1729] px-8 md:px-16 py-16 md:py-20 flex flex-col justify-center order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Notre démarche</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-snug mb-6" data-testid="text-calendly-headline">
            Le Parcours Patrimonial<br />
            <span className="text-[#D4AF37]">que nous vous proposons</span>
          </h2>

          <p className="text-white/70 leading-relaxed mb-8 text-base" data-testid="text-calendly-description">
            Le premier échange est essentiel pour établir une relation de confiance durable. 
            Nous consacrons le temps nécessaire à vous connaître — vos objectifs, votre contexte — 
            afin de dégager les stratégies les plus adaptées à vos besoins.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Analyse personnalisée de votre situation",
              "Stratégie fiscale sur-mesure",
              "Plan d'action détaillé et priorisé",
              "Sans engagement initial",
            ].map((benefit, index) => (
              <li key={index} className="flex items-center gap-3" data-testid={`benefit-${index}`}>
                <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                  {index === 3 ? (
                    <Handshake className="h-3 w-3 text-[#D4AF37]" />
                  ) : (
                    <Check className="h-3 w-3 text-[#D4AF37]" />
                  )}
                </div>
                <span className="text-white/85 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              data-testid="button-contact-section"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/demarche"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#D4AF37]/50 text-white hover:text-[#D4AF37] text-sm font-medium px-6 py-3 rounded-lg transition-colors"
              data-testid="button-en-savoir-plus"
            >
              Notre philosophie
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
