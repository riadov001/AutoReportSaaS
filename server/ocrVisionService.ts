const GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "http://localhost:1106/modelfarm/gemini";
const GEMINI_MODEL = "gemini-2.5-flash";

export type OcrDocumentType = "carte_grise" | "invoice" | "id_card" | "passport" | "license_plate" | "auto_detect";

interface OcrResult {
  type: string;
  confidence: number;
  data: Record<string, any>;
  rawText: string;
}

function getPromptForType(documentType: OcrDocumentType): string {
  const baseInstruction = `Tu es un expert en OCR. Analyse cette image de document et extrais toutes les informations visibles. Réponds UNIQUEMENT en JSON valide, sans markdown, sans commentaire.`;

  switch (documentType) {
    case "carte_grise":
      return `${baseInstruction}
Extrais les champs suivants d'une carte grise française (certificat d'immatriculation) :
{
  "type": "carte_grise",
  "confidence": 0.0-1.0,
  "registrationNumber": "immatriculation (champ A)",
  "firstRegistrationDate": "date 1ère immatriculation (champ B)",
  "ownerFullName": "nom du titulaire (champ C.1)",
  "ownerAddress": "adresse (champ C.3)",
  "make": "marque (champ D.1)",
  "commercialName": "dénomination commerciale (champ D.2)",
  "model": "type variante version (champ D.2.1 ou D.3)",
  "vin": "numéro VIN (champ E)",
  "category": "catégorie (champ J)",
  "bodyType": "carrosserie (champ J.2)",
  "fuelType": "énergie/carburant (champ P.3)",
  "engineCapacity": "cylindrée (champ P.1)",
  "maxPower": "puissance nette max (champ P.2)",
  "fiscalPower": "puissance fiscale (champ P.6)",
  "seatingCapacity": "places assises (champ S.1)",
  "color": "couleur",
  "co2Emissions": "émissions CO2 (champ V.7)",
  "formulaNumber": "numéro de formule",
  "rawText": "texte brut extrait"
}`;

    case "invoice":
      return `${baseInstruction}
Extrais les champs suivants d'une facture :
{
  "type": "invoice",
  "confidence": 0.0-1.0,
  "invoiceNumber": "numéro de facture",
  "invoiceDate": "date de facture (format YYYY-MM-DD)",
  "dueDate": "date d'échéance (format YYYY-MM-DD)",
  "totalAmount": nombre,
  "totalNet": nombre (HT),
  "totalTax": nombre (TVA),
  "taxRate": nombre (%),
  "supplierName": "nom fournisseur",
  "supplierAddress": "adresse fournisseur",
  "supplierSiret": "SIRET fournisseur",
  "customerName": "nom client",
  "customerAddress": "adresse client",
  "lineItems": [{"description": "", "quantity": 0, "unitPrice": 0, "totalAmount": 0, "taxRate": 0}],
  "rawText": "texte brut extrait"
}`;

    case "id_card":
      return `${baseInstruction}
Extrais les champs suivants d'une carte d'identité :
{
  "type": "id_card",
  "confidence": 0.0-1.0,
  "documentNumber": "numéro du document",
  "surname": "nom de famille",
  "givenNames": ["prénom1", "prénom2"],
  "birthDate": "date de naissance (format YYYY-MM-DD)",
  "birthPlace": "lieu de naissance",
  "gender": "M ou F",
  "nationality": "nationalité",
  "expiryDate": "date d'expiration (format YYYY-MM-DD)",
  "issueDate": "date de délivrance (format YYYY-MM-DD)",
  "address": "adresse",
  "rawText": "texte brut extrait"
}`;

    case "passport":
      return `${baseInstruction}
Extrais les champs suivants d'un passeport :
{
  "type": "passport",
  "confidence": 0.0-1.0,
  "documentNumber": "numéro du passeport",
  "surname": "nom de famille",
  "givenNames": ["prénom1"],
  "birthDate": "date de naissance (format YYYY-MM-DD)",
  "birthPlace": "lieu de naissance",
  "gender": "M ou F",
  "nationality": "nationalité",
  "expiryDate": "date d'expiration (format YYYY-MM-DD)",
  "issuanceDate": "date de délivrance (format YYYY-MM-DD)",
  "country": "pays émetteur",
  "mrz1": "ligne MRZ 1",
  "mrz2": "ligne MRZ 2",
  "rawText": "texte brut extrait"
}`;

    case "license_plate":
      return `${baseInstruction}
Identifie et extrais le numéro de plaque d'immatriculation visible sur cette image :
{
  "type": "license_plate",
  "confidence": 0.0-1.0,
  "plateNumber": "numéro de plaque",
  "country": "pays supposé",
  "format": "ancien ou nouveau format",
  "rawText": "texte brut extrait"
}`;

    case "auto_detect":
    default:
      return `${baseInstruction}
Détecte automatiquement le type de document dans cette image et extrais toutes les informations pertinentes.
Le type peut être : "carte_grise", "invoice", "id_card", "passport", "license_plate", "receipt", "other".
Réponds avec :
{
  "type": "type_detecté",
  "confidence": 0.0-1.0,
  "detectedFields": { ... tous les champs extraits ... },
  "rawText": "texte brut extrait de l'image"
}`;
  }
}

export async function scanDocument(
  imageBuffer: Buffer,
  documentType: OcrDocumentType = "auto_detect",
  mimeType: string = "image/jpeg"
): Promise<OcrResult> {
  const base64Image = imageBuffer.toString("base64");
  const prompt = getPromptForType(documentType);

  const url = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Image } },
        ],
      }],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.1,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const result = await response.json() as any;
  const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      type: parsed.type || documentType,
      confidence: parsed.confidence || 0.8,
      data: parsed,
      rawText: parsed.rawText || "",
    };
  } catch {
    return {
      type: documentType,
      confidence: 0.5,
      data: { rawText: content, parseError: true },
      rawText: content,
    };
  }
}

export async function scanCarteGrise(imageBuffer: Buffer, mimeType: string = "image/jpeg") {
  return scanDocument(imageBuffer, "carte_grise", mimeType);
}

export async function scanInvoice(imageBuffer: Buffer, mimeType: string = "image/jpeg") {
  return scanDocument(imageBuffer, "invoice", mimeType);
}

export async function scanLicensePlate(imageBuffer: Buffer, mimeType: string = "image/jpeg") {
  return scanDocument(imageBuffer, "license_plate", mimeType);
}
