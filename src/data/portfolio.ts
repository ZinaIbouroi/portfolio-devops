export const profile = {
  name: "Ibouroi Zina Habiba",
  shortName: "Zina Ibouroi",
  title: "Ingénieure DevOps",
  tagline: "3 ans d'expérience · Ouverte à toute proposition",
  bio: "Ingénieure DevOps spécialisée en automatisation (Ansible), CI/CD et Infrastructure as Code, avec une forte orientation production : fiabilisation des déploiements, automatisation des processus et accompagnement des équipes techniques.",
  available: true,
  location: "La Norville (91290)",
  email: "zinaabdel345@gmail.com",
  phone: "0644858805",
  github: "https://github.com/ZinaIbouroi",
  linkedin: "https://linkedin.com/in/zina-ibouroi",
  cv: "/cv-zina-ibouroi.pdf",
  lookingFor: "Ouverte à toutes propositions : CDI, mission. Île-de-France ou full remote.",
}

export const roles = ["Ingénieure DevOps", "CI/CD Engineer", "Cloud & Automation"]

export const softSkills = [
  { icon: "🤝", label: "Accompagnement d'équipes", desc: "Formation, support, gestion des incidents chez BNP" },
  { icon: "🔍", label: "Orientation solution", desc: "Refonte complète d'outils internes en production" },
  { icon: "📣", label: "Communication technique", desc: "Vulgarisation auprès des équipes applicatives" },
  { icon: "🎯", label: "Autonomie & rigueur", desc: "Livraisons en environnements pré-prod et prod" },
  { icon: "🔄", label: "Adaptabilité", desc: "Banque, pétrole, dev web — contextes très variés" },
]

export const experience = [
  {
    period: "2026",
    title: "Portfolio DevOps & Task Manager",
    company: "Projets personnels en cours",
    icon: "code",
    current: true,
    pause: false,
  },
  {
    period: "2024 – 2026",
    title: "Parenthèse professionnelle",
    company: "Disponible immédiatement",
    icon: "heart",
    current: false,
    pause: true,
  },
  {
    period: "2021 – Août 2024",
    title: "Ingénieure DevOps",
    company: "IT Europe Consulting (ITEC) · Paris",
    icon: "building",
    current: false,
    pause: false,
  },
  {
    period: "Mars – Juin 2021",
    title: "Formation Ingénieur DevOps (POEC)",
    company: "EduGroupe · Paris",
    icon: "school",
    current: false,
    pause: false,
  },
  {
    period: "2019 – 2020",
    title: "IT Développeuse",
    company: "ExxonMobil Chad · Ndjamena",
    icon: "globe",
    current: false,
    pause: false,
  },
]

export const skills = [
  {
    category: "DevOps & Automatisation",
    icon: "devops",
    color: "#2563EB",
    items: ["Ansible", "Ansible Tower", "Rundeck", "Jenkins", "GitLab CI/CD", "GitHub Actions"],
  },
  {
    category: "Conteneurisation",
    icon: "docker",
    color: "#0EA5E9",
    items: ["Docker", "Kubernetes", "Docker Hub"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: "cloud",
    color: "#7C3AED",
    items: ["AWS", "Terraform", "Vagrant", "Linux"],
  },
  {
    category: "Langages & Scripting",
    icon: "code",
    color: "#F59E0B",
    items: ["Python", "Shell (Bash)", "PowerShell", "YAML"],
  },
  {
    category: "Monitoring",
    icon: "monitoring",
    color: "#10B981",
    items: ["ELK Stack", "Prometheus", "Grafana", "SonarQube"],
  },
  {
    category: "Méthodes & BDD",
    icon: "agile",
    color: "#EC4899",
    items: ["Agile Scrum", "Kanban", "SAFe", "MySQL", "PostgreSQL"],
  },
]

export const certifications = [
  { name: "Scaled Agile Framework (SAFe)", org: "LinkedIn Learning", year: "Obtenue", done: true },
  { name: "Terraform", org: "LinkedIn Learning", year: "Obtenue", done: true },
  { name: "Python", org: "LinkedIn Learning", year: "Obtenue", done: true },
  { name: "AWS Cloud Practitioner", org: "Formation Global Knowledge — Certif en cours", year: "En cours", done: false },
  { name: "Kubernetes", org: "LinkedIn Learning", year: "En cours", done: false },
]

export const projects = [
  {
    id: "devops-task-manager",
    title: "Task Manager – Application DevOps",
    description: "API REST + interface web avec pipeline CI/CD complet, conteneurisation Docker et déploiement cloud automatisé.",
    longDescription: "Réalisation d'une application Task Manager dans une démarche de maintien et renforcement des compétences DevOps. Couvre l'ensemble du cycle : développement, tests, sécurité, conteneurisation et déploiement automatisé.",
    tags: ["GitHub Actions", "Docker", "Python", "Flask"],
    tagClasses: ["github", "docker", "python", "python"],
    icon: "terminal",
    color: "#F0FDF4",
    iconColor: "#10B981",
    status: "live",
    year: "2026",
    highlights: [
      "API REST avec interface web (Flask, HTML/JS)",
      "Pipeline CI/CD complet (GitHub Actions : tests, sécurité)",
      "Conteneurisation Docker + publication Docker Hub",
      "Déploiement cloud sur Render avec accès public",
      "Tests automatisés, logging et healthcheck",
    ],
    stack: {
      "Backend": ["Flask (Python)", "API REST"],
      "CI/CD": ["GitHub Actions", "Tests automatisés"],
      "Conteneurs": ["Docker", "Docker Hub"],
      "Cloud": ["Render"],
    },
    links: {
      github: "https://github.com/ZinaIbouroi/devops-project.git",
      demo: "https://devops-app-7704.onrender.com",
    },
  },
  {
    id: "portfolio-devops",
    title: "Portfolio DevOps – Ce site",
    description: "Portfolio déployé avec pipeline CI/CD GitHub Actions, infrastructure Terraform et hébergement AWS S3 + CloudFront.",
    longDescription: "Ce portfolio est lui-même un projet DevOps : IaC avec Terraform, pipeline CI/CD GitHub Actions, hébergement statique AWS S3 + CloudFront. Chaque push déclenche build, tests et déploiement.",
    tags: ["Next.js", "Terraform", "AWS", "GitHub Actions"],
    tagClasses: ["github", "terraform", "aws", "github"],
    icon: "globe",
    color: "#EFF6FF",
    iconColor: "#2563EB",
    status: "live",
    year: "2026",
    highlights: [
      "Frontend Next.js 14 + TypeScript",
      "Infrastructure as Code avec Terraform",
      "Pipeline CI/CD GitHub Actions automatisé",
      "Hébergement AWS S3 + CloudFront (CDN mondial)",
      "IAM least privilege pour le déploiement CI/CD",
    ],
    stack: {
      "Frontend": ["Next.js 14", "TypeScript", "Tailwind CSS"],
      "IaC": ["Terraform", "AWS S3", "CloudFront"],
      "CI/CD": ["GitHub Actions"],
      "Monitoring": ["CloudWatch"],
    },
    links: {
      github: "https://github.com/ZinaIbouroi/portfolio",
      demo: "#",
    },
  },
]

export const missionBNP = {
  period: "Sept. 2021 – Août 2024",
  itec: "IT Europe Consulting (ITEC)",
  client: "Mission BNP Paribas · Sept. 2021 – Déc. 2023",
  role: "Ingénieure DevOps",
  highlights: [
    "Automatisation de tâches d'exploitation pour fiabiliser les processus et réduire les interventions manuelles",
    "Mise en place d'Ansible Tower + accompagnement des équipes (formation, support, gestion des incidents)",
    "Automatisation des procédures d'arrêt et relance des machines en environnement applicatif",
    "Refonte complète d'un outil interne (iclés) remplaçant une solution payante existante",
    "Gestion des incidents et support technique sur les outils d'automatisation développés",
  ],
  env: ["Ansible", "Ansible Tower", "Python", "Jenkins", "GitLab CI", "Rundeck", "Shell (Bash)", "PowerShell"],
}

export const pauseTimeline = [
  {
    date: "Août 2024",
    side: "life",
    icon: "👶",
    title: "Pause volontaire",
    desc: "Décision de m'occuper de ma fille Sofia à plein temps",
    color: "#FDF2F8",
    border: "#F9A8D4",
    text: "#BE185D",
  },
  {
    date: "2024",
    side: "skills",
    icon: "☁️",
    title: "Formation AWS",
    desc: "Reprise de la formation AWS Cloud Practitioner pour passer la certification",
    color: "#FFF7ED",
    border: "#FED7AA",
    text: "#C2410C",
  },
  {
    date: "2025",
    side: "skills",
    icon: "☸️",
    title: "Formation Kubernetes",
    desc: "Formation Kubernetes en cours sur LinkedIn Learning",
    color: "#EFF6FF",
    border: "#BFDBFE",
    text: "#1D4ED8",
  },
  {
    date: "2026",
    side: "life",
    icon: "🧒",
    title: "Sofia a 2 ans",
    desc: "Ma fille grandit et je suis prête à reprendre le travail",
    color: "#FDF2F8",
    border: "#F9A8D4",
    text: "#BE185D",
  },
  {
    date: "2026",
    side: "skills",
    icon: "💻",
    title: "Projet Task Manager",
    desc: "Application complète : CI/CD GitHub Actions, Docker, déploiement cloud",
    color: "#F0FDF4",
    border: "#BBF7D0",
    text: "#15803D",
  },
  {
    date: "2026",
    side: "skills",
    icon: "🌐",
    title: "Portfolio DevOps",
    desc: "Ce site : Terraform, AWS S3 + CloudFront, pipeline CI/CD",
    color: "#F0FDF4",
    border: "#BBF7D0",
    text: "#15803D",
  },
]
