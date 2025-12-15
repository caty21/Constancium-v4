import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          toEmail: "capucine@constancium.com"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      toast({
        title: "Message envoyé",
        description: "Nous vous recontacterons dès que possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Contact Form */}
          <Card className="p-10 md:p-12" data-testid="contact-form-container">
            <h2 className="font-serif text-3xl font-bold mb-8" data-testid="text-form-title">
              Envoyez-nous un <span className="text-primary">Message</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="name" data-testid="label-name">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="email" data-testid="label-email">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="phone" data-testid="label-phone">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Votre téléphone"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="subject" data-testid="label-subject">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Objet de votre message"
                    required
                    data-testid="input-subject"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="message" data-testid="label-message">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ex: Je voudrais en savoir plus sur le produit XXX qui a attisé ma curiosité, ou je ne comprends pas ce point..."
                  required
                  className="min-h-40"
                  data-testid="textarea-message"
                />
              </div>

              <Button 
                type="submit"
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={isSubmitting}
                data-testid="button-submit-form"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
