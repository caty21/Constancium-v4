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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#F7F6F2]">
      {/* Panneau de lecture : le texte garde son contraste sans assombrir toute la page */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[53%] bg-[#0F1729]" />

      {/* Mosaïque éditoriale : chaque carreau contient soit une respiration claire,
          soit un fragment cadré de la ville. */}
      <div className="absolute inset-y-[108px] bottom-[78px] right-0 w-full lg:w-[47%] p-3 md:p-5 lg:p-8 pointer-events-none">
        <div className="grid h-full grid-cols-4 grid-rows-4 gap-2 md:gap-3">
          {[
            { type: "light", tone: "cream" },
            { type: "image", position: "8% 8%" },
            { type: "light", tone: "white" },
            { type: "image", position: "72% 10%" },
            { type: "image", position: "30% 28%" },
            { type: "light", tone: "gold" },
            { type: "image", position: "92% 32%" },
            { type: "light", tone: "cream" },
            { type: "light", tone: "white" },
            { type: "image", position: "52% 54%" },
            { type: "image", position: "18% 64%" },
            { type: "light", tone: "cream" },
            { type: "image", position: "78% 72%" },
            { type: "light", tone: "white" },
            { type: "image", position: "42% 90%" },
            { type: "light", tone: "gold" },
          ].map((tile, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-[2px] border ${
                tile.type === "light"
                  ? tile.tone === "gold"
                    ? "bg-[#D4AF37] border-[#D4AF37]"
                    : tile.tone === "white"
                      ? "bg-white border-white"
                      : "bg-[#E8E5DC] border-[#E8E5DC]"
                  : "bg-cover bg-no-repeat border-white"
              }`}
              style={
                tile.type === "image"
                  ? {
                      backgroundImage: `linear-gradient(rgba(15,23,41,0.04), rgba(15,23,41,0.04)), url(${heroImage})`,
                      backgroundPosition: tile.position,
                      backgroundSize: "280% 280%",
                    }
                  : undefined
              }
            >
              {tile.type === "light" && tile.tone === "gold" && (
                <span className="absolute inset-2 border border-[#0F1729]/20" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full py-32 md:py-40">
            <div className="max-w-3xl lg:max-w-[53%]">
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
        className={`relative z-10 border-t border-[#D4AF37]/20 bg-[#F7F6F2] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D4AF37]/20">
            {[
              { number: "100%", label: "Indépendant & fiduciaire" },
              { number: "4", label: "Expertises patrimoniales" },
              { number: "Sur-mesure", label: "Chaque stratégie" },
              { number: "2025", label: "Fondé à Lille" },
            ].map((stat, i) => (
              <div key={i} className="px-6 py-5 text-center">
                <p className="font-serif text-xl md:text-2xl font-bold text-[#D4AF37]">{stat.number}</p>
                <p className="text-[#0F1729]/55 text-xs mt-0.5 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-28 right-8 hidden md:flex flex-col items-center gap-2 text-[#0F1729]/35 hover:text-[#0F1729]/70 transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-[10px] tracking-widest uppercase rotate-90 mb-2">Défiler</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
