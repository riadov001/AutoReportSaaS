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
2. Remplissez toutes les valeurs (au minimum `DATABASE_URL`, `SESSION_SECRET`, `PANEL_JWT_SECRET`, `AI_INTEGRATIONS_GEMINI_API_KEY`)
3. Ne commitez jamais le fichier `.env` !

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
node dist/index.js
```

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

## Support

Développé par **Straight-Path.eu**
Contact : contact@straight-path.eu
