import { useEffect } from "react";

export default function ComingSoonModal() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F1729]/95 backdrop-blur-sm">
      <div 
        className="w-[33vw] h-[33vh] min-w-[300px] min-h-[200px] max-w-[500px] max-h-[300px] flex items-center justify-center"
      >
        <div className="bg-gradient-to-br from-[#0F1729] to-[#1a2744] rounded-lg border border-[#D4AF37]/40 shadow-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-[#D4AF37]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Consultation du site
            </h2>
            <p className="text-[#D4AF37] text-lg md:text-xl font-medium">
              bientôt disponible :)
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>
    </div>
  );
}
