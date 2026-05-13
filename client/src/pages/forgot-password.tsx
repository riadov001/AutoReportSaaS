import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, CheckCircle, Zap } from "lucide-react";
import { AutoReportLogo } from "@/components/autoreport-logo";

const inputClass =
  "w-full bg-[#0A0A0F] border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/50 transition-colors font-mono";

const labelClass = "text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Une erreur est survenue");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmittedEmail(email);
      setEmailSent(true);
    },
    onError: (error: Error) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#05050A" }}>
        <div className="absolute inset-0 hud-grid-subtle pointer-events-none" />
        <div className="relative w-full max-w-md">
          <Link href="/signin" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la connexion
          </Link>
          <div className="hud-card rounded-md p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] text-center">
            <div className="mx-auto mb-4 w-14 h-14 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-[#22c55e]" />
            </div>
            <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.3em] mb-3">// EMAIL_ENVOYÉ</p>
            <h1 className="text-xl font-extrabold text-white tracking-tight mb-2">Email envoyé</h1>
            <p className="text-sm text-white/40 mb-1">
              Si un compte existe avec l'adresse
            </p>
            <p className="text-sm text-white font-mono mb-4">{submittedEmail}</p>
            <p className="text-xs text-white/30 mb-6">
              vous recevrez un email avec les instructions.<br />
              Vérifiez vos spams. Le lien expire dans 1 heure.
            </p>
            <button
              onClick={() => { setEmailSent(false); setEmail(""); }}
              data-testid="button-try-again"
              className="w-full py-2.5 bg-[#0A0A0F] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm rounded-md transition-colors mb-3"
            >
              Utiliser une autre adresse
            </button>
            <Link
              href="/signin"
              data-testid="link-back-to-login"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-white/40 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#05050A" }}>
      <div className="absolute inset-0 hud-grid-subtle pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link href="/signin" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à la connexion
        </Link>
        <div className="hud-card rounded-md p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <AutoReportLogo />
            </div>
            <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.3em] mb-2">// MOT_DE_PASSE_OUBLIÉ</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Mot de passe oublié</h1>
            <p className="text-xs text-white/40 mt-1">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              forgotPasswordMutation.mutate();
            }}
            className="space-y-4"
          >
            <div>
              <label className={labelClass}>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Email
                </span>
              </label>
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

            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              data-testid="button-submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#CE1126] hover:bg-[#b8101f] disabled:opacity-60 text-white font-bold text-sm rounded-md transition-colors neon-red-glow"
            >
              <Zap className="h-4 w-4" />
              {forgotPasswordMutation.isPending ? "Envoi en cours…" : "Envoyer le lien"}
            </button>

            <Link
              href="/signin"
              data-testid="link-back-to-login"
              className="block text-center w-full py-2.5 bg-[#0A0A0F] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm rounded-md transition-colors"
            >
              Retour à la connexion
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
