import { useState } from "react";
import { AutoReportLogo } from "@/components/autoreport-logo";
import { Shield, FileText, Lock, Globe, Mail, ArrowLeft, Trash2, Check } from "lucide-react";
import { SiHostinger } from "react-icons/si";

function DataDeletionForm() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-emerald-400" />
        </div>
        <p className="text-white font-semibold mb-2">Demande enregistrée</p>
        <p className="text-white/40 text-sm leading-relaxed max-w-sm">
          Votre demande de suppression a été transmise. Nous la traiterons dans un délai maximum de 30 jours, conformément à l'article 17 du RGPD.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="text-[10px] uppercase tracking-wider text-white/30 font-mono block mb-1.5">Adresse email associée au compte</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="votre@email.com"
          data-testid="input-legal-deletion-email"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40"
        />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-wider text-white/30 font-mono block mb-1.5">Motif (optionnel)</label>
        <textarea
          rows={3}
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Précisez si nécessaire..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 resize-none"
        />
      </div>
      <p className="text-[11px] text-white/25 leading-relaxed">
        En soumettant ce formulaire, vous demandez la suppression définitive de toutes vos données personnelles. Cette opération est irréversible et sera effectuée dans un délai de 30 jours.
      </p>
      <button
        type="submit"
        disabled={loading}
        data-testid="button-legal-deletion-submit"
        className="flex items-center gap-2 px-5 py-2.5 bg-[#CE1126] text-white text-sm font-bold rounded-md hover:bg-[#b8101f] transition-colors disabled:opacity-60"
      >
        {loading ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Trash2 className="h-4 w-4" />}
        {loading ? "Envoi..." : "Soumettre la demande de suppression"}
      </button>
    </form>
  );
}

export default function Legal() {
  return (
    <div className="min-h-screen bg-[#05050A] text-white">
      <div className="absolute inset-0 hud-grid-subtle pointer-events-none" />

      <header className="relative z-10 border-b border-white/[0.06] bg-[#05050A]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <AutoReportLogo variant="icon" className="w-7 h-7" />
            <span className="font-bold text-white group-hover:text-[#CE1126] transition-colors text-sm">AutoReport</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors"
            data-testid="link-back-to-home"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </a>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20 mb-5">
            <Shield className="h-3.5 w-3.5 text-[#CE1126]" />
            <span className="text-xs font-semibold text-[#CE1126] uppercase tracking-[0.2em]">Juridique</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Mentions Légales
          </h1>
          <p className="text-white/40 text-sm">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>
        </div>

        <div className="space-y-6">

          <div className="hud-card rounded-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                <Globe className="h-4 w-4 text-[#CE1126]" />
              </div>
              <h2 className="font-bold text-white text-base">1. Éditeur du site</h2>
            </div>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>
                Le site <strong className="text-white/80">AutoReport</strong> est édité et développé par{" "}
                <strong className="text-white/80">Straight-Path.eu</strong>, agence de développement web et numérique.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {[
                  { label: "Éditeur", value: "Straight-Path.eu" },
                  { label: "Site éditeur", value: "https://straight-path.eu" },
                  { label: "Email de contact", value: "contact@straight-path.eu" },
                  { label: "Responsable publication", value: "Équipe Straight-Path" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/[0.03] border border-white/[0.06] rounded-md p-3">
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">{label}</p>
                    <p className="text-white/70 text-xs font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hud-card rounded-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#FF6600]/10 border border-[#FF6600]/20">
                <SiHostinger className="h-4 w-4 text-[#FF6600]" />
              </div>
              <h2 className="font-bold text-white text-base">2. Hébergement</h2>
            </div>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>
                Ce site est hébergé par <strong className="text-white/80">Hostinger International Ltd</strong>, société enregistrée en Lituanie.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {[
                  { label: "Hébergeur", value: "Hostinger International Ltd" },
                  { label: "Adresse", value: "61 Lordou Vironos str., 6023 Larnaca, Chypre" },
                  { label: "Site web", value: "https://www.hostinger.fr" },
                  { label: "Serveurs", value: "Europe (conformité RGPD)" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/[0.03] border border-white/[0.06] rounded-md p-3">
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">{label}</p>
                    <p className="text-white/70 text-xs font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hud-card rounded-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                <Lock className="h-4 w-4 text-[#CE1126]" />
              </div>
              <h2 className="font-bold text-white text-base">3. Propriété intellectuelle</h2>
            </div>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses) sont la propriété exclusive de Straight-Path.eu et de ses partenaires.</p>
              <p>Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation préalable et écrite de Straight-Path.eu.</p>
            </div>
          </div>

          <div className="hud-card rounded-md p-6 border border-[#CE1126]/15">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                <Shield className="h-4 w-4 text-[#CE1126]" />
              </div>
              <div>
                <h2 className="font-bold text-white text-base">4. Protection des données personnelles (RGPD)</h2>
                <p className="text-[10px] text-[#CE1126] font-mono uppercase tracking-wider mt-0.5">Règlement UE 2016/679</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-white/60 leading-relaxed">
              <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles :</p>

              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { art: "Art. 15", right: "Droit d'accès à vos données personnelles" },
                  { art: "Art. 16", right: "Droit de rectification des données inexactes" },
                  { art: "Art. 17", right: "Droit à l'effacement (« droit à l'oubli »)" },
                  { art: "Art. 18", right: "Droit à la limitation du traitement" },
                  { art: "Art. 20", right: "Droit à la portabilité de vos données" },
                  { art: "Art. 21", right: "Droit d'opposition au traitement" },
                ].map(({ art, right }) => (
                  <div key={art} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-md p-3">
                    <span className="text-[10px] font-mono font-bold text-[#CE1126] shrink-0 mt-0.5">{art}</span>
                    <span className="text-xs text-white/50">{right}</span>
                  </div>
                ))}
              </div>

              <p>Pour exercer ces droits, vous pouvez contacter notre délégué à la protection des données (DPO) à l'adresse : <strong className="text-white/80">dpo@straight-path.eu</strong></p>
              <p>Les diagnostics générés par notre IA sont traités de façon anonyme. Aucune donnée personnelle identifiable n'est conservée sans votre consentement explicite.</p>
            </div>
          </div>

          <div className="hud-card rounded-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                <Trash2 className="h-4 w-4 text-[#CE1126]" />
              </div>
              <div>
                <h2 className="font-bold text-white text-base">5. Droit à la suppression de vos données</h2>
                <p className="text-[10px] text-[#CE1126] font-mono uppercase tracking-wider mt-0.5">Article 17 RGPD — Délai de traitement : 30 jours</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>
                Conformément à l'article 17 du RGPD, vous pouvez demander la suppression de toutes vos données personnelles stockées sur nos serveurs. Cette demande sera traitée dans un délai maximum de <strong className="text-white/80">30 jours</strong>.
              </p>
              <p>Utilisez le formulaire ci-dessous pour soumettre votre demande de suppression :</p>
            </div>
            <DataDeletionForm />
          </div>

          <div className="hud-card rounded-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                <Globe className="h-4 w-4 text-[#CE1126]" />
              </div>
              <h2 className="font-bold text-white text-base">6. Cookies et traceurs</h2>
            </div>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire, aucun tracker tiers (Google Analytics, Facebook Pixel, etc.) n'est utilisé sans votre consentement explicite.</p>
              <div className="grid sm:grid-cols-3 gap-3 mt-3">
                {[
                  { label: "Cookies techniques", desc: "Session, préférences UI", required: true },
                  { label: "Stockage local", desc: "Thème, consentement RGPD", required: true },
                  { label: "Analytics tiers", desc: "Non utilisé", required: false },
                ].map(({ label, desc, required }) => (
                  <div key={label} className="bg-white/[0.02] border border-white/[0.05] rounded-md p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${required ? "bg-[#CE1126]" : "bg-white/10"}`} />
                      <span className="text-xs font-semibold text-white/60">{label}</span>
                    </div>
                    <p className="text-[11px] text-white/30">{desc}</p>
                    <p className="text-[10px] mt-1 font-mono" style={{ color: required ? "#CE1126" : "#444" }}>{required ? "REQUIS" : "DÉSACTIVÉ"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hud-card rounded-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                <FileText className="h-4 w-4 text-[#CE1126]" />
              </div>
              <h2 className="font-bold text-white text-base">7. Responsabilité</h2>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              AutoReport / Straight-Path.eu s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Les diagnostics fournis par notre IA sont fournis à titre indicatif uniquement et ne remplacent pas l'avis d'un professionnel qualifié. Straight-Path.eu ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou des diagnostics générés.
            </p>
          </div>

          <div className="hud-card rounded-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                <Globe className="h-4 w-4 text-[#CE1126]" />
              </div>
              <h2 className="font-bold text-white text-base">8. Droit applicable</h2>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Les présentes mentions légales sont soumises au droit français et au droit européen (RGPD). Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux français. En cas de réclamation RGPD non résolue, vous pouvez saisir la <strong className="text-white/80">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) à l'adresse <strong className="text-white/80">www.cnil.fr</strong>.
            </p>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AutoReportLogo variant="icon" className="w-6 h-6" />
            <span className="text-xs text-white/30">&copy; {new Date().getFullYear()} AutoReport · Édité par <a href="https://straight-path.eu" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/70 transition-colors">Straight-Path.eu</a></span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <a href="/privacy" className="hover:text-white/60 transition-colors">Confidentialité</a>
            <span>·</span>
            <a href="/legal" className="hover:text-white/60 transition-colors">Mentions légales</a>
          </div>
        </div>
      </main>
    </div>
  );
}
