import { Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import logoImage from "@assets/Capture_d_écran_2025-10-19_194027-removebg-preview_1764180904855.png";

export default function ConstanciumFooter() {
  return (
    <footer className="bg-[#0F1729] text-white" data-testid="footer">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImage} alt="Constancium" className="h-9 w-9 object-contain" />
              <span className="font-serif text-xl font-bold tracking-tight">Constancium</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-6">
              Cabinet indépendant de conseil en gestion de patrimoine. 
              Expertise patrimoniale d'exception, orchestrée pour transformer votre vision en réalité financière.
            </p>

            {/* Contact mini */}
            <div className="space-y-2.5 mb-6">
              <a href="tel:+33767694984" className="flex items-center gap-2.5 text-white/50 hover:text-[#D4AF37] text-sm transition-colors group" data-testid="link-phone-footer">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                <span>07 67 69 49 84</span>
              </a>
              <a href="mailto:capucine@constancium.com" className="flex items-center gap-2.5 text-white/50 hover:text-[#D4AF37] text-sm transition-colors" data-testid="text-email">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                <span>capucine@constancium.com</span>
              </a>
            </div>

            <p className="text-[#D4AF37]/80 font-medium text-xs tracking-wide uppercase mb-3">Suivez Capucine Gest</p>
            <div className="flex gap-2.5">
              <a
                href="https://www.linkedin.com/in/capucinegest/"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#0A66C2] flex items-center justify-center transition-colors border border-white/10 hover:border-[#0A66C2]"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/33767694984"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#25D366] flex items-center justify-center transition-colors border border-white/10 hover:border-[#25D366]"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-5" data-testid="footer-heading-company">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Accueil", href: "/" },
                { label: "Philosophie", href: "/demarche" },
                { label: "Notre Gamme", href: "/gamme" },
                { label: "Simulateurs", href: "/simulateur" },
                { label: "À Propos", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/55 hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <ArrowRight className="h-3 w-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RDV CTA */}
          <div>
            <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-5" data-testid="footer-heading-contact">Premier rendez-vous</h4>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Le premier échange est offert et sans engagement. Prenons le temps de vous connaître.
            </p>
            <a
              href="https://zcal.co/i/constancium"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
            >
              Prendre rendez-vous
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/35" data-testid="text-copyright">
            © 2026 Constancium Patrimoine & Capital. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-xs text-white/35">
            <a href="/litterature-juridique" className="hover:text-white/70 transition-colors" data-testid="link-privacy">Littérature Juridique</a>
            <a href="/cgv" className="hover:text-white/70 transition-colors" data-testid="link-terms">Conditions générales</a>
            <a href="/cookies" className="hover:text-white/70 transition-colors" data-testid="link-cookies">Politique cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
