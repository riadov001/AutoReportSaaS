import { useState } from "react";
import { AutoReportLogo } from "@/components/autoreport-logo";
import { Shield, Lock, Eye, Database, Bell, Mail, ArrowLeft, Trash2, Check, Globe, Server } from "lucide-react";

function DataDeletionForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-emerald-400" />
        </div>
        <p className="text-white font-semibold mb-2">Demande enregistrée</p>
        <p className="text-white/40 text-sm max-w-sm">Votre demande sera traitée dans un délai de 30 jours, conformément à l'article 17 du RGPD.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <div>
        <label className="text-[10px] uppercase tracking-wider text-white/30 font-mono block mb-1.5">Email associé à vos données</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="votre@email.com"
          data-testid="input-privacy-deletion-email"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !email}
        data-testid="button-privacy-deletion-submit"
        className="flex items-center gap-2 px-5 py-2.5 bg-[#CE1126] text-white text-sm font-bold rounded-md hover:bg-[#b8101f] transition-colors disabled:opacity-60"
      >
        {loading ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Trash2 className="h-4 w-4" />}
        {loading ? "Envoi..." : "Demander la suppression"}
      </button>
    </form>
  );
}

const sections = [
  {
    icon: Eye,
    title: "1. Données collectées",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>AutoReport collecte uniquement les données strictement nécessaires au bon fonctionnement du service :</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { label: "Données de diagnostic", desc: "Marque, modèle, année, kilométrage, description du problème" },
            { label: "Données de contact", desc: "Email (uniquement si compte créé), téléphone (optionnel)" },
            { label: "Données techniques", desc: "Adresse IP, navigateur, logs de session pour la sécurité" },
            { label: "Rapports générés", desc: "Résultats IA, stockés de façon anonyme sans identifiant personnel par défaut" },
          ].map(item => (
            <div key={item.label} className="bg-white/[0.02] border border-white/[0.05] rounded-md p-3">
              <p className="text-xs font-semibold text-white/60 mb-1">{item.label}</p>
              <p className="text-[11px] text-white/35">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/40 bg-white/[0.02] border border-white/[0.05] rounded-md px-3 py-2">
          <strong className="text-white/60">Important :</strong> Les diagnostics soumis sans compte sont traités de façon anonyme. Aucune donnée d'identité n'est conservée par défaut.
        </p>
      </div>
    ),
  },
  {
    icon: Database,
    title: "2. Utilisation des données",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>Vos données sont utilisées exclusivement pour :</p>
        <div className="space-y-2">
          {[
            "Générer des rapports de diagnostic automobiles via notre moteur IA (Google Gemini)",
            "Assurer la sécurité et la fiabilité du service (détection de fraude, logs techniques)",
            "Améliorer la précision de nos diagnostics (données agrégées et anonymisées uniquement)",
            "Envoyer des notifications par email ou SMS si vous y avez explicitement consenti",
            "Respecter nos obligations légales et réglementaires",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.04] rounded-md px-3 py-2.5">
              <span className="text-[#CE1126] mt-0.5 shrink-0">›</span>
              <span className="text-sm text-white/50">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/35">Aucune donnée n'est vendue, échangée ou transmise à des tiers à des fins publicitaires ou commerciales.</p>
      </div>
    ),
  },
  {
    icon: Server,
    title: "3. Hébergement & sous-traitants",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>Nos sous-traitants techniques sont sélectionnés pour leur conformité RGPD :</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { name: "Hostinger", role: "Hébergement", detail: "Serveurs en Europe, conforme RGPD" },
            { name: "Google Gemini", role: "IA / Analyse", detail: "API Google AI, données traitées de façon anonyme" },
            { name: "Resend / Twilio", role: "Emails & SMS", detail: "Envoi de notifications uniquement si consentement" },
          ].map(item => (
            <div key={item.name} className="bg-white/[0.02] border border-white/[0.05] rounded-md p-3">
              <p className="text-xs font-bold text-white/70 mb-0.5">{item.name}</p>
              <p className="text-[10px] text-[#CE1126] font-mono uppercase tracking-wider mb-1">{item.role}</p>
              <p className="text-[11px] text-white/35">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Bell,
    title: "4. Notifications SMS & Email",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>Les notifications par SMS ou email ne sont envoyées qu'avec votre consentement explicite. Elles concernent exclusivement :</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Confirmation de création de compte",
            "Envoi et validation de devis",
            "Émission et rappel de factures",
            "Confirmations de paiement",
            "Rappels de rendez-vous",
            "Demandes d'avis après prestation",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126]/60 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-xs text-white/35">
          Les SMS sont acheminés via <strong className="text-white/50">Twilio</strong>, sous-traitant conforme RGPD. Votre numéro n'est jamais partagé à des fins commerciales. Vous pouvez retirer votre consentement à tout moment depuis les paramètres de votre compte.
        </p>
      </div>
    ),
  },
  {
    icon: Lock,
    title: "5. Sécurité des données",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données :</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { label: "Chiffrement TLS/HTTPS", desc: "Toutes les communications sont chiffrées en transit" },
            { label: "Hachage des mots de passe", desc: "Bcrypt avec salage — les mots de passe ne sont jamais stockés en clair" },
            { label: "Authentification JWT", desc: "Tokens signés avec expiration automatique pour le panel admin" },
            { label: "Audit logs", desc: "Journal de toutes les actions sensibles avec horodatage" },
          ].map(item => (
            <div key={item.label} className="bg-white/[0.02] border border-white/[0.05] rounded-md p-3">
              <p className="text-xs font-semibold text-emerald-400/80 mb-1">{item.label}</p>
              <p className="text-[11px] text-white/35">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "6. Vos droits RGPD",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>Conformément au RGPD (Règlement UE 2016/679), vous disposez des droits suivants :</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { art: "Art. 15", right: "Accès", desc: "Obtenir une copie de toutes vos données" },
            { art: "Art. 16", right: "Rectification", desc: "Corriger les données inexactes" },
            { art: "Art. 17", right: "Effacement", desc: "Demander la suppression de toutes vos données" },
            { art: "Art. 18", right: "Limitation", desc: "Restreindre le traitement de vos données" },
            { art: "Art. 20", right: "Portabilité", desc: "Recevoir vos données dans un format structuré" },
            { art: "Art. 21", right: "Opposition", desc: "Vous opposer à certains traitements" },
          ].map(item => (
            <div key={item.art} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-md p-3">
              <span className="text-[10px] font-mono font-bold text-[#CE1126] shrink-0 mt-0.5">{item.art}</span>
              <div>
                <p className="text-xs font-semibold text-white/60">{item.right}</p>
                <p className="text-[11px] text-white/35 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p>Pour exercer ces droits, contactez notre DPO : <strong className="text-white/80">dpo@straight-path.eu</strong></p>
        <p>En cas de réclamation non résolue, vous pouvez saisir la <strong className="text-white/70">CNIL</strong> sur <strong className="text-white/70">www.cnil.fr</strong>.</p>
      </div>
    ),
  },
  {
    icon: Trash2,
    title: "7. Suppression de vos données",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>Conformément à l'article 17 du RGPD, vous pouvez demander la suppression immédiate de toutes vos données personnelles. La demande est traitée sous <strong className="text-white/80">30 jours maximum</strong>.</p>
        <DataDeletionForm />
      </div>
    ),
  },
  {
    icon: Mail,
    title: "8. Contact & DPO",
    content: (
      <div className="space-y-3 text-sm text-white/60 leading-relaxed">
        <p>Pour toute question relative à la protection de vos données personnelles :</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "Email DPO", value: "dpo@straight-path.eu" },
            { label: "Email support", value: "support@autoreport.com" },
            { label: "Éditeur", value: "Straight-Path.eu" },
            { label: "Autorité de contrôle", value: "CNIL — www.cnil.fr" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/[0.02] border border-white/[0.05] rounded-md p-3">
              <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">{label}</p>
              <p className="text-white/70 text-xs font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#05050A] text-white">
      <div className="absolute inset-0 hud-grid-subtle pointer-events-none" />

      <header className="relative z-10 border-b border-white/[0.06] bg-[#05050A]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <AutoReportLogo variant="icon" className="w-7 h-7" />
            <span className="font-bold text-white group-hover:text-[#CE1126] transition-colors text-sm">AutoReport</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors" data-testid="link-back-to-home-privacy">
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </a>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20 mb-5">
            <Shield className="h-3.5 w-3.5 text-[#CE1126]" />
            <span className="text-xs font-semibold text-[#CE1126] uppercase tracking-[0.2em]">Confidentialité & RGPD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Politique de Confidentialité
          </h1>
          <p className="text-white/40 text-sm">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>
        </div>

        <div className="space-y-5">
          {sections.map(({ icon: Icon, title, content }) => (
            <div key={title} className="hud-card rounded-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20">
                  <Icon className="h-4 w-4 text-[#CE1126]" />
                </div>
                <h2 className="font-bold text-white text-base">{title}</h2>
              </div>
              {content}
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AutoReportLogo variant="icon" className="w-6 h-6" />
            <span className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} AutoReport · Édité par{" "}
              <a href="https://straight-path.eu" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/70 transition-colors">Straight-Path.eu</a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <a href="/legal" className="hover:text-white/60 transition-colors">Mentions légales</a>
          </div>
        </div>
      </main>
    </div>
  );
}
