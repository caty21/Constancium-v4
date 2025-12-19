import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <ConstanciumHeader />
      
      <section className="pt-32 pb-20 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-20">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#D4AF37]" data-testid="text-contact-headline">
              Nous Contacter
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-foreground max-w-4xl leading-relaxed font-light" data-testid="text-contact-subtitle">
              Nous sommes à votre écoute pour répondre à vos interrogations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Phone Card */}
            <Card className="p-8" data-testid="contact-card-phone">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg" data-testid="text-contact-phone-title">Téléphone</h3>
              </div>
              <p className="text-muted-foreground mb-4" data-testid="text-contact-phone-desc">
                Appelez-nous pour en savoir davantage
              </p>
              <a href="tel:+33767694984" className="font-semibold text-primary hover:underline" data-testid="link-contact-phone">
                07 67 69 49 84
              </a>
            </Card>

            {/* WhatsApp Card */}
            <Card className="p-8" data-testid="contact-card-whatsapp">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-lg" data-testid="text-contact-whatsapp-title">WhatsApp</h3>
              </div>
              <p className="text-muted-foreground mb-4" data-testid="text-contact-whatsapp-desc">
                Discutez avec nous instantanément
              </p>
              <a 
                href="https://wa.me/33767694984?text=Bonjour%20Capucine%2C%20je%20souhaite%20vous%20rencontrer%20pour%20discuter%20de%20mon%20patrimoine%20et%20de%20mes%20aspirations%20%3A%20financer%20l%27%C3%A9ducation%20de%20mes%20enfants%2C%20r%C3%A9aliser%20mes%20r%C3%AAves%20de%20voyage%2C%20acqu%C3%A9rir%20ma%20r%C3%A9sidence%20principale%20et%20pr%C3%A9parer%20mon%20avenir%20financi%C3%A8re."
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-500 hover:underline"
                data-testid="link-contact-whatsapp"
              >
                Démarrer une conversation
              </a>
            </Card>

            {/* Email Card */}
            <Card className="p-8" data-testid="contact-card-email">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg" data-testid="text-contact-email-title">Email</h3>
              </div>
              <p className="text-muted-foreground mb-4" data-testid="text-contact-email-desc">
                Envoyez-nous un message à tout moment
              </p>
              <a href="mailto:capucine@constancium.com" className="font-semibold text-primary hover:underline break-all" data-testid="link-contact-email">
                capucine@constancium.com
              </a>
            </Card>
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
