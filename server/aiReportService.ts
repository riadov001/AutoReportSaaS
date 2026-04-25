const GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "http://localhost:1106/modelfarm/gemini";
const GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "dummy-key";
const GEMINI_MODEL = "gemini-2.5-flash";

interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  mileage?: string;
  issue: string;
}

interface ReportSection {
  title: string;
  content: string;
  severity?: "low" | "medium" | "high" | "critical";
}

export interface GeneratedReport {
  vehicleInfo: VehicleInfo;
  summary: string;
  sections: ReportSection[];
  recommendations: string[];
  estimatedCost?: string;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  generatedAt: string;
}

const SYSTEM_PROMPT = `Tu es un expert en diagnostic automobile chez AutoReport. Tu analyses les problèmes de véhicules et génères des rapports de diagnostic professionnels et détaillés.

Tu DOIS répondre UNIQUEMENT en JSON valide avec la structure suivante (pas de markdown, pas de texte autour):
{
  "summary": "Résumé concis du diagnostic en 2-3 phrases",
  "sections": [
    {
      "title": "Titre de la section (ex: Analyse du moteur)",
      "content": "Description détaillée du problème identifié, causes possibles et explication technique",
      "severity": "low|medium|high|critical"
    }
  ],
  "recommendations": [
    "Recommandation 1 avec action concrète",
    "Recommandation 2 avec action concrète"
  ],
  "estimatedCost": "Fourchette de prix estimée (ex: 200-500 EUR)",
  "urgencyLevel": "low|medium|high|critical"
}

Règles:
- Toujours répondre en français
- Fournir au moins 3 sections d'analyse
- Fournir au moins 3 recommandations
- Les estimations de coûts doivent être réalistes pour le marché français
- Adapter le niveau de détail technique au type de véhicule
- Si le kilométrage est fourni, en tenir compte dans l'analyse
- Être précis et professionnel`;

async function callGemini(prompt: string, systemPromptOverride?: string): Promise<string> {
  const url = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent`;

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemPromptOverride || SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 4096,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    },
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

function buildPrompt(vehicleInfo: VehicleInfo): string {
  let prompt = `Analyse ce véhicule et génère un rapport de diagnostic complet:\n\n`;
  prompt += `Véhicule: ${vehicleInfo.make} ${vehicleInfo.model}\n`;
  prompt += `Année: ${vehicleInfo.year}\n`;
  if (vehicleInfo.mileage) {
    prompt += `Kilométrage: ${vehicleInfo.mileage} km\n`;
  }
  prompt += `\nProblème signalé par le propriétaire:\n${vehicleInfo.issue}\n`;
  prompt += `\nGénère un rapport de diagnostic détaillé en JSON.`;
  return prompt;
}

function generateFallbackReport(vehicleInfo: VehicleInfo): GeneratedReport {
  return {
    vehicleInfo,
    summary: `Rapport de diagnostic préliminaire pour ${vehicleInfo.make} ${vehicleInfo.model} (${vehicleInfo.year}). L'analyse automatique a identifié plusieurs points d'attention basés sur la description du problème.`,
    sections: [
      {
        title: "Analyse du problème signalé",
        content: `Le propriétaire signale le problème suivant sur son ${vehicleInfo.make} ${vehicleInfo.model} : ${vehicleInfo.issue}. Une inspection visuelle et un diagnostic électronique sont recommandés pour confirmer l'origine exacte du problème.`,
        severity: "medium",
      },
      {
        title: "Points de contrôle recommandés",
        content: "Il est conseillé de vérifier les éléments suivants : système de freinage, niveaux de fluides, état des filtres, courroie de distribution, système de refroidissement, et état général de la suspension.",
        severity: "low",
      },
      {
        title: "Historique véhicule",
        content: `Le ${vehicleInfo.make} ${vehicleInfo.model} de ${vehicleInfo.year}${vehicleInfo.mileage ? ` avec ${vehicleInfo.mileage} km` : ""} nécessite un suivi régulier des points d'usure courants pour ce modèle. Consultez le carnet d'entretien constructeur.`,
        severity: "low",
      },
    ],
    recommendations: [
      "Effectuer un diagnostic électronique complet (OBD-II) pour identifier les codes défaut",
      "Vérifier l'état des pièces d'usure (plaquettes, disques, amortisseurs)",
      "Contrôler les niveaux de tous les fluides (huile, liquide de refroidissement, liquide de frein)",
      "Planifier un rendez-vous chez un mécanicien qualifié pour une inspection approfondie",
    ],
    estimatedCost: "50-200 EUR (diagnostic initial)",
    urgencyLevel: "medium",
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

    const parsed = JSON.parse(cleanJson);

    const report: GeneratedReport = {
      vehicleInfo,
      summary: parsed.summary || "Rapport de diagnostic généré par IA.",
      sections: Array.isArray(parsed.sections) ? parsed.sections : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      estimatedCost: parsed.estimatedCost || undefined,
      urgencyLevel: parsed.urgencyLevel || "medium",
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
    .map((r) => `<li style="margin-bottom: 8px; color: #333; font-size: 13px;">${r}</li>`)
    .join("");

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
      <p style="font-size: 11px; color: #999; margin-bottom: 4px;">Ce rapport a été généré automatiquement par AutoReport - Intelligence Artificielle</p>
      <p style="font-size: 11px; color: #999;">support@autoreport.com | +33 (0)1 21 40 80 80 | www.autoreport.com</p>
    </div>
  </div>
</body>
</html>`;
}
