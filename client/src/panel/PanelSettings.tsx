import { useEffect, useState } from "react";
import { panelFetch, PanelUser } from "./usePanelAuth";
import { Save, Plus, Trash2, Eye, EyeOff, RefreshCw, User, Shield, Key, Cpu } from "lucide-react";

interface Props {
  user: PanelUser;
}

interface PanelUserRow {
  id: string;
  email: string;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt?: string;
}

export default function PanelSettings({ user }: Props) {
  const isAdmin = user.role === "admin" || user.role === "superadmin";
  const isSuperAdmin = user.role === "superadmin";

  const [prompt, setPrompt] = useState("");
  const [promptOriginal, setPromptOriginal] = useState("");
  const [promptSaving, setPromptSaving] = useState(false);
  const [promptLoading, setPromptLoading] = useState(true);

  const [users, setUsers] = useState<PanelUserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("manager");
  const [newFirst, setNewFirst] = useState("");
  const [newLast, setNewLast] = useState("");
  const [creating, setCreating] = useState(false);

  const [selfPwd, setSelfPwd] = useState("");
  const [selfPwdSaving, setSelfPwdSaving] = useState(false);
  const [selfPwdMsg, setSelfPwdMsg] = useState("");

  const [resetTarget, setResetTarget] = useState<string | null>(null);
  const [resetPwd, setResetPwd] = useState("");
  const [resetSaving, setResetSaving] = useState(false);

  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    panelFetch("/api/panel/prompt")
      .then(r => r.json())
      .then(d => { setPrompt(d.prompt || ""); setPromptOriginal(d.prompt || ""); })
      .finally(() => setPromptLoading(false));

    if (isAdmin) {
      setUsersLoading(true);
      panelFetch("/api/panel/users")
        .then(r => r.json())
        .then(data => setUsers(Array.isArray(data) ? data : []))
        .finally(() => setUsersLoading(false));
    }
  }, [isAdmin]);

  const savePrompt = async () => {
    setPromptSaving(true);
    await panelFetch("/api/panel/prompt", { method: "PUT", body: JSON.stringify({ prompt }) });
    setPromptOriginal(prompt);
    setPromptSaving(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const r = await panelFetch("/api/panel/users", {
        method: "POST",
        body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole, firstName: newFirst, lastName: newLast }),
      });
      const newUser = await r.json();
      setUsers(prev => [newUser, ...prev]);
      setNewEmail(""); setNewPassword(""); setNewFirst(""); setNewLast(""); setNewRole("manager");
    } catch { alert("Erreur création utilisateur"); }
    setCreating(false);
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await panelFetch(`/api/panel/users/${id}`, { method: "DELETE" });
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleResetPwd = async (id: string) => {
    setResetSaving(true);
    await panelFetch(`/api/panel/users/${id}`, { method: "PUT", body: JSON.stringify({ password: resetPwd }) });
    setResetTarget(null);
    setResetPwd("");
    setResetSaving(false);
  };

  const handleSelfPwd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelfPwdSaving(true);
    setSelfPwdMsg("");
    try {
      const r = await panelFetch("/api/panel/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ newPassword: selfPwd }),
      });
      const d = await r.json();
      setSelfPwdMsg(r.ok ? "Mot de passe mis à jour !" : d.message || "Erreur");
      if (r.ok) setSelfPwd("");
    } catch { setSelfPwdMsg("Erreur réseau"); }
    setSelfPwdSaving(false);
  };

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

  const availableRoles = isSuperAdmin
    ? ["manager", "admin", "superadmin"]
    : ["manager"];

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Paramètres</h1>
        <p className="text-white/40 text-sm mt-1">Configuration du panel AutoReport</p>
      </div>

      <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
        <div className="flex items-center gap-2 mb-5">
          <Cpu className="h-4 w-4 text-[#CE1126]" />
          <h2 className="text-sm font-bold text-white">Prompt IA Personnalisé</h2>
          {!isAdmin && (
            <span className="ml-auto text-xs text-white/30 italic">Lecture seule (accès admin requis)</span>
          )}
        </div>
        {promptLoading ? (
          <div className="h-32 bg-white/[0.03] rounded-md animate-pulse" />
        ) : (
          <>
            <div className="mb-3 space-y-2">
              <p className="text-xs text-white/50">
                Si ce champ est renseigné, votre prompt <strong className="text-white/80">remplace entièrement</strong> le prompt IA par défaut pour toutes les générations de rapports.
                Laissez vide pour revenir au prompt structuré JSON (avec scores et sous-critères).
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={
                    prompt.trim()
                      ? { color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }
                      : { color: "#9ca3af", background: "rgba(156,163,175,0.08)", border: "1px solid rgba(156,163,175,0.15)" }
                  }
                >
                  <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: prompt.trim() ? "#22c55e" : "#9ca3af" }} />
                  {prompt.trim() ? "Prompt custom actif" : "Prompt par défaut actif"}
                </span>
                <span className="text-[10px] text-white/25 font-mono">
                  {prompt.trim() ? `${prompt.trim().length} caractères · variables {marque} {modele} etc. supportées` : "Rapport JSON structuré avec scores /10"}
                </span>
              </div>
            </div>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              disabled={!isAdmin}
              rows={16}
              placeholder="Ex: Tu es un expert automobile. Génère un rapport markdown structuré pour {marque} {modele} {annee} ({motorisation}, {kilometrage}). Sections : Verdict, Bilan rapide, Prix, Points forts, Points faibles, Risques, Coût annuel, Checklist, Conseils."
              data-testid="textarea-ai-prompt"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40 font-mono resize-y disabled:opacity-40 disabled:cursor-not-allowed"
            />
            {isAdmin && (
              <div className="flex items-center justify-between mt-3">
                {prompt.trim() !== promptOriginal.trim() && (
                  <span className="text-xs text-amber-400/70">● Modifications non sauvegardées</span>
                )}
                <div className="ml-auto flex gap-2">
                  {prompt.trim() && (
                    <button
                      onClick={() => setPrompt("")}
                      disabled={promptSaving}
                      className="flex items-center gap-1.5 px-3 py-2 border border-white/[0.08] text-white/40 rounded-md text-xs hover:text-white/60 hover:border-white/[0.15] transition-colors"
                    >
                      Vider (revenir au défaut)
                    </button>
                  )}
                  <button
                    onClick={savePrompt}
                    disabled={promptSaving || prompt === promptOriginal}
                    data-testid="button-save-prompt"
                    className="flex items-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-50"
                  >
                    {promptSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {promptSaving ? "Sauvegarde..." : "Sauvegarder le prompt"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
        <div className="flex items-center gap-2 mb-5">
          <Key className="h-4 w-4 text-[#CE1126]" />
          <h2 className="text-sm font-bold text-white">Mon Mot de Passe</h2>
        </div>
        <form onSubmit={handleSelfPwd} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type={showPwd ? "text" : "password"}
              value={selfPwd}
              onChange={e => setSelfPwd(e.target.value)}
              placeholder="Nouveau mot de passe"
              required
              minLength={8}
              data-testid="input-self-password"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 pr-10 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={selfPwdSaving || !selfPwd}
            data-testid="button-change-own-password"
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.07] border border-white/[0.1] text-white rounded-md text-sm font-semibold hover:bg-white/[0.1] transition-colors disabled:opacity-50"
          >
            <Key className="h-4 w-4" />
            {selfPwdSaving ? "..." : "Changer"}
          </button>
        </form>
        {selfPwdMsg && (
          <p className={`mt-3 text-sm ${selfPwdMsg.includes("!") ? "text-emerald-400" : "text-[#CE1126]"}`}>
            {selfPwdMsg}
          </p>
        )}
      </section>

      {isAdmin && (
        <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="h-4 w-4 text-[#CE1126]" />
            <h2 className="text-sm font-bold text-white">Gestion des Utilisateurs</h2>
          </div>

          <form onSubmit={handleCreateUser} className="mb-6 space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Créer un utilisateur</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newFirst}
                onChange={e => setNewFirst(e.target.value)}
                placeholder="Prénom"
                data-testid="input-new-user-first"
                className="bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
              />
              <input
                type="text"
                value={newLast}
                onChange={e => setNewLast(e.target.value)}
                placeholder="Nom"
                data-testid="input-new-user-last"
                className="bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
              />
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Email"
                required
                data-testid="input-new-user-email"
                className="bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
              />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                minLength={8}
                data-testid="input-new-user-password"
                className="bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
              />
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                data-testid="select-new-user-role"
                className="bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/40"
              >
                {availableRoles.map(r => (
                  <option key={r} value={r}>{roleLabel[r]}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={creating}
                data-testid="button-create-user"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-50"
              >
                {creating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {creating ? "Création..." : "Créer"}
              </button>
            </div>
          </form>

          {usersLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-white/[0.02] rounded-md animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-2">
              {users.map(u => (
                <div key={u.id} className="flex items-center gap-3 bg-white/[0.02] rounded-md px-3 py-2.5" data-testid={`row-user-${u.id}`}>
                  <div className="h-7 w-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                    <User className="h-3.5 w-3.5 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium truncate">
                        {u.firstName ? `${u.firstName} ${u.lastName || ""}`.trim() : u.email}
                      </span>
                      {u.id === user.id && (
                        <span className="text-xs text-white/30">(moi)</span>
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
                  {u.id !== user.id && (
                    <div className="flex items-center gap-1 shrink-0">
                      {resetTarget === u.id ? (
                        <>
                          <input
                            type="password"
                            value={resetPwd}
                            onChange={e => setResetPwd(e.target.value)}
                            placeholder="Nouveau mdp"
                            minLength={8}
                            data-testid={`input-reset-pwd-${u.id}`}
                            className="w-28 bg-white/[0.06] border border-white/[0.1] rounded px-2 py-1 text-white text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => handleResetPwd(u.id)}
                            disabled={resetSaving || !resetPwd}
                            data-testid={`button-confirm-reset-${u.id}`}
                            className="p-1.5 text-emerald-400 hover:text-emerald-300"
                          >
                            <Save className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => { setResetTarget(null); setResetPwd(""); }}
                            className="p-1.5 text-white/30 hover:text-white/60"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setResetTarget(u.id)}
                          data-testid={`button-reset-pwd-${u.id}`}
                          className="p-1.5 text-white/30 hover:text-white/60"
                          title="Réinitialiser le mot de passe"
                        >
                          <Key className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        data-testid={`button-delete-user-${u.id}`}
                        className="p-1.5 text-[#CE1126]/40 hover:text-[#CE1126]"
                        title="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
