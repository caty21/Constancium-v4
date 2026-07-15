import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface ServiceModuleProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  href?: string;
}

export default function ServiceModule({ icon: Icon, title, description, index = 0, href = "/gamme" }: ServiceModuleProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <a
      href={href}
      className="group block p-8 bg-white border border-gray-100 hover:border-[#D4AF37]/40 hover:shadow-xl transition-all duration-300"
      data-testid={`service-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Number */}
      <div className="flex items-start justify-between mb-6">
        <span className="font-serif text-4xl font-bold text-[#D4AF37]/25 group-hover:text-[#D4AF37]/50 transition-colors leading-none select-none">
          {num}
        </span>
        <div className="w-10 h-10 rounded-lg bg-[#0F1729]/5 group-hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors">
          <Icon className="h-5 w-5 text-[#0F1729]/50 group-hover:text-[#D4AF37] transition-colors" />
        </div>
      </div>

      {/* Separator */}
      <div className="w-8 h-px bg-[#D4AF37] mb-5 group-hover:w-12 transition-all duration-300" />

      <h3 className="font-serif text-xl font-semibold text-[#0F1729] mb-3 group-hover:text-[#0F1729] transition-colors" data-testid="text-service-title">
        {title}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed mb-5" data-testid="text-service-description">
        {description}
      </p>

      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider group-hover:gap-2.5 transition-all">
        En savoir plus
        <ArrowRight className="h-3 w-3" />
      </span>
    </a>
  );
}
