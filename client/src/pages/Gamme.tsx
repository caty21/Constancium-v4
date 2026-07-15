import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";
import { ArrowRight, Lightbulb, Compass, Target, Briefcase, Zap, Layers, ChevronRight } from "lucide-react";
import { gammeCategories } from "@/constants/gamme";

export default function Gamme() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    const subParam = params.get("sub");
    if (categoryParam) {
      const catIndex = gammeCategories.findIndex((c) => c.id === categoryParam);
      if (catIndex !== -1) {
        setActiveCategory(catIndex);
        if (subParam) {
          const subIndex = gammeCategories[catIndex].subcategories.findIndex((s) => s.id === subParam);
          if (subIndex !== -1) setActiveSubcategory(subIndex);
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
    window.history.pushState({}, "", `/gamme?category=${gammeCategories[index].id}`);
  };

  const handleSubcategoryChange = (index: number) => {
    setActiveSubcategory(index);
    const category = gammeCategories[activeCategory];
    window.history.pushState({}, "", `/gamme?category=${category.id}&sub=${category.subcategories[index].id}`);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "layers": return <Layers className="h-5 w-5 text-[#D4AF37]" />;
      case "compass": return <Compass className="h-5 w-5 text-[#D4AF37]" />;
      case "target": return <Target className="h-5 w-5 text-[#D4AF37]" />;
      case "briefcase": return <Briefcase className="h-5 w-5 text-[#D4AF37]" />;
      case "zap": return <Zap className="h-5 w-5 text-[#D4AF37]" />;
      default: return <Lightbulb className="h-5 w-5 text-[#D4AF37]" />;
    }
  };

  const currentCategory = gammeCategories[activeCategory];
  const currentSubcategory = currentCategory.subcategories[activeSubcategory];

  return (
    <div className="min-h-screen bg-white">
      <ConstanciumHeader />

      {/* Hero banner */}
      <section className="pt-[109px] bg-[#0F1729] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px"
        }} />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">Solutions patrimoniales</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
            Notre <span className="italic text-[#D4AF37]">Gamme</span>
          </h1>
          <p className="text-white/50 text-base mt-4 max-w-lg">
            Des solutions patrimoniales sélectionnées pour répondre à chaque objectif financier et personnel.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[#F7F6F2] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-[109px] bg-white rounded-2xl border border-[#E8E5DC] shadow-sm overflow-hidden">
                <div className="px-4 py-3.5 border-b border-[#E8E5DC] bg-[#F7F6F2]">
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">Catégories</span>
                </div>
                <nav className="p-2">
                  {gammeCategories.map((category, index) => {
                    const CategoryIcon = category.icon;
                    const isActive = activeCategory === index;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(index)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all text-sm mb-0.5 ${
                          isActive
                            ? "bg-[#0F1729] text-white"
                            : "text-[#0F1729]/60 hover:bg-[#F7F6F2] hover:text-[#0F1729]"
                        }`}
                        data-testid={`sidebar-category-${category.id}`}
                      >
                        <CategoryIcon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-[#D4AF37]" : "text-[#D4AF37]/50"}`} />
                        <span className="font-medium leading-tight flex-1">{category.title}</span>
                        <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${isActive ? "text-[#D4AF37] rotate-90" : "text-[#0F1729]/20"}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0">
              {/* Category header */}
              <div className="bg-white rounded-2xl border border-[#E8E5DC] shadow-sm p-7 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  {(() => { const CategoryIcon = currentCategory.icon; return <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-xl flex items-center justify-center border border-[#D4AF37]/20"><CategoryIcon className="h-5 w-5 text-[#D4AF37]" /></div>; })()}
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F1729]" data-testid="text-category-title">
                    {currentCategory.title}
                  </h2>
                </div>
                <div className="w-8 h-px bg-[#D4AF37] mb-3" />
                <p className="text-gray-500 leading-relaxed">{currentCategory.description}</p>
              </div>

              {/* Subcategory tabs */}
              <div className="bg-white rounded-2xl border border-[#E8E5DC] shadow-sm overflow-hidden">
                <div className="flex gap-0 border-b border-[#E8E5DC] overflow-x-auto bg-[#F7F6F2]/50">
                  {currentCategory.subcategories.map((subcategory, index) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategoryChange(index)}
                      className={`relative py-4 px-5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        activeSubcategory === index
                          ? "text-[#D4AF37] border-[#D4AF37] bg-white"
                          : "text-gray-500 border-transparent hover:text-[#0F1729] hover:bg-white/70"
                      }`}
                      data-testid={`tab-subcategory-${subcategory.id}`}
                    >
                      {subcategory.name}
                    </button>
                  ))}
                </div>

                <div className="p-6 md:p-8">
                  {/* Subcategory description */}
                  {currentSubcategory.description && (
                    <div className="p-5 bg-[#F7F6F2] rounded-xl border border-[#E8E5DC] mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-1 h-full min-h-[32px] bg-[#D4AF37] rounded-full flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#0F1729] mb-2">{currentSubcategory.name}</h3>
                          <p className="text-gray-500 leading-relaxed text-sm">{currentSubcategory.description}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Items grid */}
                  {currentSubcategory.items.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-5 bg-[#D4AF37]/40" />
                        <h4 className="font-semibold text-[#0F1729]/50 text-xs uppercase tracking-widest">
                          Solutions (non exhaustif)
                        </h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {currentSubcategory.items.map((item, index) => (
                          <div
                            key={index}
                            className="p-5 bg-[#F7F6F2] border border-[#E8E5DC] rounded-xl hover:border-[#D4AF37]/40 hover:shadow-md transition-all group"
                            data-testid={`item-card-${index}`}
                          >
                            <h5 className="font-serif text-base font-bold text-[#D4AF37] mb-2 group-hover:text-[#C9A431] transition-colors">{item.name}</h5>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Definitions */}
                  {currentSubcategory.definitions && currentSubcategory.definitions.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {currentSubcategory.definitions.map((def, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-[#F7F6F2] rounded-xl border border-[#E8E5DC] hover:border-[#D4AF37]/30 hover:shadow-sm transition-all"
                        >
                          <div className="p-2 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-lg flex-shrink-0 border border-[#D4AF37]/15">
                            {getIcon(def.icon)}
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#0F1729] text-sm mb-0.5">{def.name}</h5>
                            <p className="text-xs text-[#D4AF37] mb-1.5 font-medium tracking-wide">{def.acronym}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{def.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Navigation between subcategories */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E8E5DC]">
                    {activeSubcategory > 0 ? (
                      <button
                        onClick={() => handleSubcategoryChange(activeSubcategory - 1)}
                        className="inline-flex items-center gap-2 text-[#0F1729]/50 hover:text-[#D4AF37] text-sm font-medium transition-colors"
                        data-testid="button-prev-subcategory"
                      >
                        <ChevronRight className="h-4 w-4 rotate-180" />
                        {currentCategory.subcategories[activeSubcategory - 1].name}
                      </button>
                    ) : <div />}
                    {activeSubcategory < currentCategory.subcategories.length - 1 && (
                      <button
                        onClick={() => handleSubcategoryChange(activeSubcategory + 1)}
                        className="inline-flex items-center gap-2 text-[#0F1729]/50 hover:text-[#D4AF37] text-sm font-medium transition-colors ml-auto"
                        data-testid="button-next-subcategory"
                      >
                        {currentCategory.subcategories[activeSubcategory + 1].name}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
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
