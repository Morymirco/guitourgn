"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Award,
  Languages,
  Calendar,
  DollarSign,
  Home,
  Menu,
  X,
  Users,
} from "lucide-react"
import { useTheme } from "@/components/theme/theme-provider"
import { getThemeColors } from "@/components/app-colors"
import ThemeToggle from "@/components/theme/theme-toggle"

// Données des guides locaux
const guides = [
  {
    id: 1,
    name: "Mamadou Diallo",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Fouta Djallon",
    languages: ["Français", "Peul", "Anglais"],
    experience: 8,
    rating: 4.9,
    reviews: 127,
    price: 75000,
    phone: "+224 622 123 456",
    email: "mamadou.diallo@guide.gn",
    description: "Guide expérimenté spécialisé dans les randonnées du Fouta Djallon et la découverte des chutes d'eau.",
    services: ["Randonnées", "Visites culturelles", "Photographie", "Transport"],
    certifications: ["Guide Officiel", "Premiers Secours", "Écotourisme"],
    availability: "Disponible toute l'année",
  },
  {
    id: 2,
    name: "Fatoumata Camara",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Conakry & Îles de Loos",
    languages: ["Français", "Soussou", "Anglais"],
    experience: 6,
    rating: 4.8,
    reviews: 89,
    price: 65000,
    phone: "+224 628 987 654",
    email: "fatoumata.camara@guide.gn",
    description: "Spécialiste de Conakry et des îles de Loos, passionnée d'histoire et de culture guinéenne.",
    services: ["Visites urbaines", "Excursions îles", "Gastronomie", "Shopping"],
    certifications: ["Guide Touristique", "Histoire Locale", "Langues"],
    availability: "Lundi à Samedi",
  },
  {
    id: 3,
    name: "Ibrahima Sow",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Guinée Forestière",
    languages: ["Français", "Kissi", "Anglais"],
    experience: 10,
    rating: 4.9,
    reviews: 156,
    price: 80000,
    phone: "+224 625 456 789",
    email: "ibrahima.sow@guide.gn",
    description: "Expert de la Guinée Forestière, spécialisé dans l'observation de la faune et la botanique.",
    services: ["Safari", "Observation faune", "Botanique", "Camping"],
    certifications: ["Guide Nature", "Biologie", "Survie"],
    availability: "Saison sèche uniquement",
  },
  {
    id: 4,
    name: "Aissatou Barry",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Haute Guinée",
    languages: ["Français", "Malinké", "Anglais"],
    experience: 7,
    rating: 4.7,
    reviews: 98,
    price: 70000,
    phone: "+224 621 789 123",
    email: "aissatou.barry@guide.gn",
    description: "Guide culturelle spécialisée dans l'artisanat et les traditions de la Haute Guinée.",
    services: ["Artisanat", "Marchés locaux", "Cérémonies", "Musique"],
    certifications: ["Culture Locale", "Artisanat", "Musique"],
    availability: "Flexible",
  },
  {
    id: 5,
    name: "Sékou Touré",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Multi-régions",
    languages: ["Français", "Peul", "Soussou", "Malinké"],
    experience: 12,
    rating: 5.0,
    reviews: 203,
    price: 95000,
    phone: "+224 620 111 222",
    email: "sekou.toure@guide.gn",
    description:
      "Guide senior avec une expertise dans toutes les régions de la Guinée. Parfait pour les circuits complets.",
    services: ["Circuits complets", "Logistique", "Interprétation", "Urgences"],
    certifications: ["Guide Senior", "Logistique", "Sécurité", "Langues"],
    availability: "Sur réservation",
  },
  {
    id: 6,
    name: "Mariama Condé",
    avatar: "/placeholder.svg?height=100&width=100",
    specialty: "Écotourisme",
    languages: ["Français", "Anglais", "Espagnol"],
    experience: 5,
    rating: 4.8,
    reviews: 67,
    price: 85000,
    phone: "+224 627 333 444",
    email: "mariama.conde@guide.gn",
    description: "Spécialiste en écotourisme et développement durable, parfaite pour les voyageurs conscients.",
    services: ["Écotourisme", "Conservation", "Éducation", "Recherche"],
    certifications: ["Écotourisme", "Conservation", "Développement Durable"],
    availability: "Toute l'année",
  },
]

const GuidesPage = () => {
  const { theme } = useTheme()
  const colors = getThemeColors(theme === "dark")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Filtrage des guides
  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = !selectedSpecialty || guide.specialty.includes(selectedSpecialty)
    const matchesLanguage = !selectedLanguage || guide.languages.includes(selectedLanguage)

    return matchesSearch && matchesSpecialty && matchesLanguage
  })

  const specialties = [...new Set(guides.map((g) => g.specialty))]
  const languages = [...new Set(guides.flatMap((g) => g.languages))]

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.background }}>
      {/* Navigation Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300"
        style={{
          backgroundColor: colors.surface + "F0",
          borderColor: colors.border,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                  GuinéeTourisme
                </h1>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Guides Locaux
                </p>
              </div>
            </motion.div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Accueil", href: "/" },
                { name: "Destinations", href: "/destinations" },
                { name: "Guides", href: "/guides" },
                { name: "À propos", href: "/about" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: item.href === "/guides" ? colors.primary : colors.textPrimary }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />

              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/")}
                className="hidden md:flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Button>

              {/* Menu Mobile */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t"
              style={{ borderColor: colors.border }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <nav className="flex flex-col space-y-3 pt-4">
                {[
                  { name: "Accueil", href: "/" },
                  { name: "Destinations", href: "/destinations" },
                  { name: "Guides", href: "/guides" },
                  { name: "À propos", href: "/about" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium"
                    style={{ color: item.href === "/guides" ? colors.primary : colors.textPrimary }}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 transition-colors duration-300" style={{ backgroundColor: colors.surface }}>
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Guides Locaux Certifiés
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez la Guinée avec nos guides expérimentés et passionnés
          </motion.p>
          <motion.div
            className="flex justify-center space-x-8 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                {guides.length}+
              </div>
              <div style={{ color: colors.textSecondary }}>Guides Certifiés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                4.8★
              </div>
              <div style={{ color: colors.textSecondary }}>Note Moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                1000+
              </div>
              <div style={{ color: colors.textSecondary }}>Avis Clients</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Search */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Rechercher un guide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Spécialité
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filtrer par spécialité</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Button
                      variant={selectedSpecialty === null ? "default" : "outline"}
                      onClick={() => setSelectedSpecialty(null)}
                      className="w-full justify-start"
                    >
                      Toutes les spécialités
                    </Button>
                    {specialties.map((specialty) => (
                      <Button
                        key={specialty}
                        variant={selectedSpecialty === specialty ? "default" : "outline"}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className="w-full justify-start"
                      >
                        {specialty}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Languages className="h-4 w-4 mr-2" />
                    Langue
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filtrer par langue</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Button
                      variant={selectedLanguage === null ? "default" : "outline"}
                      onClick={() => setSelectedLanguage(null)}
                      className="w-full justify-start"
                    >
                      Toutes les langues
                    </Button>
                    {languages.map((language) => (
                      <Button
                        key={language}
                        variant={selectedLanguage === language ? "default" : "outline"}
                        onClick={() => setSelectedLanguage(language)}
                        className="w-full justify-start"
                      >
                        {language}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            className="text-sm mb-6"
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filteredGuides.length} guide{filteredGuides.length > 1 ? "s" : ""} trouvé
            {filteredGuides.length > 1 ? "s" : ""}
          </motion.p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-12 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="h-full hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
                        <AvatarFallback>
                          {guide.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" style={{ color: colors.textPrimary }}>
                          {guide.name}
                        </h3>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                          {guide.specialty}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium ml-1">{guide.rating}</span>
                          </div>
                          <span className="text-xs" style={{ color: colors.textSecondary }}>
                            ({guide.reviews} avis)
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                      {guide.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }}>{guide.experience} ans d'expérience</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Languages className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }}>{guide.languages.join(", ")}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }}>{guide.price.toLocaleString()} GNF/jour</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {guide.services.slice(0, 3).map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {guide.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{guide.services.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            Voir Profil
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
                                <AvatarFallback>
                                  {guide.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{guide.name}</div>
                                <div className="text-sm font-normal" style={{ color: colors.textSecondary }}>
                                  {guide.specialty}
                                </div>
                              </div>
                            </DialogTitle>
                          </DialogHeader>

                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">Aperçu</TabsTrigger>
                              <TabsTrigger value="services">Services</TabsTrigger>
                              <TabsTrigger value="certifications">Certifications</TabsTrigger>
                              <TabsTrigger value="contact">Contact</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm" style={{ color: colors.textSecondary }}>
                                  {guide.description}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Expérience</h4>
                                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                                    {guide.experience} années
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Disponibilité</h4>
                                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                                    {guide.availability}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Langues</h4>
                                <div className="flex flex-wrap gap-1">
                                  {guide.languages.map((lang) => (
                                    <Badge key={lang} variant="outline">
                                      {lang}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="services" className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Services Proposés</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {guide.services.map((service) => (
                                    <div key={service} className="flex items-center space-x-2">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: colors.primary }}
                                      />
                                      <span className="text-sm">{service}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Tarification</h4>
                                <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                                  {guide.price.toLocaleString()} GNF
                                </div>
                                <p className="text-sm" style={{ color: colors.textSecondary }}>
                                  Par jour (8 heures)
                                </p>
                              </div>
                            </TabsContent>

                            <TabsContent value="certifications" className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Certifications</h4>
                                <div className="space-y-2">
                                  {guide.certifications.map((cert) => (
                                    <div key={cert} className="flex items-center space-x-2">
                                      <Award className="h-4 w-4" style={{ color: colors.primary }} />
                                      <span className="text-sm">{cert}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Évaluations</h4>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-lg font-bold ml-1">{guide.rating}</span>
                                  </div>
                                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                                    Basé sur {guide.reviews} avis
                                  </span>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="contact" className="space-y-4">
                              <div className="space-y-3">
                                <Button className="w-full justify-start" asChild>
                                  <a href={`tel:${guide.phone}`}>
                                    <Phone className="h-4 w-4 mr-2" />
                                    Appeler {guide.phone}
                                  </a>
                                </Button>
                                <Button variant="outline" className="w-full justify-start" asChild>
                                  <a href={`mailto:${guide.email}`}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Envoyer un email
                                  </a>
                                </Button>
                                <Button variant="outline" className="w-full justify-start" asChild>
                                  <a
                                    href={`https://wa.me/${guide.phone.replace(/\s+/g, "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    WhatsApp
                                  </a>
                                </Button>
                              </div>
                              <div className="text-center pt-4">
                                <Button size="lg" className="w-full">
                                  Réserver Maintenant
                                </Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${guide.phone}`}>
                          <Phone className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-6 text-center border-t transition-colors duration-300"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          © 2023 GuinéeTourisme. Tous droits réservés.
        </p>
      </footer>
    </div>
  )
}

export default GuidesPage
