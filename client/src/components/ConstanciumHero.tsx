import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import heroImage from "@assets/image_1786469758619.png";

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

      {/* Mosaïque superposée : l'image téléversée alterne avec des formes
          claires pour créer une composition plus lumineuse et plus éditoriale. */}
      <div className="absolute inset-y-[108px] bottom-[78px] right-0 w-full lg:w-[51%] pointer-events-none">
        <div className="relative h-full overflow-hidden bg-[#E8E5DC]">
          {/* grands carreaux-image */}
          <div
            className="absolute left-[3%] top-[5%] h-[24%] w-[38%] border-[6px] border-[#F7F6F2] bg-cover bg-no-repeat shadow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.16), rgba(255,255,255,0.16)), url(${heroImage})`,
              backgroundPosition: "right 22%",
              backgroundSize: "190% 190%",
            }}
          />
          <div
            className="absolute right-[4%] top-[1%] h-[33%] w-[32%] border-[6px] border-[#F7F6F2] bg-cover bg-no-repeat shadow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.12), rgba(255,255,255,0.12)), url(${heroImage})`,
              backgroundPosition: "right 32%",
              backgroundSize: "185% 185%",
            }}
          />
          <div
            className="absolute left-[22%] top-[34%] h-[29%] w-[43%] border-[6px] border-[#F7F6F2] bg-cover bg-no-repeat shadow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url(${heroImage})`,
              backgroundPosition: "right 58%",
              backgroundSize: "200% 200%",
            }}
          />
          <div
            className="absolute right-[1%] bottom-[4%] h-[31%] w-[38%] border-[6px] border-[#F7F6F2] bg-cover bg-no-repeat shadow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.14), rgba(255,255,255,0.14)), url(${heroImage})`,
              backgroundPosition: "right 78%",
              backgroundSize: "190% 190%",
            }}
          />

          {/* carreaux clairs */}
          <div className="absolute left-[44%] top-[4%] h-[18%] w-[17%] bg-white shadow-md" />
          <div className="absolute left-[4%] top-[38%] h-[22%] w-[19%] bg-[#F7F6F2] shadow-md" />
          <div className="absolute right-[38%] bottom-[5%] h-[22%] w-[19%] bg-white shadow-md" />
          <div className="absolute left-[3%] bottom-[2%] h-[15%] w-[28%] bg-[#D4AF37] shadow-md">
            <span className="absolute inset-3 border border-[#0F1729]/25" />
          </div>

          {/* losange doré */}
          <div className="absolute left-[71%] top-[38%] h-24 w-24 rotate-45 bg-[#D4AF37] shadow-xl">
            <div className="absolute inset-3 border border-[#0F1729]/25" />
          </div>

          {/* ellipse claire, comme une fenêtre sur l'image */}
          <div
            className="absolute left-[8%] bottom-[22%] h-28 w-48 -rotate-[12deg] rounded-[50%] border-[7px] border-[#F7F6F2] bg-cover bg-no-repeat shadow-xl"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.18), rgba(255,255,255,0.18)), url(${heroImage})`,
              backgroundPosition: "right 72%",
              backgroundSize: "200% 200%",
            }}
          />

          {/* cercle crème */}
          <div className="absolute right-[5%] bottom-[38%] h-20 w-20 rounded-full border-[7px] border-[#F7F6F2] bg-[#E8E5DC] shadow-xl" />
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
