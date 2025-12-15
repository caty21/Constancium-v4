import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Compass, Target, Briefcase, Zap, Layers, ChevronRight } from "lucide-react";
import { gammeCategories } from "@/constants/gamme";

export default function Gamme() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const subParam = params.get('sub');

    if (categoryParam) {
      const catIndex = gammeCategories.findIndex(c => c.id === categoryParam);
      if (catIndex !== -1) {
        setActiveCategory(catIndex);
        if (subParam) {
          const subIndex = gammeCategories[catIndex].subcategories.findIndex(s => s.id === subParam);
          if (subIndex !== -1) {
            setActiveSubcategory(subIndex);
          }
        } else {
          setActiveSubcategory(0);
        }
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setActiveSubcategory(0);
    const newUrl = `/gamme?category=${gammeCategories[index].id}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleSubcategoryChange = (index: number) => {
    setActiveSubcategory(index);
    const category = gammeCategories[activeCategory];
    const newUrl = `/gamme?category=${category.id}&sub=${category.subcategories[index].id}`;
    window.history.pushState({}, '', newUrl);
  };

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'layers': return <Layers className="h-5 w-5 text-[#D4AF37]" />;
      case 'compass': return <Compass className="h-5 w-5 text-[#D4AF37]" />;
      case 'target': return <Target className="h-5 w-5 text-[#D4AF37]" />;
      case 'briefcase': return <Briefcase className="h-5 w-5 text-[#D4AF37]" />;
      case 'zap': return <Zap className="h-5 w-5 text-[#D4AF37]" />;
      default: return <Lightbulb className="h-5 w-5 text-[#D4AF37]" />;
    }
  };

  const currentCategory = gammeCategories[activeCategory];
  const currentSubcategory = currentCategory.subcategories[activeSubcategory];

  return (
    <div className="min-h-screen bg-background">
      <ConstanciumHeader />
      
      <section className="pt-24 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar - Categories */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-serif text-lg font-semibold text-[#D4AF37] mb-4 px-2">
                  Nos Gammes
                </h2>
                <nav className="space-y-1">
                  {gammeCategories.map((category, index) => {
                    const CategoryIcon = category.icon;
                    const isActive = activeCategory === index;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(index)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          isActive 
                            ? 'bg-[#D4AF37] text-[#0F1729]' 
                            : 'text-foreground hover:bg-[#D4AF37]/10'
                        }`}
                        data-testid={`sidebar-category-${category.id}`}
                      >
                        <CategoryIcon className={`h-5 w-5 ${isActive ? 'text-[#0F1729]' : 'text-[#D4AF37]'}`} />
                        <span className="font-medium text-sm">{category.title}</span>
                        <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${isActive ? 'rotate-90' : ''}`} />
                      </button>
                    );
                  })}
                </nav>

                {/* CTA */}
                <div className="mt-8 p-4 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20">
                  <p className="text-sm text-foreground/80 mb-3">
                    Besoin d'un conseil personnalisé ?
                  </p>
                  <a href="/contact">
                    <Button size="sm" className="w-full" data-testid="sidebar-cta">
                      Nous contacter
                    </Button>
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const CategoryIcon = currentCategory.icon;
                    return <CategoryIcon className="h-8 w-8 text-[#D4AF37]" />;
                  })()}
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#D4AF37]" data-testid="text-category-title">
                    {currentCategory.title}
                  </h1>
                </div>
                <p className="text-lg text-foreground/70 mt-2">
                  {currentCategory.description}
                </p>
              </div>

              {/* Subcategory Tabs with sliding underline */}
              <div className="mb-8 border-b border-[#D4AF37]/20">
                <div className="flex gap-6 flex-wrap">
                  {currentCategory.subcategories.map((subcategory, index) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategoryChange(index)}
                      className="group relative py-4 transition-all"
                      data-testid={`tab-subcategory-${subcategory.id}`}
                    >
                      <span className={`font-serif text-base font-semibold transition-colors ${
                        activeSubcategory === index
                          ? 'text-[#D4AF37]'
                          : 'text-foreground/60 group-hover:text-foreground'
                      }`}>
                        {subcategory.name}
                      </span>
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] transition-transform origin-left ${
                        activeSubcategory === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Content */}
              <div className="space-y-8">
                {/* Description - only show if there is one */}
                {currentSubcategory.description && (
                  <div className="p-6 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/10">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {currentSubcategory.name}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {currentSubcategory.description}
                    </p>
                  </div>
                )}

                {/* Items Grid - only show if there are items */}
                {currentSubcategory.items.length > 0 && (
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-foreground/80 mb-4">
                      Solutions (non exhaustif)
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentSubcategory.items.map((item, index) => (
                        <Card key={index} className="p-5 bg-card border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all" data-testid={`item-card-${index}`}>
                          <h5 className="font-serif text-base font-bold mb-2 text-[#D4AF37]">
                            {item.name}
                          </h5>
                          <p className="text-foreground/70 leading-relaxed text-sm">
                            {item.description}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Definitions - always visible, no toggle */}
                {currentSubcategory.definitions && currentSubcategory.definitions.length > 0 && (
                  <div className="pt-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentSubcategory.definitions.map((def, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-[#D4AF37]/10">
                          <div className="p-2 bg-[#D4AF37]/10 rounded-lg flex-shrink-0">
                            {getIcon(def.icon)}
                          </div>
                          <div>
                            <h5 className="font-semibold text-foreground mb-1">{def.name}</h5>
                            <p className="text-xs text-[#D4AF37] mb-2">{def.acronym}</p>
                            <p className="text-sm text-foreground/70">{def.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation to next subcategory */}
                <div className="flex items-center justify-between pt-6 border-t border-[#D4AF37]/10">
                  {activeSubcategory > 0 ? (
                    <Button
                      variant="outline"
                      onClick={() => handleSubcategoryChange(activeSubcategory - 1)}
                      className="border-[#D4AF37]/30 text-foreground"
                      data-testid="button-prev-subcategory"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
                      {currentCategory.subcategories[activeSubcategory - 1].name}
                    </Button>
                  ) : (
                    <div />
                  )}
                  {activeSubcategory < currentCategory.subcategories.length - 1 && (
                    <Button
                      variant="outline"
                      onClick={() => handleSubcategoryChange(activeSubcategory + 1)}
                      className="border-[#D4AF37]/30 text-foreground"
                      data-testid="button-next-subcategory"
                    >
                      {currentCategory.subcategories[activeSubcategory + 1].name}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
