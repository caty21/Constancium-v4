import { Linkedin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import logoImage from "@assets/Capture_d_écran_2025-10-19_194027-removebg-preview_1764180904855.png";

export default function ConstanciumFooter() {
  return (
    <footer className="bg-secondary text-white" data-testid="footer">
      <div className="border-t border-primary/30" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoImage} 
                alt="Constancium" 
                className="h-10 w-10 object-contain"
              />
              <span className="font-serif text-2xl font-bold tracking-tight">Constancium</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Expertise patrimoniale d'exception, orchestrée pour transformer votre vision en réalité financière.
            </p>
            <p className="text-[#D4AF37] font-semibold text-sm mb-4 tracking-wide">
              Suivez Capucine Gest
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/in/capucinegest/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-white/5 hover:bg-[#0A66C2] flex items-center justify-center transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/33767694984" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-white/5 hover:bg-[#25D366] flex items-center justify-center transition-colors"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary" data-testid="footer-heading-company">Société</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "À Propos", href: "/about" },
                { label: "Philosophie", href: "/demarche" },
                { label: "Littérature Juridique", href: "/litterature-juridique" }
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/70 hover:text-white transition-colors" data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary" data-testid="footer-heading-contact">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li data-testid="text-email">
                <a href="mailto:capucine@constancium.com" className="hover:text-white transition-colors">
                  capucine@constancium.com
                </a>
              </li>
              <li data-testid="text-phone-footer">
                <a href="tel:+33767694984" className="hover:text-white transition-colors">
                  07 67 69 49 84
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50" data-testid="text-copyright">
              © 2025 Constancium. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              <a href="/litterature-juridique" className="hover:text-white transition-colors" data-testid="link-privacy">Littérature Juridique</a>
              <a href="/cgv" className="hover:text-white transition-colors" data-testid="link-terms">Conditions</a>
              <a href="/cookies" className="hover:text-white transition-colors" data-testid="link-cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
