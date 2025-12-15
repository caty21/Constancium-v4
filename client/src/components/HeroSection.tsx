import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Globe, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/hero_artisan_workshop_background.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6" data-testid="text-hero-headline">
          Handcrafted with Love, <br />Made Just for You
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subheadline">
          Discover unique handmade treasures from skilled artisans. Customize every detail to make it truly yours.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-shop-now"
          >
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-see-process"
          >
            See How It's Made
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span data-testid="text-trust-handcrafted">Handcrafted to Order</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span data-testid="text-trust-personalization">Free Personalization</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span data-testid="text-trust-shipping">Ships Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
