import { useEffect, useState } from "react";
import { panelFetch, PanelUser } from "./usePanelAuth";
import { Save, Eye, EyeOff, RefreshCw, Key, Cpu, Globe, CreditCard, Zap } from "lucide-react";

interface Props {
  user: PanelUser;
}

const ROLE_LEVELS: Record<string, number> = { manager: 1, admin: 2, superadmin: 3 };

export default function PanelSettings({ user }: Props) {
  const isAdmin = (ROLE_LEVELS[user.role] ?? 0) >= ROLE_LEVELS.admin;
  const isSuperAdmin = user.role === "superadmin";

  // ── AI Prompt ──────────────────────────────────────────────
  const [prompt, setPrompt] = useState("");
  const [promptOriginal, setPromptOriginal] = useState("");
  const [promptSaving, setPromptSaving] = useState(false);
  const [promptLoading, setPromptLoading] = useState(true);

  // ── Self password ──────────────────────────────────────────
  const [selfPwd, setSelfPwd] = useState("");
  const [selfPwdSaving, setSelfPwdSaving] = useState(false);
  const [selfPwdMsg, setSelfPwdMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // ── Landing settings (superadmin) ─────────────────────────
  const [landing, setLanding] = useState({
    appName: "",
    appTagline: "",
    heroTitle: "",
    heroSubtitle: "",
    heroCta: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    footerCopyright: "",
  });
  const [landingOriginal, setLandingOriginal] = useState({ ...landing });
  const [landingSaving, setLandingSaving] = useState(false);
  const [landingMsg, setLandingMsg] = useState("");

  // ── API Keys (admin+) ──────────────────────────────────────
  const [stripePub, setStripePub] = useState("");
  const [stripeSecret, setStripeSecret] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [keysSaving, setKeysSaving] = useState(false);
  const [keysMsg, setKeysMsg] = useState("");

  useEffect(() => {
    panelFetch("/api/panel/prompt")
      .then(r => r.json())
      .then(d => { setPrompt(d.prompt || ""); setPromptOriginal(d.prompt || ""); })
      .finally(() => setPromptLoading(false));

    if (isSuperAdmin) {
      panelFetch("/api/panel/settings")
        .then(r => r.json())
        .then(d => {
          const vals = {
            appName: d.appName || "",
            appTagline: d.appTagline || "",
            heroTitle: d.heroTitle || "",
            heroSubtitle: d.heroSubtitle || "",
            heroCta: d.heroCta || "",
            contactEmail: d.contactEmail || "",
            contactPhone: d.contactPhone || "",
            contactAddress: d.contactAddress || "",
            footerCopyright: d.footerCopyright || "",
          };
          setLanding(vals);
          setLandingOriginal(vals);
        });
    }

    if (isAdmin) {
      panelFetch("/api/panel/keys")
        .then(r => r.json())
        .then(d => {
          setStripePub(d.stripePublishableKey || "");
          setStripeSecret(d.stripeSecretKey || "");
          setGeminiKey(d.geminiApiKey || "");
        });
    }
  }, [isAdmin, isSuperAdmin]);

  const savePrompt = async () => {
    setPromptSaving(true);
    await panelFetch("/api/panel/prompt", { method: "PUT", body: JSON.stringify({ prompt }) });
    setPromptOriginal(prompt);
    setPromptSaving(false);
  };

  const saveLanding = async () => {
    setLandingSaving(true);
    setLandingMsg("");
    try {
      const r = await panelFetch("/api/panel/settings", { method: "PUT", body: JSON.stringify(landing) });
      if (r.ok) { setLandingOriginal({ ...landing }); setLandingMsg("Paramètres sauvegardés !"); }
      else { const d = await r.json(); setLandingMsg(d.message || "Erreur"); }
    } catch { setLandingMsg("Erreur réseau"); }
    setLandingSaving(false);
  };

  const saveKeys = async () => {
    setKeysSaving(true);
    setKeysMsg("");
    try {
      const r = await panelFetch("/api/panel/keys", {
        method: "PUT",
        body: JSON.stringify({ stripePublishableKey: stripePub || null, stripeSecretKey: stripeSecret || null, geminiApiKey: geminiKey || null }),
      });
      if (r.ok) { setKeysMsg("Clés mises à jour !"); }
      else { const d = await r.json(); setKeysMsg(d.message || "Erreur"); }
    } catch { setKeysMsg("Erreur réseau"); }
    setKeysSaving(false);
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

  const landingField = (label: string, key: keyof typeof landing, placeholder?: string) => (
    <div key={key}>
      <label className="block text-xs text-white/40 mb-1">{label}</label>
      <input
        type="text"
        value={landing[key]}
        onChange={e => setLanding(prev => ({ ...prev, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
      />
    </div>
  );

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Paramètres</h1>
        <p className="text-white/40 text-sm mt-1">Configuration du panel AutoReport</p>
      </div>

      {/* Landing & Branding (superadmin only) */}
      <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="h-4 w-4 text-[#CE1126]" />
          <h2 className="text-sm font-bold text-white">Landing & Branding</h2>
          {!isSuperAdmin && (
            <span className="ml-auto text-xs text-white/30 italic">Réservé au Super Admin</span>
          )}
        </div>
        {isSuperAdmin ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {landingField("Nom de l'application", "appName", "AutoReport")}
              {landingField("Tagline", "appTagline", "Rapports automobiles intelligents…")}
              {landingField("Titre Hero", "heroTitle")}
              {landingField("Sous-titre Hero", "heroSubtitle")}
              {landingField("Texte CTA", "heroCta", "Analyser mon véhicule")}
              {landingField("Email contact", "contactEmail", "support@autoreport.com")}
              {landingField("Téléphone contact", "contactPhone", "+33 01 00 00 00 00")}
              {landingField("Adresse contact", "contactAddress")}
              {landingField("Pied de page copyright", "footerCopyright")}
            </div>
            <div className="flex items-center justify-between pt-2">
              {landingMsg && (
                <span className={`text-sm ${landingMsg.includes("!") ? "text-emerald-400" : "text-[#CE1126]"}`}>
                  {landingMsg}
                </span>
              )}
              <button
                onClick={saveLanding}
                disabled={landingSaving || JSON.stringify(landing) === JSON.stringify(landingOriginal)}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-50"
              >
                {landingSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {landingSaving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white/25 text-sm italic">
            La modification de la landing page, du nom de l'app et du branding est réservée au Super Admin.
          </p>
        )}
      </section>

      {/* API Keys — Stripe & Gemini (admin+) */}
      <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
        <div className="flex items-center gap-2 mb-5">
          <Key className="h-4 w-4 text-[#CE1126]" />
          <h2 className="text-sm font-bold text-white">Clés API</h2>
          {!isAdmin && (
            <span className="ml-auto text-xs text-white/30 italic">Réservé aux Admins</span>
          )}
        </div>
        {isAdmin ? (
          <div className="space-y-5">
            {/* Stripe */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Stripe</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-white/40 mb-1">Clé publique (publishable key)</label>
                  <input
                    type="text"
                    value={stripePub}
                    onChange={e => setStripePub(e.target.value)}
                    placeholder="pk_live_..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm font-mono focus:outline-none focus:border-[#CE1126]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1">Clé secrète (secret key)</label>
                  <div className="relative">
                    <input
                      type={showStripeSecret ? "text" : "password"}
                      value={stripeSecret}
                      onChange={e => setStripeSecret(e.target.value)}
                      placeholder="sk_live_..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 pr-10 py-2 text-white placeholder:text-white/20 text-sm font-mono focus:outline-none focus:border-[#CE1126]/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStripeSecret(!showStripeSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showStripeSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Gemini */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-yellow-400" />
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Gemini IA</span>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Clé API Gemini</label>
                <div className="relative">
                  <input
                    type={showGeminiKey ? "text" : "password"}
                    value={geminiKey}
                    onChange={e => setGeminiKey(e.target.value)}
                    placeholder="AIza..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 pr-10 py-2 text-white placeholder:text-white/20 text-sm font-mono focus:outline-none focus:border-[#CE1126]/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    {showGeminiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              {keysMsg && (
                <span className={`text-sm ${keysMsg.includes("!") ? "text-emerald-400" : "text-[#CE1126]"}`}>
                  {keysMsg}
                </span>
              )}
              <button
                onClick={saveKeys}
                disabled={keysSaving}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-50"
              >
                {keysSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {keysSaving ? "Sauvegarde..." : "Sauvegarder les clés"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white/25 text-sm italic">
            La gestion des clés API Stripe et Gemini est réservée aux Admins et Super Admins.
          </p>
        )}
      </section>

      {/* AI Prompt (admin+) */}
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

      {/* Self password */}
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
    </div>
  );
}
