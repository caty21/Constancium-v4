import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Mail, Phone, MessageCircle, ArrowRight, Calendar } from "lucide-react";

const contacts = [
  {
    icon: Phone,
    title: "Téléphone",
    description: "Disponible en semaine de 9h à 18h",
    action: "07 67 69 49 84",
    href: "tel:+33767694984",
    testId: "contact-card-phone",
    actionTestId: "link-contact-phone",
    color: "bg-[#D4AF37]/10 text-[#D4AF37]",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Pour un échange rapide et informel",
    action: "Démarrer une conversation",
    href: "https://wa.me/33767694984?text=Bonjour%20Capucine%2C%20je%20souhaite%20vous%20rencontrer%20pour%20discuter%20de%20mon%20patrimoine.",
    testId: "contact-card-whatsapp",
    actionTestId: "link-contact-whatsapp",
    color: "bg-green-50 text-green-600",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    description: "Réponse assurée sous 24h ouvrées",
    action: "capucine@constancium.com",
    href: "mailto:capucine@constancium.com",
    testId: "contact-card-email",
    actionTestId: "link-contact-email",
    color: "bg-[#D4AF37]/10 text-[#D4AF37]",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <ConstanciumHeader />

      {/* Hero banner */}
      <section className="pt-[109px] bg-[#0F1729]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Nous rejoindre</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-contact-headline">
            Nous Contacter
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-xl" data-testid="text-contact-subtitle">
            Nous sommes à votre écoute pour répondre à toutes vos interrogations patrimoniales.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="bg-[#FAFAF8] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="bg-white rounded-2xl border border-gray-100 p-8 hover:border-[#D4AF37]/30 hover:shadow-lg transition-all duration-300"
                  data-testid={c.testId}
                >
                  <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center mb-5`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0F1729] mb-2" data-testid={`text-${c.testId}-title`}>
                    {c.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5" data-testid={`text-${c.testId}-desc`}>
                    {c.description}
                  </p>
                  <div className="w-6 h-px bg-[#D4AF37]/50 mb-5" />
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 font-semibold text-[#D4AF37] hover:text-[#C9A431] text-sm transition-colors group"
                    data-testid={c.actionTestId}
                  >
                    {c.action}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* RDV CTA */}
          <div className="bg-[#0F1729] rounded-2xl p-10 md:p-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#D4AF37]" />
              </div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Prenez rendez-vous directement
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Le premier échange est offert et sans engagement. 
              Choisissez le créneau qui vous convient.
            </p>
            <a
              href="mailto:capucine@constancium.com"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm"
            >
              Envoyer un email
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
