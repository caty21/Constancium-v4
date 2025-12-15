import { MessageCircle, X, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const BOT_RESPONSES: { [key: string]: string } = {
  default: "Bonjour ! 👋 Je suis **Constancio**, l'assistant patrimonial de Constancium. Créé par Capucine Gest, je suis ici pour vous montrer que la gestion de patrimoine n'est PAS réservée aux ultra-riches. C'est pour VOUS, peu importe votre situation financière.\n\nQuel est votre plus grand défi financier en ce moment ?",
  "budget": "Gérer son budget, c'est le point de départ ! Comprendre vos flux d'argent (revenus, dépenses, économies) vous permet d'identifier les opportunités cachées. Souvent, on laisse 30-40% d'économies possibles simplement parce qu'on ne voit pas où va l'argent. Voulez-vous savoir comment optimiser votre situation ?",
  "épargne": "L'épargne, c'est votre première richesse ! Mais l'épargne seule n'est pas suffisante. Le vrai pouvoir, c'est de transformer cette épargne en patrimoine intelligent. Un compte courant vous rapporte 0%. Une épargne salariale, 30-45% d'économies fiscales. C'est la différence entre attendre... et progresser.",
  "investissement": "L'investissement, c'est faire travailler votre argent pour vous. Mais attention : investir sans stratégie, c'est comme naviguer sans carte. Chez Constancium, nous construisons une stratégie adaptée à VOTRE profil, VOTRE situation, VOS objectifs. Pas de solution générique.",
  "retraite": "Préparer votre retraite dès maintenant ? Brillante idée ! C'est l'un des meilleurs investissements : plus tôt vous commencez, plus l'effet de composition joue en votre faveur. Avec une bonne stratégie, vous pouvez transformer vos années de travail en liberté durable.",
  "fiscale": "L'optimisation fiscale, c'est votre droit ! Vous payez légalement les impôts... mais vous n'êtes pas obligé de payer PLUS que nécessaire. Exemple : un auto-entrepreneur peut économiser 15-30% simplement en structurant bien. C'est de l'argent que l'État vous laisse garder.",
  "succession": "Pensez à votre héritage. Sans préparation, vos héritiers perdent 45-60% en droits de succession. Avec une bonne stratégie testamentaire et patrimoniale, vous donnez PLUS à votre famille. C'est ça, une transmission intelligente.",
  "risque": "Les risques de la vie sont inévitables, mais les conséquences peuvent être anticipées ! Maladie, accident, décès... Une bonne assurance et une diversification vous protègent et protègent votre famille. Dormir tranquille, ça n'a pas de prix.",
  "capucine": "Capucine Gest est la fondatrice de Constancium. Experte en gestion patrimoniale, elle a décidé de démocratiser les services réservés aux family offices. Son mission : prouver que vous n'avez pas besoin de millions pour mériter un excellent conseil patrimonial. Vous méritez mieux.",
  "accessible": "Oui ! Constancium a été créée sur ce principe : démocratiser l'accès à des stratégies sophistiquées, jusque-là réservées aux ultra-riches. Chacun mérite un conseil expert, quel que soit son point de départ financier. C'est pour ça que nous sommes là.",
  "family office": "Un family office gère le patrimoine des familles très fortunées, avec des services d'optimisation fiscale, de placements sophistiqués, de succession. Constancium rend ces MÊMES stratégies accessibles à tous les Français. Pourquoi les riches auraient-ils le monopole de la bonne gestion ?",
  "commencer": "Commencer ? C'est simple : (1) Faites un diagnostic honnête de votre situation actuelle, (2) Définissez vos vrais objectifs (retraite, famille, voyage, liberté ?), (3) Contactez Capucine pour une première conversation. Elle construira une feuille de route spécifiquement pour VOUS.",
  "conseil": "Un vrai conseil patrimonial, c'est un échange. Nous écoutons VOS besoins, VOS rêves, VOS peurs. Puis nous analyisez votre situation complète et construisons une stratégie cohérente, pragmatique et personnalisée. Pas de boîte à outils générique : VOTRE solution.",
  "contact": "Prêt ? Voici vos options : (1) Appelez Capucine au 07 67 69 49 84, (2) Envoyez un email à capucine@constancium.com, (3) Cliquez sur WhatsApp pour une discussion instantanée. Elle répond personnellement et sera ravie de parler de VOTRE patrimoine.",
  "merci": "C'est avec plaisir ! Vous avez d'autres questions ? N'hésitez pas. Notre mission est de démystifier la gestion patrimoniale et de vous montrer que vous êtes capable de progresser financièrement. Constancium est à vos côtés.",
  "mission": "Notre mission : **Rendre accessible les produits financiers jusque-là proposés exclusivement aux family offices.** Pourquoi ? Parce que la richesse n'est pas qu'une affaire de montant initial, c'est une affaire de stratégie. Et VOUS méritez une excellente stratégie, peu importe d'où vous partez.",
};

const SUGGESTED_TOPICS = [
  "Quel est mon défi financier ?",
  "Comment optimiser fiscalement ?",
  "Que fait Constancium ?",
  "Parlez-moi de Capucine",
  "Comment commencer ?",
  "Me contacter directement",
];

export default function PatrimonialBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(BOT_RESPONSES.default);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addBotMessage = (content: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    for (const [key, response] of Object.entries(BOT_RESPONSES)) {
      if (key !== "default" && lowerInput.includes(key)) {
        return response;
      }
    }

    if (
      lowerInput.includes("bonjour") ||
      lowerInput.includes("salut") ||
      lowerInput.includes("coucou")
    ) {
      return "Bonjour ! 👋 Ravi de vous rencontrer. Comment puis-je vous aider aujourd'hui ? Posez-moi vos questions sur la gestion de patrimoine, l'optimisation fiscale, ou la succession.";
    }

    if (lowerInput.includes("merci") || lowerInput.includes("super")) {
      return BOT_RESPONSES.merci;
    }

    return "Excellente question ! Je vous conseille de nous contacter directement pour un conseil plus approfondi. Capucine sera ravie de discuter de votre situation spécifique. Avez-vous d'autres questions générales ?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    addUserMessage(input);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const response = getBotResponse(input);
      addBotMessage(response);
      setIsLoading(false);
    }, 500);
  };

  const handleSuggestedTopic = (topic: string) => {
    addUserMessage(topic);
    setIsLoading(true);

    setTimeout(() => {
      const response = getBotResponse(topic);
      addBotMessage(response);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Bot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-40 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center bg-gradient-to-br from-[#1A2332] via-[#0F1729] to-[#0F1729] hover:from-[#2A3342] hover:via-[#1F2739] hover:to-[#1F2739] border border-[#D4AF37]/30 hover:border-[#D4AF37]/50"
        data-testid="button-bot-toggle"
        aria-label="Assistant Patrimonial"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow"
        >
          <defs>
            <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#E5C158" />
              <stop offset="100%" stopColor="#B8941E" />
            </linearGradient>
          </defs>
          {/* Chat bubble */}
          <path
            d="M4 8C4 6.89543 4.89543 6 6 6H22C23.1046 6 24 6.89543 24 8V16C24 17.1046 23.1046 18 22 18H10L5.5 22V18H6C4.89543 18 4 17.1046 4 16V8Z"
            fill="url(#botGradient)"
            opacity="0.9"
          />
          {/* Accent accent circle */}
          <circle cx="12" cy="12" r="1.5" fill="#0F1729" opacity="0.6" />
          <circle cx="16" cy="12" r="1.5" fill="#0F1729" opacity="0.6" />
          <circle cx="20" cy="12" r="1.5" fill="#0F1729" opacity="0.6" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card
          className="fixed bottom-40 right-8 z-40 w-96 h-[600px] flex flex-col shadow-2xl border-primary/20 bg-background"
          data-testid="bot-chat-window"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Constancio</h3>
              <p className="text-sm text-white/70">L'expert patrimonial accessible</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              data-testid="button-close-bot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                  data-testid={`message-${message.type}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-secondary/20 text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/20 text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Suggested Topics */}
          {messages.length <= 1 && (
            <div className="border-t border-primary/20 p-3 bg-secondary/5">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Sujets suggérés :
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TOPICS.slice(0, 3).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleSuggestedTopic(topic)}
                    className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-2 py-1 rounded transition-colors"
                    data-testid={`button-topic-${topic.toLowerCase()}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-primary/20 p-3 bg-secondary/5 rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Votre question..."
                className="text-sm"
                data-testid="input-bot-message"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90"
                data-testid="button-send-bot-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
