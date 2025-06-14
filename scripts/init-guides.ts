import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

const guides = [
  {
    name: "Mamadou Diallo",
    email: "mamadou.diallo@guide.gn",
    phone: "+224 622 123 456",
    specialty: "Fouta Djallon",
    experience: 8,
    rating: 4.9,
    reviews: 127,
    price: 75000,
    languages: ["Français", "Peul", "Anglais"],
    services: ["Randonnées", "Visites culturelles", "Photographie", "Transport"],
    description: "Guide expérimenté spécialisé dans les randonnées du Fouta Djallon et la découverte des chutes d'eau.",
    avatar: "/placeholder.svg",
    status: "active",
    certifications: ["Guide Officiel", "Premiers Secours", "Écotourisme"],
    availability: "Disponible toute l'année",
  },
  {
    name: "Fatoumata Camara",
    email: "fatoumata.camara@guide.gn",
    phone: "+224 628 987 654",
    specialty: "Conakry & Îles de Loos",
    experience: 6,
    rating: 4.8,
    reviews: 89,
    price: 65000,
    languages: ["Français", "Soussou", "Anglais"],
    services: ["Visites urbaines", "Excursions îles", "Gastronomie", "Shopping"],
    description: "Spécialiste de Conakry et des îles de Loos, passionnée d'histoire et de culture guinéenne.",
    avatar: "/placeholder.svg",
    status: "active",
    certifications: ["Guide Touristique", "Histoire Locale", "Langues"],
    availability: "Lundi à Samedi",
  },
  {
    name: "Ibrahima Sow",
    email: "ibrahima.sow@guide.gn",
    phone: "+224 625 456 789",
    specialty: "Guinée Forestière",
    experience: 10,
    rating: 4.9,
    reviews: 156,
    price: 80000,
    languages: ["Français", "Kissi", "Anglais"],
    services: ["Safari", "Observation faune", "Botanique", "Camping"],
    description: "Expert de la Guinée Forestière, spécialisé dans l'observation de la faune et la botanique.",
    avatar: "/placeholder.svg",
    status: "active",
    certifications: ["Guide Nature", "Biologie", "Survie"],
    availability: "Saison sèche uniquement",
  },
  {
    name: "Aissatou Barry",
    email: "aissatou.barry@guide.gn",
    phone: "+224 621 789 123",
    specialty: "Haute Guinée",
    experience: 7,
    rating: 4.7,
    reviews: 98,
    price: 70000,
    languages: ["Français", "Malinké", "Anglais"],
    services: ["Artisanat", "Marchés locaux", "Cérémonies", "Musique"],
    description: "Guide culturelle spécialisée dans l'artisanat et les traditions de la Haute Guinée.",
    avatar: "/placeholder.svg",
    status: "active",
    certifications: ["Culture Locale", "Artisanat", "Musique"],
    availability: "Flexible",
  },
  {
    name: "Sékou Touré",
    email: "sekou.toure@guide.gn",
    phone: "+224 620 111 222",
    specialty: "Multi-régions",
    experience: 12,
    rating: 5.0,
    reviews: 203,
    price: 95000,
    languages: ["Français", "Peul", "Soussou", "Malinké"],
    services: ["Circuits complets", "Logistique", "Interprétation", "Urgences"],
    description: "Guide senior avec une expertise dans toutes les régions de la Guinée. Parfait pour les circuits complets.",
    avatar: "/placeholder.svg",
    status: "active",
    certifications: ["Guide Senior", "Logistique", "Sécurité", "Langues"],
    availability: "Sur réservation",
  },
  {
    name: "Mariama Condé",
    email: "mariama.conde@guide.gn",
    phone: "+224 627 333 444",
    specialty: "Écotourisme",
    experience: 5,
    rating: 4.8,
    reviews: 67,
    price: 85000,
    languages: ["Français", "Anglais", "Espagnol"],
    services: ["Écotourisme", "Conservation", "Éducation", "Recherche"],
    description: "Spécialiste en écotourisme et développement durable, parfaite pour les voyageurs conscients.",
    avatar: "/placeholder.svg",
    status: "active",
    certifications: ["Écotourisme", "Conservation", "Développement Durable"],
    availability: "Toute l'année",
  },
]

async function initializeGuides() {
  try {
    const guidesCollection = collection(db, "guides")
    
    for (const guide of guides) {
      await addDoc(guidesCollection, guide)
      console.log(`Guide ajouté : ${guide.name}`)
    }
    
    console.log("Initialisation des guides terminée avec succès !")
  } catch (error) {
    console.error("Erreur lors de l'initialisation des guides :", error)
  }
}

// Exécuter l'initialisation
initializeGuides() 