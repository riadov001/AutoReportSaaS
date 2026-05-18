# 📦 AutoReport — Guide d'installation Hostinger
### Pour débutants en informatique — Guide pas à pas illustré

---

> **Ce guide vous accompagne de A à Z, même si vous n'avez jamais déployé un site web.**
> Prenez votre temps, suivez chaque étape dans l'ordre, et n'hésitez pas à relire si quelque chose n'est pas clair.

---

## 🗺️ Vue d'ensemble — Comment ça fonctionne ?

AutoReport est divisé en **deux parties** :

| Partie | Où elle tourne | Ce qu'elle fait |
|--------|---------------|-----------------|
| **Frontend** (l'interface visuelle) | Hostinger | Ce que l'utilisateur voit dans son navigateur |
| **Backend** (la logique et la base de données) | Replit (déjà en ligne) | Calculs, IA, stockage des données |

Quand un utilisateur visite votre domaine Hostinger, il voit le site. Quand il clique sur "Générer un rapport", Hostinger transmet la demande à Replit, qui fait le travail et renvoie la réponse.

**En résumé :** vous n'installez que l'interface (la partie visible). Le cerveau de l'application est déjà actif sur Replit.

---

## ✅ Ce dont vous avez besoin avant de commencer

Avant de démarrer, vérifiez que vous avez :

- [ ] Un **compte Hostinger** actif avec un plan **Business** ou supérieur (support Node.js requis)
- [ ] Un **nom de domaine** configuré sur Hostinger (ex: `autoreport.fr`)
- [ ] Le fichier **`hostinger-deploy.tar.gz`** téléchargé depuis Replit
- [ ] Un logiciel pour décompresser les archives (WinRAR, 7-Zip, ou l'explorateur Windows/Mac par défaut)
- [ ] Un logiciel **FTP/SFTP** pour envoyer des fichiers (nous recommandons **FileZilla**, gratuit)

---

## 🗜️ ÉTAPE 0 — Préparer les fichiers sur votre ordinateur

### 0.1 — Décompresser l'archive

1. Localisez le fichier `hostinger-deploy.tar.gz` sur votre ordinateur
2. **Faites un clic droit** dessus
3. Choisissez **"Extraire ici"** (avec WinRAR ou 7-Zip) ou **"Ouvrir"** sur Mac
4. Vous devriez obtenir un dossier nommé **`hostinger-deploy`**

Le contenu du dossier ressemble à ceci :

```
hostinger-deploy/
├── 📁 dist/
│   └── 📁 public/         ← Les pages web de votre site (HTML, CSS, JS)
│       ├── index.html
│       └── 📁 assets/
├── 📄 server.js            ← Le programme qui fait tourner le site
├── 📄 package.json         ← Liste des programmes nécessaires
├── 📄 package-lock.json    ← Versions exactes des programmes
├── 📄 ecosystem.config.cjs ← Configuration pour le gestionnaire de processus
├── 📄 nginx.conf           ← Configuration réseau (avancé)
├── 📄 .env.example         ← Modèle pour la configuration
└── 📄 INSTALL_HOSTINGER.md ← Ce guide
```

---

## 🌐 ÉTAPE 1 — Préparer votre hébergement Hostinger

### 1.1 — Se connecter au panneau Hostinger (hPanel)

1. Ouvrez votre navigateur et allez sur **https://hpanel.hostinger.com**
2. Connectez-vous avec votre email et mot de passe Hostinger
3. Cliquez sur votre **domaine** dans la liste

### 1.2 — Activer Node.js

> ⚠️ **Important :** AutoReport nécessite Node.js. Vérifiez que votre plan Hostinger le supporte (Business ou supérieur).

1. Dans le panneau, cherchez la section **"Node.js"** ou **"Applications avancées"**
2. Cliquez sur **"Activer Node.js"** si ce n'est pas encore fait
3. Sélectionnez la version **Node.js 18** ou **Node.js 20** (les plus récentes stables)

### 1.3 — Trouver le chemin de votre dossier web

Dans le panneau Hostinger, notez le **chemin du dossier de votre application**. Il ressemble à :
```
/home/votre_utilisateur/domains/votredomaine.fr/public_html/
```
ou simplement :
```
/public_html/
```
Notez-le, vous en aurez besoin à l'étape suivante.

---

## 📤 ÉTAPE 2 — Envoyer les fichiers sur Hostinger (via FileZilla)

### 2.1 — Installer FileZilla

Si vous ne l'avez pas encore :
1. Allez sur **https://filezilla-project.org**
2. Téléchargez **FileZilla Client** (version gratuite)
3. Installez-le normalement

### 2.2 — Trouver vos identifiants FTP Hostinger

1. Dans le panneau Hostinger, allez dans **"Fichiers" → "Comptes FTP"**
2. Notez (ou créez) un compte FTP avec :
   - **Hôte (Host)** : ex. `ftp.votredomaine.fr` ou l'IP fournie
   - **Nom d'utilisateur** : votre identifiant FTP
   - **Mot de passe** : votre mot de passe FTP
   - **Port** : `21` (FTP) ou `22` (SFTP, plus sécurisé — recommandé)

### 2.3 — Se connecter avec FileZilla

1. Ouvrez FileZilla
2. En haut, remplissez les 4 champs :
   - **Hôte** : l'adresse FTP de Hostinger
   - **Identifiant** : votre nom d'utilisateur
   - **Mot de passe** : votre mot de passe
   - **Port** : `21` ou `22`
3. Cliquez sur **"Connexion rapide"**
4. Si un avertissement de sécurité apparaît, cliquez **"OK"** ou **"Accepter"**

### 2.4 — Naviguer jusqu'au bon dossier

- **Colonne gauche** (votre ordinateur) : naviguez jusqu'au dossier `hostinger-deploy` que vous avez décompressé
- **Colonne droite** (serveur Hostinger) : naviguez jusqu'au dossier de votre site (ex: `/public_html/` ou le chemin noté à l'étape 1.3)

> 💡 **Conseil :** Si le dossier de destination n'est pas vide, c'est normal. Vous pouvez uploader par-dessus.

### 2.5 — Transférer tous les fichiers

1. Dans la colonne gauche, **sélectionnez tout** le contenu du dossier `hostinger-deploy` (Ctrl+A sur Windows, Cmd+A sur Mac)
2. **Faites glisser** les fichiers vers la colonne droite (le serveur)
3. Attendez que tous les fichiers soient transférés — cela peut prendre **2 à 10 minutes** selon votre connexion

> ⏳ Vous pouvez suivre la progression dans la barre en bas de FileZilla. Attendez que la file d'attente soit vide.

---

## ⚙️ ÉTAPE 3 — Configurer les variables d'environnement

Les variables d'environnement sont comme des réglages secrets que l'application lit au démarrage. Vous devez en configurer **3 essentielles**.

### 3.1 — Via le panneau Hostinger (méthode recommandée)

1. Dans hPanel, allez dans **"Node.js"** → **"Variables d'environnement"**
2. Ajoutez ces 3 variables une par une :

| Nom de la variable | Valeur à mettre | Explication |
|-------------------|----------------|-------------|
| `NODE_ENV` | `production` | Indique que c'est le site public (pas de test) |
| `PORT` | `3000` | Le numéro de porte interne (laissez 3000 sauf indication Hostinger) |
| `PUBLIC_BASE_URL` | `https://auto-report.replit.app` | L'adresse du serveur Replit (le cerveau de l'app) |

3. Cliquez **"Sauvegarder"** après chaque variable

### 3.2 — Via le fichier .env (méthode alternative — si accès SSH)

Si vous avez accès au terminal SSH :

1. Connectez-vous en SSH à votre serveur
2. Naviguez jusqu'au dossier de votre site :
   ```bash
   cd /home/votre_utilisateur/public_html/
   ```
3. Copiez le fichier modèle :
   ```bash
   cp .env.example .env
   ```
4. Ouvrez le fichier pour l'éditer :
   ```bash
   nano .env
   ```
5. Remplissez les valeurs (les lignes commençant par `#` sont des commentaires, ignorez-les)
6. Sauvegardez avec **Ctrl+X**, puis **Y**, puis **Entrée**

---

## 📦 ÉTAPE 4 — Installer les dépendances

> Cette étape installe les petits programmes dont `server.js` a besoin pour fonctionner. Il n'y en a qu'un seul : **Express** (environ 500 Ko — très léger).

### 4.1 — Via le terminal SSH (si disponible)

Connectez-vous en SSH, puis tapez :
```bash
cd /home/votre_utilisateur/public_html/
npm install --omit=dev
```
Attendez la fin du message. Vous verrez quelque chose comme :
```
added 57 packages in 3s
```
C'est bon !

### 4.2 — Via le panneau Hostinger (si pas d'accès SSH)

Certains hébergements Hostinger permettent d'exécuter des commandes directement depuis le panneau :

1. Allez dans **"Terminal" ou "Gestionnaire de fichiers avancé"**
2. Tapez : `npm install --omit=dev`
3. Appuyez sur Entrée et attendez

> ❓ **Pas de terminal disponible ?** Contactez le support Hostinger en leur disant que vous avez besoin d'exécuter `npm install` dans votre dossier Node.js.

---

## 🚀 ÉTAPE 5 — Démarrer l'application

### 5.1 — Via le panneau Hostinger (méthode la plus simple)

1. Dans hPanel, allez dans **"Node.js"** ou **"Applications"**
2. Trouvez la section **"Configuration de l'application"**
3. Remplissez :
   - **Fichier d'entrée** : `server.js`
   - **Commande de démarrage** : `node server.js`
4. Cliquez sur **"Démarrer"** ou **"Redémarrer"**

### 5.2 — Via PM2 (méthode avancée, recommandée pour la stabilité)

PM2 est un programme qui maintient votre site en ligne même en cas d'erreur :

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

> La commande `pm2 startup` affichera une ligne à copier-coller. Faites-le pour que l'application redémarre automatiquement si le serveur redémarre.

---

## ✅ ÉTAPE 6 — Vérifier que tout fonctionne

### 6.1 — Test de base

1. Ouvrez votre navigateur
2. Tapez votre domaine (ex: `https://autoreport.fr`)
3. La page d'accueil AutoReport doit s'afficher avec le fond noir et le logo

### 6.2 — Test du formulaire de rapport

1. Sur la page d'accueil, faites défiler jusqu'au formulaire
2. Remplissez : Marque = **Toyota**, Modèle = **Yaris**, Année = **2020**, Puissance = **70ch**
3. Cliquez **"Générer mon rapport"**
4. Après quelques secondes, un rapport IA doit apparaître ✅

### 6.3 — Test du panel admin

1. Allez sur `https://votredomaine.fr/panel`
2. Connectez-vous avec :
   - Email : `admin@autoreport.com`
   - Mot de passe : `AutoReport2024!`
3. Le tableau de bord admin doit s'afficher ✅

---

## 🔄 ÉTAPE 7 — Mettre à jour le site (quand une nouvelle version est disponible)

Quand une mise à jour est prête sur Replit :

1. **Sur Replit** : lancez `npm run deploy:hostinger` (crée un nouveau `hostinger-deploy.tar.gz`)
2. **Téléchargez** le nouveau fichier `hostinger-deploy.tar.gz`
3. **Décompressez**-le
4. Avec **FileZilla**, remplacez uniquement le dossier `dist/public/` sur Hostinger
5. Dans le **panneau Hostinger**, redémarrez l'application Node.js

> 💡 **Conseil :** Seul le dossier `dist/public/` change entre deux versions. Le `server.js` et le `.env` ne changent que rarement — vérifiez les notes de version.

---

## 🆘 Problèmes fréquents et solutions

### ❌ Le site affiche une page blanche ou une erreur 502

**Cause probable :** L'application n'a pas démarré.  
**Solution :**
1. Dans hPanel → Node.js, vérifiez que l'application est bien **en cours d'exécution**
2. Si non, cliquez sur **Démarrer**
3. Si elle s'arrête immédiatement, vérifiez les **logs d'erreur** (hPanel → Logs)

### ❌ Erreur "Cannot find module" au démarrage

**Cause probable :** Les dépendances ne sont pas installées.  
**Solution :**
```bash
npm install --omit=dev
```

### ❌ Les requêtes API échouent (formulaire ne fonctionne pas)

**Cause probable :** La variable `PUBLIC_BASE_URL` est mal configurée.  
**Solution :** Vérifiez que `PUBLIC_BASE_URL=https://auto-report.replit.app` est bien défini (sans slash à la fin).

### ❌ Le domaine affiche "Site web en construction" Hostinger

**Cause probable :** La page par défaut Hostinger est encore active.  
**Solution :** Dans hPanel → Gestionnaire de fichiers, supprimez le fichier `index.html` par défaut dans `/public_html/` (notre `server.js` s'en charge).

### ❌ Erreur lors de l'upload FileZilla "Permission denied"

**Cause probable :** Droits insuffisants sur le dossier.  
**Solution :** Dans hPanel → Gestionnaire de fichiers, cliquez droit sur votre dossier → Permissions → mettez `755`.

---

## 📞 Commandes utiles (si accès SSH)

```bash
# Voir l'état de l'application
pm2 status

# Voir les logs en direct
pm2 logs autoreport

# Redémarrer l'application
pm2 restart autoreport

# Rechargement sans coupure (mise à jour)
pm2 reload autoreport

# Arrêter l'application
pm2 stop autoreport
```

---

## 🏗️ Architecture technique (pour aller plus loin)

```
Internet
   │
   ▼
Votre domaine Hostinger (ex: autoreport.fr)
   │
   ▼
server.js (Express — Node.js)
   ├── Requêtes /assets/* → fichiers statiques React (cache 1 an)
   ├── Requêtes /api/*    → proxy vers https://auto-report.replit.app/api/*
   ├── Requêtes /panel/*  → proxy vers https://auto-report.replit.app/panel/*
   └── Toutes autres URL  → index.html (React gère le routage)
                                │
                                ▼
                    https://auto-report.replit.app
                    (Backend : Node.js + PostgreSQL Neon)
                    Traite la logique IA, stocke les données
```

---

## 📊 Résumé en une page

| Étape | Action | Durée estimée |
|-------|--------|---------------|
| 0 | Décompresser l'archive | 1 min |
| 1 | Préparer Hostinger (activer Node.js) | 5 min |
| 2 | Envoyer les fichiers avec FileZilla | 10 min |
| 3 | Configurer les variables d'environnement | 3 min |
| 4 | Installer les dépendances (`npm install`) | 2 min |
| 5 | Démarrer l'application | 1 min |
| 6 | Vérifier que tout fonctionne | 5 min |
| **TOTAL** | | **~27 minutes** |

---

## 🛡️ Informations importantes

- **Ne partagez jamais** votre fichier `.env` ou vos mots de passe
- **Changez le mot de passe admin** après la première connexion (`/panel` → Paramètres)
- En cas de problème non résolu, contactez le support Hostinger avec les **logs d'erreur**

---

## 📬 Support technique

**Développé par Straight-Path.eu**  
Contact : contact@straight-path.eu

*Pour toute demande de personnalisation ou d'assistance à l'installation, contactez-nous.*
