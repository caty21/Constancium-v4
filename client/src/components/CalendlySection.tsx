import { Button } from "@/components/ui/button";
import { Check, Handshake, ArrowRight } from "lucide-react";
import capucinPhoto from "@assets/version finale cut (1)_1764274562139.jpg";

export default function CalendlySection() {
  return (
    <section className="py-20 md:py-32 bg-secondary" data-testid="section-calendly">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="text-calendly-headline">
              Le Parcours Patrimonial<br />
              <span className="text-primary">que nous vous proposons</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-8 leading-relaxed" data-testid="text-calendly-description">
              Le premier échange est essentiel pour établir une relation de confiance durable. Nous consacrons le temps nécessaire à vous connaître – vos objectifs financiers, votre contexte personnel et professionnel – afin de dégager les stratégies les plus adaptées à vos besoins spécifiques. À l'issue de cette première consultation, nous mettons en place naturellement l'ensemble de nos livrables personnalisés.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Analyse personnalisée de votre situation",
                "Stratégie fiscale",
                "Plan d'action sur-mesure",
                "Sans engagement"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                  <div className="mt-0.5">
                    {index === 3 ? (
                      <Handshake className="h-5 w-5 text-primary" />
                    ) : (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a href="/demarche">
                <Button variant="outline" className="border-[#D4AF37]/50 text-white hover:bg-[#D4AF37]/10" data-testid="button-en-savoir-plus">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-nous-contacter-calendly">
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <div className="rounded-2xl shadow-2xl overflow-hidden" data-testid="capucine-photo">
            <img
              src={capucinPhoto}
              alt="Capucine Gest"
              className="w-full h-[600px] object-cover"
              style={{ objectPosition: 'center calc(50% + 15px)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
