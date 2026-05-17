# AutoReport — Déploiement Hostinger Business (Node.js)

## Architecture

```
Hostinger Business (Node.js)
  └── server.js          ← sert le frontend React
        ├── /assets/*    → fichiers statiques (cache 1 an)
        ├── /api/*       → proxy vers PUBLIC_BASE_URL (Replit)
        ├── /panel/*     → proxy vers PUBLIC_BASE_URL (Replit)
        └── /*           → index.html (SPA fallback)

Backend + BDD → https://auto-report.replit.app (Replit, inchangé)
```

---

## Structure du dossier à uploader

```
hostinger-deploy/
├── dist/
│   └── public/          ← frontend React compilé
│       ├── index.html
│       └── assets/
├── server.js            ← FICHIER D'ENTRÉE (node server.js)
├── package.json
├── package-lock.json
├── ecosystem.config.cjs ← config PM2 (optionnel)
├── nginx.conf           ← config Nginx (optionnel)
├── .env.example
└── .env                 ← à créer depuis .env.example
```

---

## Étape 1 — Uploader les fichiers

Via SFTP ou le gestionnaire de fichiers Hostinger, uploadez **tout le contenu** du dossier `hostinger-deploy/` vers le répertoire racine de votre application Node.js Hostinger.

---

## Étape 2 — Configurer les variables d'environnement

Dans le **panneau Hostinger → Node.js → Variables d'environnement**, ajoutez :

| Variable | Valeur |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3000` (ou celui assigné par Hostinger) |
| `PUBLIC_BASE_URL` | `https://auto-report.replit.app` |

Ou copiez `.env.example` → `.env` et remplissez les valeurs :

```bash
cp .env.example .env
nano .env
```

---

## Étape 3 — Installer les dépendances

```bash
npm install --omit=dev
```

Seul `express` sera installé (~500 Ko). Pas de base de données, pas de backend.

---

## Étape 4 — Démarrer l'application

### Via le panneau Hostinger (recommandé)

Dans **Hostinger → Node.js**, configurez :
- **Fichier d'entrée** : `server.js`
- **Commande de démarrage** : `node server.js`

### Via PM2 (si accès SSH)

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### Directement

```bash
NODE_ENV=production node server.js
```

---

## Étape 5 — Vérification

1. Ouvrez votre domaine → la landing page AutoReport doit s'afficher
2. Testez la génération d'un rapport → les requêtes `/api/*` sont proxiées vers Replit
3. Ouvrez `/panel` → le panel admin est proxié vers Replit

---

## Mise à jour du frontend

Après un nouveau build (`npm run build` sur Replit) :

1. Téléchargez le nouveau dossier `dist/public/` via SFTP
2. Remplacez l'ancien `dist/public/` sur Hostinger
3. Redémarrez l'application Node.js dans le panneau Hostinger

---

## Commandes PM2 utiles

```bash
pm2 status              # état de l'application
pm2 logs autoreport     # logs en direct
pm2 restart autoreport  # redémarrer
pm2 reload autoreport   # rechargement sans downtime
```

---

## Support

Développé par **Straight-Path.eu**  
Contact : contact@straight-path.eu
