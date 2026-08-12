import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import heroImage from "@assets/berzin-girl-2172318_1786540811939.jpg";

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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#E8E5DC]">
      {/* Panneau clair animé avec le contenu : il arrive depuis la gauche
          comme une feuille éditoriale qui se pose sur le hero. */}
      <div
        className={`absolute inset-y-[108px] bottom-[78px] left-0 w-full bg-[#F7F6F2] shadow-[18px_0_45px_rgba(15,23,41,0.08)] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] lg:w-[53%] ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden="true"
      />

      {/* Une seule fenêtre photo : la composition reste lisible et respire. */}
      <div className="absolute inset-y-[108px] bottom-[78px] right-0 hidden w-[49%] lg:block">
        <div className="absolute inset-8 border border-[#D4AF37]/35" />
        <div className="absolute inset-0 overflow-hidden bg-[#0F1729] shadow-[-24px_0_60px_rgba(15,23,41,0.12)]">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundPosition: "center 42%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              filter: "brightness(1.02) saturate(0.96) contrast(1.01)",
            }}
          />
          {/* Traitement léger : la photo reste naturelle, avec seulement
              une légère chaleur à gauche et une profondeur discrète à droite. */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(247,246,242,0.16) 0%, rgba(247,246,242,0.02) 42%, rgba(15,23,41,0.16) 100%)",
            }}
          />
          <div className="absolute left-12 top-8 text-[#F7F6F2]">
            <p className="text-[10px] tracking-[0.28em] uppercase opacity-75">Constancium</p>
            <p className="mt-2 font-serif text-xl italic opacity-90">Une vision globale</p>
          </div>
          <div className="absolute bottom-8 right-8 text-right">
            <p className="font-serif text-4xl font-bold text-[#D4AF37]">360°</p>
            <p className="mt-1 text-[10px] tracking-[0.24em] uppercase text-white/70">du patrimoine</p>
          </div>
        </div>
      </div>

      {/* Une fine ligne verticale donne une structure architecturale sans alourdir. */}
      <div className="absolute bottom-[78px] left-[53%] top-[108px] hidden w-px bg-[#D4AF37]/25 lg:block" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full py-32 md:py-40">
          <div
            className={`max-w-2xl lg:w-[51%] transition-all duration-1000 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
          >
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
               className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F1729] leading-[1.05] mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "120ms" }}
              data-testid="text-hero-headline"
            >
              Faites grandir<br />
              votre patrimoine,<br />
              <span className="text-[#D4AF37]">en toute confiance.</span>
            </h1>

            {/* Subheadline */}
            <p
               className={`text-[#0F1729]/65 text-lg md:text-xl leading-relaxed max-w-xl mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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
                 className="inline-flex items-center gap-2 text-[#0F1729] hover:text-[#D4AF37] text-sm font-semibold transition-colors group"
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
