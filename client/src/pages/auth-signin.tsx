import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Zap, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { AutoReportLogo } from "@/components/autoreport-logo";

const inputClass =
  "w-full bg-[#0A0A0F] border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/50 transition-colors font-mono";

const labelClass = "text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5";

export default function AuthSignIn() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberedEmail"));

  const signinMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Échec de la connexion");
      }
      if (rememberMe) localStorage.setItem("rememberedEmail", email);
      else localStorage.removeItem("rememberedEmail");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({ title: "Connexion réussie", description: "Bienvenue sur AutoReport" });
      setLocation("/dashboard");
    },
    onError: (err: Error) => {
      toast({ title: "Erreur de connexion", description: err.message, variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#05050A" }}>
      <div className="absolute inset-0 hud-grid-subtle pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white mb-6 transition-colors" data-testid="link-back-home">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à l'accueil
        </Link>
        <div className="hud-card rounded-md p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <AutoReportLogo />
            </div>
            <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.3em] mb-2">// CONNEXION_AUTOREPORT</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Espace client</h1>
            <p className="text-xs text-white/40 mt-1">Connectez-vous à votre compte AutoReport</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signinMutation.mutate();
            }}
            className="space-y-4"
          >
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                data-testid="input-email"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-password"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setRememberMe((v) => !v)}
                className="flex items-center gap-2 cursor-pointer group"
                data-testid="checkbox-remember-me"
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    rememberMe
                      ? "bg-[#CE1126] border-[#CE1126]"
                      : "bg-[#0A0A0F] border-white/15 group-hover:border-white/30"
                  }`}
                >
                  {rememberMe && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                </span>
                <span className="text-xs text-white/50 select-none">Se souvenir de moi</span>
              </button>
              <Link href="/forgot-password" className="text-xs text-[#CE1126] hover:underline" data-testid="link-forgot-password">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={signinMutation.isPending}
              data-testid="button-signin"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#CE1126] hover:bg-[#b8101f] disabled:opacity-60 text-white font-bold text-sm rounded-md transition-colors neon-red-glow"
            >
              <Zap className="h-4 w-4" />
              {signinMutation.isPending ? "Connexion…" : "Se connecter"}
            </button>

            <Link
              href="/signup"
              data-testid="link-go-signup"
              className="block text-center w-full py-2.5 bg-[#0A0A0F] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm rounded-md transition-colors"
            >
              Créer un compte AutoReport
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
