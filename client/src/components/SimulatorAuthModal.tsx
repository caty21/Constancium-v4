import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Calculator, AlertCircle, X, Eye, EyeOff } from "lucide-react";

interface SimulatorAuthModalProps {
  onAuthenticated: () => void;
  onClose?: () => void;
}

export default function SimulatorAuthModal({ onAuthenticated, onClose }: SimulatorAuthModalProps) {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setLocation("/");
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/simulator-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        sessionStorage.setItem("simulator-authenticated", "true");
        onAuthenticated();
      } else {
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1729]/95 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4">
        <div className="bg-[#0F1729] rounded-lg shadow-2xl border border-[#D4AF37]/30 relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            data-testid="button-close-auth-modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="bg-[#0F1729] p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              Accès Simulateurs
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Les simulateurs sont réservés à nos clients en consultation.
              <br />
              <span className="text-[#D4AF37]">Prenez rendez-vous pour obtenir vos accès.</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/50 border border-red-500/50 rounded-md text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-white font-medium">
                Identifiant
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Votre identifiant"
                  className="pl-10 bg-white/10 border-[#D4AF37]/30 text-white placeholder:text-white/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  required
                  data-testid="input-simulator-username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  autoComplete="current-password"
                  className="pl-10 pr-10 bg-white/10 border-[#D4AF37]/30 text-white placeholder:text-white/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  required
                  data-testid="input-simulator-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-medium py-3"
              data-testid="button-simulator-login"
            >
              {isLoading ? "Vérification..." : "Accéder aux simulateurs"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
