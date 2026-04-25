# AutoReport — Branding Guide

## Identite

| Champ | Valeur |
|---|---|
| **Nom** | AutoReport |
| **Sous-titre** | Diagnostics IA |
| **Slogan** | Rapports automobiles intelligents propulses par l'IA |
| **Hero title** | Diagnostics automobiles nouvelle generation |
| **Hero subtitle** | Analysez votre vehicule en quelques secondes grace a notre moteur d'intelligence artificielle |
| **CTA principal** | Analyser mon vehicule |

---

## Couleurs

### Couleurs principales

| Token | Light mode (HSL) | Dark mode (HSL) | Hex approx. | Usage |
|---|---|---|---|---|
| `--primary` | `0 85% 46%` | `0 85% 50%` | `#CE1126` | Boutons, liens, accents |
| `--secondary` | `43 96% 56%` | `43 96% 58%` | `#F5A623` | Badges, elements secondaires |
| `--destructive` | `0 84% 60%` | `0 80% 55%` | `#EF4444` | Erreurs, suppressions |

### Surfaces

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--background` | `30 15% 97%` | `0 0% 4%` | Fond de page |
| `--card` | `0 0% 100%` | `0 0% 7%` | Cartes, panneaux |
| `--muted` | `30 10% 94%` | `0 0% 10%` | Fonds attenues |
| `--accent` | `30 10% 94%` | `0 0% 11%` | Fonds accentues |
| `--popover` | `0 0% 100%` | `0 0% 8%` | Menus, popups |

### Sidebar

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--sidebar` | `0 0% 5%` | `0 0% 3%` | Fond sidebar (toujours sombre) |
| `--sidebar-foreground` | `0 0% 92%` | `0 0% 92%` | Texte sidebar |
| `--sidebar-primary` | `0 85% 46%` | `0 85% 50%` | Element actif sidebar |
| `--sidebar-accent` | `0 0% 12%` | `0 0% 10%` | Hover sidebar |

### Texte

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--foreground` | `0 0% 9%` | `30 10% 94%` | Texte principal |
| `--muted-foreground` | `0 0% 40%` | `0 0% 55%` | Texte secondaire |
| `--card-foreground` | `0 0% 9%` | `30 10% 94%` | Texte sur cartes |

### Bordures

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `--border` | `30 10% 90%` | `0 0% 12%` | Bordures generales |
| `--input` | `30 10% 88%` | `0 0% 15%` | Bordures champs de saisie |
| `--ring` | `0 85% 46%` | `0 85% 50%` | Focus ring |

### Graphiques

| Token | Light mode | Dark mode | Couleur |
|---|---|---|---|
| `--chart-1` | `0 85% 46%` | `0 85% 50%` | Rouge AutoReport |
| `--chart-2` | `43 96% 56%` | `43 96% 58%` | Or / Ambre |
| `--chart-3` | `210 70% 50%` | `210 70% 55%` | Bleu |
| `--chart-4` | `150 60% 45%` | `150 55% 55%` | Vert |
| `--chart-5` | `280 65% 55%` | `280 65% 60%` | Violet |

### Couleurs garage (defaut)

| Usage | Hex |
|---|---|
| Primary garage | `#dc2626` |
| Secondary garage | `#1f2937` |

---

## Typographie

| Usage | Police | Fallback |
|---|---|---|
| **Corps (sans)** | `Exo 2` | `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif` |
| **Serif** | `Georgia` | `serif` |
| **Monospace** | `JetBrains Mono` | `Menlo, Monaco, Courier New, monospace` |

Google Fonts a charger :
```
Exo+2:wght@400;500;600;700;800
JetBrains+Mono:wght@400;500;600
```

---

## Logo

| Fichier | Usage |
|---|---|
| `attached_assets/grok_image_zby8i9_1774235232732.jpg` | Logo principal (icone) |
| `client/public/static/logo.png` | Logo statique |
| `client/public/static/logo-email.png` | Logo pour emails |

### Affichage du logo texte

```
Auto + Report
```
- "Auto" en blanc (`#FFFFFF`)
- "Report" en rouge AutoReport (`#CE1126`)
- Police : `font-extrabold tracking-wide uppercase`
- Taille : `15px`
- Sous-titre : "Diagnostics IA" en `white/30`, `9px`, `tracking-[0.25em]`, uppercase

### Conteneur icone
- Fond blanc, coins arrondis (`rounded-md`)
- Padding interne : `2px`
- Taille par defaut : `36x36px`
- Image en `object-contain`

---

## Contacts par defaut

| Champ | Valeur |
|---|---|
| **Email support** | `support@autoreport.com` |
| **Email contact** | `contact@autoreport.com` |
| **Telephone** | `+33 (0)1 21 40 80 80` |
| **Adresse** | 75, Rue de la Republique, 75011 Paris |
| **Copyright** | AutoReport. Tous droits reserves. |

---

## Theme general

| Propriete | Valeur |
|---|---|
| **Inspiration** | Ferrari Luxury (light) / Ferrari Night (dark) |
| **Border radius** | `0.625rem` (10px) |
| **Spacing unit** | `0.25rem` (4px) |
| **Theme color (meta)** | `#CE1126` |

---

## SEO / Meta

| Balise | Valeur |
|---|---|
| `<title>` | AutoReport - Diagnostics automobiles IA |
| `<meta description>` | AutoReport - Gestion professionnelle de diagnostics automobiles, devis, factures et reservations |
| `<meta theme-color>` | `#CE1126` |
| `lang` | `fr` |
