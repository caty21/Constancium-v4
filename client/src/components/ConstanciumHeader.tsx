import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight, TrendingUp, Calculator, Landmark, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/Capture_d_écran_2025-10-19_194027-removebg-preview_1764180904855.png";
import { gammeCategories } from "@/constants/gamme";

export default function ConstanciumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const simulatorSubmenu = [
    { label: "Intérêts composés", href: "/simulateur#interets-composes", icon: TrendingUp, description: "Calculez la croissance de votre capital" },
    { label: "Effet levier", href: "/simulateur#effet-levier", icon: Calculator, description: "Simulez l'effet de levier du crédit" },
    { label: "Transmission", href: "/simulateur#transmission-patrimoniale", icon: Landmark, description: "Abattements, donations, nue-propriété" },
  ];

  const navItems = [
    { label: "Philosophie", href: "/demarche" },
    { label: "Gamme", href: "/gamme", submenuType: "gamme" },
    { label: "Simulateurs", href: "/simulateur", submenuType: "simulateur" },
    { label: "À Propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top info bar */}
      <div className="bg-[#0F1729] border-b border-[#D4AF37]/20 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-9 flex items-center justify-between">
          <p className="text-white/50 text-xs tracking-widest uppercase font-light">
            Constancium Patrimoine & Capital — Conseil Indépendant en Gestion de Patrimoine
          </p>
          <div className="flex items-center gap-5">
            <a href="tel:+33767694984" className="flex items-center gap-1.5 text-white/50 hover:text-[#D4AF37] text-xs transition-colors">
              <Phone className="h-3 w-3" />
              07 67 69 49 84
            </a>
            <div className="w-px h-3 bg-white/20" />
            <a href="mailto:capucine@constancium.com" className="flex items-center gap-1.5 text-white/50 hover:text-[#D4AF37] text-xs transition-colors">
              <Mail className="h-3 w-3" />
              capucine@constancium.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg border-b border-gray-100"
          : "bg-white/98 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-[70px]">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <img src={logoImage} alt="Constancium" className="h-9 w-9 object-contain" data-testid="img-logo" />
                <span className="font-serif text-xl font-bold text-[#0F1729] tracking-tight" data-testid="text-logo">
                  Constancium
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  <a
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-[#0F1729]/80 hover:text-[#0F1729] transition-colors inline-flex items-center gap-1 group"
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                    {item.submenuType && <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-80" />}
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>

                  {/* Gamme mega menu */}
                  {item.submenuType === "gamme" && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <div className="bg-white border border-gray-100 rounded-xl shadow-2xl min-w-[520px] overflow-hidden">
                        <div className="flex">
                          <div className="w-1/2 border-r border-gray-50 py-3">
                            <div className="px-4 pb-2 mb-1 border-b border-gray-50">
                              <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-widest">Catégories</span>
                            </div>
                            {gammeCategories.map((category, idx) => {
                              const CategoryIcon = category.icon;
                              return (
                                <a
                                  key={category.id}
                                  href={`/gamme?category=${category.id}`}
                                  className={`flex items-center gap-3 px-4 py-2.5 transition-all ${hoveredCategory === idx ? "bg-[#F5F3EF]" : "hover:bg-gray-50"}`}
                                  onMouseEnter={() => setHoveredCategory(idx)}
                                  data-testid={`link-gamme-${category.id}`}
                                >
                                  <div className={`p-1.5 rounded-md transition-colors ${hoveredCategory === idx ? "bg-[#D4AF37]/20" : "bg-[#D4AF37]/10"}`}>
                                    <CategoryIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
                                  </div>
                                  <span className={`text-sm font-medium transition-colors ${hoveredCategory === idx ? "text-[#0F1729]" : "text-[#0F1729]/70"}`}>
                                    {category.title}
                                  </span>
                                  <ChevronRight className={`h-3.5 w-3.5 ml-auto transition-colors ${hoveredCategory === idx ? "text-[#D4AF37]" : "text-gray-300"}`} />
                                </a>
                              );
                            })}
                          </div>
                          <div className="w-1/2 py-3 bg-[#FAFAF8]">
                            <div className="px-4 pb-2 mb-1 border-b border-gray-100">
                              <span className="text-[10px] font-semibold text-[#D4AF37]/70 uppercase tracking-widest">
                                {hoveredCategory !== null ? gammeCategories[hoveredCategory].title : "Sous-catégories"}
                              </span>
                            </div>
                            {hoveredCategory !== null ? (
                              gammeCategories[hoveredCategory].subcategories.map((sub) => (
                                <a
                                  key={sub.id}
                                  href={`/gamme?category=${gammeCategories[hoveredCategory].id}&sub=${sub.id}`}
                                  className="block px-4 py-2 text-sm text-[#0F1729]/70 hover:text-[#D4AF37] hover:bg-white transition-colors"
                                  data-testid={`link-sub-${sub.id}`}
                                >
                                  {sub.name}
                                </a>
                              ))
                            ) : (
                              <div className="px-4 py-4 text-sm text-[#0F1729]/30 italic">Survolez une catégorie</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Simulateur menu */}
                  {item.submenuType === "simulateur" && (
                    <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-white border border-gray-100 rounded-xl shadow-2xl py-2 min-w-[300px]">
                        <div className="px-4 pb-2 mb-1 border-b border-gray-50">
                          <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-widest">Simulateurs</span>
                        </div>
                        {simulatorSubmenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group/item"
                              data-testid={`link-sub-${subItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              <div className="p-1.5 bg-[#D4AF37]/10 rounded-md group-hover/item:bg-[#D4AF37]/20 transition-colors mt-0.5">
                                <SubIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
                              </div>
                              <div>
                                <span className="block text-sm font-medium text-[#0F1729] group-hover/item:text-[#D4AF37] transition-colors">
                                  {subItem.label}
                                </span>
                                <span className="text-xs text-gray-400">{subItem.description}</span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://zcal.co/i/constancium"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 bg-[#0F1729] hover:bg-[#1e3a5f] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                data-testid="button-prendre-rdv"
              >
                Prendre RDV
              </a>
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden text-[#0F1729]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="py-3 px-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-3 text-[#0F1729] text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 pb-1">
                <a
                  href="https://zcal.co/i/constancium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#0F1729] text-white text-sm font-medium px-4 py-3 rounded-lg"
                >
                  Prendre rendez-vous
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
