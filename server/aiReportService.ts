import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-2.5-flash";

const USE_REPLIT_INTEGRATION = !!(process.env.AI_INTEGRATIONS_GEMINI_BASE_URL && process.env.AI_INTEGRATIONS_GEMINI_API_KEY);
const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";

if (!apiKey) {
  console.warn("[AIReport] Aucune clé Gemini configurée — configurez GEMINI_API_KEY ou l'intégration Replit.");
}

const ai = USE_REPLIT_INTEGRATION
  ? new GoogleGenAI({
      apiKey,
      httpOptions: { apiVersion: "", baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL },
    })
  : new GoogleGenAI({ apiKey });

console.info(`[AIReport] Gemini provider: ${USE_REPLIT_INTEGRATION ? "Replit AI Integrations (crédits Replit)" : "Google API directe"}`);

export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  mileage?: string;
  issue?: string;
  finition?: string;
  motorisation?: string;
  puissance?: string;
  carburant?: string;
  gearbox?: string;
  usage?: string | string[];
  prix?: string;
  codePostal?: string;
}

export interface ReportSection {
  title: string;
  content: string;
  severity?: "low" | "medium" | "high" | "critical";
}

export interface ScoreBreakdown {
  fiabilite: number;
  cout: number;
  securite: number;
  praticite: number;
}

export interface PurchaseRecommendation {
  score: number;
  scoreBreakdown?: ScoreBreakdown;
  verdict: "BONNE AFFAIRE" | "CORRECT" | "RISQUÉ" | "À ÉVITER";
  negotiationTips: string[];
  inspectionChecklist: string[];
}

export interface GeneratedReport {
  vehicleInfo: VehicleInfo;
  summary: string;
  sections: ReportSection[];
  recommendations: string[];
  estimatedCost?: string;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  purchaseRecommendation?: PurchaseRecommendation;
  generatedAt: string;
}

const SYSTEM_PROMPT_BASE = `Tu es un expert automobile senior spécialisé dans l'aide à l'achat de véhicules d'occasion. Tu analyses chaque véhicule avec précision et honnêteté pour aider un particulier à prendre la meilleure décision.

PRINCIPES FONDAMENTAUX :
- Langage simple, direct, accessible à quelqu'un qui ne connaît pas la mécanique
- Honnêteté totale : si un véhicule a des problèmes connus, tu les dis clairement
- TOUTES les données fournies doivent être exploitées dans l'analyse (marque, modèle, motorisation, kilométrage, usage, prix)
- Chaque rapport est UNIQUE et personnalisé — zéro contenu générique
- ZÉRO mention de diagnostic OBD, codes défaut, valise — c'est un rapport d'aide à l'ACHAT
- Les 4 verdicts : BONNE AFFAIRE (score ≥ 8), CORRECT (score 6-7.9), RISQUÉ (score 4-5.9), À ÉVITER (score < 4)

FORMAT DE RÉPONSE : JSON uniquement, aucun texte avant ou après, respectant EXACTEMENT cette structure :

{
  "summary": "Bilan en 3-4 phrases percutantes sur CE véhicule précis. Cite marque, modèle, kilométrage. Conclude avec le verdict : BONNE AFFAIRE / CORRECT / RISQUÉ / À ÉVITER suivi d'une phrase d'explication directe.",

  "sections": [
    {
      "title": "⭐ Score Global & Sous-critères",
      "content": "Score global : X/10. Fiabilité : X/10 — [justification spécifique à ce modèle]. Coût : X/10 — [coût annuel d'entretien estimé, faible = bon score]. Sécurité : X/10 — [résultats crash-tests EuroNCAP, systèmes d'aide à la conduite disponibles]. Praticité : X/10 — [facilité au quotidien, espace, consommation, coût assurance].",
      "severity": "low"
    },
    {
      "title": "🏆 Verdict Expert",
      "content": "BONNE AFFAIRE / CORRECT / RISQUÉ / À ÉVITER — [Explication du verdict en 2-3 phrases. Pourquoi ce véhicule mérite ou non ce verdict. Sois direct et concret.]",
      "severity": "low"
    },
    {
      "title": "💰 Analyse du Prix",
      "content": "Fourchette de prix actuelle du marché pour ce modèle/année/kilométrage : X € à Y €. [Si le prix demandé est fourni : analyse précise — très bon prix / bon prix / prix correct / légèrement cher / trop cher — et de combien €.] Source : LaCentrale, AutoScout24.",
      "severity": "low"
    },
    {
      "title": "📋 Bilan Rapide",
      "content": "Ce véhicule en quelques mots : [3-5 points clés positifs ou négatifs en bullet points. Résumé actionnable pour décider rapidement.]",
      "severity": "medium"
    },
    {
      "title": "✅ Points Forts",
      "content": "3 à 5 points forts RÉELS et documentés sur ce modèle et cette motorisation spécifique. Chaque point doit citer des faits concrets : kilométrage, durabilité connue, économies. Pas de généralités.",
      "severity": "low"
    },
    {
      "title": "⚠️ Points Faibles",
      "content": "3 à 5 défauts CONNUS et documentés sur ce modèle et cette motorisation. Chaque défaut doit être réel, avec si possible une indication sur la fréquence et le coût de réparation. Pas de généralités.",
      "severity": "medium"
    },
    {
      "title": "🔴 Risques Spécifiques au Kilométrage",
      "content": "Pièces et composants à risque pour CE kilométrage précis sur CE modèle. Cite des coûts de remplacement en € : courroie de distribution, embrayage, amortisseurs, etc. Sois précis sur les seuils kilométriques.",
      "severity": "high"
    },
    {
      "title": "💶 Coût Annuel Estimé",
      "content": "Budget annuel réaliste : Entretien courant (vidanges, filtres, pneus) : X-Y €/an. Pièces d'usure à prévoir : X-Y €/an. Assurance estimée (profil standard) : X-Y €/an. TOTAL estimé : X-Y €/an.",
      "severity": "low"
    }
  ],

  "recommendations": [
    "Conseil pratique n°1 — spécifique aux faiblesses connues de ce modèle, actionnable avant l'achat",
    "Conseil pratique n°2",
    "Conseil pratique n°3"
  ],

  "estimatedCost": "Entretien X-Y €/an + Assurance X-Y €/an = Total X-Y €/an",

  "urgencyLevel": "low si BONNE AFFAIRE, medium si CORRECT, high si RISQUÉ, critical si À ÉVITER",

  "purchaseRecommendation": {
    "score": 0.0,
    "scoreBreakdown": {
      "fiabilite": 0.0,
      "cout": 0.0,
      "securite": 0.0,
      "praticite": 0.0
    },
    "verdict": "BONNE AFFAIRE ou CORRECT ou RISQUÉ ou À ÉVITER",
    "negotiationTips": [
      "Argument de négociation concret basé sur les défauts identifiés",
      "Deuxième argument",
      "Troisième argument"
    ],
    "inspectionChecklist": [
      "Point précis à vérifier lors de la visite physique, lié aux faiblesses connues de ce modèle",
      "Deuxième point",
      "Troisième point",
      "Quatrième point",
      "Cinquième point",
      "Sixième point"
    ]
  }
}`;

function buildSystemPrompt(customAdminContext?: string): string {
  if (!customAdminContext || !customAdminContext.trim()) return SYSTEM_PROMPT_BASE;
  return `${SYSTEM_PROMPT_BASE}\n\nCONTEXTE MÉTIER SUPPLÉMENTAIRE (fourni par l'administrateur) :\n${customAdminContext.trim()}`;
}

async function callGemini(prompt: string, systemPrompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.65,
      maxOutputTokens: 8192,
      topP: 0.92,
      responseMimeType: "application/json",
    },
  });

  const text = response.text;
  if (!text) throw new Error("Pas de réponse de l'IA");
  return text;
}

function inferMotorization(make: string, model: string, _year: string): string {
  const m = model.toLowerCase();
  const mk = make.toLowerCase();
  if (m.includes("tdi") || m.includes("hdi") || m.includes("cdti") || m.includes("dci") || m.includes("bluehdI") || m.includes(" d ") || m.includes("diesel")) return "diesel";
  if (m.includes("tsi") || m.includes("tfsi") || m.includes("gti") || m.includes("turbo") || m.includes("t5") || m.includes("t6")) return "essence turbo";
  if (m.includes("hybrid") || m.includes("hybride") || m.includes("phev") || m.includes("e-power") || m.includes("prius")) return "hybride";
  if (m.includes("electric") || m.includes("électrique") || m.includes("ev") || m.includes("bev") || m.includes("ioniq") || m.includes("model ") || mk.includes("tesla")) return "électrique";
  if ((mk.includes("bmw") || mk.includes("mercedes") || mk.includes("audi") || mk.includes("volkswagen")) && m.includes("d")) return "diesel";
  return "essence";
}

function buildPrompt(vehicleInfo: VehicleInfo): string {
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const motorization = vehicleInfo.carburant || inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const usageStr = vehicleInfo.usage
    ? (Array.isArray(vehicleInfo.usage) ? vehicleInfo.usage.join(", ") : vehicleInfo.usage)
    : "non précisé";

  const motorisationParts = [
    vehicleInfo.motorisation || "",
    vehicleInfo.puissance || "",
    !vehicleInfo.motorisation ? motorization : "",
    vehicleInfo.gearbox ? `boîte ${vehicleInfo.gearbox}` : "",
  ].filter(Boolean);
  const motorisationStr = motorisationParts.join(", ") || motorization;
  const kilometrageStr = km && !isNaN(km) ? `${km.toLocaleString("fr-FR")} km` : "non précisé";
  const dateRapport = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const ageYears = Math.max(0, new Date().getFullYear() - parseInt(vehicleInfo.year || "0", 10));

  let prompt = `GÉNÈRE UN RAPPORT D'AIDE À L'ACHAT PERSONNALISÉ en JSON.\n\n`;
  prompt += `=== DONNÉES DU VÉHICULE ===\n`;
  prompt += `Marque : ${vehicleInfo.make}\n`;
  prompt += `Modèle : ${vehicleInfo.model}\n`;
  if (vehicleInfo.finition) prompt += `Finition : ${vehicleInfo.finition}\n`;
  prompt += `Motorisation : ${motorisationStr}\n`;
  prompt += `Année : ${vehicleInfo.year} (${ageYears} an${ageYears > 1 ? "s" : ""} d'ancienneté)\n`;
  prompt += `Kilométrage : ${kilometrageStr}\n`;
  prompt += `Usage déclaré : ${usageStr}\n`;
  if (vehicleInfo.prix) prompt += `Prix demandé : ${vehicleInfo.prix} €\n`;
  if (vehicleInfo.codePostal) prompt += `Localisation : ${vehicleInfo.codePostal}\n`;
  prompt += `Date : ${dateRapport}\n`;
  prompt += `\n=== CONTRAINTES STRICTES ===\n`;
  prompt += `1. Chaque section cite "${vehicleInfo.make} ${vehicleInfo.model}" et le kilométrage "${kilometrageStr}" explicitement\n`;
  prompt += `2. Données basées sur les défauts et qualités RÉELLEMENT connus sur CE modèle avec CETTE motorisation (${motorisationStr})\n`;
  prompt += `3. Les 4 scores du scoreBreakdown doivent être cohérents avec le score global\n`;
  prompt += `4. Le verdict dans "sections[1].content" ET dans "purchaseRecommendation.verdict" doivent être IDENTIQUES\n`;
  if (vehicleInfo.prix) {
    prompt += `5. Analyse précise du prix ${vehicleInfo.prix} € vs marché actuel\n`;
  }
  prompt += `6. ZÉRO mention d'OBD, valise de diagnostic, codes défaut — aide à l'achat uniquement\n`;
  prompt += `7. Checklist = actions physiques lors de la visite du véhicule, pas des diagnostics électroniques\n`;

  return prompt;
}

function generateFallbackPurchaseRecommendation(vehicleInfo: VehicleInfo): PurchaseRecommendation {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;

  const checklist = [
    `Vérifier l'état général de la carrosserie et peinture — traces de chocs, rouille, réparations`,
    `Contrôler le carnet d'entretien complet — factures justifiant chaque vidange et révision`,
    `Essai routier d'au moins 20 minutes — noter tout bruit anormal, vibration ou comportement suspect`,
    `Vérifier les niveaux visibles : huile moteur (couleur + niveau), liquide de refroidissement`,
    `Inspecter l'état des pneus — usure uniforme, même marque sur chaque essieu`,
  ];

  if (motorization === "diesel") {
    checklist.push(`Démarrage à froid impératif — noter toute fumée noire ou bleue au démarrage`);
  } else if (motorization === "électrique" || motorization === "hybride") {
    checklist.push(`Demander le rapport d'état de batterie — autonomie réelle vs autonomie constructeur`);
  } else {
    checklist.push(`Demander la date et facture de remplacement de courroie de distribution — pièce critique`);
  }

  if (km && km > 100000) {
    checklist.push(`À ${km.toLocaleString("fr-FR")} km : demander factures de remplacement amortisseurs, embrayage, distribution`);
  }

  return {
    score: 5.0,
    scoreBreakdown: { fiabilite: 5.0, cout: 5.0, securite: 5.0, praticite: 5.0 },
    verdict: "CORRECT",
    negotiationTips: [
      `Vérifiez l'historique Histovec (gratuit sur histovec.interieur.gouv.fr) — un sinistre non déclaré justifie une réduction de 10 à 20%`,
      `Si le carnet d'entretien est incomplet, négociez 300-500 € de réduction pour les entretiens manqués`,
      `Proposez une expertise indépendante avant signature — un vendeur sérieux accepte`,
    ],
    inspectionChecklist: checklist,
  };
}

function generateFallbackReport(vehicleInfo: VehicleInfo): GeneratedReport {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const kmStr = km ? `${km.toLocaleString("fr-FR")} km` : "kilométrage non précisé";
  const ageYears = Math.max(0, new Date().getFullYear() - parseInt(vehicleInfo.year || "0", 10));

  return {
    vehicleInfo,
    summary: `${vehicleInfo.make} ${vehicleInfo.model} de ${vehicleInfo.year} (${kmStr}) — motorisation ${motorization}. Ce véhicule de ${ageYears} an${ageYears > 1 ? "s" : ""} mérite une vérification sérieuse avant achat. Les données sont insuffisantes pour un verdict définitif — verdict provisoire : CORRECT en attendant une inspection physique.`,
    sections: [
      {
        title: "⭐ Score Global & Sous-critères",
        content: `Score global : 5/10\n\nFiabilité : 5/10 — Non évaluable sans plus de données sur ce modèle précis.\nCoût d'entretien : 5/10 — Variable selon l'historique d'entretien.\nValeur de revente : 5/10 — Dépend de l'état général.\nAdapté à l'usage : 5/10 — À vérifier lors de l'essai routier.`,
        severity: "medium",
      },
      {
        title: "🏆 Verdict Expert",
        content: `CORRECT — Les données sont insuffisantes pour un verdict définitif. Ce ${vehicleInfo.make} ${vehicleInfo.model} avec ${kmStr} nécessite une inspection physique avant toute décision. Procédez aux vérifications de la checklist.`,
        severity: "medium",
      },
      {
        title: "💰 Analyse du Prix",
        content: `Prix demandé : ${vehicleInfo.prix ? `${vehicleInfo.prix} €` : "non renseigné"}. Pour évaluer le prix, comparez sur LaCentrale.fr et AutoScout24 avec les mêmes critères (année, kilométrage, motorisation, état).`,
        severity: "low",
      },
      {
        title: "📋 Bilan Rapide",
        content: `• ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year} — ${ageYears} an${ageYears > 1 ? "s" : ""} d'ancienneté\n• Kilométrage : ${kmStr}\n• Motorisation : ${motorization}\n• Verdict provisoire : CORRECT — vérification physique recommandée avant décision`,
        severity: "medium",
      },
      {
        title: "✅ Points Forts",
        content: `Vérification du carnet d'entretien requise — les points forts ne peuvent être confirmés sans inspection physique et historique complet.`,
        severity: "low",
      },
      {
        title: "⚠️ Points Faibles",
        content: `Des points faibles potentiels sont à investiguer lors de la visite physique — voir la checklist avant achat.`,
        severity: "medium",
      },
      {
        title: "🔴 Risques Spécifiques au Kilométrage",
        content: `À ${vehicleInfo.mileage ? `${parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10).toLocaleString("fr-FR")} km` : "ce kilométrage"} : vérifier l'état de la distribution, de l'embrayage et des amortisseurs — pièces d'usure critiques à surveiller.`,
        severity: "high",
      },
      {
        title: "💶 Coût Annuel Estimé",
        content: `Budget annuel estimé : Entretien courant : 600-1 000 €/an. Pièces d'usure à prévoir : 200-500 €/an. Assurance (profil standard) : 600-1 200 €/an. TOTAL estimé : 1 400-2 700 €/an.`,
        severity: "low",
      },
    ],
    recommendations: [
      `Vérifier le carnet d'entretien complet — toutes les révisions justifiées par factures`,
      `Faire un essai routier d'au moins 20 minutes sur différents types de routes`,
      `Consulter l'historique Histovec (gratuit) pour vérifier les sinistres déclarés`,
    ],
    estimatedCost: "Entretien : 800-1 500 €/an + Assurance : 600-1 200 €/an = Total : 1 400-2 700 €/an",
    urgencyLevel: "medium",
    purchaseRecommendation: generateFallbackPurchaseRecommendation(vehicleInfo),
    generatedAt: new Date().toISOString(),
  };
}

function extractJson(raw: string): string {
  let cleaned = raw.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) cleaned = fenceMatch[1].trim();
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first !== -1 && last !== -1) cleaned = cleaned.slice(first, last + 1);
  return cleaned;
}

const VALID_VERDICTS = ["BONNE AFFAIRE", "CORRECT", "RISQUÉ", "À ÉVITER"] as const;

export async function generateAiReport(vehicleInfo: VehicleInfo, adminContextPrompt?: string): Promise<GeneratedReport> {
  try {
    const systemPrompt = buildSystemPrompt(adminContextPrompt);
    const userPrompt = buildPrompt(vehicleInfo);
    const rawResponse = await callGemini(userPrompt, systemPrompt);

    let cleanJson = extractJson(rawResponse);
    const parsed = JSON.parse(cleanJson);

    const pr = parsed.purchaseRecommendation;
    const validVerdict = VALID_VERDICTS.includes(pr?.verdict) ? pr.verdict : undefined;

    const scoreBreakdown = pr?.scoreBreakdown && typeof pr.scoreBreakdown === "object" ? {
      fiabilite: Math.min(10, Math.max(0, Number(pr.scoreBreakdown.fiabilite) || 5)),
      cout: Math.min(10, Math.max(0, Number(pr.scoreBreakdown.cout) || 5)),
      securite: Math.min(10, Math.max(0, Number(pr.scoreBreakdown.securite) || 5)),
      praticite: Math.min(10, Math.max(0, Number(pr.scoreBreakdown.praticite) || 5)),
    } : undefined;

    const fallback = generateFallbackReport(vehicleInfo);
    const parsedSections: ReportSection[] = Array.isArray(parsed.sections) ? parsed.sections : [];

    // Enforce structural completeness: require at least 8 sections
    const sections = parsedSections.length >= 8
      ? parsedSections
      : [...parsedSections, ...fallback.sections.slice(parsedSections.length)];

    const report: GeneratedReport = {
      vehicleInfo,
      summary: parsed.summary || fallback.summary,
      sections,
      recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length >= 3
        ? parsed.recommendations
        : fallback.recommendations,
      estimatedCost: parsed.estimatedCost || fallback.estimatedCost,
      urgencyLevel: parsed.urgencyLevel || "medium",
      purchaseRecommendation: pr && typeof pr.score === "number" && validVerdict
        ? {
            score: Math.min(10, Math.max(0, pr.score)),
            scoreBreakdown,
            verdict: validVerdict as PurchaseRecommendation["verdict"],
            negotiationTips: Array.isArray(pr.negotiationTips) && pr.negotiationTips.length > 0
              ? pr.negotiationTips
              : fallback.purchaseRecommendation!.negotiationTips,
            inspectionChecklist: Array.isArray(pr.inspectionChecklist) && pr.inspectionChecklist.length > 0
              ? pr.inspectionChecklist
              : fallback.purchaseRecommendation!.inspectionChecklist,
          }
        : fallback.purchaseRecommendation!,
      generatedAt: new Date().toISOString(),
    };

    return report;
  } catch (err: any) {
    console.error("[AIReport] Generation failed, using fallback:", err.message);
    return generateFallbackReport(vehicleInfo);
  }
}

export function generateReportHtml(report: GeneratedReport): string {
  const severityColors: Record<string, string> = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#f97316",
    critical: "#dc2626",
  };
  const severityBg: Record<string, string> = {
    low: "#f0fdf4",
    medium: "#fffbeb",
    high: "#fff7ed",
    critical: "#fef2f2",
  };
  const urgencyLabels: Record<string, string> = {
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    critical: "Critique",
  };
  const verdictColors: Record<string, string> = {
    "BONNE AFFAIRE": "#22c55e",
    "CORRECT": "#3b82f6",
    "RISQUÉ": "#f97316",
    "À ÉVITER": "#dc2626",
  };

  const pr = report.purchaseRecommendation;
  const verdictColor = pr ? (verdictColors[pr.verdict] || "#f59e0b") : "#f59e0b";
  const ref = `AR-${Date.now().toString(36).toUpperCase()}`;
  const dateStr = new Date(report.generatedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  const scoreBreakdownHtml = pr?.scoreBreakdown ? `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
      ${[
        { label: "Fiabilité", val: pr.scoreBreakdown.fiabilite },
        { label: "Coût", val: pr.scoreBreakdown.cout },
        { label: "Sécurité", val: pr.scoreBreakdown.securite },
        { label: "Praticité", val: pr.scoreBreakdown.praticite },
      ].map(({ label, val }) => {
        const col = val >= 7 ? "#22c55e" : val >= 4 ? "#f59e0b" : "#dc2626";
        return `<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
          <div style="font-size: 10px; color: #6b7280; margin-bottom: 3px;">${label}</div>
          <div style="font-size: 14px; font-weight: 800; color: ${col};">${val.toFixed(1)}<span style="font-size: 9px; color: #9ca3af;">/10</span></div>
          <div style="height: 4px; background: #e5e7eb; border-radius: 2px; margin-top: 4px; overflow:hidden;">
            <div style="height: 100%; width: ${val * 10}%; background: ${col}; border-radius: 2px;"></div>
          </div>
        </div>`;
      }).join("")}
    </div>` : "";

  const sectionsDetailHtml = report.sections.map(s => `
    <div style="margin-bottom: 16px; padding: 12px 14px; background: ${severityBg[s.severity || "medium"]}; border-left: 4px solid ${severityColors[s.severity || "medium"]}; border-radius: 0 6px 6px 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
        <h3 style="font-size: 12px; font-weight: 700; color: #111; margin: 0;">${s.title}</h3>
        <span style="font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 10px; color: white; background: ${severityColors[s.severity || "medium"]}; white-space: nowrap; margin-left: 8px;">${urgencyLabels[s.severity || "medium"]}</span>
      </div>
      <p style="font-size: 11.5px; color: #444; line-height: 1.65; margin: 0; white-space: pre-line;">${s.content}</p>
    </div>`).join("");

  const checklistHtml = pr && pr.inspectionChecklist.length > 0 ? `
    <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #111; margin-bottom: 10px;">✅ Checklist avant signature</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
        ${pr.inspectionChecklist.map(item => `
          <div style="display: flex; align-items: flex-start; gap: 5px; font-size: 10.5px; color: #374151; line-height: 1.4;">
            <span style="width: 12px; height: 12px; border: 1.5px solid #9ca3af; border-radius: 2px; display: inline-block; flex-shrink: 0; margin-top: 1px;"></span>
            <span>${item}</span>
          </div>`).join("")}
      </div>
    </div>` : "";

  const negotiationHtml = pr && pr.negotiationTips.length > 0 ? `
    <div style="margin-top: 14px; padding: 12px 14px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;">
      <h3 style="font-size: 11px; font-weight: 700; color: #92400e; margin-bottom: 7px;">💰 Arguments de négociation</h3>
      <ul style="padding-left: 14px; margin: 0;">
        ${pr.negotiationTips.map(t => `<li style="font-size: 11px; color: #78350f; margin-bottom: 4px; line-height: 1.5;">${t}</li>`).join("")}
      </ul>
    </div>` : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AutoReport — ${report.vehicleInfo.make} ${report.vehicleInfo.model} ${report.vehicleInfo.year}</title>
  <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Exo 2', sans-serif; color: #1a1a1a; background: #ffffff; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div style="height: 5px; background: linear-gradient(90deg, #CE1126 0%, #ff3350 50%, #CE1126 100%);"></div>
  <div style="max-width: 794px; margin: 0 auto; padding: 24px 28px 36px;">

    <!-- HEADER -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #e5e7eb;">
      <div>
        <div style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; line-height: 1;">
          <span style="color: #111;">Auto</span><span style="color: #CE1126;">Report</span>
        </div>
        <div style="font-size: 9px; color: #999; text-transform: uppercase; letter-spacing: 3px; margin-top: 3px;">Analyse Pré-Achat · Véhicule d'Occasion</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 10px; font-weight: 700; color: #CE1126; letter-spacing: 1px; font-family: monospace;">Réf: ${ref}</div>
        <div style="font-size: 10px; color: #888; margin-top: 2px;">${dateStr}</div>
      </div>
    </div>

    <!-- VÉHICULE + SCORE + VERDICT -->
    <div style="background: #0d0d12; color: white; border-radius: 8px; padding: 16px 20px; margin-bottom: 18px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #CE1126, #ff3350, #CE1126);"></div>
      <div style="font-size: 9px; color: #CE1126; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 6px; font-weight: 700;">Véhicule analysé</div>
      <div style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 8px;">${report.vehicleInfo.make} ${report.vehicleInfo.model} ${report.vehicleInfo.year}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 14px; align-items: center;">
        ${report.vehicleInfo.mileage ? `<span style="font-size: 11px; color: #9ca3af;">${Number(report.vehicleInfo.mileage).toLocaleString("fr-FR")} km</span>` : ""}
        ${(report.vehicleInfo as any).carburant ? `<span style="font-size: 11px; color: #9ca3af;">${(report.vehicleInfo as any).carburant}</span>` : ""}
        ${(report.vehicleInfo as any).motorisation ? `<span style="font-size: 11px; color: #9ca3af;">${(report.vehicleInfo as any).motorisation}</span>` : ""}
        ${(report.vehicleInfo as any).gearbox ? `<span style="font-size: 11px; color: #9ca3af;">Boîte ${(report.vehicleInfo as any).gearbox}</span>` : ""}
        ${pr ? `<span style="margin-left: auto; font-size: 9px; color: #6b7280;">Score global</span><span style="font-size: 22px; font-weight: 900; color: ${verdictColor};">${pr.score.toFixed(1)}<span style="font-size: 11px; font-weight: 400; color: #6b7280;">/10</span></span>` : ""}
      </div>
      ${pr ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ffffff12; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 12px; font-weight: 800; padding: 4px 14px; border-radius: 20px; color: white; background: ${verdictColor};">${pr.verdict}</span>
        <span style="font-size: 11px; color: #9ca3af;">${pr.verdict === "BONNE AFFAIRE" ? "Ce véhicule présente un excellent rapport qualité/risque" : pr.verdict === "CORRECT" ? "Ce véhicule est acceptable mais mérite quelques vérifications" : pr.verdict === "RISQUÉ" ? "Des risques importants ont été identifiés — négocier le prix" : "Les risques identifiés déconseillent fortement cet achat"}</span>
      </div>` : ""}
    </div>

    <!-- SOUS-SCORES -->
    ${scoreBreakdownHtml}

    <!-- SYNTHÈSE -->
    <div style="margin: 16px 0;">
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 8px; padding-bottom: 5px; border-bottom: 2px solid #CE1126; display: inline-block;">Synthèse de l'analyse</h2>
      <p style="font-size: 12px; color: #374151; line-height: 1.75;">${report.summary}</p>
    </div>

    <!-- ANALYSE DÉTAILLÉE -->
    <div style="margin-bottom: 16px;">
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 12px; padding-bottom: 5px; border-bottom: 2px solid #CE1126; display: inline-block;">Analyse détaillée</h2>
      ${sectionsDetailHtml}
    </div>

    ${negotiationHtml}

    <!-- RECOMMANDATIONS -->
    ${report.recommendations.length > 0 ? `
    <div style="margin: 16px 0; padding: 14px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 10px;">Conseils pratiques</h2>
      <ol style="padding-left: 16px; margin: 0;">
        ${report.recommendations.map((r, i) => `<li style="font-size: 11.5px; color: #374151; margin-bottom: 7px; line-height: 1.6;"><strong style="color: #CE1126;">${i + 1}.</strong> ${r}</li>`).join("")}
      </ol>
    </div>` : ""}

    ${checklistHtml}

    <!-- FOOTER -->
    <div style="margin-top: 28px; padding-top: 14px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 10px; font-weight: 800; color: #CE1126;">Auto</span><span style="font-size: 10px; font-weight: 800; color: #111;">Report</span>
        <span style="font-size: 9px; color: #9ca3af; margin-left: 6px;">· Intelligence Artificielle Automobile</span>
      </div>
      <div style="font-size: 9px; color: #9ca3af; text-align: right;">
        support@autoreport.com · www.autoreport.com
      </div>
    </div>
  </div>
</body>
</html>`;
}
