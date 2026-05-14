Ce dossier est utilisé par AutoReport pour stocker les fichiers uploadés (photos, documents, scans OCR, etc.).

IMPORTANT :
- Ne supprimez pas ce dossier — l'application en a besoin pour fonctionner.
- Assurez-vous que ce dossier est accessible en lecture/écriture par Node.js (chmod 755 minimum).
- Sur Hostinger, ce dossier doit se trouver à la racine de votre projet, au même niveau que dist/ et package.json.

Si vous utilisez Cloudflare R2 (recommandé pour la production), les fichiers seront stockés dans le bucket R2 et ce dossier servira uniquement de fallback local.
