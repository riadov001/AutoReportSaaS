import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock, CheckCircle, AlertCircle, Loader2, Eye, EyeOff, Zap } from "lucide-react";
import { AutoReportLogo } from "@/components/autoreport-logo";

const inputClass =
  "w-full bg-[#0A0A0F] border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/50 transition-colors font-mono";

const labelClass = "text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: tokenValidation, isLoading: isValidating } = useQuery({
    queryKey: ["/api/auth/reset-password", token],
    queryFn: async () => {
      const res = await fetch(`/api/auth/reset-password/${token}`);
      return res.json();
    },
    enabled: !!token,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async () => {
      if (password !== confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }
      if (password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères");
      }
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Une erreur est survenue");
      }
      return res.json();
    },
    onSuccess: () => {
      setResetSuccess(true);
      toast({
        title: "Mot de passe réinitialisé",
        description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      });
    },
    onError: (error: Error) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  const pageWrapper = (children: React.ReactNode) => (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#05050A" }}>
      <div className="absolute inset-0 hud-grid-subtle pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link href="/signin" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à la connexion
        </Link>
        <div className="hud-card rounded-md p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
          {children}
        </div>
      </div>
    </div>
  );

  if (isValidating) {
    return pageWrapper(
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-[#CE1126]" />
        <p className="mt-4 text-sm text-white/40 font-mono">Vérification du lien…</p>
      </div>
    );
  }

  if (!tokenValidation?.valid) {
    return pageWrapper(
      <div className="text-center">
        <div className="mx-auto mb-4 w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-red-400" />
        </div>
        <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.3em] mb-3">// LIEN_INVALIDE</p>
        <h1 className="text-xl font-extrabold text-white tracking-tight mb-2">Lien invalide</h1>
        <p className="text-sm text-white/40 mb-6">
          {tokenValidation?.message || "Ce lien de réinitialisation n'est pas valide ou a expiré."}
        </p>
        <Link
          href="/forgot-password"
          data-testid="button-request-new-link"
          className="block w-full py-3 bg-[#CE1126] hover:bg-[#b8101f] text-white font-bold text-sm rounded-md transition-colors neon-red-glow mb-3 text-center"
        >
          Demander un nouveau lien
        </Link>
        <Link
          href="/signin"
          data-testid="link-back-to-login"
          className="block w-full py-2.5 bg-[#0A0A0F] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm rounded-md transition-colors text-center"
        >
          Retour à la connexion
        </Link>
      </div>
    );
  }

  if (resetSuccess) {
    return pageWrapper(
      <div className="text-center">
        <div className="mx-auto mb-4 w-14 h-14 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-[#22c55e]" />
        </div>
        <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.3em] mb-3">// MOT_DE_PASSE_RÉINITIALISÉ</p>
        <h1 className="text-xl font-extrabold text-white tracking-tight mb-2">Mot de passe réinitialisé</h1>
        <p className="text-sm text-white/40 mb-6">
          Votre mot de passe a été modifié avec succès.
        </p>
        <Link
          href="/signin"
          data-testid="button-go-to-login"
          className="block w-full py-3 bg-[#CE1126] hover:bg-[#b8101f] text-white font-bold text-sm rounded-md transition-colors neon-red-glow text-center"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  return pageWrapper(
    <>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <AutoReportLogo />
        </div>
        <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.3em] mb-2">// RÉINITIALISATION</p>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Nouveau mot de passe</h1>
        <p className="text-xs text-white/40 mt-1">Choisissez un nouveau mot de passe sécurisé</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetPasswordMutation.mutate();
        }}
        className="space-y-4"
      >
        <div>
          <label className={labelClass}>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> Nouveau mot de passe
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 caractères"
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
          <label className={labelClass}>Confirmer le mot de passe</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Répétez le mot de passe"
              data-testid="input-confirm-password"
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
          disabled={resetPasswordMutation.isPending}
          data-testid="button-submit"
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#CE1126] hover:bg-[#b8101f] disabled:opacity-60 text-white font-bold text-sm rounded-md transition-colors neon-red-glow"
        >
          <Zap className="h-4 w-4" />
          {resetPasswordMutation.isPending ? "Réinitialisation…" : "Réinitialiser le mot de passe"}
        </button>

        <Link
          href="/signin"
          data-testid="link-back-to-login"
          className="block text-center w-full py-2.5 bg-[#0A0A0F] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm rounded-md transition-colors"
        >
          Retour à la connexion
        </Link>
      </form>
    </>
  );
}
