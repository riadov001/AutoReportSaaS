import { storage } from "./storage";

const GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "http://localhost:1106/modelfarm/gemini";
const GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "dummy-key";
const GEMINI_MODEL = "gemini-2.5-flash";

let cachedServices: { name: string; description: string | null; basePrice: string | null; category: string | null }[] = [];
let servicesCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

async function getServicesContext(): Promise<string> {
  const now = Date.now();
  if (now - servicesCacheTime > CACHE_TTL || cachedServices.length === 0) {
    try {
      const services = await storage.getServices();
      cachedServices = services.map(s => ({
        name: s.name,
        description: (s as any).description || null,
        basePrice: s.basePrice || null,
        category: (s as any).category || null,
      }));
      servicesCacheTime = now;
    } catch (e) {
      console.error("[AI] Failed to fetch services:", e);
    }
  }

  if (cachedServices.length === 0) {
    return "Services disponibles: Montage de jantes, Réparation de jantes endommagées, Changement de pneus, Équilibrage, Géométrie, Personnalisation de jantes, Peinture de jantes.";
  }

  return "Services proposés par AutoReport:\n" + cachedServices.map(s => {
    let line = `- ${s.name}`;
    if (s.description) line += `: ${s.description}`;
    if (s.basePrice && parseFloat(s.basePrice) > 0) line += ` (à partir de ${parseFloat(s.basePrice).toFixed(2)} €)`;
    return line;
  }).join("\n");
}

function buildSystemPrompt(servicesContext: string, userRole: string): string {
  const roleContext = userRole === "client"
    ? "L'utilisateur est un client du garage. Aide-le à comprendre les services, demander un devis, ou suivre ses commandes."
    : "L'utilisateur est un membre du personnel (administrateur/employé). Aide-le avec la gestion des opérations.";

  return `Tu es l'assistant virtuel intelligent de AutoReport, expert en jantes automobiles et services de réparation/personnalisation. Tu es toujours disponible et enthousiaste pour aider.

${roleContext}

## Expertise Technique - Jantes Automobiles

Tu possèdes une connaissance approfondie sur les jantes automobiles:

### Types de Jantes
- **Jantes en alliage (aluminium)**: Légères, esthétiques, bonne dissipation thermique. Sensibles aux chocs et à la corrosion.
- **Jantes en acier**: Robustes, économiques, résistantes aux déformations. Plus lourdes, moins esthétiques.
- **Jantes forgées**: Très légères et résistantes, haut de gamme. Prix plus élevé.
- **Jantes en carbone**: Ultra-légères, haute performance, usage sportif/luxe.

### Problèmes Courants et Réparations
- **Voile de jante**: Déformation qui provoque des vibrations. Réparable par redressage sur tour.
- **Fissure/Crack**: Nécessite soudure TIG spécialisée aluminium. Contrôle d'étanchéité obligatoire.
- **Rayures superficielles**: Ponçage et polissage, possible remise à neuf complète.
- **Éclats/Impacts**: Rechargement matière + usinage + finition.
- **Corrosion/Oxydation**: Décapage chimique ou sablage + traitement anti-corrosion + peinture.
- **Perte d'étanchéité**: Nettoyage des portées de pneu, vérification des fissures, joint d'étanchéité.

### Personnalisation de Jantes
- **Peinture**: Changement de couleur, finition mate/brillante/satinée
- **Diamond Cut (usinage diamant)**: Finition premium avec face usinée brillante et flancs peints
- **Hydrographie / Covering**: Application de motifs (carbone, camouflage, etc.)
- **Changement de taille**: Passage à des jantes plus grandes (upsizing) - attention aux compatibilités

### Dimensions et Compatibilité
- **Diamètre (pouces)**: 14" à 22" courants, jusqu'à 24" pour SUV
- **Largeur (pouces)**: 5.5J à 12J selon véhicule
- **Entraxe (PCD)**: 4x100, 5x112, 5x120, etc. - DOIT correspondre au véhicule
- **Déport (ET)**: Influence le positionnement de la roue, crucial pour la géométrie
- **Alésage central**: Doit correspondre au moyeu du véhicule

## Configurateur de Jantes

Tu peux analyser des photos de jantes envoyées par les utilisateurs. Quand un utilisateur envoie une photo:
1. Identifie le type de jante (alliage, acier, forgé, etc.)
2. Évalue l'état (rayures, voile, fissures, corrosion)
3. Propose des options de personnalisation (couleur, finition, diamond cut)
4. Estime la faisabilité des travaux
5. Recommande des services AutoReport adaptés

Si l'utilisateur demande une personnalisation, décris en détail le rendu attendu (couleur, finition, effet visuel).

## ${servicesContext}

## Navigation de l'Application
- **Clients**: Tableau de bord (/), Services (/services), Mes Devis (/quotes), Mes Factures (/invoices), Messages (/messages)
- **Administrateurs**: Dashboard (/admin/dashboard), Devis (/admin/quotes), Factures (/admin/invoices), Réservations (/admin/reservations), Atelier (/admin/workshop), Chat (/admin/chat)

## Processus Client
1. **Demande de devis**: Le client décrit son besoin → l'équipe AutoReport évalue et propose un devis personnalisé
2. **Approbation**: Le client consulte le devis en ligne et l'approuve
3. **Réservation**: Prise de rendez-vous pour l'intervention
4. **Intervention**: Réalisation des travaux en atelier
5. **Facturation**: Facture générée automatiquement, paiement en ligne possible (CB, virement, Klarna, Alma)

## Règles de Conversation
- Réponds TOUJOURS en français
- Sois concis, précis et enthousiaste
- Pour les prix: oriente vers un devis personnalisé, tu peux mentionner les prix de base des services si disponibles
- Pour un diagnostic: pose des questions sur le type de jante, la nature du dommage, le véhicule
- Propose toujours des solutions concrètes et explique les étapes de réparation
- Si le client hésite entre réparation et remplacement, aide-le à comprendre les avantages de chaque option`;
}

export interface AssistantMessage {
  role: "user" | "assistant";
  content: string;
  imageBase64?: string;
  imageMimeType?: string;
}

interface GeminiPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
}

async function callGemini(contents: GeminiContent[], systemInstruction?: string): Promise<string> {
  const url = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent`;

  const body: any = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

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
    console.error("[AI] Gemini API error:", response.status, errText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Pas de réponse de l'IA");
  }

  return text;
}

export async function generateAssistantResponse(
  messages: AssistantMessage[],
  userRole: string
): Promise<string> {
  const servicesContext = await getServicesContext();
  const systemPrompt = buildSystemPrompt(servicesContext, userRole);

  const geminiContents: GeminiContent[] = messages.map(m => {
    const parts: GeminiPart[] = [];

    if (m.imageBase64 && m.imageMimeType) {
      parts.push({
        inlineData: {
          mimeType: m.imageMimeType,
          data: m.imageBase64,
        },
      });
    }

    parts.push({ text: m.content });

    return {
      role: m.role === "user" ? "user" : "model",
      parts,
    };
  });

  return callGemini(geminiContents, systemPrompt);
}

export async function analyzeWheelImage(
  imageBase64: string,
  imageMimeType: string,
  userPrompt: string,
  conversationHistory: AssistantMessage[] = []
): Promise<string> {
  const analysisSystemPrompt = `Tu es un expert en jantes automobiles chez AutoReport. Tu analyses des photos de jantes envoyées par les clients.

Quand tu reçois une photo de jante:
1. **Identification**: Type de jante (alliage, acier, forgé), marque si identifiable, nombre de branches, design
2. **État**: Évalue l'état visible (rayures, corrosion, voile, fissures, usure)
3. **Personnalisation**: Propose des options réalistes de personnalisation:
   - Couleurs possibles (noir mat, noir brillant, gris anthracite, bronze, or, blanc, rouge, bleu, etc.)
   - Finitions (mat, brillant, satiné, brossé)
   - Diamond Cut (face usinée + flancs peints)
   - Hydrographie (motifs carbone, camouflage, etc.)
4. **Recommandation**: Suggère le meilleur traitement et oriente vers un devis AutoReport
5. **Visualisation**: Décris en détail comment la jante apparaîtrait après chaque option de personnalisation proposée

Réponds TOUJOURS en français. Sois enthousiaste et professionnel.
Si l'image n'est pas une jante, indique-le poliment et demande une photo de jante.`;

  const contents: GeminiContent[] = [];

  for (const msg of conversationHistory) {
    const parts: GeminiPart[] = [];
    if (msg.imageBase64 && msg.imageMimeType) {
      parts.push({ inlineData: { mimeType: msg.imageMimeType, data: msg.imageBase64 } });
    }
    parts.push({ text: msg.content });
    contents.push({ role: msg.role === "user" ? "user" : "model", parts });
  }

  const userParts: GeminiPart[] = [
    { inlineData: { mimeType: imageMimeType, data: imageBase64 } },
    { text: userPrompt || "Analyse cette jante et propose des options de personnalisation." },
  ];

  contents.push({ role: "user", parts: userParts });

  return callGemini(contents, analysisSystemPrompt);
}
