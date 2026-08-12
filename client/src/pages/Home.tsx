import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumHero from "@/components/ConstanciumHero";
import ServiceModule from "@/components/ServiceModule";
import CalendlySection from "@/components/CalendlySection";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Link } from "wouter";
import { ArrowRight, Briefcase, TrendingUp, PiggyBank, FileText, Shield, Award, BarChart3 } from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: Briefcase,
      title: "Gestion de Patrimoine",
      description: "Optimisez votre patrimoine avec des stratégies personnalisées adaptées à vos objectifs financiers et familiaux.",
      href: "/gamme",
    },
    {
      icon: TrendingUp,
      title: "Arbitrage des Investissements",
      description: "Optimisez vos rendements grâce à une gestion active, un arbitrage stratégique et une diversification intelligente.",
      href: "/gamme?category=structured",
    },
    {
      icon: FileText,
      title: "Planification Successorale",
      description: "Préparez l'avenir en structurant efficacement la transmission de votre patrimoine aux générations futures.",
      href: "/gamme?category=real-estate",
    },
    {
      icon: PiggyBank,
      title: "Accompagnement Fiscal",
      description: "Réduisez légalement votre charge fiscale grâce à des solutions d'optimisation sophistiquées et conformes.",
      href: "/demarche",
    },
  ];

  const expertises = [
    { icon: Shield, label: "Indépendant", desc: "Aucun conflit d'intérêts, conseil objectif et fiduciaire" },
    { icon: Award, label: "Sur-mesure", desc: "Chaque stratégie construite autour de votre situation unique" },
    { icon: BarChart3, label: "Vision globale", desc: "Vision 360° de votre patrimoine financier et immobilier" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ConstanciumHeader />

      <ConstanciumHero />

      {/* ── Services — light section ── */}
      <section id="services" className="bg-[#EDEBE5] py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Nos expertises</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0F1729] leading-tight" data-testid="text-services-headline">
                Des solutions pour<br />chaque objectif patrimonial
              </h2>
            </div>
            <Link href="/gamme" onClick={() => window.scrollTo(0, 0)}>
              <span className="inline-flex items-center gap-2 text-[#0F1729]/50 hover:text-[#D4AF37] text-sm font-medium transition-colors group whitespace-nowrap">
                Voir toute la gamme
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Service grid — séparateurs gold très légers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#E8E5DC]">
            {services.map((service, index) => (
              <ServiceModule key={index} {...service} index={index} />
            ))}
          </div>

          {/* Expertise pillars — intégrés dans la même section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-[#E8E5DC]">
            {expertises.map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0F1729] flex items-center justify-center flex-shrink-0">
                    <ItemIcon className="h-4.5 w-4.5 text-[#D4AF37]" style={{ width: "1.125rem", height: "1.125rem" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1729] text-sm mb-1">{item.label}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Approach teaser — warm cream ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Notre philosophie</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0F1729] leading-tight mb-6">
                Une démarche<br />
                <span className="italic text-[#D4AF37]">avant tout relationnelle</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-base mb-6">
                Chez Constancium, nous pratiquons ce que nous appelons la <strong className="text-[#0F1729] font-semibold">démarche relationnelle</strong>. 
                Avant de proposer des solutions financières, nous prenons le temps de vous connaître — 
                vos aspirations, vos contraintes et vos projets de vie.
              </p>
              <p className="text-gray-400 leading-relaxed text-base mb-10">
                Comme un médecin qui ne prescrit pas sans diagnostic, nous n'élaborons aucune stratégie 
                sans avoir établi un bilan patrimonial complet et approfondi.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/demarche" onClick={() => window.scrollTo(0, 0)}>
                  <span className="inline-flex items-center gap-2 bg-[#0F1729] hover:bg-[#1a2a45] text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors" data-testid="button-discover-philosophy">
                    Notre démarche
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href="/about" onClick={() => window.scrollTo(0, 0)}>
                  <span className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#0F1729] font-medium text-sm px-6 py-3 rounded-lg transition-colors">
                    À propos
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Process steps */}
            <div className="space-y-0 bg-[#F7F6F2] rounded-2xl overflow-hidden">
              {[
                { num: "01", title: "Premier rendez-vous", desc: "Un échange pour comprendre votre situation personnelle et vos objectifs de vie." },
                { num: "02", title: "Diagnostic patrimonial", desc: "Analyse approfondie de votre patrimoine financier, immobilier et fiscal." },
                { num: "03", title: "Stratégie sur-mesure", desc: "Recommandations personnalisées, adaptées à vos besoins spécifiques." },
                { num: "04", title: "Accompagnement continu", desc: "Suivi régulier pour ajuster vos stratégies selon l'évolution de votre vie." },
              ].map((step, i, arr) => (
                <div key={i} className={`flex items-start gap-5 px-8 py-6 group hover:bg-white transition-colors duration-200 ${i < arr.length - 1 ? "border-b border-[#E8E5DC]" : ""}`}>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]/35 group-hover:text-[#D4AF37]/70 transition-colors w-10 flex-shrink-0 leading-none pt-0.5 select-none">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-semibold text-[#0F1729] mb-1 text-sm">{step.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capucine / RDV section ── */}
      <CalendlySection />

      <ConstanciumFooter />
    </div>
  );
}
