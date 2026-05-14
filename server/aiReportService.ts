const USE_INTEGRATION = !!(process.env.AI_INTEGRATIONS_GEMINI_BASE_URL && process.env.AI_INTEGRATIONS_GEMINI_API_KEY);
const GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "https://generativelanguage.googleapis.com";
const GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-2.0-flash";

if (!USE_INTEGRATION && !GEMINI_API_KEY) {
  console.warn("[AIReport] No Gemini API key configured — report generation will fail. Set AI_INTEGRATIONS_GEMINI_API_KEY or GEMINI_API_KEY.");
}
console.info(`[AIReport] Gemini provider: ${USE_INTEGRATION ? "Replit integration proxy" : "Google direct API"}`);

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

const SYSTEM_PROMPT = `Tu es un expert automobile senior chez AutoReport.

Langage simple pour néophytes. Ton professionnel, premium, style Ferrari. Zéro blabla. Tout doit être lié précisément aux données du véhicule fourni.

FORMAT DE RÉPONSE — JSON STRICT :
Réponds UNIQUEMENT en JSON valide (zéro markdown, zéro texte hors JSON) selon cette structure exacte :

{
  "summary": "Bilan Rapide en 3-4 lignes max sur ce véhicule précis. Puis VERDICT EXPERT : BONNE AFFAIRE / CORRECT / RISQUÉ / À ÉVITER suivi d'une phrase courte d'explication.",
  "sections": [
    {
      "title": "⭐ Score Global",
      "content": "Score global : X/10\n\n• Fiabilité : X/10 — [explication courte spécifique à ce modèle/millésime]\n• Coût d'entretien : X/10 — [coût réel annuel estimé pour ce modèle]\n• Valeur de revente : X/10 — [cote marché tendance pour ce modèle]\n• Adapté à l'usage : X/10 — [adéquation avec l'usage déclaré]",
      "severity": "low"
    },
    {
      "title": "✅ Points Forts",
      "content": "3 à 5 points forts concrets et spécifiques à ce modèle/motorisation/finition :\n• ...\n• ...\n• ...",
      "severity": "low"
    },
    {
      "title": "⚠️ Points Faibles",
      "content": "3 à 5 défauts connus documentés sur ce modèle :\n• ...\n• ...\n• ...",
      "severity": "medium"
    },
    {
      "title": "🔴 Risques Spécifiques",
      "content": "Pannes fréquentes ou coûteuses sur ce modèle/motorisation/année/kilométrage :\n• ... — coût estimé : X €\n• ... — coût estimé : X €",
      "severity": "high"
    },
    {
      "title": "💰 Analyse du Prix",
      "content": "Fourchette du marché actuel : X € — Y €\nPosition du véhicule : [très bon prix / bon prix / prix moyen / cher / très cher]\n\n[2 phrases d'analyse basées sur le prix demandé vs la fourchette marché]",
      "severity": "low"
    },
    {
      "title": "🧾 Coût Estimé Annuel",
      "content": "• Entretien moyen : X — Y € / an\n• Assurance approximative : X — Y € / an\n\nTotal possession estimé / an : X — Y €",
      "severity": "low"
    }
  ],
  "recommendations": [
    "Point à vérifier 1 — checklist concrète et priorisée avant achat",
    "Point à vérifier 2",
    "Point à vérifier 3",
    "Point à vérifier 4",
    "Point à vérifier 5"
  ],
  "estimatedCost": "Entretien : X-Y € / an + Assurance : X-Y € / an = Total : X-Y € / an",
  "urgencyLevel": "low|medium|high|critical",
  "purchaseRecommendation": {
    "score": 7.5,
    "verdict": "Acheter|Négocier|Éviter",
    "negotiationTips": [
      "Conseil actionnable 1",
      "Conseil actionnable 2",
      "Conseil actionnable 3"
    ],
    "inspectionChecklist": [
      "Point de vérification physique 1",
      "Point de vérification physique 2",
      "Point de vérification physique 3",
      "Point de vérification physique 4",
      "Point de vérification physique 5"
    ]
  }
}

RÈGLES STRICTES :
- Adapte scores, risques et conseils au kilométrage réel + usage déclaré
- Si le prix demandé est fourni, analyse-le précisément vs la fourchette marché
- Si le code postal est fourni, tiens compte du contexte régional (assurance, usure route, etc.)
- verdict "Acheter" = score ≥ 7.5 (BONNE AFFAIRE), "Négocier" = 5 à 7.4 (CORRECT/RISQUÉ), "Éviter" = < 5 (À ÉVITER)
- urgencyLevel : "low" = bon état général, "medium" = points à surveiller, "high" = problèmes importants, "critical" = à éviter
- recommendations = exactement les points à vérifier avant achat (checklist priorisée)
- purchaseRecommendation.negotiationTips = exactement 3 conseils pratiques actionnables
- Sois honnête et direct. Zéro contenu générique.`;

async function callGemini(prompt: string, systemPromptOverride?: string): Promise<string> {
  const url = USE_INTEGRATION
    ? `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent`
    : `${GEMINI_BASE_URL}/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (USE_INTEGRATION) {
    headers["x-goog-api-key"] = GEMINI_API_KEY;
  }

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemPromptOverride || SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 8192,
      topP: 0.92,
      topK: 40,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("[AIReport] Gemini API error:", response.status, errText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
    : "Non précisé";

  const motorisationStr = [
    vehicleInfo.motorisation || "",
    vehicleInfo.puissance || "",
    motorization !== vehicleInfo.motorisation ? motorization : "",
    vehicleInfo.gearbox ? `boîte ${vehicleInfo.gearbox}` : "",
  ].filter(Boolean).join(", ") || "Non précisé";

  const kilometrageStr = km && !isNaN(km) ? `${km.toLocaleString("fr-FR")} km` : "Non précisé";
  const dateRapport = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  let prompt = `Données du véhicule à analyser :\n`;
  prompt += `- Marque : ${vehicleInfo.make}\n`;
  prompt += `- Modèle : ${vehicleInfo.model}\n`;
  prompt += `- Finition : ${vehicleInfo.finition || "Non précisé"}\n`;
  prompt += `- Motorisation : ${motorisationStr}\n`;
  prompt += `- Année : ${vehicleInfo.year}\n`;
  prompt += `- Kilométrage : ${kilometrageStr}\n`;
  prompt += `- Usage déclaré : ${usageStr}\n`;
  prompt += `- Prix demandé : ${vehicleInfo.prix ? `${vehicleInfo.prix} €` : "Non précisé"}\n`;
  prompt += `- Code postal : ${vehicleInfo.codePostal || "Non précisé"}\n`;
  prompt += `- Date du rapport : ${dateRapport}\n`;
  prompt += `\nGénère le rapport JSON complet selon la structure imposée. Toutes les informations doivent être spécifiques à ce véhicule précis, cette motorisation et ce kilométrage. Zéro contenu générique.`;

  return prompt;
}

function generateFallbackPurchaseRecommendation(vehicleInfo: VehicleInfo): PurchaseRecommendation {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const ageYears = Math.max(0, new Date().getFullYear() - parseInt(vehicleInfo.year || "0", 10));

  const baseChecklist = [
    "Scanner OBD-II sur tous les calculateurs (moteur, boîte, ABS, habitacle) — prévoir 40-80 € en garage indépendant",
    "Vérifier visuellement toutes les fuites sous le véhicule moteur chaud (huile, liquide de refroidissement)",
    "Inspecter l'état et la couleur de l'huile moteur — présence de lait = joint de culasse, huile très noire = entretiens négligés",
    "Tester le démarrage à froid ET après chauffe complète — noter tout raté d'allumage, fumée anormale, vibration",
    "Contrôler l'usure des pneumatiques et la géométrie (usure irrégulière = problème de suspension ou direction)",
    "Vérifier le carnet d'entretien complet : intervalles respectés, factures à l'appui",
  ];

  if (motorization === "diesel") {
    baseChecklist.push("Faire un essai à froid : surveiller la fumée noire au démarrage (turbo/injection) et l'accélération franche sans à-coups (FAP)");
  } else if (motorization === "électrique" || motorization === "hybride") {
    baseChecklist.push("Demander le rapport SOH (State of Health) de la batterie HT — refuser si < 80% ou si non disponible");
    baseChecklist.push("Tester la recharge AC (borne 7kW) et DC (rapide) — noter le temps de charge réel vs. théorique");
  } else {
    baseChecklist.push("Vérifier la date et l'état de la courroie de distribution (ou tension chaîne de distribution si applicable)");
  }

  if (km && km > 100000) {
    baseChecklist.push(`À ${km.toLocaleString("fr-FR")} km : demander les factures de remplacement amortisseurs, embrayage (si thermique), courroie accessoires`);
  }

  return {
    score: 5.5,
    verdict: "Négocier",
    negotiationTips: [
      "Faites réaliser un diagnostic OBD complet avant signature — utilisez les codes défaut trouvés pour négocier le prix",
      "Demandez systématiquement le rapport d'historique (CarVertical, Histovec gratuit) — accident non déclaré = levier -10 à -20% du prix",
      "Exigez toutes les factures d'entretien — absence de preuves = négociation de 300-500 € minimum pour couvrir les risques",
    ],
    inspectionChecklist: baseChecklist,
  };
}

function generateFallbackReport(vehicleInfo: VehicleInfo): GeneratedReport {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const ageYears = Math.max(0, new Date().getFullYear() - parseInt(vehicleInfo.year || "0", 10));

  return {
    vehicleInfo,
    summary: `Rapport d'analyse pré-achat pour ${vehicleInfo.make} ${vehicleInfo.model} (${vehicleInfo.year}${km ? `, ${km.toLocaleString("fr-FR")} km` : ""}) — motorisation ${motorization}. Une inspection physique du véhicule reste indispensable avant acquisition.`,
    sections: [
      {
        title: `Analyse préliminaire — ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}`,
        content: `Ce ${vehicleInfo.make} ${vehicleInfo.model} de motorisation ${motorization}${km ? ` à ${km.toLocaleString("fr-FR")} km` : ""} nécessite une inspection complète avant achat. Vérifiez les points de vigilance connus sur ce modèle, l'entretien suivi et l'état général de la carrosserie. Un scan OBD-II (codes défaut actifs et passés, données temps réel) permettra de détecter d'éventuels problèmes électroniques avant acquisition.`,
        severity: "medium",
      },
      {
        title: "Priorités d'inspection selon kilométrage et âge",
        content: `${ageYears >= 5 ? `Véhicule de ${ageYears} ans : vérifier l'état des durites de refroidissement, joints, capteurs. ` : ""}${km && km > 100000 ? `À ${km.toLocaleString("fr-FR")} km : contrôler la distribution, l'embrayage, les amortisseurs. ` : ""}Un contrôle visuel complet des niveaux (huile moteur, liquide de refroidissement, liquide de frein) et de l'état des courroies s'impose avant tout diagnostic électronique.`,
        severity: "low",
      },
      {
        title: "Diagnostic électronique recommandé",
        content: `Connexion à la valise OBD-II : lecture des codes défaut (DTCs) actifs et mémorisés sur tous les calculateurs (moteur, boîte, ABS/ESP, habitacle). Analyse des données temps réel : température moteur, pression d'admission, débitmètre d'air, tensions batterie/alternateur, régimes moteur. Ces données permettront d'orienter précisément le diagnostic.`,
        severity: "medium",
      },
    ],
    recommendations: [
      "Scan OBD-II complet (tous calculateurs) — lire codes défaut actifs ET mémorisés — coût : 40-80 € en garage indépendant",
      "Contrôle visuel des niveaux : huile moteur (quantité + couleur), liquide refroidissement, liquide de frein",
      "Planifier un rendez-vous en atelier avec description précise du symptôme (conditions d'apparition, température, régime)",
      "Ne pas ignorer un voyant moteur allumé — risque d'aggravation et de dommages secondaires coûteux",
    ],
    estimatedCost: "80-250 € (diagnostic initial complet)",
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
    critical: "#ef4444",
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
    Éviter: "#ef4444",
  };

  const sectionsHtml = report.sections
    .map(
      (s) => `
    <div style="margin-bottom: 20px; padding: 16px; border-left: 4px solid ${severityColors[s.severity || "medium"]}; background: #f8f9fa; border-radius: 4px;">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1a1a1a;">${s.title}</h3>
      <p style="margin: 0; color: #444; line-height: 1.6; font-size: 13px;">${s.content}</p>
      ${s.severity ? `<span style="display: inline-block; margin-top: 8px; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; color: white; background: ${severityColors[s.severity]};">${urgencyLabels[s.severity]}</span>` : ""}
    </div>`,
    )
    .join("");

  const recsHtml = report.recommendations
    .map((r, i) => `<li style="margin-bottom: 10px; color: #333; font-size: 13px; line-height:1.6;"><strong style="color:#dc2626;">#${i + 1}</strong> ${r}</li>`)
    .join("");

  const pr = report.purchaseRecommendation;
  const purchaseHtml = pr ? `
    <div style="margin-bottom: 30px; padding: 20px; border-radius: 8px; border: 2px solid ${verdictColors[pr.verdict] || "#f59e0b"}; background: ${verdictColors[pr.verdict] || "#f59e0b"}08;">
      <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #0a0a0a; text-transform: uppercase; letter-spacing: 1px;">Recommandation d'achat</h2>
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 16px; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="width: 64px; height: 64px; border-radius: 50%; border: 4px solid ${verdictColors[pr.verdict] || "#f59e0b"}; display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 22px; font-weight: 800; color: ${verdictColors[pr.verdict] || "#f59e0b"};">${pr.score.toFixed(1)}</span>
          </div>
          <p style="font-size: 10px; color: #888; margin-top: 4px;">/ 10</p>
        </div>
        <div>
          <span style="display: inline-block; padding: 6px 18px; border-radius: 20px; font-size: 16px; font-weight: 800; color: white; background: ${verdictColors[pr.verdict] || "#f59e0b"};">${pr.verdict}</span>
        </div>
      </div>
      ${pr.negotiationTips.length > 0 ? `
      <div style="margin-bottom: 14px;">
        <h3 style="font-size: 13px; font-weight: 700; color: #0a0a0a; margin-bottom: 8px;">💰 Arguments de négociation</h3>
        <ul style="padding-left: 16px; margin: 0;">
          ${pr.negotiationTips.map(t => `<li style="font-size: 12px; color: #444; margin-bottom: 6px; line-height: 1.5;">${t}</li>`).join("")}
        </ul>
      </div>` : ""}
      ${pr.inspectionChecklist.length > 0 ? `
      <div>
        <h3 style="font-size: 13px; font-weight: 700; color: #0a0a0a; margin-bottom: 8px;">✅ Points à vérifier avant signature</h3>
        <ul style="padding-left: 16px; margin: 0; list-style: none;">
          ${pr.inspectionChecklist.map(item => `<li style="font-size: 12px; color: #444; margin-bottom: 6px; line-height: 1.5; padding-left: 4px;">☐ ${item}</li>`).join("")}
        </ul>
      </div>` : ""}
    </div>` : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Exo 2', sans-serif; color: #1a1a1a; background: white; }
  </style>
</head>
<body>
  <div style="max-width: 800px; margin: 0 auto; padding: 40px 30px;">
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 24px; border-bottom: 3px solid #dc2626; margin-bottom: 30px;">
      <div>
        <h1 style="font-size: 28px; font-weight: 800; letter-spacing: 1px;">Auto<span style="color: #dc2626;">Report</span></h1>
        <p style="font-size: 11px; color: #888; letter-spacing: 3px; text-transform: uppercase; margin-top: 2px;">Rapport IA Automobile</p>
      </div>
      <div style="text-align: right;">
        <p style="font-size: 12px; color: #666;">Date: ${new Date(report.generatedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</p>
        <p style="font-size: 12px; color: #666;">Réf: AR-${Date.now().toString(36).toUpperCase()}</p>
      </div>
    </div>

    <!-- Vehicle Info -->
    <div style="background: #0a0a0a; color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 30px;">
      <h2 style="font-size: 14px; color: #dc2626; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Véhicule analysé</h2>
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div>
          <span style="font-size: 11px; color: #888; text-transform: uppercase;">Marque / Modèle</span>
          <p style="font-size: 18px; font-weight: 700; margin-top: 2px;">${report.vehicleInfo.make} ${report.vehicleInfo.model}</p>
        </div>
        <div>
          <span style="font-size: 11px; color: #888; text-transform: uppercase;">Année</span>
          <p style="font-size: 18px; font-weight: 700; margin-top: 2px;">${report.vehicleInfo.year}</p>
        </div>
        ${report.vehicleInfo.mileage ? `<div>
          <span style="font-size: 11px; color: #888; text-transform: uppercase;">Kilométrage</span>
          <p style="font-size: 18px; font-weight: 700; margin-top: 2px;">${report.vehicleInfo.mileage} km</p>
        </div>` : ""}
      </div>
    </div>

    <!-- Urgency -->
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding: 14px 18px; border-radius: 8px; background: ${severityColors[report.urgencyLevel]}15; border: 1px solid ${severityColors[report.urgencyLevel]}30;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${severityColors[report.urgencyLevel]};"></div>
      <span style="font-weight: 600; font-size: 14px;">Niveau d'urgence : ${urgencyLabels[report.urgencyLevel]}</span>
      ${report.estimatedCost ? `<span style="margin-left: auto; font-weight: 600; font-size: 14px; color: #555;">Estimation : ${report.estimatedCost}</span>` : ""}
    </div>

    <!-- Purchase Recommendation -->
    ${purchaseHtml}

    <!-- Summary -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #0a0a0a;">Résumé du diagnostic</h2>
      <p style="line-height: 1.7; color: #444; font-size: 14px;">${report.summary}</p>
    </div>

    <!-- Problem -->
    <div style="margin-bottom: 30px; padding: 16px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
      <h3 style="font-size: 14px; color: #dc2626; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Problème signalé</h3>
      <p style="color: #333; line-height: 1.6; font-size: 13px;">${report.vehicleInfo.issue}</p>
    </div>

    <!-- Sections -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #0a0a0a;">Analyse détaillée</h2>
      ${sectionsHtml}
    </div>

    <!-- Recommendations -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #0a0a0a;">Recommandations</h2>
      <ol style="padding-left: 20px; line-height: 1.8;">
        ${recsHtml}
      </ol>
    </div>

    <!-- Footer -->
    <div style="border-top: 2px solid #e5e5e5; padding-top: 20px; margin-top: 40px; text-align: center;">
      <p style="font-size: 11px; color: #999; margin-bottom: 4px;">Ce rapport a été généré automatiquement par AutoReport — Intelligence Artificielle Automobile</p>
      <p style="font-size: 11px; color: #999;">support@autoreport.com | +33 (0)1 21 40 80 80 | www.autoreport.com</p>
    </div>
  </div>
</body>
</html>`;
}
