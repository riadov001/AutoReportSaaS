import { useState } from "react";
import { AutoReportLogo } from "@/components/autoreport-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Zap, Lock, Mail } from "lucide-react";

interface Props {
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function PanelLogin({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CE1126]" />
        <div className="absolute top-1 left-0 right-0 h-px bg-[#CE1126]/20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#CE1126]/30" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px bg-white/[0.015]" style={{ left: `${(i + 1) * 16.666}%` }} />
        ))}
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center mb-10">
          <AutoReportLogo variant="icon" className="w-12 h-12 mb-4" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">AutoReport Panel</h1>
          <p className="text-[#CE1126] text-xs font-semibold uppercase tracking-[0.25em] mt-1">Administration</p>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.08] rounded-md p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@autoreport.com"
                  required
                  data-testid="input-panel-email"
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-md pl-10 pr-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/60 focus:bg-white/[0.08] transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  data-testid="input-panel-password"
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-md pl-10 pr-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/60 focus:bg-white/[0.08] transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-[#CE1126] text-sm bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-md px-4 py-2.5" data-testid="error-panel-login">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              data-testid="button-panel-login"
              className="w-full flex items-center justify-center gap-2 bg-[#CE1126] hover:bg-[#b8101f] text-white font-bold py-2.5 rounded-md transition-colors text-sm disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              {loading ? "Connexion..." : "Accéder au Panel"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Espace réservé aux administrateurs AutoReport
        </p>
      </div>
    </div>
  );
}
