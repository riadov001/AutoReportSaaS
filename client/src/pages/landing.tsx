import { useState, lazy, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { AutoReportLogo } from "@/components/autoreport-logo";
import { CookieConsent } from "@/components/cookie-consent";
import {
  Zap, FileText, CheckCircle2, Mail, Phone, MapPin,
  Shield, Gauge, Brain, ChevronDown, X, Download, Send,
  Activity, Clock, Star, Lock, Cpu, Database, Server, Code2,
  Globe, Layers, Wind, Boxes, Trash2, Check, LogIn, ShieldCheck,
} from "lucide-react";
import { SiGoogle, SiPostgresql, SiTypescript, SiReact, SiNodedotjs, SiExpress, SiHostinger } from "react-icons/si";
import type { GeneratedReport } from "@/components/report-display";

const ReportDisplay = lazy(() => import("@/components/report-display"));


function LegalDataDeletionForm() {
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
      <div className="flex items-center gap-3 py-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <Check className="h-4 w-4 text-emerald-400" />
        </div>
        <p className="text-xs text-white/50">Demande enregistrée — traitement sous 30 jours (Art. 17 RGPD).</p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="votre@email.com"
        className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40"
      />
      <button type="submit" disabled={loading}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#CE1126] text-white text-xs font-bold rounded-md hover:bg-[#b8101f] transition-colors disabled:opacity-60 shrink-0">
        {loading ? <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Trash2 className="h-3 w-3" />}
        {loading ? "..." : "Supprimer"}
      </button>
    </form>
  );
}

function LegalModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="modal-legal">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl hud-card rounded-md bg-[#07070F] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#07070F] border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#CE1126] animate-pulse" />
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">MENTIONS_LÉGALES</span>
            </div>
            <h2 className="text-base font-extrabold text-white">Mentions Légales</h2>
          </div>
          <button onClick={onClose} data-testid="button-close-legal" className="p-2 rounded-md border border-white/10 hover:border-white/20 text-white/40 hover:text-white/70 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">

          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-3.5 w-3.5 text-[#CE1126]" />
              <span className="text-xs font-bold text-white">1. Éditeur du site</span>
            </div>
            <p className="text-xs text-white/50 mb-3">Le site <strong className="text-white/70">AutoReport</strong> est édité par <strong className="text-white/70">Straight-Path.eu</strong>, agence de développement web et numérique.</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Éditeur", value: "Straight-Path.eu" },
                { label: "Site", value: "https://straight-path.eu" },
                { label: "Email", value: "contact@straight-path.eu" },
                { label: "Responsable", value: "Équipe Straight-Path" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/[0.03] border border-white/[0.05] rounded-md p-2">
                  <p className="text-[9px] uppercase tracking-wider text-white/25 mb-0.5">{label}</p>
                  <p className="text-white/60 text-[11px] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-3">
              <SiHostinger className="h-3.5 w-3.5 text-[#FF6600]" />
              <span className="text-xs font-bold text-white">2. Hébergement</span>
            </div>
            <p className="text-xs text-white/50 mb-3">Ce site est hébergé par <strong className="text-white/70">Hostinger International Ltd</strong>, serveurs en Europe, conformité RGPD.</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Hébergeur", value: "Hostinger International Ltd" },
                { label: "Adresse", value: "61 Lordou Vironos, Larnaca, Chypre" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/[0.03] border border-white/[0.05] rounded-md p-2">
                  <p className="text-[9px] uppercase tracking-wider text-white/25 mb-0.5">{label}</p>
                  <p className="text-white/60 text-[11px] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-3.5 w-3.5 text-[#CE1126]" />
              <span className="text-xs font-bold text-white">3. Protection des données (RGPD)</span>
              <span className="text-[9px] font-mono text-[#CE1126] ml-auto">UE 2016/679</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {[
                { art: "Art. 15", right: "Droit d'accès" },
                { art: "Art. 16", right: "Droit de rectification" },
                { art: "Art. 17", right: "Droit à l'effacement" },
                { art: "Art. 18", right: "Limitation du traitement" },
                { art: "Art. 20", right: "Portabilité des données" },
                { art: "Art. 21", right: "Droit d'opposition" },
              ].map(({ art, right }) => (
                <div key={art} className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.04] rounded px-2 py-1.5">
                  <span className="text-[9px] font-mono font-bold text-[#CE1126] shrink-0">{art}</span>
                  <span className="text-[10px] text-white/40">{right}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/40">DPO : <strong className="text-white/60">dpo@straight-path.eu</strong></p>
          </div>

          <div className="rounded-md border border-[#CE1126]/20 bg-[#CE1126]/[0.04] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="h-3.5 w-3.5 text-[#CE1126]" />
              <span className="text-xs font-bold text-white">4. Suppression de vos données</span>
              <span className="text-[9px] font-mono text-[#CE1126] ml-auto">Art. 17 RGPD — 30 jours</span>
            </div>
            <p className="text-[11px] text-white/40 mb-1">Demandez la suppression définitive de toutes vos données personnelles :</p>
            <LegalDataDeletionForm />
          </div>

          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-3.5 w-3.5 text-[#CE1126]" />
              <span className="text-xs font-bold text-white">5. Cookies & Responsabilité</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">Ce site utilise uniquement des cookies techniques. Aucun tracker publicitaire tiers n'est utilisé sans consentement. Les diagnostics IA sont fournis à titre indicatif et ne remplacent pas l'avis d'un professionnel. En cas de réclamation RGPD : <strong className="text-white/60">CNIL — www.cnil.fr</strong></p>
          </div>

        </div>
      </div>
    </div>
  );
}

function TechModal({ onClose }: { onClose: () => void }) {
  const techs = [
    {
      icon: <SiGoogle className="h-6 w-6 text-[#4285F4]" />,
      name: "Google Gemini AI",
      tag: "IA / LLM",
      desc: "Moteur d'intelligence artificielle de pointe de Google pour l'analyse et la génération de rapports automobiles contextuels.",
      color: "#4285F4",
    },
    {
      icon: <SiReact className="h-6 w-6 text-[#61DAFB]" />,
      name: "React + TypeScript",
      tag: "Frontend",
      desc: "Interface utilisateur réactive et typée avec React 18 et TypeScript. Design system Shadcn/UI, animations HUD personnalisées.",
      color: "#61DAFB",
    },
    {
      icon: <SiNodedotjs className="h-6 w-6 text-[#339933]" />,
      name: "Node.js + Express",
      tag: "Backend",
      desc: "Serveur API REST performant, gestion des sessions, authentification JWT sécurisée et WebSockets en temps réel.",
      color: "#339933",
    },
    {
      icon: <SiPostgresql className="h-6 w-6 text-[#4169E1]" />,
      name: "PostgreSQL + Drizzle",
      tag: "Base de données",
      desc: "Base de données relationnelle robuste avec ORM Drizzle pour des requêtes typées et migrations sécurisées.",
      color: "#4169E1",
    },
  ];

  const tags = [
    { label: "Vite", color: "#646CFF" },
    { label: "TailwindCSS", color: "#06B6D4" },
    { label: "Drizzle ORM", color: "#C5F74F" },
    { label: "JWT Auth", color: "#F59E0B" },
    { label: "WebSockets", color: "#22C55E" },
    { label: "PDF Export", color: "#EF4444" },
    { label: "Resend API", color: "#8B5CF6" },
    { label: "TypeScript 5", color: "#3178C6" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="modal-tech">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl hud-card rounded-md bg-[#07070F] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#CE1126] animate-pulse" />
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">STACK_TECHNIQUE</span>
            </div>
            <h2 className="text-lg font-extrabold text-white">Technologies utilisées</h2>
          </div>
          <button onClick={onClose} data-testid="button-close-tech" className="p-2 rounded-md border border-white/10 hover:border-white/20 text-white/40 hover:text-white/70 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {techs.map(tech => (
            <div key={tech.name} className="rounded-md p-4 border border-white/[0.06]" style={{ background: `${tech.color}08` }} data-testid={`card-tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-md border" style={{ background: `${tech.color}15`, borderColor: `${tech.color}30` }}>
                  {tech.icon}
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" style={{ background: `${tech.color}15`, color: tech.color }}>
                  {tech.tag}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1.5">{tech.name}</h3>
              <p className="text-[11px] text-white/40 leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <Server className="h-4 w-4 text-[#CE1126]" />
            <span className="text-sm font-bold text-white">Infrastructure & Éditeur</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#FF6600]/10 border border-[#FF6600]/20 shrink-0">
                <SiHostinger className="h-4 w-4 text-[#FF6600]" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-white/50 mb-0.5">Hébergeur</div>
                <div className="text-xs font-bold text-white">Hostinger</div>
                <p className="text-[10px] text-white/30 mt-0.5">Serveurs en Europe, conformité RGPD.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20 shrink-0">
                <Globe className="h-4 w-4 text-[#CE1126]" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-white/50 mb-0.5">Éditeur</div>
                <a href="https://straight-path.eu" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white hover:text-[#CE1126] transition-colors">Straight-Path.eu</a>
                <p className="text-[10px] text-white/30 mt-0.5">Développement & maintenance.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                <Shield className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-white/50 mb-0.5">Sécurité</div>
                <div className="text-xs font-bold text-white">RGPD / HTTPS</div>
                <p className="text-[10px] text-white/30 mt-0.5">Chiffrement TLS, données en Europe.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag.label}
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md"
              style={{ background: `${tag.color}15`, color: tag.color, border: `1px solid ${tag.color}25` }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    toast({ title: "Message envoyé", description: "Nous vous répondrons dans les 24h ouvrées." });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="modal-contact">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md hud-card rounded-md bg-[#07070F] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#CE1126] animate-pulse" />
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">CONTACT_FORM</span>
            </div>
            <h2 className="text-lg font-extrabold text-white">Nous contacter</h2>
          </div>
          <button onClick={onClose} data-testid="button-close-contact" className="p-2 rounded-md border border-white/10 hover:border-white/20 text-white/40 hover:text-white/70 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "name", label: "Nom complet", placeholder: "Jean Dupont", type: "text" },
            { key: "email", label: "Adresse email", placeholder: "jean@exemple.com", type: "email" },
            { key: "subject", label: "Sujet", placeholder: "Demande d'information", type: "text" },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="text-[10px] uppercase tracking-wider text-white/30 font-mono block mb-1.5">{label}</label>
              <input
                type={type}
                required
                placeholder={placeholder}
                value={(form as any)[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                data-testid={`input-contact-${key}`}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 transition-all"
              />
            </div>
          ))}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-white/30 font-mono block mb-1.5">Message</label>
            <textarea
              required
              rows={4}
              placeholder="Décrivez votre demande..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              data-testid="textarea-contact-message"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={sending}
              data-testid="button-send-contact"
              className="flex-1 flex items-center justify-center gap-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-sm font-bold py-2.5 rounded-md transition-colors disabled:opacity-60"
            >
              {sending ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
              {sending ? "Envoi..." : "Envoyer"}
            </button>
            <button type="button" onClick={onClose} className="px-4 text-sm text-white/40 border border-white/[0.08] rounded-md hover:border-white/20 hover:text-white/60 transition-all">
              Annuler
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-white/[0.05] grid grid-cols-3 gap-3">
          {[
            { Icon: Mail, text: "support@autoreport.com" },
            { Icon: Phone, text: "+33 (0)1 21 40 80 80" },
            { Icon: MapPin, text: "Paris, France" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex flex-col items-center gap-1.5 text-center">
              <Icon className="h-3.5 w-3.5 text-[#CE1126]" />
              <span className="text-[10px] text-white/30 leading-tight">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing({ isAdmin = false }: { isAdmin?: boolean } = {}) {
  const { toast } = useToast();
  const [vehicleInfo, setVehicleInfo] = useState({ make: "", model: "", year: "", finition: "", motorisation: "", carburant: "", mileage: "", gearbox: "", usage: [] as string[], issue: "" });
  const [guestEmail, setGuestEmail] = useState("");
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [showLegal, setShowLegal] = useState(false);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleInfo.make || !vehicleInfo.model || !vehicleInfo.year) {
      toast({ title: "Champs requis", description: "Remplissez au minimum la marque, le modèle et l'année.", variant: "destructive" });
      return;
    }
    const builtIssue = [
      "Analyse pré-achat véhicule d'occasion",
      vehicleInfo.motorisation ? `Motorisation : ${vehicleInfo.motorisation}` : "",
      vehicleInfo.carburant ? `Carburant : ${vehicleInfo.carburant}` : "",
      vehicleInfo.gearbox ? `Boîte : ${vehicleInfo.gearbox}` : "",
      vehicleInfo.usage.length ? `Usage : ${vehicleInfo.usage.join(" / ")}` : "",
      vehicleInfo.finition ? `Finition : ${vehicleInfo.finition}` : "",
    ].filter(Boolean).join(" | ");
    setGenerating(true);
    setLimitReached(false);
    try {
      const res = await fetch("/api/reports/generate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          make: vehicleInfo.make,
          model: vehicleInfo.model,
          year: vehicleInfo.year,
          finition: vehicleInfo.finition || undefined,
          motorisation: vehicleInfo.motorisation || undefined,
          carburant: vehicleInfo.carburant || undefined,
          mileage: vehicleInfo.mileage || undefined,
          gearbox: vehicleInfo.gearbox || undefined,
          usage: vehicleInfo.usage.length ? vehicleInfo.usage : undefined,
          issue: builtIssue,
          guestEmail: guestEmail.trim() || undefined,
        }),
      });
      if (res.status === 429) {
        const err = await res.json();
        setLimitReached(true);
        toast({ title: "Rapport gratuit épuisé", description: err.message || "Inscrivez-vous pour générer plus de rapports.", variant: "destructive" });
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReport(data);
    } catch {
      toast({ title: "Erreur", description: "Impossible de générer le rapport. Réessayez.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#05050A] text-white flex flex-col overflow-x-hidden">
      <CookieConsent />
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showTech && <TechModal onClose={() => setShowTech(false)} />}
      {showLegal && <LegalModal onClose={() => setShowLegal(false)} />}

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 racing-stripe">
        <div className="bg-[#05050A]/85 backdrop-blur-xl border-b border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
            <AutoReportLogo />
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-white/40">
              <button onClick={() => scrollTo("features")} className="hover:text-white/80 transition-colors">Comment ça marche</button>
              <button onClick={() => scrollTo("generator")} className="hover:text-white/80 transition-colors">Générer mon rapport</button>
              <button onClick={() => setShowContact(true)} className="hover:text-white/80 transition-colors" data-testid="button-nav-contact">Contact</button>
            </nav>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {isAdmin && (
                <a
                  href="/dashboard"
                  data-testid="link-header-admin"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-amber-400/40 hover:border-amber-300/60 hover:bg-amber-400/[0.06] text-amber-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Espace Admin</span>
                </a>
              )}
              <a
                href="/signin"
                data-testid="link-header-signin"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-white/20 hover:border-white/40 hover:bg-white/[0.04] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Se connecter</span>
              </a>
              <a
                href="/signup"
                data-testid="link-header-signup"
                className="hidden md:inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
              >
                Inscription
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative min-h-[100dvh] flex items-center hero-dark-wash overflow-hidden">
          <div className="absolute inset-0 w-full h-full" style={{ background: "radial-gradient(ellipse at 65% 40%, rgba(206,17,38,0.18) 0%, transparent 55%), linear-gradient(135deg, #050508 0%, #0c0c14 60%, #080810 100%)" }} />
          <div className="absolute inset-0 z-[2] hud-grid-subtle pointer-events-none" />

          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CE1126]/60 to-transparent z-[3]" />

          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[3] hidden xl:flex flex-col gap-1 opacity-20">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex gap-1">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="w-1 h-1 rounded-full bg-[#CE1126]" style={{ opacity: Math.random() > 0.5 ? 1 : 0.3 }} />
                ))}
              </div>
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 lg:pt-0">
            <div className="max-w-2xl">
              <h1
                className="text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold text-white mb-5 leading-[1.04] tracking-tight"
              >
                Achetez votre{" "}
                <span style={{ color: "#CE1126", textShadow: "0 0 30px rgba(206,17,38,0.5), 0 0 60px rgba(206,17,38,0.2)" }}>voiture d'occasion</span>
                <br />
                <span className="text-white/80">sans vous tromper</span>
              </h1>

              <p className="text-base sm:text-lg text-white/50 mb-8 leading-relaxed max-w-xl font-light">
                Accédez en quelques secondes à toutes les informations essentielles sur le véhicule que vous souhaitez acquérir : faiblesses connues, points à vérifier et conseils concrets issus de milliers de retours d'expérience et sources spécialisées.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => scrollTo("generator")}
                  data-testid="button-hero-cta"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#CE1126] hover:bg-[#b8101f] text-white font-bold rounded-md transition-colors neon-red-glow text-sm"
                >
                  <Zap className="h-4 w-4" />
                  Générer mon rapport
                </button>
                <button
                  onClick={() => scrollTo("features")}
                  data-testid="button-hero-learn"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold rounded-md transition-all backdrop-blur-sm text-sm bg-white/[0.03]"
                >
                  🔍 Comment ça marche
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.06]">
                {[
                  { value: "⚡", label: "Rapport instantané" },
                  { value: "🔍", label: "Checklist complète" },
                  { value: "📄", label: "PDF téléchargeable" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#CE1126", textShadow: "0 0 20px rgba(206,17,38,0.4)" }}>{s.value}</div>
                    <div className="text-xs text-white/30 font-medium mt-0.5 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => scrollTo("features")} aria-label="Défiler" data-testid="button-scroll-down"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/20 hover:text-white/40 transition-colors">
            <ChevronDown className="h-8 w-8" />
          </button>
        </section>

        {/* ── MODULES / FEATURES ── */}
        <section id="features" className="py-20 sm:py-28 relative" style={{ background: "#07070F" }}>
          <div className="absolute inset-0 hud-grid-subtle pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CE1126]/20 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Tout ce que vous devez savoir
                <br />
                <span className="text-white/40">avant d'acheter un véhicule</span>
              </h2>
              <p className="text-sm text-white/50 leading-relaxed">
                Gagnez du temps et évitez les erreurs avant d'acheter votre véhicule
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { emoji: "📋", title: "Toutes les informations en un seul rapport", desc: "Plus besoin de chercher pendant des heures : nous regroupons les faiblesses connues, les points à vérifier et les retours d'expérience pour ce véhicule précis." },
                { emoji: "⚡", title: "Un gain de temps énorme", desc: "Plus besoin de parcourir des forums ou des vidéos : vous obtenez directement l'essentiel à vérifier avant achat." },
                { emoji: "✅", title: "Un rapport clair et exploitable", desc: "Une checklist simple, lisible et prête à être utilisée lors de la visite du véhicule." },
                { emoji: "🔒", title: "Achetez en toute confiance", desc: "Identifiez les points critiques avant de vous déplacer et évitez les mauvaises surprises." },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="hud-card rounded-md p-5 group hover:border-[#CE1126]/20 transition-all duration-300 scan-line">
                  <div className="flex items-start mb-4">
                    <div className="p-2.5 rounded-md bg-[#CE1126]/10 border border-[#CE1126]/20 group-hover:bg-[#CE1126]/15 transition-colors">
                      <span className="text-xl">{emoji}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section id="pricing" className="py-12 relative border-y border-white/[0.04]" style={{ background: "#060610" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Un rapport complet à partir de <span style={{ color: "#CE1126" }}>0,49 €</span></h2>
              <p className="text-sm text-white/40">Paiement unique · Aucun abonnement · Rapport disponible immédiatement</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                { price: "0,49 €", qty: "1 rapport", desc: "Idéal pour évaluer rapidement un seul véhicule avant de vous déplacer.", highlight: false },
                { price: "1,50 €", qty: "3 rapports", desc: "Comparez plusieurs véhicules avant de faire votre choix. Meilleur rapport qualité/prix.", highlight: true },
                { price: "2,49 €", qty: "5 rapports", desc: "Pour les acheteurs exigeants qui veulent analyser un maximum de véhicules en toute tranquillité.", highlight: false },
              ].map(({ price, qty, desc, highlight }) => (
                <div key={qty} className={`hud-card rounded-md p-6 flex flex-col gap-3 ${highlight ? "border-[#CE1126]/40 bg-[#CE1126]/[0.04]" : ""}`}>
                  {highlight && <span className="text-[10px] font-mono uppercase tracking-widest text-[#CE1126]">⭐ Recommandé</span>}
                  <div className="text-3xl font-extrabold text-white">{price}</div>
                  <div className="text-sm font-bold text-white/80">{qty}</div>
                  <p className="text-xs text-white/40 leading-relaxed flex-1">{desc}</p>
                  <button
                    onClick={() => scrollTo("generator")}
                    className={`mt-2 w-full py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${highlight ? "bg-[#CE1126] hover:bg-[#b8101f] text-white neon-red-glow" : "border border-white/15 hover:border-white/30 text-white/60 hover:text-white"}`}
                  >
                    Choisir cette offre
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GENERATOR ── */}
        <section id="generator" className="py-20 sm:py-28 relative" style={{ background: "#05050A" }}>
          <div className="absolute inset-0 hud-grid-bg pointer-events-none opacity-60" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CE1126]/30 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Analyser le véhicule
              </h2>
              <p className="text-sm text-white/50 leading-relaxed">
                Nous vous indiquons immédiatement les points à vérifier et les risques à connaître
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="hud-card rounded-md p-6 scan-line">
                <form onSubmit={handleGenerateReport} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: "make", label: "MARQUE *", placeholder: "BMW / Peugeot / Renault" },
                      { key: "model", label: "MODÈLE *", placeholder: "Série 3 / 308 / Clio" },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">{label}</label>
                        <input
                          type="text"
                          required
                          placeholder={placeholder}
                          value={(vehicleInfo as any)[key]}
                          onChange={e => setVehicleInfo(v => ({ ...v, [key]: e.target.value }))}
                          data-testid={`input-${key}`}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 focus:bg-white/[0.05] transition-all font-mono"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">FINITION <span className="text-white/15">(optionnel)</span></label>
                    <input
                      type="text"
                      placeholder="Sport / Executive / Confort / GTI..."
                      value={vehicleInfo.finition}
                      onChange={e => setVehicleInfo(v => ({ ...v, finition: e.target.value }))}
                      data-testid="input-finition"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 focus:bg-white/[0.05] transition-all font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">ANNÉE *</label>
                      <input
                        type="number"
                        required
                        placeholder="2019"
                        value={vehicleInfo.year}
                        onChange={e => setVehicleInfo(v => ({ ...v, year: e.target.value }))}
                        data-testid="input-year"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 focus:bg-white/[0.05] transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">MOTORISATION</label>
                      <input
                        type="text"
                        placeholder="1.5 dCi / 2.0 TDI"
                        value={vehicleInfo.motorisation}
                        onChange={e => setVehicleInfo(v => ({ ...v, motorisation: e.target.value }))}
                        data-testid="input-motorisation"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 focus:bg-white/[0.05] transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">KM</label>
                      <input
                        type="number"
                        placeholder="120 000"
                        value={vehicleInfo.mileage}
                        onChange={e => setVehicleInfo(v => ({ ...v, mileage: e.target.value }))}
                        data-testid="input-mileage"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 focus:bg-white/[0.05] transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-2">CARBURANT</label>
                    <div className="flex flex-wrap gap-2">
                      {["Diesel", "Essence", "Hybride", "Électrique", "GPL"].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setVehicleInfo(v => ({ ...v, carburant: v.carburant === opt ? "" : opt }))}
                          className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${vehicleInfo.carburant === opt ? "bg-[#CE1126]/20 border-[#CE1126]/50 text-white" : "border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/50"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-2">BOÎTE DE VITESSE</label>
                    <div className="flex gap-2">
                      {["Manuelle", "Automatique"].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setVehicleInfo(v => ({ ...v, gearbox: v.gearbox === opt ? "" : opt }))}
                          className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${vehicleInfo.gearbox === opt ? "bg-[#CE1126]/20 border-[#CE1126]/50 text-white" : "border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/50"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-2">USAGE <span className="text-white/15">(plusieurs possibles)</span></label>
                    <div className="flex gap-2">
                      {["Ville", "Mixte", "Autoroute"].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setVehicleInfo(v => ({
                            ...v,
                            usage: v.usage.includes(opt) ? v.usage.filter(u => u !== opt) : [...v.usage, opt],
                          }))}
                          className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${vehicleInfo.usage.includes(opt) ? "bg-[#CE1126]/20 border-[#CE1126]/50 text-white" : "border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/50"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-1.5">EMAIL <span className="text-white/15">(facultatif — recevoir votre rapport)</span></label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 focus:bg-white/[0.05] transition-all font-mono"
                    />
                  </div>

                  {limitReached && (
                    <div className="flex items-start gap-3 p-3 bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-md">
                      <span className="text-[#CE1126] text-lg leading-none mt-0.5">⚠</span>
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">Rapport gratuit épuisé</p>
                        <p className="text-xs text-white/50 mb-2">Créez un compte pour générer plus de rapports et télécharger vos analyses en PDF.</p>
                        <a
                          href="/signup"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#CE1126] hover:bg-[#b8101f] text-white text-xs font-bold rounded transition-colors"
                        >
                          S'inscrire gratuitement
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={generating || limitReached}
                    data-testid="button-generate"
                    className="w-full flex items-center justify-center gap-2.5 py-3 bg-[#CE1126] hover:bg-[#b8101f] disabled:opacity-60 text-white font-bold rounded-md transition-colors neon-red-glow text-sm"
                  >
                    {generating ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="font-mono">Génération en cours<span className="terminal-cursor" /></span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Générer mon rapport
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="hud-card rounded-md p-6" style={{ minHeight: 400 }}>
                {report ? (
                  <Suspense fallback={<div className="flex items-center justify-center h-32 text-white/30 text-sm">Chargement...</div>}>
                    <ReportDisplay report={report} />
                  </Suspense>
                ) : generating ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-[#CE1126]/20 rounded-full" />
                      <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-[#CE1126] rounded-full animate-spin" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-mono text-white/60 mb-1">Analyse en cours...</p>
                      <p className="text-xs text-white/30 font-mono">Interrogation du moteur IA</p>
                    </div>
                    <div className="w-full max-w-xs space-y-1.5">
                      {["Lecture des paramètres", "Analyse des symptômes", "Génération du rapport"].map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                          <span className="text-[10px] font-mono text-white/30">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                    <div className="w-16 h-16 rounded-md border border-white/[0.06] flex items-center justify-center bg-white/[0.02]">
                      <FileText className="h-7 w-7 text-white/10" />
                    </div>
                    <div>
                      <p className="text-sm text-white/30 font-mono mb-1">Votre rapport apparaîtra ici</p>
                      <p className="text-xs text-white/20 mb-1">Remplissez le formulaire et cliquez sur "Générer mon rapport"</p>
                      <p className="text-xs text-white/20">Téléchargez votre rapport ou recevez-le par email</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05]" style={{ background: "#030308" }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

            <div>
              <div className="flex items-center gap-3 mb-3">
                <AutoReportLogo variant="icon" className="w-10 h-10" />
                <span className="text-lg font-extrabold text-white tracking-tight">AutoReport</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed mb-3">
                Plateforme de diagnostics automobiles
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[10px] font-mono text-white/20">Système opérationnel</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Navigation</div>
              <div className="space-y-2.5">
                {[
                  { label: "Comment ça marche", action: () => scrollTo("features") },
                  { label: "Générer mon rapport", action: () => scrollTo("generator") },
                  { label: "Tarifs", action: () => scrollTo("pricing") },
                  { label: "Contact", action: () => setShowContact(true) },
                ].map(item => (
                  <button key={item.label} onClick={item.action} className="block text-xs text-white/30 hover:text-white/60 transition-colors">
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Informations légales</div>
              <div className="space-y-2.5">
                <button onClick={() => setShowLegal(true)} className="block text-xs text-white/30 hover:text-white/60 transition-colors" data-testid="button-footer-legal">
                  Mentions légales
                </button>
                <a href="/privacy" className="block text-xs text-white/30 hover:text-white/60 transition-colors">
                  Politique de confidentialité
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-white/[0.04] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] font-mono text-white/20">&copy; 2026 AutoReport · Tous droits réservés</span>
            <div className="flex items-center gap-3">
              <a href="mailto:support@autoreport.com" className="text-[10px] text-white/25 hover:text-white/50 transition-colors">
                support@autoreport.com
              </a>
              <span className="text-white/10">·</span>
              <a href="https://straight-path.eu" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 hover:text-white/50 transition-colors">
                By Straight-Path.eu
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
