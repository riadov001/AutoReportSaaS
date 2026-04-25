import { useEffect, useState } from "react";
import { panelFetch, PanelUser } from "./usePanelAuth";
import { ToggleLeft, ToggleRight, Plus, Trash2, RefreshCw, Flag } from "lucide-react";

interface Props {
  user: PanelUser;
}

interface Flag {
  id: string;
  key: string;
  enabled: boolean;
  description: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

export default function PanelFeatureFlags({ user }: Props) {
  const isAdmin = user.role === "admin" || user.role === "superadmin";

  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  const [newKey, setNewKey] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newEnabled, setNewEnabled] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [maintenance, setMaintenance] = useState<boolean | null>(null);

  useEffect(() => {
    load();
    panelFetch("/api/panel/maintenance-status")
      .then(r => r.json())
      .then(d => setMaintenance(d.maintenance));
  }, []);

  const load = () => {
    setLoading(true);
    panelFetch("/api/panel/feature-flags")
      .then(r => r.json())
      .then(data => setFlags(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  const toggle = async (flag: Flag) => {
    setToggling(flag.key);
    const r = await panelFetch(`/api/panel/feature-flags/${flag.key}`, {
      method: "PATCH",
      body: JSON.stringify({ enabled: !flag.enabled }),
    });
    const updated = await r.json();
    setFlags(prev => prev.map(f => f.key === flag.key ? { ...f, enabled: updated.enabled } : f));
    setToggling(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    if (!/^[a-z0-9_]+$/.test(newKey)) {
      setCreateError("Clé invalide : minuscules, chiffres et underscores uniquement.");
      return;
    }
    setCreating(true);
    const r = await panelFetch("/api/panel/feature-flags", {
      method: "POST",
      body: JSON.stringify({ key: newKey, enabled: newEnabled, description: newDesc }),
    });
    if (r.ok) {
      const created = await r.json();
      setFlags(prev => [created, ...prev]);
      setNewKey(""); setNewDesc(""); setNewEnabled(false);
    } else {
      const err = await r.json();
      setCreateError(err.message || "Erreur");
    }
    setCreating(false);
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Supprimer le flag "${key}" ?`)) return;
    await panelFetch(`/api/panel/feature-flags/${key}`, { method: "DELETE" });
    setFlags(prev => prev.filter(f => f.key !== key));
  };

  const formatDate = (s: string | null) => {
    if (!s) return "—";
    return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Feature Flags</h1>
        <p className="text-white/40 text-sm mt-1">Activez ou désactivez des fonctionnalités dynamiquement sans redéploiement</p>
      </div>

      <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${maintenance === true ? "bg-amber-400 animate-pulse" : maintenance === false ? "bg-emerald-500" : "bg-white/20"}`} />
          <h2 className="text-sm font-bold text-white">Mode Maintenance</h2>
          <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
            maintenance === true
              ? "bg-amber-400/10 text-amber-400"
              : maintenance === false
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-white/5 text-white/30"
          }`}>
            {maintenance === null ? "Chargement..." : maintenance ? "ACTIF" : "INACTIF"}
          </span>
        </div>
        <p className="text-xs text-white/30">
          Pour activer le mode maintenance, définissez la variable d'environnement <code className="bg-white/[0.06] px-1 py-0.5 rounded text-white/60">MAINTENANCE_MODE=true</code> et redémarrez l'application. Le panel reste accessible.
        </p>
      </section>

      {isAdmin && (
        <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
          <h2 className="text-sm font-bold text-white mb-4">Créer un Flag</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white/40 block mb-1">Clé <span className="text-white/20">(ex: stripe_enabled)</span></label>
                <input
                  type="text"
                  value={newKey}
                  onChange={e => setNewKey(e.target.value.toLowerCase())}
                  placeholder="feature_key"
                  required
                  data-testid="input-flag-key"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm font-mono focus:outline-none focus:border-[#CE1126]/40"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1">Description</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Décrivez ce que contrôle ce flag"
                  data-testid="input-flag-desc"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setNewEnabled(v => !v)}
                  data-testid="toggle-flag-enabled"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  {newEnabled ? <ToggleRight className="h-5 w-5 text-emerald-400" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
                <span className="text-sm text-white/60">{newEnabled ? "Activé par défaut" : "Désactivé par défaut"}</span>
              </label>
              <button
                type="submit"
                disabled={creating || !newKey}
                data-testid="button-create-flag"
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-50"
              >
                {creating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {creating ? "Création..." : "Créer"}
              </button>
            </div>
            {createError && <p className="text-xs text-[#CE1126]">{createError}</p>}
          </form>
        </section>
      )}

      <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
        <div className="flex items-center gap-2 mb-4">
          <Flag className="h-4 w-4 text-[#CE1126]" />
          <h2 className="text-sm font-bold text-white">Flags Actifs</h2>
          <span className="ml-auto text-xs text-white/30">{flags.length} flag{flags.length !== 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-white/[0.02] rounded-md animate-pulse" />)}
          </div>
        ) : flags.length === 0 ? (
          <p className="text-sm text-white/30 text-center py-8">Aucun feature flag défini.</p>
        ) : (
          <div className="space-y-2">
            {flags.map(flag => (
              <div
                key={flag.key}
                data-testid={`row-flag-${flag.key}`}
                className="flex items-center gap-3 bg-white/[0.02] rounded-md px-3 py-3"
              >
                <button
                  onClick={() => isAdmin && toggle(flag)}
                  disabled={!isAdmin || toggling === flag.key}
                  data-testid={`toggle-flag-${flag.key}`}
                  className={`shrink-0 transition-colors ${isAdmin ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                  title={isAdmin ? (flag.enabled ? "Désactiver" : "Activer") : "Accès admin requis"}
                >
                  {toggling === flag.key ? (
                    <RefreshCw className="h-5 w-5 text-white/40 animate-spin" />
                  ) : flag.enabled ? (
                    <ToggleRight className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-white/30" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white text-sm font-mono font-medium">{flag.key}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                      flag.enabled ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.05] text-white/30"
                    }`}>
                      {flag.enabled ? "ON" : "OFF"}
                    </span>
                  </div>
                  {flag.description && (
                    <p className="text-xs text-white/30 mt-0.5 truncate">{flag.description}</p>
                  )}
                  <p className="text-[10px] text-white/20 mt-0.5">
                    Mis à jour : {formatDate(flag.updatedAt)}
                    {flag.updatedBy && ` par ${flag.updatedBy}`}
                  </p>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(flag.key)}
                    data-testid={`button-delete-flag-${flag.key}`}
                    className="shrink-0 p-1.5 text-[#CE1126]/30 hover:text-[#CE1126] transition-colors"
                    title="Supprimer ce flag"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
