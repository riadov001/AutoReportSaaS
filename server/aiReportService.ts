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
  carburant?: string;
  gearbox?: string;
  usage?: string | string[];
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

const SYSTEM_PROMPT = `Tu es ALEXIS, expert senior en analyse pré-achat automobile chez AutoReport — consultant indépendant avec 30 ans d'expérience dans l'évaluation des véhicules d'occasion. Tu es certifié multi-constructeurs (VW Group, PSA, Stellantis, BMW Group, Mercedes, Renault-Nissan, Toyota, Ford, Hyundai-Kia), expert en fiabilité des modèles, historique de sinistralité, défauts de série documentés, TSB (Technical Service Bulletins) et rappels constructeur. Tu connais parfaitement les coûts d'entretien réels par réseau (indépendant, spécialiste marque, concession officielle) et les tendances du marché occasion en France en 2026.

## TON RÔLE : CONSEILLER L'ACHETEUR, PAS LE MÉCANICIEN
Tu rédiges des rapports d'analyse pré-achat destinés à des particuliers qui souhaitent acheter un véhicule d'occasion. Tu ne diagnostiques PAS une panne en atelier. Tu analyses le profil de fiabilité et de risque du véhicule AVANT l'achat pour aider l'acheteur à prendre la meilleure décision.

## INTELLIGENCE CONTEXTUELLE REQUISE
Pour chaque véhicule, tu DOIS mobiliser :
- Les **défauts de série documentés** et leur fréquence (ex : turbo N47 BMW, EGR 2.0 TDI EA189, chaîne de distribution 1.6 HDi, boîte DSG7 DQ200, joints culasse 1.8 TFSI, etc.)
- Les **rappels constructeur** connus sur ce millésime (informations publiques NHTSA/RAPEX/RAPPEL.FR)
- La **réputation fiabilité** du modèle selon les statistiques de sinistralité (Que Choisir, ADAC, Consumer Reports, forums spécialisés)
- Les **intervalles d'entretien constructeur** et les coûts réels en France en 2026
- La **valeur marché** du véhicule selon l'Argus, AutoScout24, LaCentrale — dépréciation et prix juste
- Les **points de vigilance spécifiques** à ce millésime/motorisation que l'acheteur doit impérativement vérifier lors de l'essai

## FORMAT DE RÉPONSE — JSON STRICT
Réponds UNIQUEMENT en JSON valide (zéro markdown, zéro texte hors JSON) :
{
  "summary": "Synthèse pré-achat en 5-7 phrases : présente le véhicule précisément (marque/modèle/année/motorisation), évalue sa réputation fiabilité globale, cite les 2-3 points forts et faibles principaux, donne un avis clair sur l'opportunité d'achat au regard du kilométrage et de l'âge. Cite le modèle exact et l'année. Ton doit être celui d'un ami expert qui donne un vrai avis.",
  "sections": [
    {
      "title": "Titre précis et accrocheur — ex: 'Fiabilité moteur : point fort reconnu de cette génération' ou 'Boîte DSG7 DQ200 : défaut de série coûteux à surveiller impérativement'",
      "content": "Analyse approfondie en 4-6 phrases : contexte documenté (sources : forums spécialisés, ADAC, Que Choisir, TSB constructeur), fréquence du problème ou de la qualité, impact financier réel si défaillance, ce que l'acheteur doit demander ou vérifier concrètement (sans nécessiter d'équipement de diagnostic professionnel), et si ce point doit influencer la négociation du prix.",
      "severity": "low|medium|high|critical"
    }
  ],
  "recommendations": [
    "Action pré-achat n°1 — AVANT DE SIGNER : [vérification concrète] — pourquoi c'est important — coût de réparation si problème : [X-Y €] (réf. coûts 2026 France)",
    "Action n°2 — PENDANT L'ESSAI : ...",
    "Action n°3 — BUDGET À PRÉVOIR dans les 12 mois : [entretien/pièce] — coût estimé : [X €]",
    "Action n°4 — ARGUMENT DE NÉGOCIATION : ..."
  ],
  "estimatedCost": "Budget entretien prévisible sur 24 mois : XXX-YYY € (garage indépendant) / XXX-YYY € (réseau spécialisé). Hors réparations imprévues.",
  "urgencyLevel": "low|medium|high|critical",
  "purchaseRecommendation": {
    "score": 7.5,
    "verdict": "Négocier",
    "negotiationTips": [
      "Argument chiffré n°1 : [défaut documenté] → coût de remise en état [X-Y €] → demandez une remise de [montant €] sur le prix affiché",
      "Argument n°2 : kilométrage [X km] implique remplacement imminent [pièce] dans [délai] → valorisé [X €]"
    ],
    "inspectionChecklist": [
      "Point à vérifier lors de l'essai physique — spécifique à ce modèle/motorisation (sans équipement pro)",
      "Document à demander au vendeur : [facture/carnet/rapport...]",
      "Comportement à tester pendant l'essai : [description précise de ce qu'on écoute/ressent/observe]"
    ]
  }
}

## STRUCTURE DES SECTIONS — 5 À 6 OBLIGATOIRES, ORIENTÉES ACHETEUR
1. **Fiabilité générale & réputation du modèle** — bilan objectif (forces et faiblesses connues de cette génération, stats sinistralité, avis communautés)
2. **Point(s) faible(s) spécifique(s) à surveiller** — défaut(s) de série documenté(s) sur cette motorisation/millésime avec impact financier réel
3. **Analyse kilométrage & âge — usure probable** — quels composants ont probablement été sollicités, quels entretiens sont à vérifier ou à planifier imminemment
4. **Budget d'entretien réaliste sur 24 mois** — liste des interventions probables avec coûts 2026 (distribution, embrayage, freins, amortisseurs, etc.)
5. **Position marché & valeur de ce véhicule** — est-il au bon prix ? dépréciation, cote Argus/AutoScout24 estimée, rapport qualité-prix pour l'acheteur
6. (Optionnelle) **Point spécifique motorisation** — diesel/essence/hybride/électrique : avantages et inconvénients propres à ce type pour un usage [usage déclaré]

## RÈGLES NON NÉGOCIABLES
1. **PAS de jargon OBD, pas de codes défaut P0XXX** — l'acheteur n'a pas de valise de diagnostic. Remplacement : "faire scanner par un garage avant achat (40-80 €)"
2. **PAS de procédures d'atelier** (ex: "déposer le turbo", "mesurer la compression") — l'acheteur est un particulier
3. **5 à 8 recommandations** concrètes, actionnables sans équipement pro, avec coûts en €
4. **Coûts en euros TTC 2026** — toujours différencier garage indépendant et réseau spécialisé/concession
5. **Jamais de générique** : "vérifier les niveaux" → interdit. À la place : "Vérifiez la couleur de l'huile sur la jauge : huile noire très épaisse = entretiens négligés (prévoir vidange 80-120 €), traces laiteuses = joint de culasse (réparation 800-2 000 €)"
6. **Véhicules premium/sportifs** (Ferrari, Porsche, BMW M, AMG, RS, Maserati) : coûts × 2-5, préciser "réseau agréé constructeur recommandé"
7. **Véhicules électriques/hybrides** : évaluer la dégradation batterie HT probable selon âge/km, coût de remplacement batterie, statut de garantie constructeur
8. **purchaseRecommendation OBLIGATOIRE** :
   - score 0-10 : état général (40%) + kilométrage/âge (30%) + fiabilité modèle (20%) + rapport qualité-prix (10%)
   - verdict : "Acheter" (≥7), "Négocier" (4-6.9), "Éviter" (<4)
   - negotiationTips : 3-5 arguments CHIFFRÉS en € basés sur les défauts identifiés
   - inspectionChecklist : 6-10 points vérifiables par un particulier lors de l'essai/visite
9. **urgencyLevel** = niveau de risque global pour l'acheteur : low (véhicule fiable, bonne affaire), medium (quelques points à surveiller), high (risques significatifs, négociation importante), critical (risques majeurs, déconseillé sauf prix très bas)
10. **Réponds toujours en FRANÇAIS professionnel mais accessible**`;

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
      temperature: 0.65,
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
  const y = parseInt(year, 10);

  if (m.includes("tdi") || m.includes("hdi") || m.includes("cdti") || m.includes("dci") || m.includes("bluehdi") || m.includes("bluehdI")) return "diesel";
  if (m.includes("tsi") || m.includes("tfsi") || m.includes("gti") || m.includes("turbo") || m.includes("t5") || m.includes("t6")) return "essence turbo";
  if (m.includes("hybrid") || m.includes("hybride") || m.includes("phev") || m.includes("e-power") || m.includes("prius") || m.includes("lexus h")) return "hybride";
  if (m.includes("electric") || m.includes("électrique") || m.includes("ev") || m.includes("bev") || m.includes("ioniq") || m.includes("model ") || mk.includes("tesla")) return "électrique";
  if ((mk.includes("bmw") || mk.includes("mercedes") || mk.includes("audi") || mk.includes("volkswagen")) && (m.includes(" d") || m.includes("d "))) return "diesel";
  if (mk.includes("renault") && (m.includes("dci") || m.includes("tce"))) return m.includes("dci") ? "diesel" : "essence turbo";
  if (mk.includes("peugeot") && m.includes("hdi")) return "diesel";
  if (y >= 2022 && (mk.includes("renault") || mk.includes("peugeot") || mk.includes("opel"))) return "essence";
  return "essence";
}

function getUsageContext(usage: string | string[] | undefined): string {
  if (!usage) return "";
  const arr = Array.isArray(usage) ? usage : [usage];
  const filtered = arr.filter(Boolean);
  return filtered.length ? filtered.join(", ") : "";
}

function buildPrompt(vehicleInfo: VehicleInfo): string {
  const currentYear = new Date().getFullYear();
  const ageYears = Math.max(0, currentYear - parseInt(vehicleInfo.year || "0", 10));
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const motorization = vehicleInfo.carburant || inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const engineSpec = vehicleInfo.motorisation || null;
  const usageContext = getUsageContext(vehicleInfo.usage);

  let prompt = `## VÉHICULE À ANALYSER (RAPPORT PRÉ-ACHAT)\n\n`;
  prompt += `| Champ | Valeur |\n|---|---|\n`;
  prompt += `| Marque | **${vehicleInfo.make}** |\n`;
  prompt += `| Modèle | **${vehicleInfo.model}** |\n`;
  prompt += `| Année | **${vehicleInfo.year}** (${ageYears > 0 ? `${ageYears} an${ageYears > 1 ? "s" : ""} d'âge` : "récent"}) |\n`;
  if (vehicleInfo.finition) prompt += `| Finition | ${vehicleInfo.finition} |\n`;
  if (engineSpec) prompt += `| Motorisation | ${engineSpec} |\n`;
  prompt += `| Carburant | ${motorization} |\n`;
  if (vehicleInfo.gearbox) prompt += `| Boîte | ${vehicleInfo.gearbox} |\n`;
  if (usageContext) prompt += `| Usage prévu | ${usageContext} |\n`;

  if (km !== null && !isNaN(km)) {
    const avgKmPerYear = ageYears > 0 ? Math.round(km / ageYears) : km;
    let kmComment = "";
    if (km < 30_000) kmComment = "très faible → vérifier usure par vieillissement/stockage plutôt que par km";
    else if (km < 80_000) kmComment = "faible à moyen → bonne phase de vie, entretiens préventifs à contrôler";
    else if (km < 150_000) kmComment = "moyen-élevé → distribution, embrayage, amortisseurs à vérifier";
    else if (km < 250_000) kmComment = "élevé → vigilance moteur, transmission, électronique ancienne";
    else kmComment = "très élevé → certains composants majeurs potentiellement en fin de vie";
    prompt += `| Kilométrage | **${km.toLocaleString("fr-FR")} km** (≈ ${avgKmPerYear.toLocaleString("fr-FR")} km/an) — ${kmComment} |\n`;
  }

  prompt += `\n## CONTEXTE D'ACHAT\n`;
  if (vehicleInfo.issue && vehicleInfo.issue !== "Analyse pré-achat véhicule d'occasion") {
    const cleanIssue = vehicleInfo.issue.replace(/^Analyse pré-achat véhicule d'occasion\s*\|?\s*/i, "").trim();
    if (cleanIssue) prompt += `Informations complémentaires du client : "${cleanIssue}"\n\n`;
  }
  prompt += `Objectif : rapport pré-achat complet pour aider un particulier à décider s'il doit acheter ce véhicule, à quel prix et avec quelles précautions.\n\n`;

  prompt += `## INSTRUCTIONS SPÉCIFIQUES POUR CE RAPPORT\n\n`;

  prompt += `### 1. Fiabilité & défauts de série\n`;
  prompt += `Mobilise tes connaissances précises sur le **${vehicleInfo.make} ${vehicleInfo.model}** millésime **${vehicleInfo.year}** avec motorisation **${motorization}**${engineSpec ? ` (${engineSpec})` : ""}. Cite les défauts de série documentés et leur fréquence réelle (pas hypothétiques). Sources acceptées : forums spécialisés (Turbo.fr, Caradisiac, Mécapassion), ADAC Zuverlässigkeitsreport, Que Choisir, TSB constructeur, Rappel.fr.\n\n`;

  if (motorization === "diesel") {
    prompt += `### 2. Points spécifiques diesel\n`;
    prompt += `Analyse la chaîne FAP/EGR/AdBlue (si applicable), la fiabilité du turbocompresseur, l'injection haute pression (pompe HP, injecteurs), et les risques liés à un usage urbain court-trajets (encrassement FAP, dilution huile). Pour ce modèle : y a-t-il des défauts de série documentés sur ces composants ?\n\n`;
  } else if (motorization === "hybride") {
    prompt += `### 2. Points spécifiques hybride\n`;
    prompt += `Analyse la dégradation probable de la batterie HT selon l'âge (${ageYears} ans) et le kilométrage${km ? ` (${km.toLocaleString("fr-FR")} km)` : ""}. Donne la capacité de batterie d'origine vs. dégradation estimée, le coût de remplacement batterie en 2026 et la disponibilité des pièces. Quelle est la garantie batterie constructeur pour ce modèle ?\n\n`;
  } else if (motorization === "électrique") {
    prompt += `### 2. Points spécifiques électrique\n`;
    prompt += `Évalue la dégradation probable de la batterie HT (SOH estimé selon ${ageYears} ans / ${km ? `${km.toLocaleString("fr-FR")} km` : "km inconnu"}). Donne le coût de remplacement batterie pour ce modèle en 2026. Couvre aussi la disponibilité des chargeurs AC/DC compatibles et la compatibilité réseau de charge.\n\n`;
  } else {
    prompt += `### 2. Points spécifiques essence\n`;
    prompt += `Analyse la distribution (courroie/chaîne — coût et fréquence de remplacement sur ce moteur), les risques d'encrassement injecteurs/soupapes (injection directe GDI ?), et la fiabilité du turbo si applicable. Y a-t-il des défauts connus sur cette génération moteur ?\n\n`;
  }

  prompt += `### 3. Analyse kilométrage & âge\n`;
  if (km !== null && !isNaN(km)) {
    if (km > 100_000) {
      prompt += `À **${km.toLocaleString("fr-FR")} km**, liste précisément quels entretiens ont normalement été effectués selon les préconisations constructeur et lesquels sont imminents. L'acheteur doit demander les factures pour : `;
      const checkItems = ["vidanges", "filtres (air, habitacle, carburant)", "distribution/chaîne"];
      if (km > 150_000) checkItems.push("embrayage (si thermique)", "amortisseurs", "joints moteur");
      prompt += checkItems.join(", ") + `.\n\n`;
    } else {
      prompt += `À **${km.toLocaleString("fr-FR")} km**, le véhicule est encore en phase d'entretien courant. Vérifie si les vidanges et filtres ont été respectés selon le carnet constructeur.\n\n`;
    }
  }
  if (ageYears >= 7) {
    prompt += `Avec **${ageYears} ans** d'âge : intègre obligatoirement le vieillissement des durites (refroidissement, direction assistée), joints d'étanchéité caoutchouc, capteurs (sonde lambda, débitmètre air), et la corrosion des connecteurs électriques.\n\n`;
  }

  prompt += `### 4. Budget entretien 24 mois\n`;
  prompt += `Liste les interventions probables dans les 24 prochains mois avec coûts réalistes en France 2026 (pièce + main d'œuvre, garage indépendant vs. spécialiste). Sois précis : pas "révision" mais "vidange + filtre huile + filtre air = 120-180 € indépendant".\n\n`;

  prompt += `### 5. Valeur marché\n`;
  prompt += `Estime la cote marché de ce **${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}**${km ? ` à ${km.toLocaleString("fr-FR")} km` : ""}${vehicleInfo.finition ? `, finition ${vehicleInfo.finition}` : ""} selon AutoScout24/LaCentrale/Argus en mai 2026. Indique si le prix demandé (si connu) est juste, bas ou élevé. Donne la fourchette réaliste.\n\n`;

  if (usageContext) {
    prompt += `### 6. Adéquation à l'usage prévu\n`;
    prompt += `L'acheteur prévoit un usage : **${usageContext}**. Ce véhicule (${motorization}, ${km ? `${km.toLocaleString("fr-FR")} km` : "km inconnu"}) est-il bien adapté à cet usage ? Y a-t-il des risques spécifiques (ex : diesel court-trajet en ville = FAP encrassé, hybride autoroute = batterie peu rechargée, etc.) ?\n\n`;
  }

  prompt += `### Score d'achat\n`;
  prompt += `Calcule le score (0-10) selon : état mécanique probable (40%) + kilométrage/âge (30%) + fiabilité documentée du modèle (20%) + rapport qualité-prix estimé (10%).\n`;
  prompt += `Produis des negotiationTips CHIFFRÉS en € basés sur les défauts/risques identifiés.\n`;
  prompt += `Produis une inspectionChecklist de points vérifiables par un particulier lors de la visite/essai, SPÉCIFIQUES à ce modèle.\n\n`;

  prompt += `Produis le rapport JSON complet selon le format imposé. Sois PRÉCIS, SPÉCIFIQUE et UTILE pour un acheteur particulier. Aucune phrase générique.`;

  return prompt;
}

function generateFallbackPurchaseRecommendation(vehicleInfo: VehicleInfo): PurchaseRecommendation {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const ageYears = Math.max(0, new Date().getFullYear() - parseInt(vehicleInfo.year || "0", 10));

  const baseChecklist = [
    "Vérifier la couleur de l'huile sur la jauge — huile noire très épaisse = entretiens négligés, traces laiteuses = joint de culasse suspect",
    "Demander le carnet d'entretien complet avec les factures — refuser si entretiens non documentés",
    "Lancer le moteur à froid pour observer fumées et vibrations anormales au démarrage",
    "Tester tous les équipements électriques (vitres, rétros, clim, chauffage, autoradio) — les pannes électroniques sont coûteuses",
    "Observer sous le véhicule moteur chaud : toute fuite d'huile, de liquide de refroidissement ou de liquide de direction",
    "Faire scanner le véhicule par un garage avant achat (40-80 €) — lire tous les codes défaut actifs et mémorisés",
  ];

  if (motorization === "diesel") {
    baseChecklist.push("Tester une accélération franche à 80 km/h — absence de fumée noire/bleue et progression fluide = bon signe");
    baseChecklist.push("Demander la date du dernier nettoyage FAP ou remplacement — FAP colmaté = réparation 400-1 200 €");
  } else if (motorization === "électrique" || motorization === "hybride") {
    baseChecklist.push("Demander le rapport SOH (State of Health) de la batterie — refuser si inférieur à 80% ou non disponible");
    baseChecklist.push("Tester la charge AC (borne 7 kW) et vérifier le temps de charge réel vs. théorique");
  } else {
    baseChecklist.push("Vérifier la date de remplacement de la courroie de distribution (ou l'état de la chaîne si applicable) sur les factures");
  }

  if (km && km > 100_000) {
    baseChecklist.push(`À ${km.toLocaleString("fr-FR")} km : demander les factures de remplacement amortisseurs, embrayage, courroie de distribution et accessoires`);
  }

  return {
    score: 5.5,
    verdict: "Négocier",
    negotiationTips: [
      "Faites scanner le véhicule par un garage avant achat (40-80 €) — utilisez tout défaut trouvé pour négocier une remise équivalente au coût de réparation",
      "Demandez un rapport Histovec (gratuit) ou CarVertical — antécédents d'accident non déclarés = levier de -10 à -20% du prix",
      "Absence de factures d'entretien = risque = négociation minimale de 300-500 € pour couvrir les interventions à prévoir",
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
    summary: `Rapport pré-achat pour le ${vehicleInfo.make} ${vehicleInfo.model} (${vehicleInfo.year}${km ? `, ${km.toLocaleString("fr-FR")} km` : ""}), motorisation ${motorization}. ${ageYears > 5 ? `Avec ${ageYears} ans d'âge, certains composants d'usure méritent une vérification approfondie avant acquisition. ` : ""}Une inspection physique du véhicule reste indispensable avant de signer, idéalement accompagnée d'un scan électronique complet par un garage de confiance (40-80 €).`,
    sections: [
      {
        title: `Profil fiabilité — ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}`,
        content: `Ce ${vehicleInfo.make} ${vehicleInfo.model} de ${vehicleInfo.year} en motorisation ${motorization}${km ? ` à ${km.toLocaleString("fr-FR")} km` : ""} nécessite une évaluation complète avant achat. Consultez les retours d'expérience sur les forums spécialisés (Caradisiac, Turbo.fr) pour ce modèle et ce millésime précis. Vérifiez notamment les rappels constructeur sur Rappel.fr (gratuit) en entrant le numéro de série du véhicule.`,
        severity: "medium",
      },
      {
        title: "Points d'entretien à vérifier selon kilométrage et âge",
        content: `${ageYears >= 5 ? `Véhicule de ${ageYears} ans : les durites de refroidissement, joints d'étanchéité et capteurs électroniques vieillissent indépendamment du kilométrage. ` : ""}${km && km > 100_000 ? `À ${km.toLocaleString("fr-FR")} km, demandez impérativement les factures prouvant le remplacement de la distribution, de l'embrayage et des amortisseurs. ` : ""}Exigez le carnet d'entretien complet avec toutes les factures pour valider l'historique d'entretien.`,
        severity: km && km > 150_000 ? "high" : "low",
      },
      {
        title: "Budget entretien à anticiper",
        content: `Prévoir un budget d'entretien courant (vidange + filtres) de 120-200 € par an en garage indépendant. Si la distribution n'a pas été changée et approche de son échéance constructeur, comptez 400-900 € selon le modèle. Consultez un garage de confiance pour chiffrer l'ensemble des interventions à prévoir.`,
        severity: "low",
      },
    ],
    recommendations: [
      "AVANT DE SIGNER : faire scanner le véhicule par un garage indépendant (40-80 €) — lire tous les codes défaut actifs et mémorisés",
      "PENDANT LA VISITE : vérifier la couleur et le niveau d'huile sur la jauge — huile noire = entretiens négligés",
      "DEMANDER : toutes les factures d'entretien + carnet constructeur tamponné",
      "VÉRIFIER : antécédents sur Histovec.fr (gratuit) ou SIV pour détecter un sinistre non déclaré",
      "BUDGET : prévoir 300-600 € d'entretien dans les 6-12 premiers mois (révision de reprise)",
    ],
    estimatedCost: "Budget entretien prévisible sur 24 mois : 400-800 € (garage indépendant). Hors réparations imprévues.",
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
      summary: parsed.summary || "Rapport d'analyse pré-achat généré par AutoReport.",
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

  const riskLabels: Record<string, string> = {
    low: "Risque faible",
    medium: "Risque modéré",
    high: "Risque élevé",
    critical: "Risque critique",
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
      ${s.severity ? `<span style="display: inline-block; margin-top: 8px; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; color: white; background: ${severityColors[s.severity]};">${riskLabels[s.severity]}</span>` : ""}
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
        <p style="font-size: 11px; color: #888; letter-spacing: 3px; text-transform: uppercase; margin-top: 2px;">Rapport Pré-Achat Véhicule d'Occasion</p>
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

    <!-- Risk Level -->
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding: 14px 18px; border-radius: 8px; background: ${severityColors[report.urgencyLevel]}15; border: 1px solid ${severityColors[report.urgencyLevel]}30;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${severityColors[report.urgencyLevel]};"></div>
      <span style="font-weight: 600; font-size: 14px;">Niveau de risque : ${riskLabels[report.urgencyLevel]}</span>
      ${report.estimatedCost ? `<span style="margin-left: auto; font-weight: 600; font-size: 14px; color: #555;">${report.estimatedCost}</span>` : ""}
    </div>

    <!-- Purchase Recommendation -->
    ${purchaseHtml}

    <!-- Summary -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #0a0a0a;">Synthèse de l'analyse</h2>
      <p style="line-height: 1.7; color: #444; font-size: 14px;">${report.summary}</p>
    </div>

    <!-- Sections -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #0a0a0a;">Analyse détaillée</h2>
      ${sectionsHtml}
    </div>

    <!-- Recommendations -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #0a0a0a;">Actions recommandées avant achat</h2>
      <ol style="padding-left: 20px; line-height: 1.8;">
        ${recsHtml}
      </ol>
    </div>

    <!-- Footer -->
    <div style="border-top: 2px solid #e5e5e5; padding-top: 20px; margin-top: 40px; text-align: center;">
      <p style="font-size: 11px; color: #999; margin-bottom: 4px;">Ce rapport a été généré automatiquement par AutoReport — Analyse IA Pré-Achat Automobile</p>
      <p style="font-size: 11px; color: #999;">support@autoreport.com | www.autoreport.com</p>
    </div>
  </div>
</body>
</html>`;
}
