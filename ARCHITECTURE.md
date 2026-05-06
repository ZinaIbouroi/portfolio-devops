# Architecture du Portfolio DevOps — Ibouroi Zina Habiba

> Documentation technique complète de l'infrastructure et des interactions entre composants.

---

## Vue d'ensemble

```
Développeur
    │
    │ git push main
    ▼
GitHub ──────────────► GitHub Actions (CI/CD)
                              │
                              │ npm run build
                              │
                              ▼
                         Next.js (out/)
                              │
                              │ aws s3 sync
                              ▼
                          AWS S3 ◄──────────────── Terraform
                              │                    (provisionne
                              │                     toute l'infra)
                CloudFront ◄──┘
                    │
                    │ HTTPS
                    ▼
                Visiteur
                    │
                    │ /monitoring
                    ▼
              API Gateway ──► Lambda ──► CloudWatch
                                              │
                                              │ seuil dépassé
                                              ▼
                                            SNS ──► Email
```

---

## Composants et interactions

### 1. GitHub
**Rôle :** Hébergement du code source et déclencheur du pipeline CI/CD.

**Interactions :**
- Reçoit le `git push` du développeur sur la branche `main`
- Déclenche automatiquement GitHub Actions à chaque push
- Héberge le code source versionné du portfolio

**Repo :** github.com/ZinaIbouroi/portfolio-devops

---

### 2. GitHub Actions
**Rôle :** Orchestrateur du pipeline CI/CD — automatise l'ensemble du cycle de déploiement.

**Ce qu'il fait à chaque push :**
1. Checkout du code depuis GitHub
2. Installation des dépendances Node.js (`npm ci`)
3. Build Next.js → génère les fichiers statiques dans `out/`
4. Configure les credentials AWS (via les secrets GitHub)
5. Upload des fichiers vers S3 (`aws s3 sync`)
6. Invalide le cache CloudFront (`aws cloudfront create-invalidation`)

**Interactions :**
- Reçoit le déclencheur de **GitHub**
- Lit les secrets (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, CLOUDFRONT_DISTRIBUTION_ID)
- Écrit les fichiers dans **AWS S3**
- Invalide le cache de **CloudFront**

**Durée moyenne :** < 3 minutes du push à la mise en ligne.

**Fichier :** `.github/workflows/deploy.yml`

---

### 3. Next.js (Frontend)
**Rôle :** Framework React qui génère le site en fichiers statiques HTML/CSS/JS.

**Ce qu'il fait :**
- Génère toutes les pages du portfolio en fichiers statiques (`output: 'export'`)
- Chaque route (`/`, `/projets`, `/cv`, `/contact`, `/monitoring`) devient un dossier avec un `index.html`
- Les assets (images, PDF du CV) sont copiés dans le dossier `out/`

**Interactions :**
- Appelé par **GitHub Actions** (`npm run build`)
- Produit les fichiers uploadés sur **AWS S3**
- Appelle **EmailJS** (côté client) pour le formulaire de contact
- Appelle **l'API Gateway** (côté client) pour la page monitoring
- Envoie les données à **Google Analytics** (côté client)

**Pages :**
| Route | Description |
|-------|-------------|
| `/` | Accueil — profil, compétences, parcours, pause |
| `/projets` | Projets DevOps avec diagrammes d'architecture |
| `/cv` | CV interactif avec viewer PDF |
| `/contact` | Formulaire de contact EmailJS |
| `/monitoring` | Métriques CloudFront en temps réel |

---

### 4. AWS S3
**Rôle :** Stockage des fichiers statiques du site (HTML, CSS, JS, images, PDF).

**Configuration :**
- Accès public **bloqué** — seul CloudFront peut lire les fichiers
- Versioning activé — historique de chaque version des fichiers
- Chiffrement AES-256 at rest

**Interactions :**
- Reçoit les fichiers depuis **GitHub Actions** (`aws s3 sync`)
- Sert les fichiers à **CloudFront** uniquement (via Origin Access Control)
- Provisionné par **Terraform**

**Bucket :** `portfolio-zina-ibouroi` · Région : `eu-west-3` (Paris)

---

### 5. CloudFront
**Rôle :** CDN (Content Delivery Network) — distribue le site mondialement avec HTTPS.

**Ce qu'il fait :**
- Sert les fichiers depuis le serveur le plus proche du visiteur (edge locations mondiales)
- Force le HTTPS (redirection HTTP → HTTPS automatique)
- Met en cache les fichiers pour accélérer les temps de réponse
- Gère les erreurs 403/404 en redirigeant vers `index.html` (nécessaire pour Next.js)

**Interactions :**
- Lit les fichiers depuis **AWS S3** (via OAC — Origin Access Control)
- Exécute la **CloudFront Function** sur chaque requête entrante
- Son cache est invalidé par **GitHub Actions** à chaque déploiement
- Reçoit les requêtes des **visiteurs**
- Provisionné par **Terraform**

**Prix :** PriceClass_100 (USA + Europe uniquement — optimisation des coûts)

---

### 6. CloudFront Function
**Rôle :** Micro-fonction JavaScript qui s'exécute sur chaque requête, au plus près du visiteur.

**Problème résolu :**
Next.js en mode statique génère des dossiers (`/contact/index.html`) mais le visiteur tape `/contact`. Sans cette fonction, CloudFront chercherait un fichier nommé `contact` sur S3 et ne trouverait rien.

**Ce qu'elle fait :**
```javascript
// /contact → /contact/index.html
// /projets → /projets/index.html
// /cv      → /cv/index.html
if (uri.endsWith('/')) {
  request.uri += 'index.html'
} else if (!uri.includes('.')) {
  request.uri += '/index.html'
}
```

**Interactions :**
- Intercepte chaque requête entrante avant que **CloudFront** aille chercher sur **S3**
- Transforme l'URL pour pointer vers le bon fichier `index.html`
- Provisionné par **Terraform**

---

### 7. Terraform
**Rôle :** Infrastructure as Code — provisionne et gère l'ensemble des ressources AWS.

**Ce qu'il crée :**
| Ressource | Description |
|-----------|-------------|
| `aws_s3_bucket` | Bucket de stockage |
| `aws_s3_bucket_public_access_block` | Blocage accès public |
| `aws_s3_bucket_versioning` | Versioning activé |
| `aws_s3_bucket_policy` | Politique d'accès CloudFront uniquement |
| `aws_cloudfront_origin_access_control` | Badge d'authentification CloudFront → S3 |
| `aws_cloudfront_function` | Fonction de routing Next.js |
| `aws_cloudfront_distribution` | Distribution CDN mondiale |
| `aws_iam_role` | Rôle IAM pour Lambda |
| `aws_iam_role_policy` | Permissions CloudWatch pour Lambda |
| `aws_lambda_function` | Fonction de monitoring |
| `aws_apigatewayv2_api` | API HTTP Gateway |
| `aws_apigatewayv2_integration` | Intégration API → Lambda |
| `aws_apigatewayv2_route` | Route GET /metrics |
| `aws_apigatewayv2_stage` | Stage de déploiement |
| `aws_lambda_permission` | Permission API Gateway → Lambda |
| `aws_sns_topic` | Canal de notification |
| `aws_sns_topic_subscription` | Abonnement email alertes |
| `aws_cloudwatch_metric_alarm` × 5 | Alarmes monitoring |

**Interactions :**
- Crée et configure **S3**, **CloudFront**, **Lambda**, **API Gateway**, **CloudWatch**, **SNS**
- Lit l'état depuis le fichier `terraform.tfstate` (état de l'infrastructure)
- Exécuté manuellement par le développeur (`terraform apply`)

**Fichiers :**
```
terraform/
├── main.tf         ← Toutes les ressources AWS
├── variables.tf    ← Paramètres (région, bucket name)
└── outputs.tf      ← URLs et IDs après création
```

---

### 8. Lambda (Monitoring)
**Rôle :** Fonction serverless Node.js qui interroge CloudWatch et retourne les métriques du site.

**Ce qu'elle fait :**
- Reçoit une requête GET depuis API Gateway
- Interroge CloudWatch pour récupérer les métriques CloudFront de la dernière heure :
  - Nombre de requêtes
  - Taux d'erreurs 5xx
  - Taux d'erreurs 4xx
  - Cache Hit Rate
  - Bande passante téléchargée
- Retourne les métriques en JSON avec les headers CORS

**Interactions :**
- Déclenchée par **API Gateway** sur `GET /metrics`
- Interroge **CloudWatch** via `@aws-sdk/client-cloudwatch`
- Retourne les données à la **page monitoring** (Next.js côté client)
- Provisionné par **Terraform**

**Runtime :** Node.js 20.x · Timeout : 30s · Coût : ~0€ (< 1M appels gratuits/mois)

**Fichier :** `terraform/lambda/monitoring.js`

---

### 9. API Gateway
**Rôle :** Point d'entrée HTTP sécurisé qui expose la Lambda au monde extérieur.

**Ce qu'il fait :**
- Expose l'endpoint `GET /metrics` publiquement
- Gère le CORS (autorise les appels depuis le domaine CloudFront)
- Transmet les requêtes à **Lambda** et retourne la réponse

**Interactions :**
- Reçoit les requêtes depuis la **page monitoring** (Next.js)
- Déclenche **Lambda** pour chaque requête
- Provisionné par **Terraform**

---

### 10. CloudWatch
**Rôle :** Service de monitoring AWS qui collecte et surveille les métriques de CloudFront.

**Métriques surveillées :**
| Métrique | Seuil d'alerte | Description |
|----------|---------------|-------------|
| `5xxErrorRate` | > 5% | Erreurs serveur |
| `4xxErrorRate` | > 10% | Pages introuvables |
| `Requests` | > 1000/5min | Pic de trafic |
| `BytesDownloaded` | > 100MB/5min | Bande passante |
| `CacheHitRate` | < 80% | Efficacité du cache |

**Interactions :**
- Collecte les métriques de **CloudFront** (région us-east-1 obligatoire pour CloudFront)
- Interrogé par **Lambda** pour la page monitoring
- Déclenche **SNS** quand un seuil est dépassé
- Provisionné par **Terraform**

---

### 11. SNS (Simple Notification Service)
**Rôle :** Service de notification qui envoie des alertes email quand une alarme CloudWatch se déclenche.

**Ce qu'il fait :**
- Reçoit les alertes de **CloudWatch**
- Envoie un email à `zinaabdel345@gmail.com` avec le détail de l'alarme

**Interactions :**
- Abonné aux alarmes **CloudWatch**
- Envoie des emails au développeur
- Provisionné par **Terraform**

---

### 12. EmailJS
**Rôle :** Service tiers qui envoie de vrais emails depuis le formulaire de contact sans backend.

**Ce qu'il fait :**
- Reçoit les données du formulaire (nom, email, message) côté client
- Envoie l'email via le compte Outlook connecté
- Aucun serveur nécessaire — fonctionne entièrement côté navigateur

**Interactions :**
- Appelé par la **page contact** (Next.js côté client)
- Envoie l'email vers le compte Outlook du portfolio
- Service externe — pas géré par Terraform

---

### 13. Google Analytics
**Rôle :** Mesure le trafic réel du site — visiteurs uniques, pages vues, durée de session, pays d'origine.

**Ce qu'il fait :**
- Script chargé sur chaque page du site
- Envoie les données de navigation à Google Analytics
- Permet de suivre combien de recruteurs visitent le portfolio

**Interactions :**
- Intégré dans **Next.js** (`layout.tsx`)
- Envoie les données à **Google Analytics** (service externe)
- Ne communique avec aucun autre composant de l'infrastructure

---

## Flux complet — Déploiement

```
1. git push main
        ↓
2. GitHub Actions déclenché
        ↓
3. npm ci (install deps)
        ↓
4. npm run build (génère out/)
        ↓
5. aws s3 sync out/ → S3
        ↓
6. aws cloudfront create-invalidation
        ↓
7. Site mis à jour en ligne ✅
        (< 3 minutes)
```

---

## Flux complet — Visite du site

```
1. Visiteur tape l'URL
        ↓
2. CloudFront reçoit la requête
        ↓
3. CloudFront Function transforme l'URL
   (/contact → /contact/index.html)
        ↓
4. CloudFront vérifie son cache
   - Cache hit  → sert directement ⚡
   - Cache miss → va chercher sur S3
        ↓
5. HTML/CSS/JS servi au visiteur via HTTPS
        ↓
6. Google Analytics enregistre la visite
```

---

## Flux complet — Monitoring

```
1. Page /monitoring se charge
        ↓
2. fetch(API_GATEWAY_URL/metrics) toutes les 60s
        ↓
3. API Gateway reçoit GET /metrics
        ↓
4. Lambda déclenchée
        ↓
5. Lambda interroge CloudWatch
   (métriques CloudFront dernière heure)
        ↓
6. Métriques retournées en JSON
        ↓
7. Page affiche : requêtes, erreurs, cache, bande passante
```

---

## Flux complet — Alerte

```
1. CloudWatch détecte : 5xxErrorRate > 5%
        ↓
2. Alarme CloudWatch déclenchée
        ↓
3. SNS notifié
        ↓
4. Email envoyé à zinaabdel345@gmail.com ✉️
```

---

## Coûts mensuels estimés

| Service | Coût |
|---------|------|
| AWS S3 | ~0.01€ |
| CloudFront | ~0.01€ |
| Lambda | 0€ (< 1M appels gratuits) |
| API Gateway | 0€ (< 1M appels gratuits) |
| CloudWatch | 0€ (métriques de base gratuites) |
| SNS | 0€ (< 1000 emails gratuits) |
| GitHub Actions | 0€ (< 2000 min gratuites/mois) |
| EmailJS | 0€ (< 200 emails gratuits/mois) |
| Google Analytics | 0€ |
| **Total** | **~0.02€/mois** |

---

*Document généré dans le cadre du portfolio DevOps de Ibouroi Zina Habiba — 2026*
