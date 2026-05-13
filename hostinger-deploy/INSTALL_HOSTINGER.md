# AutoReport — Guide de déploiement Hostinger VPS

## Prérequis

- **Hostinger VPS** ou **Cloud** (Ubuntu 22.04 recommandé)
- Accès SSH au serveur
- Un nom de domaine configuré pour pointer vers l'IP du VPS
- Node.js 20+ installé sur le serveur

---

## Étape 1 — Préparer le serveur (première fois uniquement)

Connectez-vous en SSH puis installez les dépendances système :

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Installation PM2 (gestionnaire de processus Node.js)
sudo npm install -g pm2

# Installation Nginx (reverse proxy)
sudo apt install -y nginx

# Installation Certbot (SSL Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

---

## Étape 2 — Uploader les fichiers

Via SFTP ou le panneau de fichiers Hostinger, uploadez **tout le contenu** du dossier zip vers :
```
/home/user/autoreport/
```

Structure attendue après upload :
```
/home/user/autoreport/
├── dist/
│   ├── index.js          ← serveur Node.js bundlé
│   └── public/           ← frontend React compilé
│       ├── index.html
│       └── assets/
├── ecosystem.config.cjs  ← config PM2
├── nginx.conf            ← config Nginx (à copier)
├── package.json
├── package-lock.json
├── .env.example
└── .env                  ← à créer depuis .env.example
```

---

## Étape 3 — Configurer les variables d'environnement

```bash
cd /home/user/autoreport
cp .env.example .env
nano .env
```

Remplissez **au minimum** :
- `DATABASE_URL` — votre PostgreSQL (Neon recommandé : neon.tech)
- `SESSION_SECRET` — chaîne aléatoire 64 caractères
- `PANEL_JWT_SECRET` — chaîne aléatoire 32 caractères
- `GEMINI_API_KEY` — clé Google AI Studio (aistudio.google.com)
- `PUBLIC_BASE_URL` — votre URL finale (https://votre-domaine.com)

---

## Étape 4 — Installer les dépendances de production

```bash
cd /home/user/autoreport
npm install --omit=dev
```

---

## Étape 5 — Créer les dossiers nécessaires

```bash
mkdir -p /home/user/autoreport/logs
mkdir -p /home/user/autoreport/uploads
```

---

## Étape 6 — Démarrer l'application avec PM2

```bash
cd /home/user/autoreport

# Démarrer l'application
pm2 start ecosystem.config.cjs

# Vérifier que c'est bien lancé
pm2 status

# Voir les logs en temps réel
pm2 logs autoreport

# Configurer le démarrage automatique au reboot
pm2 startup
pm2 save
```

---

## Étape 7 — Configurer Nginx

```bash
# Copier la config Nginx
sudo cp /home/user/autoreport/nginx.conf /etc/nginx/sites-available/autoreport

# Ouvrir pour modifier le domaine
sudo nano /etc/nginx/sites-available/autoreport
# → Remplacez "votre-domaine.com" par votre vrai domaine

# Activer le site
sudo ln -s /etc/nginx/sites-available/autoreport /etc/nginx/sites-enabled/

# Supprimer la config par défaut
sudo rm -f /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

---

## Étape 8 — Configurer SSL (HTTPS)

```bash
# Générer le certificat Let's Encrypt
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Suivre les instructions (entrez votre email, acceptez les CGU)
# Le renouvellement automatique est configuré automatiquement
```

---

## Étape 9 — Vérification finale

1. Ouvrez `https://votre-domaine.com` → la landing page AutoReport doit s'afficher
2. Ouvrez `https://votre-domaine.com/panel` → le panel admin doit s'afficher
3. Connectez-vous avec l'email/mot de passe de votre `.env`
4. Testez la génération d'un rapport IA depuis la landing page

---

## Accès panel admin

```
URL    : https://votre-domaine.com/panel
Email  : valeur de PANEL_ADMIN_EMAIL dans .env
Mdp    : valeur de PANEL_ADMIN_PASSWORD dans .env
```

---

## Commandes PM2 utiles

```bash
pm2 status              # voir l'état de l'application
pm2 logs autoreport     # voir les logs en direct
pm2 restart autoreport  # redémarrer l'application
pm2 stop autoreport     # arrêter l'application
pm2 reload autoreport   # rechargement sans downtime (production)
```

---

## Mise à jour de l'application

Pour mettre à jour après un nouveau build :

```bash
cd /home/user/autoreport

# 1. Uploader les nouveaux fichiers dist/ via SFTP

# 2. Redémarrer sans downtime
pm2 reload autoreport

# Ou redémarrage complet si nécessaire
pm2 restart autoreport
```

---

## Support

Développé par **Straight-Path.eu**
Contact : contact@straight-path.eu
