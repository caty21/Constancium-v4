import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "33767694984";
  const defaultMessage = "Bonjour à l'équipe Constancium, je souhaite en savoir plus concernant vos services de gestion patrimoniale.";

  const handleSend = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden mb-2">
          <div className="bg-green-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Constancium</p>
                <p className="text-white/80 text-xs">En ligne</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 bg-gray-50 min-h-[120px]">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-sm text-gray-700">
              <p className="mb-2 font-medium text-gray-900">Message suggéré :</p>
              <p className="text-gray-600 italic text-xs leading-relaxed">
                "{defaultMessage}"
              </p>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white">
            <Button
              onClick={handleSend}
              className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
              data-testid="button-whatsapp-send"
            >
              <Send className="w-4 h-4" />
              Envoyer via WhatsApp
            </Button>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        data-testid="button-whatsapp-widget"
        aria-label="Contacter via WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
