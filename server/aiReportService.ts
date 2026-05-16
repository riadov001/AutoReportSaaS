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

interface VehicleInfo {
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

interface ReportSection {
  title: string;
  content: string;
  severity?: "low" | "medium" | "high" | "critical";
}

export interface PurchaseRecommendation {
  score: number;
  verdict: "Acheter" | "Négocier" | "Éviter";
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

const SYSTEM_PROMPT = `Tu es un expert automobile senior spécialisé dans l'aide à l'achat de véhicules d'occasion.

TON RÔLE : Aider un acheteur à prendre la meilleure décision pour le véhicule PRÉCIS qui t'est soumis. Chaque rapport que tu génères doit être unique, personnalisé, basé EXCLUSIVEMENT sur les données du véhicule reçu.

PRINCIPES FONDAMENTAUX :
- Ton langage est simple, direct, accessible à quelqu'un qui ne connaît pas la mécanique
- Tu es honnête : si un véhicule a des problèmes connus, tu les dis clairement
- Tu utilises TOUTES les données fournies (marque, modèle, motorisation, kilométrage, usage, prix)
- AUCUN contenu générique ou copié-collé entre rapports : chaque analyse est unique
- ZÉRO référence à l'OBD, aux codes défaut, aux diagnostics électroniques — c'est un rapport d'aide à l'ACHAT, pas un diagnostic atelier
- Si le prix est fourni, tu analyses concrètement si c'est une bonne affaire ou non

STRUCTURE JSON OBLIGATOIRE — réponds UNIQUEMENT en JSON valide, aucun texte avant ou après :

{
  "summary": "string — Bilan en 3-4 phrases sur CE véhicule précis (cite la marque, le modèle, le kilométrage). Termine par le verdict : BONNE AFFAIRE / CORRECT / RISQUÉ / À ÉVITER et une phrase d'explication directe.",
  "sections": [
    {
      "title": "⭐ Score Global",
      "content": "string — Score X/10, puis les 4 sous-scores avec explication SPÉCIFIQUE à ce modèle et ce kilométrage : Fiabilité X/10, Coût d'entretien X/10, Valeur de revente X/10, Adapté à l'usage X/10. Chaque score doit être justifié par des faits concrets sur CE modèle.",
      "severity": "low"
    },
    {
      "title": "✅ Points Forts",
      "content": "string — 3 à 5 points forts RÉELS et documentés sur ce modèle/motorisation. Pas de généralités. Ex: 'Le moteur 1.5 dCi de Renault est reconnu pour sa longévité au-delà de 200 000 km si l'entretien est suivi.'",
      "severity": "low"
    },
    {
      "title": "⚠️ Points Faibles",
      "content": "string — 3 à 5 défauts CONNUS et documentés sur ce modèle précis. Cite les problèmes réels que les propriétaires rencontrent. Pas de généralités.",
      "severity": "medium"
    },
    {
      "title": "🔴 Risques à ce Kilométrage",
      "content": "string — Problèmes et pièces à risque pour CE kilométrage sur CE modèle. Cite des coûts de remplacement réels en €. Ex: 'La courroie de distribution sur ce moteur est à remplacer tous les 120 000 km — budget : 300-500 €.'",
      "severity": "high"
    },
    {
      "title": "💰 Analyse du Prix",
      "content": "string — Fourchette de prix du marché actuel pour ce modèle/année/kilométrage. Si le prix demandé est fourni, dis clairement s'il est justifié ou non et de combien il est au-dessus/en-dessous du marché. Cite une position : très bon prix / bon prix / prix correct / légèrement cher / trop cher.",
      "severity": "low"
    },
    {
      "title": "🧾 Budget Annuel à Prévoir",
      "content": "string — Coût d'entretien annuel moyen réaliste pour ce modèle (vidanges, filtres, pneus, freins...) et assurance approximative. Donne un total annuel estimé.",
      "severity": "low"
    }
  ],
  "recommendations": [
    "string — Point concret à vérifier AVANT d'acheter, spécifique aux faiblesses connues de ce modèle (pas générique)",
    "string — Deuxième point",
    "string — Troisième point",
    "string — Quatrième point",
    "string — Cinquième point"
  ],
  "estimatedCost": "string — Résumé : Entretien X-Y € / an + Assurance X-Y € / an = Total X-Y € / an",
  "urgencyLevel": "low si bon achat, medium si points à surveiller, high si risques importants, critical si à éviter",
  "purchaseRecommendation": {
    "score": 0.0,
    "verdict": "Acheter si score ≥ 7.5, Négocier si 5 à 7.4, Éviter si moins de 5",
    "negotiationTips": [
      "string — Conseil concret pour négocier ou sécuriser l'achat, basé sur les faiblesses identifiées",
      "string — Deuxième conseil",
      "string — Troisième conseil"
    ],
    "inspectionChecklist": [
      "string — Chose précise à regarder/tester lors de la visite du véhicule, liée aux faiblesses connues",
      "string — Deuxième point",
      "string — Troisième point",
      "string — Quatrième point",
      "string — Cinquième point"
    ]
  }
}

IMPORTANT : Le champ "verdict" dans purchaseRecommendation doit être UNIQUEMENT l'un des trois mots exacts : "Acheter", "Négocier" ou "Éviter".`;

async function callGemini(prompt: string, systemPromptOverride?: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      systemInstruction: systemPromptOverride || SYSTEM_PROMPT,
      temperature: 0.7,
      maxOutputTokens: 8192,
      topP: 0.92,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Pas de réponse de l'IA");
  }

  return text;
}

function inferMotorization(make: string, model: string, year: string): string {
  const m = model.toLowerCase();
  const mk = make.toLowerCase();

  if (m.includes("tdi") || m.includes("hdi") || m.includes("cdti") || m.includes("dci") || m.includes("bluehdI") || m.includes("d ") || m.includes(" d") || m.includes("diesel")) return "diesel";
  if (m.includes("tsi") || m.includes("tfsi") || m.includes("gti") || m.includes("turbo") || m.includes("t5") || m.includes("t6")) return "essence turbo";
  if (m.includes("hybrid") || m.includes("hybride") || m.includes("phev") || m.includes("e-power") || m.includes("prius")) return "hybride";
  if (m.includes("electric") || m.includes("électrique") || m.includes("ev") || m.includes("bev") || m.includes("ioniq") || m.includes("model ") || mk.includes("tesla")) return "électrique";
  if ((mk.includes("bmw") || mk.includes("mercedes") || mk.includes("audi") || mk.includes("volkswagen")) && m.includes("d")) return "diesel";
  return "essence";
}

function categorizeProblem(issue: string): string {
  const i = issue.toLowerCase();
  if (i.includes("démarr") || i.includes("start") || i.includes("batterie") || i.includes("départ")) return "démarrage/électrique";
  if (i.includes("frein") || i.includes("brake") || i.includes("abs") || i.includes("pédale")) return "freinage";
  if (i.includes("vitesse") || i.includes("boîte") || i.includes("embrayage") || i.includes("transmission") || i.includes("passage")) return "transmission";
  if (i.includes("chauff") || i.includes("refroid") || i.includes("températ") || i.includes("surchauff") || i.includes("radiateur")) return "refroidissement";
  if (i.includes("huile") || i.includes("consomm") || i.includes("fuite") || i.includes("goutte")) return "lubrification/étanchéité";
  if (i.includes("voyant") || i.includes("lumière") || i.includes("tableau") || i.includes("check") || i.includes("défaut")) return "électronique/capteurs";
  if (i.includes("bruit") || i.includes("vibr") || i.includes("claque") || i.includes("grince") || i.includes("craque")) return "mécanique/bruit";
  if (i.includes("turbo") || i.includes("puissance") || i.includes("accélér") || i.includes("cloque")) return "motorisation/performances";
  if (i.includes("direction") || i.includes("suspension") || i.includes("amort") || i.includes("train")) return "train roulant/direction";
  if (i.includes("carburant") || i.includes("injection") || i.includes("essence") || i.includes("gazole")) return "alimentation/injection";
  return "général";
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

  let prompt = `GÉNÈRE UN RAPPORT D'AIDE À L'ACHAT PERSONNALISÉ pour le véhicule suivant.\n\n`;
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

  prompt += `\n=== INSTRUCTIONS STRICTES ===\n`;
  prompt += `1. Chaque section doit citer explicitement "${vehicleInfo.make} ${vehicleInfo.model}" et le kilométrage "${kilometrageStr}"\n`;
  prompt += `2. Utilise tes connaissances documentées sur CE modèle exact avec CETTE motorisation (${motorisationStr})\n`;
  prompt += `3. Les défauts, risques et forces sont ceux RÉELLEMENT connus sur ce modèle — pas des généralités\n`;
  prompt += `4. Le score tient compte du kilométrage réel (${kilometrageStr}) et de l'usage déclaré (${usageStr})\n`;
  if (vehicleInfo.prix) {
    prompt += `5. Analyse précisément si ${vehicleInfo.prix} € est un bon prix pour ce véhicule dans cet état\n`;
  }
  prompt += `6. AUCUNE mention de diagnostic électronique, OBD ou codes défaut — aide à l'achat uniquement\n`;
  prompt += `7. Checklist = ce qu'on REGARDE et VÉRIFIE lors de la visite physique du véhicule\n`;
  prompt += `\nRéponds UNIQUEMENT avec le JSON complet.`;

  return prompt;
}

function generateFallbackPurchaseRecommendation(vehicleInfo: VehicleInfo): PurchaseRecommendation {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;

  const checklist = [
    `Vérifier l'état général de la carrosserie et de la peinture — chercher des traces de chocs, de rouille ou de réparations`,
    `Contrôler le carnet d'entretien complet — les factures doivent justifier chaque vidange et révision`,
    `Faire un essai routier d'au moins 20 minutes — noter tout bruit anormal, vibration ou comportement suspect`,
    `Vérifier les niveaux visibles : huile moteur (couleur + niveau), liquide de refroidissement`,
    `Inspecter l'état des pneus — usure uniforme et régulière, même marque sur chaque essieu`,
  ];

  if (motorization === "diesel") {
    checklist.push(`Essai à froid impératif — noter toute fumée noire ou bleue au démarrage, signe d'usure moteur`);
  } else if (motorization === "électrique" || motorization === "hybride") {
    checklist.push(`Demander le rapport d'état de la batterie — l'autonomie réelle doit être proche de l'autonomie constructeur`);
  } else {
    checklist.push(`Vérifier la date de remplacement de la courroie de distribution — pièce critique à remplacer tous les 5 ans ou 120 000 km`);
  }

  if (km && km > 100000) {
    checklist.push(`À ${km.toLocaleString("fr-FR")} km : demander les factures de remplacement des pièces d'usure (amortisseurs, embrayage, distribution)`);
  }

  return {
    score: 5.5,
    verdict: "Négocier",
    negotiationTips: [
      `Demandez le rapport d'historique du véhicule (Histovec gratuit sur histovec.interieur.gouv.fr) — un sinistre non déclaré justifie une réduction de 10 à 20%`,
      `Si le carnet d'entretien est incomplet, négociez une réduction de 300 à 500 € pour couvrir le risque d'entretiens manqués`,
      `Proposez de faire expertiser le véhicule par un professionnel indépendant avant l'achat — un vendeur sérieux acceptera`,
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
    summary: `${vehicleInfo.make} ${vehicleInfo.model} de ${vehicleInfo.year} (${kmStr}) — motorisation ${motorization}. Ce véhicule de ${ageYears} an${ageYears > 1 ? "s" : ""} mérite une vérification sérieuse avant achat. Consultez un professionnel de confiance pour une expertise physique. CORRECT — les données sont insuffisantes pour établir un verdict définitif.`,
    sections: [
      {
        title: `⭐ Score Global`,
        content: `Score global : 5.5/10\n\n• Fiabilité : non évaluable sans plus de données\n• Coût d'entretien : variable selon l'historique\n• Valeur de revente : dépend de l'état général\n• Adapté à l'usage : à vérifier lors de l'essai`,
        severity: "medium",
      },
      {
        title: `✅ Points à vérifier pour ce véhicule`,
        content: `Pour un ${vehicleInfo.make} ${vehicleInfo.model} de ${vehicleInfo.year} avec ${kmStr}, concentrez-vous sur l'état mécanique général, la complétude du carnet d'entretien et l'historique du véhicule. Un essai routier approfondi est indispensable.`,
        severity: "low",
      },
      {
        title: `💰 Analyse du Prix`,
        content: `Prix demandé : ${vehicleInfo.prix ? `${vehicleInfo.prix} €` : "non renseigné"}. Pour estimer si le prix est juste, comparez sur LaCentrale.fr et AutoScout24 avec les mêmes critères (année, kilométrage, motorisation).`,
        severity: "low",
      },
    ],
    recommendations: [
      `Vérifier le carnet d'entretien complet — toutes les révisions doivent être justifiées par des factures`,
      `Faire un essai routier d'au moins 20 minutes sur différents types de routes`,
      `Consulter l'historique Histovec (gratuit) pour vérifier les sinistres déclarés`,
      `Inspecter l'état des pneus, freins et amortisseurs — pièces d'usure coûteuses`,
      `Faire expertiser le véhicule par un mécanicien indépendant avant de signer`,
    ],
    estimatedCost: "Entretien : 800-1 500 € / an + Assurance : 600-1 200 € / an",
    urgencyLevel: "medium",
    purchaseRecommendation: generateFallbackPurchaseRecommendation(vehicleInfo),
    generatedAt: new Date().toISOString(),
  };
}

export async function generateAiReport(vehicleInfo: VehicleInfo, customSystemPrompt?: string): Promise<GeneratedReport> {
  try {
    const prompt = buildPrompt(vehicleInfo);
    const rawResponse = await callGemini(prompt, customSystemPrompt || undefined);

    let cleanJson = rawResponse.trim();
    const jsonMatch = cleanJson.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      cleanJson = jsonMatch[1].trim();
    }
    const firstBrace = cleanJson.indexOf("{");
    const lastBrace = cleanJson.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleanJson);

    const purchaseRec = parsed.purchaseRecommendation;
    const validVerdicts = ["Acheter", "Négocier", "Éviter"];

    const report: GeneratedReport = {
      vehicleInfo,
      summary: parsed.summary || "Rapport de diagnostic généré par IA.",
      sections: Array.isArray(parsed.sections) ? parsed.sections : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      estimatedCost: parsed.estimatedCost || undefined,
      urgencyLevel: parsed.urgencyLevel || "medium",
      purchaseRecommendation: purchaseRec && typeof purchaseRec.score === "number" && validVerdicts.includes(purchaseRec.verdict)
        ? {
            score: Math.min(10, Math.max(0, purchaseRec.score)),
            verdict: purchaseRec.verdict as PurchaseRecommendation["verdict"],
            negotiationTips: Array.isArray(purchaseRec.negotiationTips) ? purchaseRec.negotiationTips : [],
            inspectionChecklist: Array.isArray(purchaseRec.inspectionChecklist) ? purchaseRec.inspectionChecklist : [],
          }
        : generateFallbackPurchaseRecommendation(vehicleInfo),
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
    Acheter: "#22c55e",
    Négocier: "#f59e0b",
    Éviter: "#dc2626",
  };

  const ref = `AR-${Date.now().toString(36).toUpperCase()}`;
  const dateStr = new Date(report.generatedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  // Catégories de score par section (chaque section = une barre)
  const scoreFromSeverity: Record<string, number> = { low: 85, medium: 60, high: 35, critical: 15 };
  const colorFromSeverity: Record<string, string> = { low: "#22c55e", medium: "#f59e0b", high: "#f97316", critical: "#dc2626" };

  const categoryBarsHtml = report.sections.slice(0, 6).map(s => {
    const pct = scoreFromSeverity[s.severity || "medium"];
    const col = colorFromSeverity[s.severity || "medium"];
    return `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-size: 11px; font-weight: 600; color: #333; max-width: 65%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${s.title}</span>
          <span style="font-size: 11px; font-weight: 700; color: ${col};">${pct}/100</span>
        </div>
        <div style="height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
          <div style="height: 100%; width: ${pct}%; background: ${col}; border-radius: 3px; transition: width 0.4s;"></div>
        </div>
      </div>`;
  }).join("");

  // Points forts = sections low severity, points faibles = high/critical
  const pointsForts = report.sections.filter(s => s.severity === "low").slice(0, 5);
  const pointsFaibles = report.sections.filter(s => s.severity === "high" || s.severity === "critical").slice(0, 5);
  // Fallback: si vide, utiliser recommendations pour points forts
  const fortsItems = pointsForts.length > 0
    ? pointsForts.map(s => `<li style="margin-bottom: 7px; font-size: 12px; color: #166534; line-height: 1.5; padding-left: 6px; border-left: 2px solid #22c55e;">${s.title}</li>`).join("")
    : report.recommendations.slice(0, 4).map(r => `<li style="margin-bottom: 7px; font-size: 12px; color: #166534; line-height: 1.5; padding-left: 6px; border-left: 2px solid #22c55e;">${r}</li>`).join("");
  const faiblesItems = pointsFaibles.length > 0
    ? pointsFaibles.map(s => `<li style="margin-bottom: 7px; font-size: 12px; color: #991b1b; line-height: 1.5; padding-left: 6px; border-left: 2px solid #dc2626;">${s.title}</li>`).join("")
    : report.sections.filter(s => s.severity === "medium").slice(0, 4).map(s => `<li style="margin-bottom: 7px; font-size: 12px; color: #92400e; line-height: 1.5; padding-left: 6px; border-left: 2px solid #f59e0b;">${s.title}</li>`).join("");

  const pr = report.purchaseRecommendation;
  const verdictColor = pr ? (verdictColors[pr.verdict] || "#f59e0b") : "#f59e0b";

  // Sections détaillées
  const sectionsDetailHtml = report.sections.map(s => `
    <div style="margin-bottom: 18px; padding: 14px 16px; background: ${severityBg[s.severity || "medium"]}; border-left: 4px solid ${severityColors[s.severity || "medium"]}; border-radius: 0 6px 6px 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <h3 style="font-size: 13px; font-weight: 700; color: #111; margin: 0;">${s.title}</h3>
        <span style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; color: white; background: ${severityColors[s.severity || "medium"]}; white-space: nowrap; margin-left: 8px;">${urgencyLabels[s.severity || "medium"]}</span>
      </div>
      <p style="font-size: 12px; color: #444; line-height: 1.65; margin: 0;">${s.content}</p>
    </div>`).join("");

  const checklistHtml = pr && pr.inspectionChecklist.length > 0 ? `
    <div style="margin-top: 28px; padding: 18px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; page-break-inside: avoid;">
      <h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #111; margin-bottom: 12px;">✅ Checklist avant signature</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        ${pr.inspectionChecklist.map(item => `
          <div style="display: flex; align-items: flex-start; gap: 6px; font-size: 11px; color: #374151; line-height: 1.4;">
            <span style="width: 13px; height: 13px; border: 1.5px solid #9ca3af; border-radius: 3px; display: inline-block; flex-shrink: 0; margin-top: 1px;"></span>
            <span>${item}</span>
          </div>`).join("")}
      </div>
    </div>` : "";

  const negotiationHtml = pr && pr.negotiationTips.length > 0 ? `
    <div style="margin-top: 14px; padding: 14px 16px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;">
      <h3 style="font-size: 12px; font-weight: 700; color: #92400e; margin-bottom: 8px;">💰 Arguments de négociation</h3>
      <ul style="padding-left: 16px; margin: 0;">
        ${pr.negotiationTips.map(t => `<li style="font-size: 12px; color: #78350f; margin-bottom: 5px; line-height: 1.5;">${t}</li>`).join("")}
      </ul>
    </div>` : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AutoReport — ${report.vehicleInfo.make} ${report.vehicleInfo.model} ${report.vehicleInfo.year}</title>
  <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Exo 2', sans-serif; color: #1a1a1a; background: #ffffff; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-break { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <!-- Racing stripe -->
  <div style="height: 5px; background: linear-gradient(90deg, #CE1126 0%, #ff3350 50%, #CE1126 100%);"></div>

  <div style="max-width: 794px; margin: 0 auto; padding: 28px 32px 40px;">

    <!-- HEADER -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid #e5e7eb;">
      <div>
        <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; line-height: 1;">
          <span style="color: #111;">Auto</span><span style="color: #CE1126;">Report</span>
        </div>
        <div style="font-size: 9px; color: #999; text-transform: uppercase; letter-spacing: 3px; margin-top: 3px;">Analyse Pré-Achat · Véhicule d'Occasion</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 10px; font-weight: 700; color: #CE1126; letter-spacing: 1px; font-family: monospace;">Réf: ${ref}</div>
        <div style="font-size: 10px; color: #888; margin-top: 2px;">${dateStr}</div>
      </div>
    </div>

    <!-- VÉHICULE -->
    <div style="background: #0d0d12; color: white; border-radius: 8px; padding: 18px 22px; margin-bottom: 22px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #CE1126, #ff3350, #CE1126);"></div>
      <div style="font-size: 9px; color: #CE1126; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px; font-weight: 700;">Véhicule analysé</div>
      <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 10px;">${report.vehicleInfo.make} ${report.vehicleInfo.model}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 18px;">
        <div><span style="font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; display: block;">Année</span><span style="font-size: 14px; font-weight: 700; color: #f9fafb;">${report.vehicleInfo.year}</span></div>
        ${report.vehicleInfo.mileage ? `<div><span style="font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; display: block;">Km</span><span style="font-size: 14px; font-weight: 700; color: #f9fafb;">${Number(report.vehicleInfo.mileage).toLocaleString("fr-FR")} km</span></div>` : ""}
        ${(report.vehicleInfo as any).carburant ? `<div><span style="font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; display: block;">Carburant</span><span style="font-size: 14px; font-weight: 700; color: #f9fafb;">${(report.vehicleInfo as any).carburant}</span></div>` : ""}
        ${(report.vehicleInfo as any).gearbox ? `<div><span style="font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; display: block;">Boîte</span><span style="font-size: 14px; font-weight: 700; color: #f9fafb;">${(report.vehicleInfo as any).gearbox}</span></div>` : ""}
        ${(report.vehicleInfo as any).motorisation ? `<div><span style="font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; display: block;">Motorisation</span><span style="font-size: 14px; font-weight: 700; color: #f9fafb;">${(report.vehicleInfo as any).motorisation}</span></div>` : ""}
        ${pr ? `<div style="margin-left: auto; text-align: right;"><span style="font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; display: block;">Score global</span><span style="font-size: 24px; font-weight: 900; color: ${verdictColor};">${pr.score.toFixed(1)}<span style="font-size: 12px; font-weight: 400; color: #6b7280;">/10</span></span></div>` : ""}
      </div>
      ${pr ? `<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #ffffff12; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 20px; color: white; background: ${verdictColor}; letter-spacing: 0.5px;">${pr.verdict}</span>
        <span style="font-size: 11px; color: #9ca3af;">${pr.verdict === "Acheter" ? "Ce véhicule présente un bon rapport qualité / risque" : pr.verdict === "Négocier" ? "Ce véhicule mérite une négociation avant achat" : "Des risques importants ont été identifiés"}</span>
      </div>` : ""}
    </div>

    <!-- SYNTHÈSE -->
    <div style="margin-bottom: 22px;" class="no-break">
      <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px solid #CE1126; display: inline-block;">Synthèse de l'analyse</h2>
      <p style="font-size: 12.5px; color: #374151; line-height: 1.75;">${report.summary}</p>
    </div>

    <!-- SCORES PAR CATÉGORIE -->
    ${report.sections.length > 0 ? `
    <div style="margin-bottom: 22px;" class="no-break">
      <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #CE1126; display: inline-block;">Scores par catégorie</h2>
      ${categoryBarsHtml}
    </div>` : ""}

    <!-- POINTS FORTS / POINTS FAIBLES -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px;" class="no-break">
      <div style="padding: 14px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
        <h3 style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #166534; margin-bottom: 10px;">✓ Points forts</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${fortsItems || '<li style="font-size: 12px; color: #6b7280; font-style: italic;">Aucun point fort identifié</li>'}
        </ul>
      </div>
      <div style="padding: 14px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
        <h3 style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #991b1b; margin-bottom: 10px;">✗ Points faibles</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${faiblesItems || '<li style="font-size: 12px; color: #6b7280; font-style: italic;">Aucun point faible critique identifié</li>'}
        </ul>
      </div>
    </div>

    ${negotiationHtml}

    <!-- ANALYSE DÉTAILLÉE -->
    <div style="margin-top: 24px; margin-bottom: 22px;">
      <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 14px; padding-bottom: 6px; border-bottom: 2px solid #CE1126; display: inline-block;">Analyse détaillée</h2>
      ${sectionsDetailHtml}
    </div>

    <!-- RECOMMANDATIONS -->
    ${report.recommendations.length > 0 ? `
    <div style="margin-bottom: 22px; padding: 16px 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;" class="no-break">
      <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 12px;">Conseils pratiques</h2>
      <ol style="padding-left: 18px; margin: 0;">
        ${report.recommendations.map((r, i) => `<li style="font-size: 12px; color: #374151; margin-bottom: 8px; line-height: 1.6;"><strong style="color: #CE1126;">${i + 1}.</strong> ${r}</li>`).join("")}
      </ol>
    </div>` : ""}

    <!-- CHECKLIST -->
    ${checklistHtml}

    <!-- FOOTER -->
    <div style="margin-top: 36px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 10px; font-weight: 800; color: #CE1126;">Auto</span><span style="font-size: 10px; font-weight: 800; color: #111;">Report</span>
        <span style="font-size: 9px; color: #9ca3af; margin-left: 6px;">· Intelligence Artificielle Automobile</span>
      </div>
      <div style="font-size: 9px; color: #9ca3af; text-align: right;">
        <span>support@autoreport.com</span>
        <span style="margin: 0 6px;">·</span>
        <span>www.autoreport.com</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}
