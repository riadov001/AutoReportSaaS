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
  scoreBreakdown: ScoreBreakdown;
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
    },
    {
      "title": "🗒️ Checklist Avant Achat",
      "content": "6 à 8 points physiques à vérifier OBLIGATOIREMENT lors de la visite du véhicule. Chaque point doit être spécifique aux faiblesses connues de ce modèle. Aucune mention d'OBD ou de valise. Ex : carnet d'entretien complet, état de la carrosserie, démarrage à froid, essai routier, état des pneus, etc.",
      "severity": "medium"
    },
    {
      "title": "💡 Conseils Pratiques",
      "content": "3 conseils actionnables et personnalisés pour CE véhicule : (1) conseil d'achat ou de négociation, (2) conseil d'entretien prioritaire, (3) conseil sur l'usage ou les coûts. Chaque conseil cite ce modèle et sa motorisation.",
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

/**
 * Substitue les variables {marque}, {modele}, etc. dans le prompt admin.
 * Permet à l'admin d'écrire son prompt avec des placeholders standard.
 */
function substituteVehicleVariables(prompt: string, vehicleInfo: VehicleInfo): string {
  const motorization = vehicleInfo.carburant || inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const usageStr = vehicleInfo.usage
    ? (Array.isArray(vehicleInfo.usage) ? vehicleInfo.usage.join(", ") : vehicleInfo.usage)
    : "non précisé";
  const motorisationStr = [vehicleInfo.motorisation, vehicleInfo.puissance].filter(Boolean).join(", ") || motorization;

  return prompt
    .replace(/\{marque\}/gi, vehicleInfo.make || "")
    .replace(/\{modele\}/gi, vehicleInfo.model || "")
    .replace(/\{motorisation\}/gi, motorisationStr)
    .replace(/\{annee\}/gi, vehicleInfo.year || "")
    .replace(/\{kilometrage\}/gi, vehicleInfo.mileage || "non précisé")
    .replace(/\{carburant\}/gi, vehicleInfo.carburant || motorization)
    .replace(/\{boite\}/gi, vehicleInfo.gearbox || "non précisé")
    .replace(/\{finition\}/gi, vehicleInfo.finition || "non précisée")
    .replace(/\{usage\}/gi, usageStr)
    .replace(/\{prix\}/gi, vehicleInfo.prix || "non précisé")
    .replace(/\{ville\}/gi, vehicleInfo.codePostal || "non précisée")
    .replace(/\{puissance\}/gi, vehicleInfo.puissance || "non précisée")
    .replace(/\{autres_infos\}/gi, vehicleInfo.issue || "");
}

/**
 * Construit le prompt système.
 * - Si un prompt admin est défini → il REMPLACE le prompt JSON de base (mode markdown).
 *   Les variables {marque}, {modele}, etc. sont substituées par les données du véhicule.
 * - Si le champ est vide → le prompt JSON structuré par défaut (task #2) est utilisé.
 * Retourne { prompt, isCustom } pour permettre au générateur d'adapter le mode de parsing.
 */
function buildSystemPrompt(customAdminPrompt?: string, vehicleInfo?: VehicleInfo): { prompt: string; isCustom: boolean } {
  const trimmed = customAdminPrompt?.trim();
  if (trimmed) {
    const prompt = vehicleInfo ? substituteVehicleVariables(trimmed, vehicleInfo) : trimmed;
    console.info("[AIReport] Mode prompt custom admin (markdown) — prompt JSON de base ignoré.");
    return { prompt, isCustom: true };
  }
  return { prompt: SYSTEM_PROMPT_BASE, isCustom: false };
}

/**
 * Appelle Gemini.
 * jsonMode=true → responseMimeType: application/json (mode structuré, task #2)
 * jsonMode=false → pas de contrainte MIME (mode texte libre, prompt admin custom)
 */
async function callGemini(prompt: string, systemPrompt: string, jsonMode = true): Promise<string> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.65,
      maxOutputTokens: 8192,
      topP: 0.92,
      ...(jsonMode ? { responseMimeType: "application/json" } : {}),
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
        content: `Score global : 5/10\n\nFiabilité : 5/10 — Non évaluable sans plus de données sur ce modèle précis.\nCoût : 5/10 — Variable selon l'historique d'entretien et la motorisation.\nSécurité : 5/10 — À vérifier : résultats EuroNCAP et équipements de sécurité disponibles.\nPraticité : 5/10 — À confirmer lors de l'essai routier selon l'usage déclaré.`,
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
      {
        title: "🗒️ Checklist Avant Achat",
        content: `• Vérifier l'état général de la carrosserie et peinture — traces de chocs, rouille, réparations masquées\n• Contrôler le carnet d'entretien complet — factures justifiant chaque vidange et révision\n• Essai routier d'au moins 20 minutes — noter tout bruit anormal, vibration ou comportement suspect\n• Vérifier les niveaux visibles : huile moteur (couleur + niveau), liquide de refroidissement\n• Inspecter l'état des pneus — usure uniforme, même marque sur chaque essieu\n• Demander l'historique Histovec pour vérifier les sinistres déclarés`,
        severity: "medium",
      },
      {
        title: "💡 Conseils Pratiques",
        content: `1. Vérifier le carnet d'entretien complet — toutes les révisions justifiées par factures\n2. Faire un essai routier d'au moins 20 minutes sur différents types de routes\n3. Consulter l'historique Histovec (gratuit sur histovec.interieur.gouv.fr) pour vérifier les sinistres déclarés`,
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

// ---------------------------------------------------------------------------
// Markdown report parser (used when admin custom prompt is active)
// ---------------------------------------------------------------------------

function detectVerdictFromText(text: string): {
  verdict: string;
  urgencyLevel: "low" | "medium" | "high" | "critical";
} {
  const u = text.toUpperCase();
  if (u.includes("BONNE AFFAIRE")) return { verdict: "BONNE AFFAIRE", urgencyLevel: "low" };
  if (u.includes("À ÉVITER") || u.includes("A ÉVITER") || u.includes("À EVITER") || u.includes("A EVITER"))
    return { verdict: "À ÉVITER", urgencyLevel: "critical" };
  if (u.includes("RISQUÉ") || u.includes("RISQUE")) return { verdict: "RISQUÉ", urgencyLevel: "high" };
  return { verdict: "CORRECT", urgencyLevel: "medium" };
}

function sectionSeverityFromTitle(title: string, content: string): ReportSection["severity"] {
  const t = title.toLowerCase();
  if (t.includes("risque") || t.includes("risqué") || t.includes("danger")) return "high";
  if (t.includes("faible") || t.includes("vigilance") || t.includes("vérifier") || t.includes("checklist") || t.includes("avant achat"))
    return "medium";
  if (t.includes("verdict")) {
    const { urgencyLevel } = detectVerdictFromText(content);
    return urgencyLevel as ReportSection["severity"];
  }
  return "low";
}

/**
 * Parse une réponse markdown en GeneratedReport.
 * Utilisé quand le prompt admin custom est actif (pas de JSON structuré attendu).
 * Le rapport n'a pas de purchaseRecommendation (aucun scoring) — le frontend l'affiche proprement.
 */
function parseMarkdownReport(rawText: string, vehicleInfo: VehicleInfo): GeneratedReport {
  const lines = rawText.split("\n");
  const sections: ReportSection[] = [];
  let currentTitle = "";
  let currentLines: string[] = [];
  let preambleLines: string[] = [];
  let inSection = false;

  // Regex pour détecter les débuts de section dans les formats variés :
  //   ## 1. Titre  /  ### Titre  /  **1. Titre**  /  **Titre :**  (en début de ligne)
  const SECTION_HEADER_RE = /^(?:#{2,3}\s+|(?:\*\*\d+[.)]\s*|\*\*(?=[A-ZÀÉÈÊÛÙÎ🚗✅⚠️🔴💰💶🗒️💡📋🏆⭐])))/;

  for (const line of lines) {
    if (line.match(SECTION_HEADER_RE)) {
      // Save previous section
      if (inSection && currentTitle) {
        const content = currentLines.join("\n").trim();
        sections.push({
          title: currentTitle.replace(/^\d+[.)]\s*/, "").replace(/\*\*/g, "").replace(/:$/, "").trim(),
          content,
          severity: sectionSeverityFromTitle(currentTitle, content),
        });
      }
      // Extract title from various formats
      currentTitle = line
        .replace(/^#{2,3}\s+/, "")
        .replace(/^\*\*/, "")
        .replace(/\*\*$/, "")
        .replace(/\*\*.*$/, "")
        .trim();
      currentLines = [];
      inSection = true;
    } else if (line.match(/^---\s*$/) || (line.match(/^#\s+/) && !inSection)) {
      // Skip horizontal rules and H1 title lines before first section
      if (!inSection) preambleLines.push(line);
    } else {
      if (inSection) {
        currentLines.push(line);
      } else {
        preambleLines.push(line);
      }
    }
  }
  // Flush last section
  if (inSection && currentTitle) {
    const content = currentLines.join("\n").trim();
    sections.push({
      title: currentTitle.replace(/^\d+\.\s*/, "").trim(),
      content,
      severity: sectionSeverityFromTitle(currentTitle, content),
    });
  }

  // Detect verdict + urgencyLevel from verdict section (first section generally)
  const verdictSection = sections.find(s => s.title.toLowerCase().includes("verdict"));
  const { urgencyLevel } = verdictSection
    ? detectVerdictFromText(verdictSection.content)
    : { urgencyLevel: "medium" as const };

  // Summary: use "Bilan rapide" section content, or vehicle header from preamble
  const bilanSection = sections.find(s =>
    s.title.toLowerCase().includes("bilan") || s.title.toLowerCase().includes("résumé")
  );
  const vehicleHeader = preambleLines
    .filter(l => l.includes("**Véhicule analysé**") || l.startsWith("**Véhicule"))
    .map(l => l.replace(/\*\*/g, "").replace(/^Véhicule analysé\s*:\s*/, "").trim())
    .join(" ");

  const summary = bilanSection?.content
    || vehicleHeader
    || `${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}${vehicleInfo.mileage ? ` — ${vehicleInfo.mileage} km` : ""}`;

  // Estimated cost: try "Coût" section, look for "total" line
  const coutSection = sections.find(s =>
    s.title.toLowerCase().includes("coût") || s.title.toLowerCase().includes("cout") || s.title.toLowerCase().includes("budget")
  );
  const estimatedCost = coutSection?.content
    .split("\n")
    .find(l => l.toLowerCase().includes("total") || l.toLowerCase().includes("€/an"))
    ?.replace(/^[-•*]\s*/, "").trim();

  // Recommendations: extract from "Conseils" section (numbered items)
  const conseilsSection = sections.find(s =>
    s.title.toLowerCase().includes("conseil") || s.title.toLowerCase().includes("pratique")
  );
  const recommendations: string[] = conseilsSection
    ? conseilsSection.content
        .split("\n")
        .filter(l => l.trim() && !l.match(/^#{1,4}\s/))
        .map(l => l.replace(/^\d+\.\s*/, "").replace(/^[-•*]\s*/, "").trim())
        .filter(l => l.length > 5)
        .slice(0, 5)
    : [];

  return {
    vehicleInfo,
    summary,
    sections,
    recommendations,
    estimatedCost,
    urgencyLevel,
    purchaseRecommendation: undefined, // No scoring in custom prompt mode
    generatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------

const VALID_VERDICTS = ["BONNE AFFAIRE", "CORRECT", "RISQUÉ", "À ÉVITER"] as const;

export async function generateAiReport(vehicleInfo: VehicleInfo, adminContextPrompt?: string): Promise<GeneratedReport> {
  try {
    const { prompt: systemPrompt, isCustom } = buildSystemPrompt(adminContextPrompt, vehicleInfo);
    const userPrompt = isCustom
      ? `Génère le rapport avant achat complet pour ce véhicule : ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}${vehicleInfo.mileage ? `, ${vehicleInfo.mileage} km` : ""}.`
      : buildPrompt(vehicleInfo);
    const rawResponse = await callGemini(userPrompt, systemPrompt, !isCustom);

    // --- Mode prompt admin custom : parsing adaptatif ---
    // On essaie d'abord le JSON (l'admin a pu écrire un prompt qui retourne du JSON),
    // puis on bascule en markdown si le JSON échoue.
    if (isCustom) {
      try {
        const cleanJson = extractJson(rawResponse);
        const parsed = JSON.parse(cleanJson);
        if (parsed && Array.isArray(parsed.sections) && parsed.sections.length > 0) {
          console.info("[AIReport] Prompt custom → réponse JSON détectée, parsing JSON");
          const fallback = generateFallbackReport(vehicleInfo);
          return {
            vehicleInfo,
            summary: parsed.summary || fallback.summary,
            sections: parsed.sections,
            recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : fallback.recommendations,
            estimatedCost: parsed.estimatedCost || fallback.estimatedCost,
            urgencyLevel: parsed.urgencyLevel || "medium",
            purchaseRecommendation: undefined,
            generatedAt: new Date().toISOString(),
          };
        }
      } catch {
        // Pas du JSON valide — continuer vers le parsing markdown
      }
      console.info("[AIReport] Prompt custom → parsing markdown");
      return parseMarkdownReport(rawResponse, vehicleInfo);
    }

    // --- Mode JSON structuré (prompt par défaut, task #2) ---

    let cleanJson = extractJson(rawResponse);
    const parsed = JSON.parse(cleanJson);

    const pr = parsed.purchaseRecommendation;
    const validVerdict = VALID_VERDICTS.includes(pr?.verdict) ? pr.verdict : undefined;

    const sb = pr?.scoreBreakdown;
    const scoreBreakdown: ScoreBreakdown = {
      fiabilite: Math.min(10, Math.max(0, Number(sb?.fiabilite) || 5)),
      cout: Math.min(10, Math.max(0, Number(sb?.cout) || 5)),
      securite: Math.min(10, Math.max(0, Number(sb?.securite) || 5)),
      praticite: Math.min(10, Math.max(0, Number(sb?.praticite) || 5)),
    };

    const fallback = generateFallbackReport(vehicleInfo);
    const parsedSections: ReportSection[] = Array.isArray(parsed.sections) ? parsed.sections : [];

    // Canonical 10-section titles in required order
    const CANONICAL_TITLES = [
      "⭐ Score Global & Sous-critères",
      "🏆 Verdict Expert",
      "💰 Analyse du Prix",
      "📋 Bilan Rapide",
      "✅ Points Forts",
      "⚠️ Points Faibles",
      "🔴 Risques Spécifiques au Kilométrage",
      "💶 Coût Annuel Estimé",
      "🗒️ Checklist Avant Achat",
      "💡 Conseils Pratiques",
    ];

    // Merge by canonical title key — fill any missing section from fallback
    const parsedByTitle = new Map(parsedSections.map(s => [s.title, s]));
    const fallbackByTitle = new Map(fallback.sections.map(s => [s.title, s]));
    const sections: ReportSection[] = CANONICAL_TITLES.map(title =>
      parsedByTitle.get(title) ?? fallbackByTitle.get(title) ?? { title, content: "Données insuffisantes.", severity: "medium" as const }
    );

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
        return `<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
          <div style="font-size: 10px; color: #6b7280; margin-bottom: 3px;">${label}</div>
          <div style="font-size: 14px; font-weight: 800; color: #374151;">${val.toFixed(1)}<span style="font-size: 9px; color: #9ca3af;">/10</span></div>
          <div style="height: 4px; background: #e5e7eb; border-radius: 2px; margin-top: 4px; overflow:hidden;">
            <div style="height: 100%; width: ${val * 10}%; background: #9ca3af; border-radius: 2px;"></div>
          </div>
        </div>`;
      }).join("")}
    </div>` : "";

  const sectionsDetailHtml = report.sections.map(s => `
    <div style="margin-bottom: 16px; padding: 12px 14px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px;">
      <h3 style="font-size: 12px; font-weight: 700; color: #111; margin: 0 0 5px 0;">${s.title}</h3>
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
