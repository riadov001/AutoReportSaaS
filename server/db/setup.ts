/**
 * 🚀 Script complet de setup BDD pour AutoReport
 * À exécuter depuis Replit :  `npm run db:setup`
 */

import { execSync } from "child_process";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Correction pour ESM : recréer __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ Erreur : la variable DATABASE_URL est absente du .env");
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "../../");
const exportFile = path.resolve(rootDir, "export_production_data.sql");

function runCommand(cmd: string, message: string) {
  console.log(`\n🔧 ${message}`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (error) {
    console.error(`❌ Échec lors de : ${cmd}`);
    process.exit(1);
  }
}

(async () => {
  console.log("🚀 Initialisation de la base AutoReport...");

  // Vérifie la connexion à PostgreSQL
  console.log("\n🔌 Vérification de la connexion à la base...");
  runCommand(`psql "${DATABASE_URL}" -c "\\conninfo"`, "Connexion réussie ✅");

  // Génère les migrations Drizzle
  runCommand("npx drizzle-kit generate", "Génération des migrations Drizzle...");

  // Applique les migrations (création des tables)
  runCommand("npx drizzle-kit push", "Application des migrations dans PostgreSQL...");

  // Importe le fichier SQL si présent
  if (fs.existsSync(exportFile)) {
    runCommand(
      `psql "${DATABASE_URL}" -f "${exportFile}"`,
      "Import des données depuis export_production_data.sql..."
    );
  } else {
    console.log("⚠️ Aucun fichier export_production_data.sql trouvé — étape ignorée.");
  }

  console.log("\n✅ Base de données AutoReport prête à l’emploi !");
})();