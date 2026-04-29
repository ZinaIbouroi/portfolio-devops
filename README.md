# Portfolio – Zina Ibourroi · DevOps Engineer

Site portfolio professionnel construit avec **Next.js 14**, **TypeScript** et **Tailwind CSS**.

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement
npm run dev
# → Ouvrir http://localhost:3000

# 3. Build de production
npm run build
```

## 📁 Structure du projet

```
src/
├── app/
│   ├── layout.tsx        # Layout racine + métadonnées SEO
│   ├── page.tsx          # Page principale (assemble toutes les sections)
│   └── globals.css       # Styles globaux + animations
│
├── components/
│   ├── Navbar.tsx        # Navigation sticky avec menu mobile
│   ├── Hero.tsx          # Section héro avec typewriter effect
│   ├── About.tsx         # À propos + timeline d'expérience + stats
│   ├── Skills.tsx        # Compétences techniques (grid + détail)
│   ├── Projects.tsx      # Projets récents (3 cartes)
│   ├── DevOps.tsx        # Pipeline CI/CD animé + "Pourquoi ce site"
│   ├── Contact.tsx       # Section contact + CTA
│   └── Footer.tsx        # Pied de page
│
└── data/
    └── portfolio.ts      # 📝 TOUT le contenu du portfolio (modifier ici)
```

## ✏️ Personnalisation

### Modifier ton contenu
Tout le contenu est centralisé dans **`src/data/portfolio.ts`** :

```typescript
// Infos personnelles
export const profile = {
  name: "Zina Ibourroi",
  email: "ton-email@exemple.com",
  github: "https://github.com/...",
  linkedin: "https://linkedin.com/in/...",
}

// Expériences
export const experience = [...]

// Compétences
export const skills = [...]

// Projets
export const projects = [...]
```

### Ajouter un projet
Dans `src/data/portfolio.ts`, ajoute un objet dans le tableau `projects` :

```typescript
{
  id: "mon-projet",
  title: "Titre du projet",
  description: "Description courte",
  longDescription: `Description détaillée...`,
  tags: ["AWS", "Docker"],
  tagClasses: ["aws", "docker"],
  icon: "cloud-upload",  // cloud-upload | git-branch | layers
  color: "#EFF6FF",
  iconColor: "#2563EB",
  highlights: ["Point clé 1", "Point clé 2"],
  stack: {
    "Cloud": ["AWS EC2", "S3"],
    "CI/CD": ["GitHub Actions"],
  },
}
```

### Ajouter ton CV
Place ton fichier CV dans `public/cv-zina-ibourroi.pdf` — le bouton "Télécharger mon CV" pointera automatiquement dessus.

### Ajouter ta photo / illustration
Remplace le contenu de `src/components/Hero.tsx` dans la section "Right – illustration placeholder" par une balise `<Image>` Next.js.

## 🛠️ Stack technique

| Technologie | Rôle |
|-------------|------|
| **Next.js 14** | Framework React (SSG) |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styles utilitaires |
| **Lucide React** | Icônes |

## ☁️ Déploiement (comme dans le portfolio !)

### Sur AWS S3 + CloudFront

```bash
# Build statique
npm run build
# Les fichiers sont dans le dossier `out/`

# Upload sur S3
aws s3 sync out/ s3://ton-bucket-portfolio --delete

# Invalider le cache CloudFront
aws cloudfront create-invalidation \
  --distribution-id TON_DISTRIBUTION_ID \
  --paths "/*"
```

### GitHub Actions (CI/CD)
Un workflow `.github/workflows/deploy.yml` peut automatiser tout ça :

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
      - run: aws s3 sync out/ s3://${{ secrets.S3_BUCKET }} --delete
      - run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} --paths "/*"
```

## 📋 Checklist avant mise en ligne

- [ ] Mettre à jour `src/data/portfolio.ts` avec tes vraies infos
- [ ] Ajouter `public/cv-zina-ibourroi.pdf`
- [ ] Ajouter ta photo dans `public/`
- [ ] Mettre à jour les liens GitHub/LinkedIn/Email
- [ ] Configurer les secrets GitHub Actions
- [ ] Créer le bucket S3 + distribution CloudFront
- [ ] Configurer le domaine custom (Route 53 + ACM)
