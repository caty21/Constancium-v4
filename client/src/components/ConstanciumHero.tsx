import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import heroImage from "@assets/generated_images/luxury_city_skyline_hero.webp";

export default function ConstanciumHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0F1729]">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Overlays plus légers : l'image et ses nuances restent visibles */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1729]/78 via-[#0F1729]/52 to-[#0F1729]/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1729]/15 via-transparent to-[#0F1729]/40" />

      {/* Trame architecturale claire pour alléger le hero sans le surcharger */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(72px, 9vw, 128px) clamp(72px, 9vw, 128px)",
          maskImage: "linear-gradient(to right, transparent 0%, black 45%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 45%, black 100%)",
        }}
      />

      {/* Cadre lumineux à droite : un repère visuel qui équilibre le bloc de texte */}
      <div className="absolute right-[7%] top-[27%] hidden lg:block w-[32%] h-[43%] border border-white/20 bg-white/[0.035] backdrop-blur-[1px]">
        <div className="absolute -left-px top-10 bottom-10 w-px bg-[#D4AF37]/80" />
        <div className="absolute inset-5 border border-[#F7F6F2]/20" />
        <div className="absolute right-7 top-7 text-right">
          <p className="text-[#F7F6F2]/75 text-[10px] tracking-[0.28em] uppercase">Constancium</p>
          <p className="mt-2 font-serif italic text-[#F7F6F2]/60 text-lg">Une vision globale</p>
        </div>
        <div className="absolute bottom-7 left-8 right-8 flex items-end justify-between">
          <div>
            <p className="text-[#D4AF37] text-3xl font-serif font-bold">360°</p>
            <p className="text-white/55 text-[10px] tracking-widest uppercase mt-1">du patrimoine</p>
          </div>
          <div className="w-20 h-px bg-white/30 mb-2" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full py-32 md:py-40">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="h-px w-10 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">
                Conseil Indépendant en Gestion de Patrimoine
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "120ms" }}
              data-testid="text-hero-headline"
            >
              Faites grandir<br />
              votre patrimoine,<br />
              <span className="text-[#D4AF37]">en toute confiance.</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-white/75 text-lg md:text-xl leading-relaxed max-w-xl mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "240ms" }}
              data-testid="text-hero-subheadline"
            >
              Un accompagnement sur-mesure pour sécuriser vos projets de vie,
              optimiser vos investissements et préparer sereinement l'avenir.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "360ms" }}
            >
              <button
                onClick={scrollToServices}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors group"
                data-testid="button-our-services"
              >
                Découvrir nos services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div
        className={`relative z-10 border-t border-white/10 bg-[#0F1729]/80 backdrop-blur-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { number: "100%", label: "Indépendant & fiduciaire" },
              { number: "4", label: "Expertises patrimoniales" },
              { number: "Sur-mesure", label: "Chaque stratégie" },
              { number: "2025", label: "Fondé à Lille" },
            ].map((stat, i) => (
              <div key={i} className="px-6 py-5 text-center">
                <p className="font-serif text-xl md:text-2xl font-bold text-[#D4AF37]">{stat.number}</p>
                <p className="text-white/50 text-xs mt-0.5 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-28 right-8 hidden md:flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-[10px] tracking-widest uppercase rotate-90 mb-2">Défiler</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
