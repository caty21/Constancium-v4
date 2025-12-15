import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import creditMutuelLogo from "@assets/crédit-mutuel-500x281_Nero_AI_Image_Upscaler_Photo_Face-removebg-preview_1764239547963.png";
import bnpLogo from "@assets/BNP-Paribas-Emblem_Nero_AI_Image_Upscaler_Photo_Face_1764239547963.png";
import pictetLogo from "@assets/erasebg-transformed_1764239965517.png";
import edmondLogo from "@assets/erasebg-transformed (1)_1764240024423.png";
import echiquerLogo from "@assets/logo-la-financiere-de-lechiquier_1764238940154.webp";
import vinciLogo from "@assets/vinci-immobilier-1024x398_1764240553853.jpg";
import odysseeLogo from "@assets/Capture d'écran 2025-11-27 114654 (1)_1764240574192.png";

export default function Team() {
  const partners = [
    { name: "Crédit Mutuel", logo: creditMutuelLogo },
    { name: "BNP Paribas", logo: bnpLogo },
    { name: "Edmond de Rothschild", logo: edmondLogo },
    { name: "Pictet", logo: pictetLogo },
    { name: "Echiquier", logo: echiquerLogo },
    { name: "Vinci Immobilier", logo: vinciLogo },
    { name: "Odyssée Venture", logo: odysseeLogo },
    { name: "et + encore", description: "de partenaires en investissments immobilier, placements et financements", isPlus: true }
  ];

  return (
    <div className="min-h-screen">
      <ConstanciumHeader />
      
      <section className="pt-32 pb-20 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-20">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#D4AF37]" data-testid="text-team-headline">
              Notre Équipe
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-foreground max-w-4xl leading-relaxed font-light" data-testid="text-team-subtitle">
              Excellence, partenariat et accompagnement de haut standing
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <div className="mb-16 pt-16 border-t border-primary/20">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-[#D4AF37]" data-testid="text-services-title">
                Nos Gammes de Produits et Services
              </h3>

              <div className="space-y-8">
                <div className="bg-muted/50 p-6 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Assurance-Vie et Contrats de Capitalisation</h4>
                  <p className="text-foreground/80 leading-relaxed">
                    Une gamme complète adaptée à tous les profils d'investisseurs, avec contrats de capitalisation offrant une optimisation fiscale efficace pour les patrimoines importants et permettant une transmission sécurisée de votre patrimoine.
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Investissements Immobiliers</h4>
                  <p className="text-foreground/80 leading-relaxed">
                    Accès privilégié aux SCPI de rendement et aux dispositifs de défiscalisation immobilière (Pinel, Malraux, Monuments Historiques), constituant un pilier stratégique de votre diversification patrimoniale.
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Plans d'Épargne Retraite et Stratégies Long Terme</h4>
                  <p className="text-foreground/80 leading-relaxed">
                    Accompagnement personnalisé pour la préparation de votre retraite avec des Plans d'Épargne Retraite individuels et des stratégies optimisant les avantages fiscaux selon votre situation spécifique.
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Diagnostic et Conseil Patrimonial Personnalisé</h4>
                  <p className="text-foreground/80 leading-relaxed">
                    Chaque client bénéficie d'une analyse complète de sa situation et de recommandations adaptées à son profil. Notre approche sur-mesure se distingue des solutions standardisées du marché par sa précision et sa pertinence.
                  </p>
                </div>
              </div>
            </div>

            {/* Competitive Advantage Section */}
            <div className="pt-16 border-t border-primary/20">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-[#D4AF37]" data-testid="text-competitive-advantage-title">
                Notre Avantage Compétitif
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-muted/50 p-6 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Face aux Banques Privées Traditionnelles</h4>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Accessibilité :</strong> seuils d'entrée moins restrictifs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Indépendance :</strong> accès à tous les produits du marché</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Proximité :</strong> réseau de conseillers locaux dédiés</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Face aux Cabinets Indépendants</h4>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Scale :</strong> conditions préférentielles négociées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Technologie :</strong> plateforme digitale avancée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Expertise :</strong> équipe d'analystes dédiée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Conformité :</strong> processus industrialisés robustes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/10">
                <p className="text-foreground leading-relaxed">
                  <strong>Rapport qualité-prix :</strong> Notre positionnement offre un service premium à frais compétitifs, avec une moyenne de marché tout en délivrant une expertise supérieure et une personnalisation sans équivalent.
                </p>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#D4AF37]" data-testid="text-partners-title">
                Nos Partenaires Prestigieux
              </h2>
            </div>

            <Card className="p-10 md:p-12 border-primary/20 bg-muted/50">
              <p className="text-lg text-foreground leading-relaxed mb-8" data-testid="text-partners-description">
                Nous collaborons avec les plus grandes institutions financières du marché, ce qui nous permet d'accéder à des produits premium et à un réseau de partenaires reconnus. Cette position privilégiée garantit à nos clients des solutions exclusives et une expertise de classe mondiale.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {partners.map((partner, index) => (
                  <div key={index} className="flex flex-col items-center justify-center" data-testid={`partner-${index}`}>
                    {partner.isPlus ? (
                      <>
                        <div className="w-full flex items-center justify-center p-6 rounded-lg border-2 border-[#D4AF37] bg-white hover:bg-gray-50 transition-all duration-300 mb-4 h-32">
                          <span className="text-6xl text-[#D4AF37] font-light leading-none" data-testid={`text-partner-plus-${index}`}>+</span>
                        </div>
                        <p className="font-serif text-center text-foreground font-semibold text-xs leading-tight" data-testid={`text-partner-description-${index}`}>
                          {partner.description}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-full flex items-center justify-center p-6 rounded-lg border-2 border-[#D4AF37] bg-white hover:bg-gray-50 transition-all duration-300 mb-4 h-32">
                          <img 
                            src={partner.logo}
                            alt={partner.name}
                            className="h-24 w-auto object-contain max-w-full"
                            data-testid={`img-partner-${index}`}
                          />
                        </div>
                        <p className="font-serif text-center text-foreground font-semibold text-sm" data-testid={`text-partner-name-${index}`}>
                          {partner.name}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
