import { useEffect, useState } from "react";
import { panelFetch, PanelUser } from "./usePanelAuth";
import { Save, Eye, EyeOff, RefreshCw, Key, Cpu } from "lucide-react";

interface Props {
  user: PanelUser;
}

export default function PanelSettings({ user }: Props) {
  const [prompt, setPrompt] = useState("");
  const [promptOriginal, setPromptOriginal] = useState("");
  const [promptSaving, setPromptSaving] = useState(false);
  const [promptLoading, setPromptLoading] = useState(true);

  const [selfPwd, setSelfPwd] = useState("");
  const [selfPwdSaving, setSelfPwdSaving] = useState(false);
  const [selfPwdMsg, setSelfPwdMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    panelFetch("/api/panel/prompt")
      .then(r => r.json())
      .then(d => { setPrompt(d.prompt || ""); setPromptOriginal(d.prompt || ""); })
      .finally(() => setPromptLoading(false));
  }, []);

  const savePrompt = async () => {
    setPromptSaving(true);
    await panelFetch("/api/panel/prompt", { method: "PUT", body: JSON.stringify({ prompt }) });
    setPromptOriginal(prompt);
    setPromptSaving(false);
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

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Paramètres</h1>
        <p className="text-white/40 text-sm mt-1">Configuration du panel AutoReport (accès Super Admin)</p>
      </div>

      <section className="bg-white/[0.03] border border-white/[0.06] rounded-md p-5">
        <div className="flex items-center gap-2 mb-5">
          <Cpu className="h-4 w-4 text-[#CE1126]" />
          <h2 className="text-sm font-bold text-white">Prompt IA Personnalisé</h2>
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
              rows={16}
              placeholder="Ex: Tu es un expert automobile. Génère un rapport markdown structuré pour {marque} {modele} {annee} ({motorisation}, {kilometrage}). Sections : Verdict, Bilan rapide, Prix, Points forts, Points faibles, Risques, Coût annuel, Checklist, Conseils."
              data-testid="textarea-ai-prompt"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40 font-mono resize-y"
            />
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
    </div>
  );
}
