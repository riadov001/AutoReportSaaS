import { useEffect, useState } from "react";
import { panelFetch, PanelUser } from "./usePanelAuth";
import {
  Plus, Trash2, Key, User, Shield, RefreshCw, Eye, EyeOff,
  Save, X, Pencil, ChevronDown,
} from "lucide-react";

interface Props {
  user: PanelUser;
}

interface PanelUserRow {
  id: string;
  email: string;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
  createdBy?: string | null;
  createdAt?: string;
}

const ROLE_LEVELS: Record<string, number> = { manager: 1, admin: 2, superadmin: 3 };

const roleLabel: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
};
const roleColor: Record<string, string> = {
  superadmin: "#FFD700",
  admin: "#CE1126",
  manager: "#4FA3E0",
};

type ModalMode = "create" | "edit" | "reset-pwd" | null;

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  firstName: string;
  lastName: string;
}

const emptyForm = (): FormState => ({
  email: "",
  password: "",
  confirmPassword: "",
  role: "manager",
  firstName: "",
  lastName: "",
});

export default function PanelUsers({ user }: Props) {
  const callerLevel = ROLE_LEVELS[user.role] ?? 0;
  const isAdmin = callerLevel >= ROLE_LEVELS.admin;
  const isSuperAdmin = user.role === "superadmin";

  const [users, setUsers] = useState<PanelUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<ModalMode>(null);
  const [editTarget, setEditTarget] = useState<PanelUserRow | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [showPwd, setShowPwd] = useState(false);
  const [resetPwd, setResetPwd] = useState("");
  const [resetTarget, setResetTarget] = useState<PanelUserRow | null>(null);
  const [resetSaving, setResetSaving] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Manager can create managers (same level, tracked via createdBy)
  // Admin can create managers only (strictly below)
  // Superadmin can create any role (including superadmin) — no restriction
  const availableRoles = isSuperAdmin
    ? ["manager", "admin", "superadmin"]
    : isAdmin
    ? ["manager"]
    : user.role === "manager"
    ? ["manager"]
    : [];

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await panelFetch("/api/panel/users");
      if (!r.ok) throw new Error("Erreur chargement");
      const data = await r.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm());
    setFormError(null);
    setShowPwd(false);
    setModal("create");
  };

  const openEdit = (u: PanelUserRow) => {
    setEditTarget(u);
    setForm({
      email: u.email,
      password: "",
      confirmPassword: "",
      role: u.role,
      firstName: u.firstName || "",
      lastName: u.lastName || "",
    });
    setFormError(null);
    setShowPwd(false);
    setModal("edit");
  };

  const openResetPwd = (u: PanelUserRow) => {
    setResetTarget(u);
    setResetPwd("");
    setResetMsg(null);
    setShowPwd(false);
    setModal("reset-pwd");
  };

  const closeModal = () => {
    setModal(null);
    setEditTarget(null);
    setResetTarget(null);
    setResetMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (modal === "create" && form.password !== form.confirmPassword) {
      setFormError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (modal === "create" && form.password.length < 8) {
      setFormError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setSaving(true);
    try {
      let r: Response;
      if (modal === "create") {
        r = await panelFetch("/api/panel/users", {
          method: "POST",
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            role: form.role,
            firstName: form.firstName || undefined,
            lastName: form.lastName || undefined,
          }),
        });
      } else {
        const body: { email: string; role: string; firstName?: string; lastName?: string; password?: string } = {
          email: form.email,
          role: form.role,
          firstName: form.firstName || undefined,
          lastName: form.lastName || undefined,
        };
        if (form.password) body.password = form.password;
        r = await panelFetch(`/api/panel/users/${editTarget!.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      }
      if (!r.ok) {
        const d = await r.json();
        setFormError(d.message || "Erreur");
        return;
      }
      const saved = await r.json();
      if (modal === "create") {
        setUsers(prev => [saved, ...prev]);
      } else {
        setUsers(prev => prev.map(u => u.id === saved.id ? saved : u));
      }
      closeModal();
    } catch {
      setFormError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  const handleResetPwd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetTarget) return;
    if (resetPwd.length < 8) { setResetMsg("Minimum 8 caractères."); return; }
    setResetSaving(true);
    setResetMsg(null);
    try {
      const r = await panelFetch(`/api/panel/users/${resetTarget.id}`, {
        method: "PUT",
        body: JSON.stringify({ password: resetPwd }),
      });
      if (!r.ok) { const d = await r.json(); setResetMsg(d.message || "Erreur"); }
      else { setResetMsg("Mot de passe réinitialisé !"); setResetPwd(""); }
    } catch { setResetMsg("Erreur réseau"); }
    setResetSaving(false);
  };

  const handleDelete = async (u: PanelUserRow) => {
    if (!confirm(`Supprimer "${u.email}" ? Cette action est irréversible.`)) return;
    setDeletingId(u.id);
    try {
      const r = await panelFetch(`/api/panel/users/${u.id}`, { method: "DELETE" });
      if (r.ok) setUsers(prev => prev.filter(x => x.id !== u.id));
      else {
        const d = await r.json();
        alert(d.message || "Erreur suppression");
      }
    } catch { alert("Erreur réseau"); }
    setDeletingId(null);
  };

  const canManage = (u: PanelUserRow) => {
    if (u.id === user.id) return false;
    if (user.role === "superadmin") return true; // superadmin: full access
    if (user.role === "manager") return u.createdBy === user.id;
    // admin: can only manage users strictly below their own level (managers only)
    return (ROLE_LEVELS[u.role] ?? 0) < (ROLE_LEVELS[user.role] ?? 0);
  };

  const canEditRole = (u: PanelUserRow) => {
    if (user.role === "superadmin") return true; // superadmin: can assign any role
    if (user.role === "manager") return false;
    // admin: can only change role of manager-level users
    return u.role === "manager";
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Utilisateurs Panel</h1>
          <p className="text-white/40 text-sm mt-1">
            {user.role === "manager"
              ? "Gestion de vos utilisateurs créés"
              : "Gestion de tous les utilisateurs du panel"}
          </p>
        </div>
        {availableRoles.length > 0 && (
          <button
            onClick={openCreate}
            data-testid="button-create-panel-user"
            className="flex items-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </button>
        )}
      </div>

      {error && (
        <div className="bg-[#CE1126]/10 border border-[#CE1126]/30 text-[#CE1126] rounded-md px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white/[0.02] border border-white/[0.06] rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#CE1126]" />
          <span className="text-sm font-semibold text-white">Membres du panel</span>
          {!loading && (
            <span className="ml-1 text-xs text-white/30 font-mono">{users.length} compte{users.length !== 1 ? "s" : ""}</span>
          )}
        </div>

        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-white/[0.02] rounded-md animate-pulse" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-white/30 text-sm">
            <User className="h-8 w-8 mx-auto mb-3 text-white/10" />
            Aucun utilisateur{user.role === "manager" ? " créé par vous" : ""}
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {users.map(u => (
              <div
                key={u.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                data-testid={`row-panel-user-${u.id}`}
              >
                <div className="h-8 w-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-white/40" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white text-sm font-medium truncate">
                      {u.firstName ? `${u.firstName} ${u.lastName || ""}`.trim() : u.email}
                    </span>
                    {u.id === user.id && (
                      <span className="text-[10px] text-white/30 font-mono">(moi)</span>
                    )}
                  </div>
                  <div className="text-xs text-white/30 truncate">{u.email}</div>
                </div>

                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                  style={{ backgroundColor: `${roleColor[u.role] || "#666"}20`, color: roleColor[u.role] || "#fff" }}
                >
                  {roleLabel[u.role] || u.role}
                </span>

                {isAdmin && u.createdBy && (() => {
                  const creator = users.find(x => x.id === u.createdBy);
                  const name = creator
                    ? (creator.firstName ? `${creator.firstName} ${creator.lastName || ""}`.trim() : creator.email)
                    : u.createdBy?.slice(0, 8) + "…";
                  return (
                    <span className="hidden lg:block text-[11px] text-white/25 font-mono shrink-0 max-w-[110px] truncate" title={name}>
                      via {name}
                    </span>
                  );
                })()}

                {u.createdAt && (
                  <span className="hidden sm:block text-[11px] text-white/20 font-mono shrink-0">
                    {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                )}

                {canManage(u) ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(u)}
                      data-testid={`button-edit-panel-user-${u.id}`}
                      className="p-1.5 text-white/30 hover:text-white/70 transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => openResetPwd(u)}
                      data-testid={`button-reset-pwd-${u.id}`}
                      className="p-1.5 text-white/30 hover:text-white/70 transition-colors"
                      title="Réinitialiser le mot de passe"
                    >
                      <Key className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(u)}
                      disabled={deletingId === u.id}
                      data-testid={`button-delete-panel-user-${u.id}`}
                      className="p-1.5 text-[#CE1126]/40 hover:text-[#CE1126] transition-colors disabled:opacity-40"
                      title="Supprimer"
                    >
                      {deletingId === u.id
                        ? <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />
                      }
                    </button>
                  </div>
                ) : (
                  <div className="w-[88px] shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md bg-[#0A0A0F] border border-white/[0.1] rounded-lg shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                {modal === "reset-pwd" ? (
                  <Key className="h-4 w-4 text-[#CE1126]" />
                ) : modal === "create" ? (
                  <Plus className="h-4 w-4 text-[#CE1126]" />
                ) : (
                  <Pencil className="h-4 w-4 text-[#CE1126]" />
                )}
                <h2 className="text-sm font-bold text-white">
                  {modal === "create" ? "Créer un utilisateur" :
                   modal === "edit" ? "Modifier l'utilisateur" :
                   "Réinitialiser le mot de passe"}
                </h2>
              </div>
              <button onClick={closeModal} className="text-white/30 hover:text-white/70 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 py-4">
              {modal === "reset-pwd" && resetTarget ? (
                <form onSubmit={handleResetPwd} className="space-y-4">
                  <p className="text-xs text-white/50">
                    Réinitialiser le mot de passe de <span className="text-white font-medium">{resetTarget.email}</span>
                  </p>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={resetPwd}
                      onChange={e => setResetPwd(e.target.value)}
                      placeholder="Nouveau mot de passe (min. 8 caractères)"
                      required
                      minLength={8}
                      data-testid="input-reset-password"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 pr-10 py-2.5 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {resetMsg && (
                    <p className={`text-sm ${resetMsg.includes("!") ? "text-emerald-400" : "text-[#CE1126]"}`}>
                      {resetMsg}
                    </p>
                  )}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-white/[0.08] text-white/50 rounded-md text-sm hover:text-white/80 hover:border-white/[0.15] transition-colors"
                    >
                      Fermer
                    </button>
                    <button
                      type="submit"
                      disabled={resetSaving || !resetPwd}
                      data-testid="button-confirm-reset-password"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-50"
                    >
                      {resetSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      {resetSaving ? "Sauvegarde..." : "Enregistrer"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">Prénom</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                        placeholder="Prénom"
                        data-testid="input-user-first"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">Nom</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        placeholder="Nom"
                        data-testid="input-user-last"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Email <span className="text-[#CE1126]">*</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@exemple.com"
                      required
                      data-testid="input-user-email"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
                    />
                  </div>

                  {canEditRole(editTarget || { id: "", email: "", role: "manager" }) || modal === "create" ? (
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">Rôle <span className="text-[#CE1126]">*</span></label>
                      <div className="relative">
                        <select
                          value={form.role}
                          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                          data-testid="select-user-role"
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#CE1126]/40 appearance-none"
                        >
                          {availableRoles.map(r => (
                            <option key={r} value={r} className="bg-[#0A0A0F]">{roleLabel[r]}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">Rôle</label>
                      <div className="px-3 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-md">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${roleColor[form.role] || "#666"}20`, color: roleColor[form.role] || "#fff" }}
                        >
                          {roleLabel[form.role] || form.role}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">
                      Mot de passe {modal === "edit" && <span className="text-white/20">(laisser vide pour ne pas modifier)</span>}
                      {modal === "create" && <span className="text-[#CE1126]"> *</span>}
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? "text" : "password"}
                        value={form.password}
                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                        placeholder={modal === "edit" ? "Nouveau mot de passe (optionnel)" : "Mot de passe (min. 8 caractères)"}
                        required={modal === "create"}
                        minLength={modal === "create" ? 8 : undefined}
                        data-testid="input-user-password"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 pr-10 py-2.5 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                      >
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {modal === "create" && (
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">Confirmer le mot de passe <span className="text-[#CE1126]">*</span></label>
                      <input
                        type={showPwd ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                        placeholder="Confirmer le mot de passe"
                        required
                        data-testid="input-user-confirm-password"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
                      />
                    </div>
                  )}

                  {formError && (
                    <div className="text-sm text-[#CE1126] bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-md px-3 py-2">
                      {formError}
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-white/[0.08] text-white/50 rounded-md text-sm hover:text-white/80 hover:border-white/[0.15] transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      data-testid="button-save-panel-user"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-50"
                    >
                      {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      {saving ? "Sauvegarde..." : modal === "create" ? "Créer" : "Enregistrer"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
