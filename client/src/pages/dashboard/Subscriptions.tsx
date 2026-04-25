import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "./DashboardLayout";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface UserSubscription {
  id: string;
  planId: string | null;
  planName?: string;
  status: string;
  reportsUsed: number;
  reportsIncluded: number;
  currentPeriodEnd: string | null;
  createdAt: string;
}

interface Plan {
  id: string;
  name: string;
  description?: string;
  price: string;
  currency: string;
  reportsIncluded: number;
  period: string;
}

export default function Subscriptions() {
  const { data: subs, isLoading } = useQuery<UserSubscription[]>({
    queryKey: ["/api/user/payments"],
  });
  const { data: plans } = useQuery<Plan[]>({ queryKey: ["/api/plans"] });

  const active = subs?.find((s) => s.status === "active");

  const checkout = async (planId: string) => {
    try {
      const res = await fetch("/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.message || "Erreur");
    } catch {
      alert("Erreur lors du paiement");
    }
  };

  const statusIcon = (s: string) =>
    s === "active" ? <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" /> :
    s === "pending" ? <Clock className="h-3.5 w-3.5 text-[#f59e0b]" /> :
    <XCircle className="h-3.5 w-3.5 text-white/30" />;

  return (
    <DashboardLayout title="Abonnements & paiements">
      <div className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06] mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Offre actuelle</h2>
        {active ? (
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xl font-extrabold">{active.planName || "Plan"}</p>
              <p className="text-xs text-white/40 font-mono">
                {active.reportsUsed}/{active.reportsIncluded} rapports utilisés
              </p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono uppercase bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]">
              <CheckCircle2 className="h-3 w-3" /> Actif
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/50">Vous n'avez pas d'abonnement actif. Choisissez un pack ci-dessous.</p>
        )}
      </div>

      {!active && plans && plans.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {plans.map((p) => (
            <div key={p.id} className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06]" data-testid={`card-plan-${p.id}`}>
              <h3 className="font-bold text-base mb-1">{p.name}</h3>
              <p className="text-xs text-white/40 mb-3">{p.description || `${p.reportsIncluded} rapports`}</p>
              <p className="text-2xl font-extrabold font-mono mb-4 text-[#CE1126]">
                {p.price}€
              </p>
              <button
                onClick={() => checkout(p.id)}
                data-testid={`button-buy-${p.id}`}
                className="w-full py-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-xs font-bold rounded transition-colors"
              >
                Acheter
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="hud-card rounded-md bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <div className="p-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-bold uppercase tracking-wider">Historique des paiements</h2>
        </div>
        {isLoading ? (
          <p className="text-sm text-white/40 p-8 text-center">Chargement…</p>
        ) : !subs?.length ? (
          <p className="text-sm text-white/40 p-8 text-center">Aucun paiement</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Plan</th>
                  <th className="text-left px-4 py-3">Rapports</th>
                  <th className="text-right px-4 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {subs.map((s) => (
                  <tr key={s.id} data-testid={`row-payment-${s.id}`}>
                    <td className="px-4 py-3 font-mono text-xs text-white/60">{new Date(s.createdAt).toLocaleDateString("fr-FR")}</td>
                    <td className="px-4 py-3">{s.planName || "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{s.reportsUsed}/{s.reportsIncluded}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs">
                        {statusIcon(s.status)}
                        <span className="capitalize">{s.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
