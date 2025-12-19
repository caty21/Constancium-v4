import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/luxury_city_skyline_hero.png";

export default function ConstanciumHero() {
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setLineVisible(true), 500);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-secondary">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/70 to-secondary/90" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center py-32">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
          Faites grandir votre patrimoine,<br />
          <span className="text-primary">en toute confiance</span>
        </h1>
        
        <div className="relative inline-block mb-8">
          <div 
            className={`h-1 bg-primary transition-all duration-1000 ${
              lineVisible ? 'w-32' : 'w-0'
            }`}
          />
        </div>
        
        <p className="font-display text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subheadline">
          Profitez d'un accompagnement sur-mesure avec nos experts pour sécuriser vos projets de vie, vos investissements et préparer l'avenir sereinement.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#services">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              data-testid="button-our-services"
            >
              Nos Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
}
