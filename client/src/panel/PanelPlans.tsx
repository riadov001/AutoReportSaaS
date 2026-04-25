import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus, Pencil, Trash2, Check, X, CreditCard, Users, TrendingUp,
  RefreshCw, Zap, Calendar, Package,
} from "lucide-react";
import { usePanelAuth } from "./usePanelAuth";

interface Plan {
  id: string;
  name: string;
  description?: string;
  price: string;
  currency: string;
  period: string;
  reportsIncluded: number;
  stripePriceId?: string;
  stripeProductId?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

interface Subscription {
  id: string;
  userId?: string;
  guestEmail?: string;
  planId?: string;
  status: string;
  reportsUsed: number;
  reportsIncluded: number;
  stripeSessionId?: string;
  currentPeriodEnd?: string;
  createdAt: string;
  plan: Plan | null;
}

const PERIOD_LABELS: Record<string, string> = {
  one_time: "Ponctuel",
  monthly: "Mensuel",
  yearly: "Annuel",
};

const STATUS_COLORS: Record<string, string> = {
  active: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
  expired: "text-white/30 bg-white/5 border-white/10",
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  currency: "eur",
  period: "monthly",
  reportsIncluded: 5,
  stripePriceId: "",
  stripeProductId: "",
  isActive: true,
  sortOrder: 0,
};

export default function PanelPlans() {
  const { token } = usePanelAuth();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"plans" | "subscriptions">("plans");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const { data: plans = [], isLoading: plansLoading } = useQuery<Plan[]>({
    queryKey: ["/api/panel/plans"],
    queryFn: () => fetch("/api/panel/plans", { headers }).then(r => r.json()),
  });

  const { data: subscriptions = [], isLoading: subsLoading } = useQuery<Subscription[]>({
    queryKey: ["/api/panel/subscriptions"],
    queryFn: () => fetch("/api/panel/subscriptions", { headers }).then(r => r.json()),
    enabled: tab === "subscriptions",
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) =>
      fetch("/api/panel/plans", { method: "POST", headers, body: JSON.stringify(data) }).then(r => r.json()),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/panel/plans"] }); resetForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof form> }) =>
      fetch(`/api/panel/plans/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }).then(r => r.json()),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/panel/plans"] }); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/panel/plans/${id}`, { method: "DELETE", headers }).then(r => r.json()),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/panel/plans"] }); setDeleteId(null); },
  });

  const resetForm = () => { setForm({ ...emptyForm }); setShowForm(false); setEditingId(null); };

  const openEdit = (plan: Plan) => {
    setForm({
      name: plan.name,
      description: plan.description || "",
      price: plan.price,
      currency: plan.currency,
      period: plan.period,
      reportsIncluded: plan.reportsIncluded,
      stripePriceId: plan.stripePriceId || "",
      stripeProductId: plan.stripeProductId || "",
      isActive: plan.isActive,
      sortOrder: plan.sortOrder,
    });
    setEditingId(plan.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, price: form.price, reportsIncluded: Number(form.reportsIncluded), sortOrder: Number(form.sortOrder) };
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const activeCount = subscriptions.filter(s => s.status === "active").length;
  const revenue = subscriptions
    .filter(s => s.status === "active" && s.plan)
    .reduce((acc, s) => acc + Number(s.plan?.price ?? 0), 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126] animate-pulse" />
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">PLANS_SUBSCRIPTION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Plans & Abonnements</h1>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-sm font-bold rounded-md transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nouveau plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Package, label: "Plans actifs", value: plans.filter(p => p.isActive).length, color: "text-[#CE1126]" },
          { icon: Users, label: "Abonnés actifs", value: activeCount, color: "text-emerald-400" },
          { icon: TrendingUp, label: "Revenu mensuel estimé", value: `${revenue.toFixed(2)} €`, color: "text-yellow-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="border border-white/[0.06] bg-white/[0.02] rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-xs text-white/40">{label}</span>
            </div>
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/[0.06]">
        {(["plans", "subscriptions"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
              tab === t ? "border-[#CE1126] text-white" : "border-transparent text-white/40 hover:text-white/60"
            }`}
          >
            {t === "plans" ? "Plans" : "Abonnements"}
          </button>
        ))}
      </div>

      {/* Plans List */}
      {tab === "plans" && (
        <div className="space-y-3">
          {plansLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 border border-white/[0.06] bg-white/[0.02] rounded-md animate-pulse" />
            ))
          ) : plans.length === 0 ? (
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-md p-10 text-center">
              <Package className="h-10 w-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">Aucun plan créé. Cliquez sur "Nouveau plan" pour commencer.</p>
            </div>
          ) : (
            plans.map(plan => (
              <div key={plan.id} className={`border rounded-md p-4 ${plan.isActive ? "border-white/[0.08] bg-white/[0.02]" : "border-white/[0.04] bg-white/[0.01] opacity-60"}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">{plan.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase ${plan.isActive ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" : "text-white/30 border-white/10"}`}>
                        {plan.isActive ? "Actif" : "Inactif"}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded border font-mono uppercase text-[#CE1126] border-[#CE1126]/20 bg-[#CE1126]/5">
                        {PERIOD_LABELS[plan.period] || plan.period}
                      </span>
                    </div>
                    {plan.description && <p className="text-xs text-white/40 mb-1">{plan.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        {Number(plan.price).toFixed(2)} {plan.currency.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {plan.reportsIncluded} rapport{plan.reportsIncluded > 1 ? "s" : ""}
                      </span>
                      {plan.stripePriceId && (
                        <span className="flex items-center gap-1 text-violet-400/60">
                          <Check className="h-3 w-3" />
                          Stripe lié
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(plan)}
                      className="p-2 rounded-md border border-white/10 hover:border-white/20 text-white/40 hover:text-white transition-all"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(plan.id)}
                      className="p-2 rounded-md border border-white/10 hover:border-red-500/30 text-white/40 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Subscriptions List */}
      {tab === "subscriptions" && (
        <div className="space-y-3">
          {subsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 border border-white/[0.06] bg-white/[0.02] rounded-md animate-pulse" />
            ))
          ) : subscriptions.length === 0 ? (
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-md p-10 text-center">
              <Users className="h-10 w-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">Aucun abonnement enregistré.</p>
            </div>
          ) : (
            subscriptions.map(sub => (
              <div key={sub.id} className="border border-white/[0.06] bg-white/[0.02] rounded-md p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white/80 truncate">
                        {sub.userId ? `Utilisateur ${sub.userId.slice(0, 8)}…` : sub.guestEmail || "Invité"}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase ${STATUS_COLORS[sub.status] || STATUS_COLORS.expired}`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      {sub.plan && <span>{sub.plan.name} — {Number(sub.plan.price).toFixed(2)} {sub.plan.currency.toUpperCase()}</span>}
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {sub.reportsUsed}/{sub.reportsIncluded} rapports
                      </span>
                      {sub.currentPeriodEnd && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Expire {new Date(sub.currentPeriodEnd).toLocaleDateString("fr-FR")}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-white/20 shrink-0">
                    {new Date(sub.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={resetForm} />
          <div className="relative z-10 w-full max-w-lg bg-[#07070F] border border-white/10 rounded-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <h2 className="font-bold text-white">{editingId ? "Modifier le plan" : "Nouveau plan"}</h2>
              <button onClick={resetForm} className="p-1.5 text-white/40 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Nom du plan *</label>
                  <input
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/50"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                    placeholder="Ex: Starter, Pro, Premium…"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Description</label>
                  <textarea
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/50 resize-none h-16"
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Description courte du plan"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Prix (€) *</label>
                  <input
                    type="number" step="0.01" min="0"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/50"
                    value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required
                    placeholder="9.99"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Période *</label>
                  <select
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/50"
                    value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
                  >
                    <option value="one_time">Ponctuel (paiement unique)</option>
                    <option value="monthly">Mensuel</option>
                    <option value="yearly">Annuel</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Rapports inclus</label>
                  <input
                    type="number" min="1"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/50"
                    value={form.reportsIncluded} onChange={e => setForm(f => ({ ...f, reportsIncluded: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Ordre d'affichage</label>
                  <input
                    type="number" min="0"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/50"
                    value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Stripe Price ID <span className="text-white/20">(pour abonnements récurrents)</span></label>
                  <input
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/50 font-mono"
                    value={form.stripePriceId} onChange={e => setForm(f => ({ ...f, stripePriceId: e.target.value }))}
                    placeholder="price_1ABC…"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={form.isActive}
                      onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
                      className="w-4 h-4 accent-[#CE1126]"
                    />
                    <span className="text-sm text-white/70">Plan actif (visible sur le site)</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-sm font-bold rounded transition-colors disabled:opacity-60"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {editingId ? "Enregistrer" : "Créer le plan"}
                </button>
                <button type="button" onClick={resetForm} className="px-4 py-2 border border-white/10 text-white/50 hover:text-white text-sm rounded transition-colors">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative z-10 w-full max-w-sm bg-[#07070F] border border-white/10 rounded-md p-6 text-center shadow-2xl">
            <Trash2 className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <p className="text-white font-bold mb-1">Supprimer ce plan ?</p>
            <p className="text-white/40 text-sm mb-4">Cette action est irréversible.</p>
            <div className="flex gap-2">
              <button
                onClick={() => deleteMutation.mutate(deleteId)}
                disabled={deleteMutation.isPending}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition-colors disabled:opacity-60"
              >
                {deleteMutation.isPending ? "..." : "Supprimer"}
              </button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border border-white/10 text-white/50 hover:text-white text-sm rounded transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
