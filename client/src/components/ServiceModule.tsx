import { LucideIcon } from "lucide-react";

interface ServiceModuleProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceModule({ icon: Icon, title, description }: ServiceModuleProps) {
  return (
    <div 
      className="group text-center p-8 rounded-lg border border-[#D4AF37]/20 bg-white/5 backdrop-blur-sm hover:border-[#D4AF37]/40 hover:bg-white/10 transition-all duration-300"
      data-testid={`service-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="mb-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="h-7 w-7 text-primary" />
        </div>
      </div>
      
      <h3 className="font-serif text-xl font-semibold mb-3 text-foreground" data-testid="text-service-title">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-service-description">
        {description}
      </p>
    </div>
  );
}
