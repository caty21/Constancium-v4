import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Card } from "@/components/ui/card";
import capucinePhoto from "@assets/version finale (1)_1764178750894.jpg";

export default function About() {
  return (
    <div className="min-h-screen">
      <ConstanciumHeader />
      
      <section className="pt-32 pb-20 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-24 text-center md:text-left">
            <div className="mb-8">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4" data-testid="text-about-overline">
                Notre Histoire
              </p>
              <h1 className="font-serif text-6xl md:text-7xl font-bold leading-tight mb-8 text-[#D4AF37]" data-testid="text-about-headline">
                À Propos de Constancium
              </h1>
              <div className="w-16 h-1 bg-primary mb-8" />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-foreground max-w-4xl leading-relaxed font-light" data-testid="text-about-subtitle">
              Découvrez l'expertise, la passion et la vision qui guident notre approche du conseil en gestion de patrimoine
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative group" data-testid="about-image-container">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative">
                <img 
                  src={capucinePhoto} 
                  alt="Capucine Gest" 
                  className="rounded-3xl shadow-2xl w-full h-auto border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500"
                />
              </div>
            </div>
            <div>
              <div className="mb-8">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3" data-testid="text-bio-title">
                  Capucine Gest
                </h2>
                <div className="w-12 h-1 bg-primary" />
              </div>
              <div className="space-y-6 text-lg text-foreground leading-relaxed" data-testid="text-bio-content">
                <p>
                  Diplômée de l'ITEEM, école de Centrale Lille Institut, j'ai construit mon parcours à la croisée de l'ingénierie, de la finance et du conseil.
                </p>
                <p>
                  Après plusieurs expériences professionnelles, dont l'audit financier dans les services bancaires chez MAZARS à Dublin, j'ai choisi de mettre mon expertise et ma passion au service de l'accompagnement patrimonial.
                </p>
                <p>
                  Constancium, créée en novembre 2025, représente l'aboutissement de cette conviction : l'excellence patrimoniale ne devrait pas être un privilège, mais un droit accessible. À travers cette structure, je m'engage à rendre la gestion de patrimoine à la fois audacieuse, sereine et accessible, pour permettre à chacun de préparer sereinement son avenir et celui de ses proches.
                </p>
                <p className="font-serif text-xl font-semibold pt-4">
                  Capucine.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-24 mb-20">
            <div className="mb-12 text-center">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4" data-testid="text-values-overline">
                Les Piliers de Notre Approche
              </p>
              <h3 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-[#D4AF37]" data-testid="text-values-title">
                Nos Valeurs
              </h3>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Audace",
                  description: "Nous proposons des stratégies innovantes et réfléchies pour maximiser votre potentiel patrimonial."
                },
                {
                  title: "Sérénité",
                  description: "Un accompagnement rassurant basé sur l'expertise et la transparence pour vous permettre d'avancer sereinement."
                },
                {
                  title: "Accessibilité",
                  description: "Rendre la gestion de patrimoine compréhensible et accessible à tous, sans compromis sur la qualité."
                }
              ].map((value, index) => (
                <Card key={index} className="p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/50 dark:bg-white/5" data-testid={`value-card-${index}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-serif font-bold text-primary">{index + 1}</span>
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-primary" data-testid="text-value-title">
                      {value.title}
                    </h4>
                  </div>
                  <p className="text-foreground leading-relaxed text-base" data-testid="text-value-description">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
