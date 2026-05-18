import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    icon: "⚡",
    label: "RAPPORT EN 15 SECONDES",
    desc: "L'IA analyse des milliers de données techniques en quelques secondes",
  },
  {
    icon: "🎯",
    label: "SCORE /10 PRÉCIS",
    desc: "Note globale, rapport fiabilité, coût entretien, risques spécifiques",
  },
  {
    icon: "📋",
    label: "CHECKLIST AVANT ACHAT",
    desc: "Liste complète des points à vérifier lors de la visite du véhicule",
  },
  {
    icon: "📄",
    label: "PDF TÉLÉCHARGEABLE",
    desc: "Rapport complet à emporter pour négocier avec le vendeur",
  },
];

const STATS = [
  { value: "10", label: "SECTIONS D'ANALYSE" },
  { value: "15s", label: "TEMPS DE GÉNÉRATION" },
  { value: "100%", label: "GRATUIT AU PREMIER ESSAI" },
  { value: "IA", label: "GEMINI ULTRA" },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = "rgba(206,17,38,0.04)";
      ctx.lineWidth = 0.5;
      const gs = 60;
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(206,17,38,${p.alpha})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(206,17,38,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function useInView(ref: React.RefObject<Element>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 50;
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(Math.floor(start));
      if (start >= target) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function HudCard({ feature, delay }: { feature: typeof FEATURES[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      className="relative group"
    >
      <div className="relative p-6 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:border-[#CE1126]/40 transition-colors duration-500 overflow-hidden">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-px bg-[#CE1126]/60" />
        <div className="absolute top-0 left-0 h-4 w-px bg-[#CE1126]/60" />
        <div className="absolute bottom-0 right-0 w-4 h-px bg-[#CE1126]/60" />
        <div className="absolute bottom-0 right-0 h-4 w-px bg-[#CE1126]/60" />
        {/* Scan line on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(206,17,38,0.04), transparent)", animation: "none" }} />
        <div className="text-2xl mb-3">{feature.icon}</div>
        <p className="text-[10px] font-mono text-[#CE1126] tracking-[0.25em] mb-2">{feature.label}</p>
        <p className="text-xs text-white/40 leading-relaxed">{feature.desc}</p>
      </div>
    </div>
  );
}

export default function Teaser() {
  const [phase, setPhase] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef as React.RefObject<Element>);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => setPhase(4), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Scan line animation
  useEffect(() => {
    const id = setInterval(() => setScanLine(n => (n + 1) % 100), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen font-['Exo_2',sans-serif] overflow-x-hidden" style={{ background: "#05050A", color: "white" }}>

      {/* ───── HERO ───── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <ParticleCanvas />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none z-10"
          style={{
            top: `${scanLine}%`,
            background: "linear-gradient(90deg, transparent, rgba(206,17,38,0.15), transparent)",
            boxShadow: "0 0 8px rgba(206,17,38,0.15)",
          }}
        />

        {/* Red glow center */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(206,17,38,0.07) 0%, transparent 70%)",
        }} />

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">

          {/* Tag */}
          <div style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(-10px)",
            transition: "all 0.6s ease",
          }}>
            <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#CE1126] uppercase mb-8 border border-[#CE1126]/30 px-4 py-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126] animate-pulse" />
              POWERED BY GEMINI AI
            </span>
          </div>

          {/* Main title */}
          <div style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6"
              style={{ fontFamily: "'Exo 2', sans-serif" }}>
              <span className="block text-white">AUTOREPORT</span>
              <span className="block" style={{
                background: "linear-gradient(135deg, #CE1126, #ff4444, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>ANALYZE.</span>
              <span className="block text-white">DECIDE.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.7s ease",
          }}>
            <p className="text-base sm:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
              L'intelligence artificielle qui décrypte chaque voiture d'occasion<br />
              avant que vous ne signiez quoi que ce soit.
            </p>
          </div>

          {/* CTAs */}
          <div style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.7s ease",
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/" className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest overflow-hidden rounded-sm"
              style={{ background: "linear-gradient(135deg, #CE1126, #aa0f20)" }}>
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-base">⚡</span> GÉNÉRER MON RAPPORT
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #ff1a35, #CE1126)" }} />
            </a>
            <a href="/" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest border border-white/15 hover:border-white/30 transition-colors rounded-sm text-white/70 hover:text-white">
              <span className="text-base">🎯</span> VOIR UN EXEMPLE
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <span className="text-[9px] font-mono tracking-widest text-white/50">DÉCOUVRIR</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <rect x="0.5" y="0.5" width="11" height="19" rx="5.5" stroke="white" strokeOpacity="0.4" />
            <rect x="4" y="3" width="4" height="6" rx="2" fill="white" fillOpacity="0.4">
              <animate attributeName="y" values="3;10;3" dur="1.5s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section ref={statsRef} className="relative py-24 border-y border-white/[0.04]" style={{ background: "#07070F" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(206,17,38,0.05) 0%, transparent 60%)",
        }} />
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="text-center"
                style={{
                  opacity: statsInView ? 1 : 0,
                  transform: statsInView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                <div className="relative inline-block">
                  <div className="text-4xl sm:text-5xl font-black font-mono mb-2"
                    style={{ background: "linear-gradient(135deg, #CE1126, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {s.value}
                  </div>
                </div>
                <p className="text-[9px] font-mono tracking-[0.2em] text-white/25 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SCREENSHOT SHOWCASE ───── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(206,17,38,0.04) 0%, transparent 70%)",
        }} />
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel label="INTERFACE" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-center">
            Conçu pour vous faire<br />
            <span style={{ color: "#CE1126" }}>économiser des milliers d'euros</span>
          </h2>
          <p className="text-center text-white/30 text-sm mb-16 max-w-lg mx-auto">
            Une interface épurée, des données précises. Tout ce dont vous avez besoin pour acheter sereinement.
          </p>

          {/* Main screenshot */}
          <ScreenshotFrame
            src="/screenshots/hero.jpg"
            label="PAGE D'ACCUEIL — AUTOREPORT"
            delay={0}
          />

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <ScreenshotFrame
              src="/screenshots/signin.jpg"
              label="ESPACE CLIENT SÉCURISÉ"
              delay={100}
            />
            <AppMockup delay={200} />
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="relative py-28" style={{ background: "#07070F" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel label="FONCTIONNALITÉS" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-center">
            Ce que l'IA analyse<br />
            <span style={{ color: "#CE1126" }}>à votre place</span>
          </h2>
          <p className="text-center text-white/30 text-sm mb-16 max-w-lg mx-auto">
            Chaque rapport contient 10 sections détaillées générées spécifiquement pour votre véhicule.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <HudCard key={i} feature={f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── REPORT PREVIEW ───── */}
      <section className="relative py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel label="EXEMPLE DE RAPPORT" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-16 text-center">
            Un rapport comme un<br />
            <span style={{ color: "#CE1126" }}>expert automobile</span>
          </h2>

          <ReportPreviewMockup />
        </div>
      </section>

      {/* ───── PRICING TEASE ───── */}
      <section className="relative py-28" style={{ background: "#07070F" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <SectionLabel label="TARIFS" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            1er rapport<br />
            <span style={{ color: "#CE1126" }}>100% gratuit</span>
          </h2>
          <p className="text-white/30 text-sm mb-12 max-w-md mx-auto">
            Essayez sans engagement. Créez votre compte pour accéder à l'historique, les PDF et des rapports illimités.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-2xl mx-auto">
            {[
              { name: "ESSAI", price: "Gratuit", desc: "1 rapport", highlight: false },
              { name: "ESSENTIEL", price: "4,99€", desc: "5 rapports", highlight: false },
              { name: "PRO", price: "14,90€/mois", desc: "Rapports illimités", highlight: true },
            ].map((p, i) => (
              <PricingCard key={i} {...p} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <ParticleCanvas />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(206,17,38,0.12) 0%, transparent 70%)",
        }} />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#CE1126] uppercase mb-6 border border-[#CE1126]/30 px-4 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126] animate-pulse" /> ESSAI GRATUIT DISPONIBLE
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
            Votre prochain achat,<br />
            <span style={{ color: "#CE1126" }}>sans mauvaise surprise.</span>
          </h2>
          <p className="text-white/30 text-base mb-10">
            Rejoignez des milliers d'acheteurs qui vérifient avant d'acheter.
          </p>
          <a
            href="/"
            className="group inline-flex items-center gap-3 px-10 py-5 text-sm font-black uppercase tracking-widest rounded-sm relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #CE1126 0%, #aa0f20 100%)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg">⚡</span>
              ANALYSER MON VÉHICULE — GRATUIT
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(135deg, #ff1a35 0%, #CE1126 100%)" }} />
          </a>
          <p className="text-white/20 text-xs mt-4 font-mono">Aucune carte bancaire requise · Résultat en 15 secondes</p>
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-white/[0.04] py-6 text-center">
        <p className="text-[10px] font-mono text-white/20 tracking-widest">
          © 2026 AUTOREPORT · POWERED BY STRAIGHT-PATH.EU · GEMINI AI
        </p>
      </div>

      <style>{`
        @keyframes teaser-draw {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(206,17,38,0.3); }
          50% { box-shadow: 0 0 40px rgba(206,17,38,0.6); }
        }
      `}</style>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(206,17,38,0.4))" }} />
      <span className="text-[9px] font-mono tracking-[0.35em] text-[#CE1126]/70 uppercase">{label}</span>
      <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(90deg, rgba(206,17,38,0.4), transparent)" }} />
    </div>
  );
}

function ScreenshotFrame({ src, label, delay }: { src: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
      transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      <div className="relative rounded-sm overflow-hidden border border-white/[0.08]"
        style={{ animation: inView ? "float-y 6s ease-in-out infinite" : "none", animationDelay: `${delay * 0.5}ms` }}>
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "#0D0D14" }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 mx-3 px-3 py-1 rounded-sm text-[10px] font-mono text-white/20 border border-white/[0.05]"
            style={{ background: "#08080E" }}>
            auto-report.replit.app
          </div>
          <span className="text-[9px] font-mono tracking-widest text-[#CE1126]/60">{label}</span>
        </div>
        <img src={src} alt={label} className="w-full block" style={{ background: "#05050A" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
    </div>
  );
}

function AppMockup({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      <div className="rounded-sm border border-white/[0.08] overflow-hidden h-full"
        style={{ background: "#07070F", minHeight: 240 }}>
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "#0D0D14" }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="ml-2 text-[9px] font-mono tracking-widest text-[#CE1126]/60">TABLEAU DE BORD</span>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {["RAPPORTS", "ABONNEMENT", "STATUT"].map((t, i) => (
              <div key={i} className="rounded-sm p-3 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.01)" }}>
                <p className="text-[8px] font-mono text-white/25 mb-1">{t}</p>
                <p className="text-lg font-black font-mono text-white/70">{i === 0 ? "3" : i === 1 ? "Pro" : "✓"}</p>
              </div>
            ))}
          </div>
          <div className="rounded-sm p-4 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.01)" }}>
            <p className="text-[8px] font-mono text-white/25 mb-3">DERNIERS RAPPORTS</p>
            {[
              { car: "Toyota Yaris 2020", score: "8.2" },
              { car: "Peugeot 308 2019", score: "6.5" },
              { car: "BMW Serie 3 2018", score: "7.8" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                <span className="text-[10px] text-white/50 font-mono">{r.car}</span>
                <span className="text-[10px] font-black font-mono" style={{ color: "#CE1126" }}>{r.score}/10</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportPreviewMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div className="rounded-sm border border-white/[0.08] overflow-hidden" style={{ background: "#07070F" }}>
        {/* Header */}
        <div className="p-6 border-b border-white/[0.04]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[9px] font-mono text-[#CE1126] tracking-[0.25em] mb-1">// RAPPORT_AUTOREPORT</p>
              <h3 className="text-xl font-black">Toyota Yaris 1.5 Hybrid — 2020 — 45 000 km</h3>
              <p className="text-xs text-white/30 font-mono mt-0.5">Généré le 18 mai 2026 · IA Gemini Ultra</p>
            </div>
            <div className="text-center shrink-0">
              <div className="text-5xl font-black font-mono" style={{ color: "#22c55e" }}>8.2</div>
              <p className="text-[8px] font-mono text-white/30 tracking-widest">/10</p>
            </div>
          </div>
          {/* Verdict badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold tracking-widest"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            ✓ BONNE AFFAIRE
          </div>
        </div>
        {/* Content grid */}
        <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.04]">
          {/* Points forts */}
          <div className="p-6">
            <p className="text-[9px] font-mono text-white/25 tracking-widest mb-4">POINTS FORTS</p>
            <div className="space-y-2">
              {["Hybride = économies carburant significatives", "Fiabilité Toyota reconnue sur ce modèle", "Kilométrage cohérent avec l'année"].map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-white/60">
                  <span className="text-green-400 shrink-0 mt-0.5">+</span> {s}
                </div>
              ))}
            </div>
          </div>
          {/* Points faibles */}
          <div className="p-6">
            <p className="text-[9px] font-mono text-white/25 tracking-widest mb-4">POINTS À SURVEILLER</p>
            <div className="space-y-2">
              {["Batterie hybride : vérifier état (coût remplacement élevé)", "Historique entretien à demander impérativement"].map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-white/60">
                  <span className="text-[#CE1126] shrink-0 mt-0.5">—</span> {s}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Progress bars */}
        <div className="p-6 border-t border-white/[0.04] grid sm:grid-cols-4 gap-4">
          {[
            { label: "FIABILITÉ", val: 85 },
            { label: "SÉCURITÉ", val: 90 },
            { label: "COÛT ENTRETIEN", val: 70 },
            { label: "RAPPORT QUALITÉ/PRIX", val: 80 },
          ].map((m, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[8px] font-mono text-white/25 tracking-wider">{m.label}</span>
                <span className="text-[10px] font-black font-mono text-white/60">{m.val}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: inView ? `${m.val}%` : "0%",
                    background: "linear-gradient(90deg, #CE1126, #fbbf24)",
                    transitionDelay: `${i * 150 + 500}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingCard({ name, price, desc, highlight, delay }: {
  name: string; price: string; desc: string; highlight: boolean; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.7s ease ${delay}ms`,
      flex: 1,
    }}>
      <div
        className="relative h-full p-6 rounded-sm text-center"
        style={{
          background: highlight ? "rgba(206,17,38,0.08)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${highlight ? "rgba(206,17,38,0.35)" : "rgba(255,255,255,0.06)"}`,
          animation: highlight && inView ? "glow-pulse 3s ease-in-out infinite" : "none",
        }}
      >
        {highlight && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-sm"
              style={{ background: "linear-gradient(135deg, #CE1126, #aa0f20)", boxShadow: "0 0 20px rgba(206,17,38,0.5)" }}>
              LE PLUS POPULAIRE
            </span>
          </div>
        )}
        <p className="text-[9px] font-mono tracking-[0.25em] text-white/30 mb-3">{name}</p>
        <p className="text-3xl font-black mb-1" style={{ color: highlight ? "#CE1126" : "white" }}>{price}</p>
        <p className="text-xs text-white/30 mb-5">{desc}</p>
        <a href="/" className="block w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200"
          style={{
            background: highlight ? "linear-gradient(135deg, #CE1126, #aa0f20)" : "rgba(255,255,255,0.05)",
            border: highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
          }}>
          Commencer
        </a>
      </div>
    </div>
  );
}
