import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumHero from "@/components/ConstanciumHero";
import ServiceModule from "@/components/ServiceModule";
import CalendlySection from "@/components/CalendlySection";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import ComingSoonModal from "@/components/ComingSoonModal";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Briefcase, TrendingUp, PiggyBank, FileText, ArrowRight } from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: Briefcase,
      title: "Gestion de Patrimoine",
      description: "Optimisez votre patrimoine avec des stratégies personnalisées adaptées à vos objectifs financiers et familiaux."
    },
    {
      icon: TrendingUp,
      title: "Arbitrage des Investissements",
      description: "Optimisez vos rendements grâce à une gestion active, un arbitrage stratégique et une diversification intelligente de vos portefeuilles."
    },
    {
      icon: FileText,
      title: "Planification Successorale",
      description: "Préparez l'avenir en structurant efficacement la transmission de votre patrimoine aux générations futures."
    },
    {
      icon: PiggyBank,
      title: "Accompagnement Fiscal",
      description: "Réduisez légalement votre charge fiscale grâce à des solutions d'optimisation sophistiquées et conformes."
    }
  ];

  return (
    <div className="min-h-screen">
      <ComingSoonModal />
      <ConstanciumHeader />
      
      <ConstanciumHero />
      
      <section id="services" className="min-h-[100vh] py-24 md:py-40 bg-[#0F1729] relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Excellence & Expertise</span>
              <div className="h-px w-12 bg-[#D4AF37]"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white" data-testid="text-services-headline">
              Nos Services
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins patrimoniaux
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <ServiceModule key={index} {...service} />
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <Link href="/demarche" onClick={() => window.scrollTo(0, 0)}>
              <Button 
                className="bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-medium px-8 gap-2"
                data-testid="button-discover-philosophy"
              >
                Découvrir notre philosophie
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-white/50">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50"></div>
              <span className="text-sm tracking-wider">Accompagnement personnalisé depuis 2025</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50"></div>
            </div>
          </div>
        </div>
      </section>

      <CalendlySection />
      
      <ConstanciumFooter />
    </div>
  );
}
