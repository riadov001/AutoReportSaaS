import { useState, useEffect } from "react";
import { Shield, Cookie, X, Check, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

const CONSENT_KEY = "autoreport_gdpr_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDeletion, setShowDeletion] = useState(false);
  const [deletionEmail, setDeletionEmail] = useState("");
  const [deletionSent, setDeletionSent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }));
    setVisible(false);
  };

  const handleDeletionRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 800));
    setDeletionSent(true);
  };

  if (!visible && !showDeletion) return null;

  if (showDeletion) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-md bg-[#0A0A12] border border-white/[0.08] rounded-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-[#CE1126]" />
              <h2 className="text-sm font-bold text-white">Demande de suppression de données</h2>
            </div>
            <button onClick={() => setShowDeletion(false)} className="text-white/30 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {deletionSent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6 text-emerald-400" />
              </div>
              <p className="text-white font-semibold mb-2">Demande reçue</p>
              <p className="text-white/40 text-sm">Votre demande de suppression a été envoyée. Nous traiterons votre demande sous 30 jours conformément au RGPD.</p>
              <button onClick={() => { setShowDeletion(false); setDeletionSent(false); setDeletionEmail(""); }} className="mt-5 px-4 py-2 text-xs text-white/50 border border-white/[0.08] rounded-md hover:border-white/20 transition-colors">
                Fermer
              </button>
            </div>
          ) : (
            <>
              <p className="text-white/40 text-xs mb-4 leading-relaxed">
                Conformément à l'article 17 du RGPD, vous disposez du droit à l'effacement de vos données personnelles. Renseignez votre adresse email pour soumettre une demande de suppression.
              </p>
              <form onSubmit={handleDeletionRequest} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/30 font-mono block mb-1.5">Adresse email</label>
                  <input
                    type="email"
                    required
                    value={deletionEmail}
                    onChange={e => setDeletionEmail(e.target.value)}
                    placeholder="votre@email.com"
                    data-testid="input-deletion-email"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40"
                  />
                </div>
                <p className="text-[10px] text-white/25 leading-relaxed">
                  En soumettant ce formulaire, vous demandez la suppression de toutes les données associées à cet email. Cette action est irréversible. Délai de traitement : 30 jours maximum.
                </p>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    data-testid="button-submit-deletion"
                    className="flex-1 py-2.5 bg-[#CE1126] text-white text-xs font-bold rounded-md hover:bg-[#b8101f] transition-colors"
                  >
                    Envoyer la demande
                  </button>
                  <button type="button" onClick={() => setShowDeletion(false)} className="px-4 text-xs text-white/40 border border-white/[0.08] rounded-md hover:border-white/20 transition-colors">
                    Annuler
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-3 sm:p-4" data-testid="banner-cookie-consent">
      <div className="max-w-3xl mx-auto bg-[#0C0C16] border border-white/[0.1] rounded-md shadow-2xl overflow-hidden">
        <div className="flex items-start gap-4 p-4 sm:p-5">
          <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20 shrink-0 mt-0.5">
            <Cookie className="h-4 w-4 text-[#CE1126]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-bold text-white">Confidentialité & Cookies</h3>
              <span className="text-[9px] font-mono font-bold text-[#CE1126] bg-[#CE1126]/10 px-1.5 py-0.5 rounded uppercase tracking-wider">RGPD</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed mb-3">
              AutoReport utilise des cookies techniques nécessaires au bon fonctionnement du service. Nous ne collectons aucune donnée personnelle sans votre consentement.{" "}
              <a href="/privacy" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">Politique de confidentialité</a>
              {" "}·{" "}
              <a href="/legal" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">Mentions légales</a>
            </p>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/50 transition-colors mb-3"
              data-testid="button-toggle-cookie-details"
            >
              {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showDetails ? "Masquer les détails" : "Voir les détails"}
            </button>

            {showDetails && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-md p-3 mb-3 space-y-2">
                {[
                  { name: "Cookies techniques", desc: "Nécessaires au fonctionnement (session, préférences). Ne peuvent être refusés.", required: true },
                  { name: "Stockage local", desc: "Sauvegarde de vos préférences (thème, consentement RGPD).", required: true },
                  { name: "Analytiques", desc: "Aucun cookie analytique ou de tracking tiers n'est utilisé.", required: false, disabled: true },
                  { name: "Publicité", desc: "Aucun cookie publicitaire n'est utilisé.", required: false, disabled: true },
                ].map(item => (
                  <div key={item.name} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${item.required ? "bg-[#CE1126]" : item.disabled ? "bg-white/10" : "bg-emerald-500"}`} />
                    <div>
                      <span className="text-[10px] font-semibold text-white/60">{item.name}</span>
                      {item.required && <span className="ml-1.5 text-[9px] text-[#CE1126] uppercase">Requis</span>}
                      {item.disabled && <span className="ml-1.5 text-[9px] text-white/20 uppercase">Désactivé</span>}
                      <p className="text-[10px] text-white/30 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-white/[0.05]">
                  <button
                    onClick={() => { setVisible(false); setShowDeletion(true); }}
                    className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-[#CE1126] transition-colors"
                    data-testid="button-request-data-deletion"
                  >
                    <Trash2 className="h-3 w-3" />
                    Demander la suppression de mes données (Art. 17 RGPD)
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={accept}
                data-testid="button-accept-cookies"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-xs font-bold rounded-md transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
                Accepter
              </button>
              <button
                onClick={decline}
                data-testid="button-decline-cookies"
                className="flex items-center gap-1.5 px-4 py-2 border border-white/[0.1] hover:border-white/20 text-white/50 hover:text-white/70 text-xs font-semibold rounded-md transition-colors"
              >
                Refuser les optionnels
              </button>
              <button
                onClick={() => { setVisible(false); setShowDeletion(true); }}
                className="text-[10px] text-white/25 hover:text-white/40 transition-colors ml-1 hidden sm:block"
              >
                Supprimer mes données
              </button>
            </div>
          </div>

          <button
            onClick={decline}
            className="text-white/20 hover:text-white/40 transition-colors shrink-0"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function useCookieConsent() {
  const revoke = () => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  };
  const requestDeletion = () => {
    const event = new CustomEvent("autoreport:request-deletion");
    window.dispatchEvent(event);
  };
  const getConsent = () => {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); } catch { return null; }
  };
  return { revoke, requestDeletion, getConsent };
}
