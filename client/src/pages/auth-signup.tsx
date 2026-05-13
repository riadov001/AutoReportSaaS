import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Zap, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { AutoReportLogo } from "@/components/autoreport-logo";

const inputClass =
  "w-full bg-[#0A0A0F] border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/50 transition-colors font-mono";

const labelClass = "text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5";

export default function AuthSignUp() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const signupMutation = useMutation({
    mutationFn: async () => {
      if (form.password !== form.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }
      if (form.password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères");
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          role: "client",
        }),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Échec de l'inscription");
      }
      const loginRes = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
        credentials: "include",
      });
      return loginRes.ok;
    },
    onSuccess: (autoLoggedIn) => {
      toast({
        title: "Compte créé",
        description: autoLoggedIn ? "Bienvenue sur AutoReport !" : "Vous pouvez maintenant vous connecter.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation(autoLoggedIn ? "/dashboard" : "/signin");
    },
    onError: (err: Error) => {
      toast({ title: "Erreur d'inscription", description: err.message, variant: "destructive" });
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
            <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.3em] mb-2">// INSCRIPTION_AUTOREPORT</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Créer un compte</h1>
            <p className="text-xs text-white/40 mt-1">Accédez à votre espace AutoReport gratuitement</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5 text-center">
            {["Rapports illimités", "PDF & Excel", "Support inclus"].map((b) => (
              <div key={b} className="flex flex-col items-center gap-1 p-2 rounded bg-[#0A0A0F] border border-white/[0.06]">
                <CheckCircle2 className="h-3 w-3 text-[#22c55e]" />
                <span className="text-[9px] text-white/50 leading-tight">{b}</span>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signupMutation.mutate();
            }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Prénom</label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => upd("firstName", e.target.value)}
                  placeholder="Jean"
                  data-testid="input-firstName"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Nom</label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => upd("lastName", e.target.value)}
                  placeholder="Dupont"
                  data-testid="input-lastName"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => upd("email", e.target.value)}
                placeholder="votre@email.com"
                data-testid="input-email"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Mot de passe *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => upd("password", e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-password"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Confirmer le mot de passe *</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => upd("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-confirmPassword"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={signupMutation.isPending}
              data-testid="button-signup"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#CE1126] hover:bg-[#b8101f] disabled:opacity-60 text-white font-bold text-sm rounded-md transition-colors neon-red-glow"
            >
              <Zap className="h-4 w-4" />
              {signupMutation.isPending ? "Création…" : "Créer mon compte"}
            </button>

            <Link
              href="/signin"
              data-testid="link-go-signin"
              className="block text-center w-full py-2.5 bg-[#0A0A0F] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm rounded-md transition-colors"
            >
              Déjà inscrit ? Se connecter
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
