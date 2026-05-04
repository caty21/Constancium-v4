import { useState } from "react";
import { Lock, Settings, Eye, EyeOff, CheckCircle, AlertCircle, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Screen = "login" | "dashboard";

export default function Admin() {
  const [screen, setScreen] = useState<Screen>("login");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAdminToken(data.token);
        setCurrentUsername(data.simulatorUsername);
        setCurrentPassword(data.simulatorPassword);
        setNewUsername(data.simulatorUsername);
        setNewPassword(data.simulatorPassword);
        setScreen("dashboard");
      } else {
        setLoginError(data.error || "Mot de passe administrateur incorrect.");
      }
    } catch {
      setLoginError("Erreur de connexion au serveur.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      toast({ title: "Champs requis", description: "L'identifiant et le mot de passe ne peuvent pas être vides.", variant: "destructive" });
      return;
    }
    setUpdateLoading(true);
    try {
      const res = await fetch("/api/admin/update-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: adminToken, username: newUsername.trim(), password: newPassword.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentUsername(newUsername.trim());
        setCurrentPassword(newPassword.trim());
        toast({ title: "Identifiants mis à jour", description: "Les accès au simulateur ont bien été modifiés." });
      } else {
        toast({ title: "Erreur", description: data.error || "Impossible de mettre à jour.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur serveur", description: "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setUpdateLoading(false);
    }
  };

  if (screen === "login") {
    return (
      <div className="min-h-screen bg-[#0F1729] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border border-[#D4AF37]/30">
              <Shield className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">Administration</h1>
            <p className="text-white/50 text-sm">Constancium — accès restreint</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#1a2744] border border-[#D4AF37]/20 rounded-xl p-8 space-y-5">
            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-red-900/40 border border-red-500/40 rounded-lg text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {loginError}
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-white/80 text-sm">Mot de passe administrateur</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                <Input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#D4AF37]"
                  required
                  data-testid="input-admin-password"
                  autoFocus
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold"
              data-testid="button-admin-login"
            >
              {loginLoading ? "Connexion..." : "Accéder"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1729] px-4 py-12">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/30">
              <Settings className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-white">Administration</h1>
              <p className="text-white/40 text-xs">Gestion des accès simulateurs</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setScreen("login"); setAdminPassword(""); setAdminToken(""); }}
            className="text-white/50 hover:text-white hover:bg-white/10 flex items-center gap-1.5 text-xs"
            data-testid="button-admin-logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            Déconnexion
          </Button>
        </div>

        {/* Current credentials display */}
        <div className="bg-[#1a2744] border border-[#D4AF37]/20 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <h2 className="text-white font-semibold text-sm">Identifiants actuels du simulateur</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/40 text-xs mb-1">Identifiant</p>
              <p className="text-white font-mono font-medium" data-testid="text-current-username">{currentUsername}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/40 text-xs mb-1">Mot de passe</p>
              <div className="flex items-center justify-between">
                <p className="text-white font-mono font-medium" data-testid="text-current-password">
                  {showCurrent ? currentPassword : "•".repeat(currentPassword.length)}
                </p>
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="text-white/40 hover:text-white ml-2"
                  data-testid="button-toggle-current-password"
                >
                  {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Update form */}
        <form onSubmit={handleUpdate} className="bg-[#1a2744] border border-[#D4AF37]/20 rounded-xl p-6 space-y-5">
          <h2 className="text-white font-semibold text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            Modifier les identifiants
          </h2>

          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Nouvel identifiant</Label>
            <Input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Identifiant"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#D4AF37]"
              required
              data-testid="input-new-username"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mot de passe"
                className="pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#D4AF37]"
                required
                data-testid="input-new-password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                data-testid="button-toggle-new-password"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={updateLoading}
            className="w-full bg-[#D4AF37] hover:bg-[#C9A431] text-[#0F1729] font-semibold"
            data-testid="button-update-credentials"
          >
            {updateLoading ? "Mise à jour..." : "Enregistrer les modifications"}
          </Button>
        </form>
      </div>
    </div>
  );
}
