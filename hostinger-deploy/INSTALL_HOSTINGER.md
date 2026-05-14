# AutoReport — Guide d'installation Hostinger

## Prérequis sur Hostinger

- Hébergement **VPS** ou **Cloud** avec Node.js 20+
- Base de données **PostgreSQL** (Hostinger en propose une)
- Accès SSH ou panneau de fichiers

---

## Étape 1 — Uploader les fichiers

Uploadez **tout le contenu** de ce dossier zip à la racine de votre site
(généralement `/home/user/htdocs/votre-domaine.com/` ou `/public_html/`).

Structure attendue après upload :
```
dist/
  index.js          ← serveur Node.js bundlé
  public/           ← frontend React compilé
    index.html
    assets/
uploads/            ← dossier pour les fichiers uploadés
package.json
package-lock.json
.env                ← à créer depuis .env.example
```

---

## Étape 2 — Configurer les variables d'environnement

1. Copiez `.env.example` → `.env`
2. Remplissez **au minimum** :
   - `DATABASE_URL` — votre base PostgreSQL
   - `SESSION_SECRET` — chaîne aléatoire (`openssl rand -hex 64`)
   - `PANEL_JWT_SECRET` — chaîne aléatoire (`openssl rand -hex 32`)
   - `GEMINI_API_KEY` — clé Google Gemini (gratuite sur [aistudio.google.com](https://aistudio.google.com/app/apikey))
3. Ne commitez jamais le fichier `.env` !

> **Note IA :** Sur Hostinger, utilisez `GEMINI_API_KEY` avec votre propre clé Google.
> Le modèle utilisé est **gemini-2.5-flash** via l'API Google directe.

---

## Étape 3 — Installer les dépendances

Via SSH ou le terminal Hostinger :

```bash
npm install --omit=dev
```

> Cela installe uniquement les dépendances de production (pas les outils de dev).

---

## Étape 4 — Initialiser la base de données

La base de données est automatiquement initialisée au premier démarrage.
Assurez-vous que `DATABASE_URL` est correctement configurée dans `.env`.

---

## Étape 5 — Démarrer l'application

### Commande de démarrage (à configurer dans Hostinger) :

```bash
NODE_ENV=production node dist/index.js
```

> ⚠️ Le `NODE_ENV=production` est **obligatoire** pour éviter un crash lié à Vite.

### Variables à configurer dans le panneau Hostinger :

| Variable | Valeur |
|----------|--------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` (ou celui assigné par Hostinger) |

---

## Étape 6 — Configurer le domaine

Dans le panneau Hostinger :
1. Pointez votre domaine vers le serveur Node.js (port 3000)
2. Activez le SSL/HTTPS (certificat Let's Encrypt)
3. Configurez la variable `PUBLIC_BASE_URL` avec votre URL finale

---

## Accès au panel admin

Une fois déployé, accédez au panel via :

```
https://votre-domaine.com/panel
```

Identifiants configurés dans `.env` :
- Email : valeur de `PANEL_ADMIN_EMAIL`
- Mot de passe : valeur de `PANEL_ADMIN_PASSWORD`

---

## Résumé des changements récents (mai 2026)

- **Gemini 2.5 Flash** : modèle IA mis à jour, rapports plus précis et personnalisés
- **Champs formulaire** : Prix demandé et Code postal ajoutés au formulaire de rapport
- **Prompt IA** : entièrement reécrit pour des rapports d'aide à l'achat personnalisés (zéro OBD)
- **SDK Gemini** : migration vers `@google/genai` v1.52+

---

## Support

Développé par **Straight-Path.eu**
Contact : contact@straight-path.eu
