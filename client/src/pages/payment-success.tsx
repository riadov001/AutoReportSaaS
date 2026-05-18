import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, FileText, ArrowLeft, Zap } from "lucide-react";

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    const t = params.get("type");
    setSessionId(sid);
    setType(t);
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const isSubscription = type === "subscription" || type === "plan";

    if (isSubscription) {
      fetch("/api/subscriptions/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionId }),
      })
        .then(async (r) => {
          const data = await r.json();
          if (r.ok && data.success) {
            setStatus("success");
          } else {
            setStatus("error");
            setErrorMsg(data.message || "Confirmation impossible");
          }
        })
        .catch(() => {
          setStatus("error");
          setErrorMsg("Erreur réseau lors de la confirmation");
        });
    } else {
      fetch(`/api/payment/verify/${sessionId}`, { credentials: "include" })
        .then(async (r) => {
          if (r.ok) setStatus("success");
          else {
            const d = await r.json().catch(() => ({}));
            setStatus("error");
            setErrorMsg(d.message || "Vérification impossible");
          }
        })
        .catch(() => {
          setStatus("success");
        });
    }
  }, [sessionId, type]);

  const isSubscription = type === "subscription" || type === "plan";

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#05050A]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#CE1126]" />
          <p className="text-white/60 text-sm font-mono">
            {isSubscription ? "Activation de votre abonnement…" : "Vérification du paiement…"}
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#05050A] p-4">
        <Card className="max-w-md w-full bg-[#07070F] border-red-500/20">
          <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <Zap className="h-8 w-8 text-red-400" />
            </div>
            <h1 className="text-xl font-bold text-white text-center">Problème de confirmation</h1>
            <p className="text-white/50 text-sm text-center">
              {errorMsg || "Une erreur est survenue lors de la confirmation de votre paiement."}
            </p>
            <p className="text-white/30 text-xs text-center">
              Votre paiement a peut-être bien été effectué. Contactez-nous si le problème persiste.
            </p>
            <Button onClick={() => setLocation("/")} className="mt-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#05050A] p-4">
      <div className="max-w-md w-full bg-[#07070F] border border-white/[0.08] rounded-xl p-8 flex flex-col items-center gap-5 text-center">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-emerald-400" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-white mb-2" data-testid="text-payment-success">
            {isSubscription ? "Abonnement activé !" : "Paiement réussi !"}
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            {isSubscription
              ? "Votre abonnement est maintenant actif. Vous pouvez générer vos rapports immédiatement."
              : "Votre paiement a été traité avec succès. Merci !"}
          </p>
        </div>

        {isSubscription && (
          <div className="w-full bg-[#CE1126]/5 border border-[#CE1126]/20 rounded-md p-4">
            <p className="text-xs text-white/60 font-mono uppercase tracking-widest mb-1">// ACCÈS ACTIVÉ</p>
            <p className="text-sm text-white/80">Vos rapports supplémentaires sont disponibles dans votre espace personnel.</p>
          </div>
        )}

        <div className="flex gap-3 flex-wrap justify-center w-full mt-2">
          {isSubscription ? (
            <>
              <Button
                onClick={() => setLocation("/")}
                className="bg-[#CE1126] hover:bg-[#b8101f] text-white font-bold"
              >
                <Zap className="h-4 w-4 mr-2" />
                Générer un rapport
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation("/dashboard/reports")}
                className="border-white/10 text-white/60 hover:text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Mes rapports
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setLocation("/invoices")}
                data-testid="button-back-invoices"
                className="border-white/10 text-white/60 hover:text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Mes factures
              </Button>
              <Button
                onClick={() => setLocation("/")}
                data-testid="button-back-dashboard"
                className="bg-[#CE1126] hover:bg-[#b8101f] text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
