// Couleurs principales
export const AppColors = {
  primary: "#E5B84B",
  secondary: "#4CAF50",
  accent: "#FF9800",
  error: "#F44336",
  warning: "#FF9800",
  info: "#2196F3",
  success: "#4CAF50",

  // Couleurs neutres
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Mode clair
  light: {
    background: "#FFFFFF",
    surface: "#F8F8F8",
    surfaceVariant: "#F5F5F5",
    textPrimary: "#212121",
    textSecondary: "#757575",
    border: "#E0E0E0",
    divider: "#EEEEEE",
  },

  // Mode sombre
  dark: {
    background: "#0A0A0A",
    surface: "#1A1A1A",
    surfaceVariant: "#2A2A2A",
    textPrimary: "#FFFFFF",
    textSecondary: "#A3A3A3",
    border: "#404040",
    divider: "#2A2A2A",
  },
}

// Fonction pour obtenir les couleurs selon le thème
export const getThemeColors = (isDark: boolean) => ({
  ...AppColors,
  ...(isDark ? AppColors.dark : AppColors.light),
})

// Définition des régions
export const regions = [
  {
    id: "haute-guinee",
    name: "Haute Guinée",
    color: "#E57373", // Rouge clair
    description: "Région du nord-est de la Guinée",
  },
  {
    id: "moyenne-guinee",
    name: "Moyenne Guinée",
    color: "#81C784", // Vert clair
    description: "Région montagneuse du centre de la Guinée",
  },
  {
    id: "basse-guinee",
    name: "Basse Guinée",
    color: "#64B5F6", // Bleu clair
    description: "Région côtière de la Guinée",
  },
  {
    id: "guinee-forestiere",
    name: "Guinée Forestière",
    color: "#7986CB", // Indigo clair
    description: "Région forestière du sud-est de la Guinée",
  },
]

// Définition des plans d'abonnement
export const subscriptionPlans = [
  {
    id: "basic",
    name: "Plan Basic",
    price: 0,
    currency: "€",
    period: "mois",
    color: "#9E9E9E", // Gris
    description: "Accès de base aux fonctionnalités essentielles",
    features: ["Consultation des sites touristiques", "Recherche basique", "Support par email", "Accès mobile"],
    limitations: ["Maximum 5 favoris", "Pas de réservation prioritaire", "Support standard uniquement"],
  },
  {
    id: "premium",
    name: "Plan Premium",
    price: 29.99,
    currency: "€",
    period: "mois",
    color: "#FF9800", // Orange
    description: "Accès complet avec fonctionnalités avancées",
    features: [
      "Toutes les fonctionnalités Basic",
      "Réservations prioritaires",
      "Guides personnalisés",
      "Support prioritaire 24/7",
      "Accès aux événements exclusifs",
      "Statistiques détaillées",
      "Favoris illimités",
      "Mode hors ligne",
    ],
    limitations: [],
  },
  {
    id: "enterprise",
    name: "Plan Enterprise",
    price: 99.99,
    currency: "€",
    period: "mois",
    color: "#9C27B0", // Violet
    description: "Solution complète pour les professionnels",
    features: [
      "Toutes les fonctionnalités Premium",
      "API personnalisée",
      "Tableau de bord avancé",
      "Support dédié",
      "Formation personnalisée",
      "Intégrations tierces",
      "Rapports personnalisés",
      "Gestion multi-utilisateurs",
    ],
    limitations: [],
  },
]

// Définition des rôles utilisateurs
export const userRoles = [
  {
    id: "admin",
    name: "Administrateur",
    color: "#E5B84B",
    description: "Accès complet à toutes les fonctionnalités",
    privileges: [
      "manage_users",
      "manage_sites",
      "manage_guides",
      "manage_accommodations",
      "manage_regions",
      "view_analytics",
    ],
  },
  {
    id: "manager",
    name: "Gestionnaire",
    color: "#4CAF50",
    description: "Gestion des sites, guides et logements",
    privileges: ["manage_sites", "manage_guides", "manage_accommodations", "view_analytics"],
  },
  {
    id: "guide",
    name: "Guide",
    color: "#2196F3",
    description: "Accès limité à la gestion des visites",
    privileges: ["view_sites", "view_accommodations"],
  },
  {
    id: "user",
    name: "Utilisateur",
    color: "#757575",
    description: "Accès en lecture seule",
    privileges: ["view_sites"],
  },
]
