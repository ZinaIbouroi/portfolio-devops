# Portfolio DevOps — Ibouroi Zina Habiba

> Ingénieure DevOps · 3 ans d'expérience · Disponible immédiatement

## 🌐 Live

👉 **[Voir le portfolio en ligne](https://votre-url-cloudfront.cloudfront.net)**

---

## 🏗️ Ce projet est lui-même un projet DevOps

Ce portfolio n'est pas qu'un simple site vitrine — c'est une démonstration concrète de mes compétences DevOps :
infrastructure as code, pipeline CI/CD automatisé, monitoring en temps réel et déploiement cloud.

---

## ⚡ Architecture

```
git push main
      ↓
GitHub Actions (build Next.js)
      ↓
AWS S3 (fichiers statiques)
      ↓
CloudFront (CDN mondial + HTTPS)
      ↓
Visiteur · Site en ligne
```

**Monitoring :**
```
Page /monitoring
      ↓
API Gateway → Lambda (Node.js)
      ↓
CloudWatch (métriques CloudFront)
      ↓
SNS (alertes email)
```

---

## 🛠️ Stack technique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **CI/CD** | GitHub Actions |
| **Infrastructure** | Terraform (IaC) |
| **Hébergement** | AWS S3 + CloudFront |
| **Routing** | CloudFront Function |
| **Monitoring** | Lambda + API Gateway + CloudWatch + SNS |
| **Contact** | EmailJS |

---

## ☁️ Infrastructure AWS (Terraform)

```
AWS/
├── S3 Bucket              — Fichiers statiques
├── CloudFront             — CDN mondial + HTTPS
├── CloudFront Function    — Routing Next.js
├── Lambda                 — API métriques monitoring
├── API Gateway            — Exposition sécurisée de l'API
├── CloudWatch             — 5 alarmes (5xx, 4xx, requêtes, cache, bande passante)
└── SNS                    — Alertes email
```

Toute l'infrastructure est créée en une seule commande :

```bash
cd terraform
terraform init
terraform apply
```

---

## 🚀 CI/CD Pipeline

Chaque `git push` sur `main` déclenche automatiquement :

1. ✅ Checkout du code
2. ✅ Installation des dépendances (`npm ci`)
3. ✅ Build Next.js (`npm run build`)
4. ✅ Configuration AWS credentials
5. ✅ Sync vers S3
6. ✅ Invalidation du cache CloudFront

**Durée moyenne : < 3 minutes**

---

## 📊 Monitoring

La page `/monitoring` affiche en temps réel :

- Nombre de requêtes (1h)
- Taux d'erreurs 5xx
- Taux d'erreurs 4xx
- Cache Hit Rate CloudFront
- Bande passante téléchargée

Les données sont récupérées via une **Lambda Node.js** appelée toutes les 60 secondes.

---

## 📁 Structure du projet

```
portfolio-zina/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Pipeline CI/CD
├── src/
│   ├── app/
│   │   ├── page.tsx            ← Accueil
│   │   ├── projets/page.tsx    ← Projets DevOps
│   │   ├── cv/page.tsx         ← CV interactif
│   │   ├── contact/page.tsx    ← Formulaire EmailJS
│   │   └── monitoring/page.tsx ← Métriques live
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ArchitectureDiagram.tsx  ← Schéma portfolio
│   │   └── TaskManagerDiagram.tsx   ← Schéma Task Manager
│   └── data/
│       └── portfolio.ts        ← Tout le contenu
├── terraform/
│   ├── main.tf                 ← Infrastructure AWS
│   ├── variables.tf
│   ├── outputs.tf
│   └── lambda/
│       └── monitoring.js       ← Fonction Lambda
└── public/
    ├── hero-illustration.png
    └── cv-zina-ibouroi.pdf
```

---

## 🔧 Lancer en local

```bash
# Installer les dépendances
npm install

# Développement
npm run dev
# → http://localhost:3000

# Build de production
npm run build
```

---

## 🔑 Secrets GitHub à configurer

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | Clé IAM `portfolio-deploy` |
| `AWS_SECRET_ACCESS_KEY` | Secret IAM |
| `S3_BUCKET` | `portfolio-zina-ibouroi` |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID distribution CloudFront |

---

## 👤 Auteur

**Ibouroi Zina Habiba** — Ingénieure DevOps

- 📧 zinaabdel345@gmail.com
- 🐙 [github.com/ZinaIbouroi](https://github.com/ZinaIbouroi)
- 💼 Disponible immédiatement · IDF ou full remote

---

*Portfolio construit et déployé avec les mêmes pratiques DevOps que celles utilisées en production.*
