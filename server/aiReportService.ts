const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-2.0-flash";

interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  mileage?: string;
  issue?: string;
  finition?: string;
  motorisation?: string;
  carburant?: string;
  gearbox?: string;
  usage?: string | string[];
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

const SYSTEM_PROMPT = `Tu es ALEXIS, expert senior en diagnostic automobile chez AutoReport — ingénieur mécanicien avec 30 ans d'expérience, certifié multi-constructeurs (VW Group, PSA, Stellantis, BMW Group, Mercedes, Renault-Nissan, Toyota, Ford), spécialiste OBD-II/OBD-III, électronique embarquée, CAN bus, motorisations thermiques/hybrides/électriques (HV/BEV/PHEV). Tu connais par cœur les TSB (Technical Service Bulletins), les rappels constructeur, les défauts de série documentés, et les statistiques de sinistralité par modèle/millésime.

## TON MANDAT
Produire un rapport de diagnostic ULTRA-PERSONNALISÉ, aussi précis qu'un vrai compte-rendu d'atelier. Chaque rapport doit être unique et calibré sur le véhicule EXACT fourni. Interdit de copier-coller des phrases génériques.

## INTELLIGENCE CONTEXTUELLE REQUISE
Pour chaque véhicule analysé, tu DOIS mobiliser :
- Les **défauts de série connus** (ex: EGR encrassé sur les 2.0 TDI EA189, vanos défaillant sur les N47, boîte DSG7 DQ200 sèche, distribution 1.6 e-HDi fragile, etc.)
- Les **codes défaut OBD spécifiques** (P0XXX, P1XXX, C0XXX, B0XXX, U0XXX) probables selon le symptôme ET la motorisation
- Les **intervalles d'entretien constructeur** et leur respect probable selon le kilométrage
- L'**âge électronique** du véhicule (calculateurs, capteurs, faisceaux électriques)
- Les **coûts réels 2026** : différencier garage indépendant / concession / spécialiste marque

## FORMAT DE RÉPONSE — JSON STRICT
Réponds UNIQUEMENT en JSON valide (zéro markdown, zéro texte hors JSON) :
{
  "summary": "Synthèse experte en 5-7 phrases : identifie précisément le véhicule et sa motorisation probable, interprète techniquement le symptôme, hiérarchise les 2-3 hypothèses les plus probables avec justification, donne le niveau de criticité et l'horizon d'intervention recommandé. Cite le modèle exact et l'année.",
  "sections": [
    {
      "title": "Titre technique précis et spécifique (NON générique) — ex: 'Vanne EGR encrassée — défaut récurrent sur 2.0 TDI EA288 (2015-2019)' ou 'Pompe à eau défaillante — point faible documenté sur BMW N47 de cette génération'",
      "content": "Analyse approfondie en 5-8 phrases : mécanisme physique de la panne, organes précis concernés avec leur référence ou désignation technique, codes OBD probables (ex: P0401, P0087), symptômes corrélés à surveiller, cause racine (usure mécanique/thermique, défaut série, entretien insuffisant, corrosion, vieillissement), procédure de test précise (ex: mesure au multimètre tension alimentation capteur, test pression rampe injection, scan valise OBD paramètre XX), conséquences si non traité (ex: casse turbo, immobilisation, dépollution catalyseur). Mobilise tes connaissances des pathologies DOCUMENTÉES de ce modèle/millésime.",
      "severity": "low|medium|high|critical"
    }
  ],
  "recommendations": [
    "Action n°1 — PRIORITÉ IMMÉDIATE : [organe exact] à [action] — coût estimé : [X-Y €] pièce + [Z €] MO ≈ [total] € TTC (garage indépendant) / [total] € TTC (concession)",
    "Action n°2 — SOUS 500 KM : ...",
    "Action n°3 — AU PROCHAIN ENTRETIEN : ...",
    "Vérification préventive liée au kilométrage et à l'âge..."
  ],
  "estimatedCost": "Fourchette globale selon hypothèse confirmée : XXX-YYY € TTC (garage indépendant) / XXX-YYY € TTC (concession ou spécialiste marque)",
  "urgencyLevel": "low|medium|high|critical"
}

## RÈGLES NON NÉGOCIABLES
1. **5 à 7 sections obligatoires**, chacune avec un angle technique DIFFÉRENT :
   - Section 1 : Hypothèse principale (la plus probable) avec mécanisme détaillé
   - Section 2 : Hypothèse alternative (seconde cause probable)
   - Section 3 : Défauts de série / TSB connus sur ce modèle/millésime spécifique
   - Section 4 : Codes OBD-II/III probables et procédure de scan à réaliser
   - Section 5 : Procédures de validation et tests mécaniques/électroniques
   - Section 6 : Impact du kilométrage / âge sur ce composant et usures connexes
   - Section 7 (optionnelle) : Point spécifique motorisation (diesel/essence/hybride/électrique)
2. **5 à 8 recommandations** chiffrées, hiérarchisées par priorité, avec délai d'intervention
3. **Coûts en euros TTC 2026** — garage indépendant ET concession quand pertinent
4. **Jamais de conseil vague** : "vérifier les niveaux" → interdit. À la place : "Vérifier le niveau d'huile moteur et sa viscosité (5W-30 ou 5W-40 selon préconisation constructeur) — signe de consommation anormale > 0,5L/1000km sur ce moteur indique usure segments ou joints de queues de soupapes"
5. **Véhicules premium/sportifs** (Ferrari, Porsche, Maserati, AMG, M, RS, F-Sport) : coûts × 2-5, mentionner "atelier agréé constructeur requis"
6. **Véhicules électriques/hybrides** : analyser batterie HT (dégradation SOH, cellules défaillantes), BMS, onduleur, pompe de refroidissement HT, recharge AC/DC
7. **Réponds toujours en FRANÇAIS technique professionnel**`;

async function callGemini(prompt: string, systemPromptOverride?: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

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
    headers: { "Content-Type": "application/json" },
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
  const y = parseInt(year, 10);
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
  const ageYears = Math.max(0, new Date().getFullYear() - parseInt(vehicleInfo.year || "0", 10));
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const motorization = vehicleInfo.carburant || inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const engineSpec = vehicleInfo.motorisation || null;
  const issueText = vehicleInfo.issue || "Analyse pré-achat véhicule d'occasion";
  const problemCategory = categorizeProblem(issueText);

  let prompt = `## VÉHICULE À ANALYSER\n`;
  prompt += `- **Marque** : ${vehicleInfo.make}\n`;
  prompt += `- **Modèle** : ${vehicleInfo.model}\n`;
  prompt += `- **Année** : ${vehicleInfo.year}`;
  if (ageYears > 0) prompt += ` (véhicule de ${ageYears} an${ageYears > 1 ? "s" : ""})`;
  prompt += `\n`;
  if (vehicleInfo.finition) prompt += `- **Finition** : ${vehicleInfo.finition}\n`;
  if (engineSpec) prompt += `- **Motorisation (moteur)** : ${engineSpec}\n`;
  if (vehicleInfo.gearbox) prompt += `- **Boîte de vitesse** : ${vehicleInfo.gearbox}\n`;
  if (vehicleInfo.usage) {
    const usageStr = Array.isArray(vehicleInfo.usage) ? vehicleInfo.usage.join(", ") : vehicleInfo.usage;
    if (usageStr) prompt += `- **Usage** : ${usageStr}\n`;
  }
  prompt += `- **Type de carburant** : ${motorization}\n`;

  if (km !== null && !isNaN(km)) {
    prompt += `- **Kilométrage** : ${km.toLocaleString("fr-FR")} km`;
    if (km < 30000) prompt += ` → très faible kilométrage, privilégier vieillissement/stockage sur usure mécanique`;
    else if (km < 80000) prompt += ` → kilométrage faible à moyen, surveillance entretiens préventifs`;
    else if (km < 150000) prompt += ` → kilométrage moyen-élevé, pièces d'usure à vérifier (distribution, embrayage, amortisseurs)`;
    else if (km < 250000) prompt += ` → kilométrage élevé, vigilance sur moteur/transmission/électronique vieillie`;
    else prompt += ` → très haut kilométrage, véhicule en fin de vie de certains composants majeurs`;
    prompt += `\n`;
  }

  prompt += `- **Catégorie du problème** : ${problemCategory}\n`;
  prompt += `\n## CONTEXTE DE L'ANALYSE\n`;
  prompt += `"${issueText}"\n\n`;

  prompt += `## INSTRUCTIONS SPÉCIFIQUES POUR CE RAPPORT\n`;
  prompt += `1. Mobilise tes connaissances approfondies sur les **${vehicleInfo.make} ${vehicleInfo.model}** de génération ${vehicleInfo.year} — défauts de série, TSB, rappels constructeur documentés sur cette motorisation ${motorization}.\n`;
  prompt += `2. Le problème est catégorisé comme **${problemCategory}** — concentre tes hypothèses sur cette famille de composants en premier.\n`;

  if (motorization === "diesel") {
    prompt += `3. Motorisation diesel : analyse EGR, FAP/DPF, système d'injection haute pression, turbocompresseur, capteurs NOx/lambda, circuit AdBlue si applicable.\n`;
  } else if (motorization === "hybride") {
    prompt += `3. Motorisation hybride : analyse batterie HT (dégradation SOH, BMS), onduleur, DCDC converter, gestion thermique hybride, récupération d'énergie.\n`;
  } else if (motorization === "électrique") {
    prompt += `3. Véhicule électrique : analyse batterie HT (capacité, équilibrage cellules, BMS), chargeur embarqué, onduleur de traction, pompe de refroidissement HT, câblage haute tension.\n`;
  } else {
    prompt += `3. Motorisation essence : analyse circuit d'allumage, injection directe/indirecte, capteurs (MAP, MAF, lambda), distribution, refroidissement moteur.\n`;
  }

  if (km && km > 100000) {
    prompt += `4. À ${km.toLocaleString("fr-FR")} km : intègre obligatoirement l'état probable de la distribution (courroie/chaîne), des joints moteur, des amortisseurs, et de l'embrayage (si thermique).\n`;
  }

  if (ageYears >= 8) {
    prompt += `5. Véhicule de ${ageYears} ans : intègre le vieillissement des durites, joints caoutchouc, capteurs électroniques, et la corrosion des connecteurs/faisceaux.\n`;
  }

  prompt += `\nProduis le rapport JSON complet selon le schéma imposé. Sois PRÉCIS, SPÉCIFIQUE, EXPERT. Aucune phrase générique.`;

  return prompt;
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
    // Remove leading/trailing non-JSON characters
    const firstBrace = cleanJson.indexOf("{");
    const lastBrace = cleanJson.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
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
    .map((r, i) => `<li style="margin-bottom: 10px; color: #333; font-size: 13px; line-height:1.6;"><strong style="color:#dc2626;">#${i + 1}</strong> ${r}</li>`)
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
      <p style="font-size: 11px; color: #999; margin-bottom: 4px;">Ce rapport a été généré automatiquement par AutoReport — Intelligence Artificielle Automobile</p>
      <p style="font-size: 11px; color: #999;">support@autoreport.com | +33 (0)1 21 40 80 80 | www.autoreport.com</p>
    </div>
  </div>
</body>
</html>`;
}
