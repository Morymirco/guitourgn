"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Users,
  Star,
  Download,
  Heart,
  Target,
  Eye,
  CheckCircle,
  Home,
  Menu,
  X,
  Mail,
  Phone,
  Globe,
  Award,
  Building,
  Plane,
} from "lucide-react"
import { useTheme } from "@/components/theme/theme-provider"
import { getThemeColors } from "@/components/app-colors"
import ThemeToggle from "@/components/theme/theme-toggle"

const AboutPage = () => {
  const { theme } = useTheme()
  const colors = getThemeColors(theme === "dark")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const stats = [
    { icon: MapPin, label: "Sites Répertoriés", value: "150+", color: colors.primary },
    { icon: Users, label: "Guides Certifiés", value: "200+", color: "#4CAF50" },
    { icon: Star, label: "Avis Positifs", value: "98%", color: "#FF9800" },
    { icon: Download, label: "Téléchargements", value: "50K+", color: "#2196F3" },
  ]

  const team = [
    {
      name: "Dr. Amadou Diallo",
      role: "Directeur Général",
      avatar: "/placeholder.svg?height=100&width=100",
      description:
        "Expert en tourisme durable avec 15 ans d'expérience dans le développement touristique en Afrique de l'Ouest.",
    },
    {
      name: "Fatoumata Bah",
      role: "Directrice Marketing",
      avatar: "/placeholder.svg?height=100&width=100",
      description: "Spécialiste en marketing digital et promotion touristique, passionnée par la culture guinéenne.",
    },
    {
      name: "Ibrahima Camara",
      role: "Directeur Technique",
      avatar: "/placeholder.svg?height=100&width=100",
      description: "Ingénieur logiciel avec une expertise en applications mobiles et systèmes de géolocalisation.",
    },
    {
      name: "Aissatou Sow",
      role: "Responsable Partenariats",
      avatar: "/placeholder.svg?height=100&width=100",
      description:
        "Experte en relations publiques et développement de partenariats stratégiques dans le secteur touristique.",
    },
  ]

  const partners = [
    { name: "Ministère du Tourisme", type: "Gouvernement", icon: Building },
    { name: "Office National du Tourisme", type: "Institution", icon: Award },
    { name: "UNESCO Guinée", type: "Organisation", icon: Globe },
    { name: "Air France", type: "Transport", icon: Plane },
    { name: "Hôtel Noom Conakry", type: "Hébergement", icon: Building },
    { name: "Société Générale Guinée", type: "Finance", icon: Building },
  ]

  const objectives = [
    "Promouvoir le tourisme durable en Guinée",
    "Valoriser le patrimoine culturel et naturel",
    "Créer des opportunités économiques locales",
    "Faciliter les échanges interculturels",
    "Préserver l'environnement et la biodiversité",
    "Former et certifier les guides locaux",
  ]

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
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                  GuinéeTourisme
                </h1>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  À propos
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
                  style={{ color: item.href === "/about" ? colors.primary : colors.textPrimary }}
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
                    style={{ color: item.href === "/about" ? colors.primary : colors.textPrimary }}
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
      <section className="pt-24 pb-16 transition-colors duration-300" style={{ backgroundColor: colors.surface }}>
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            À Propos de GuinéeTourisme
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nous sommes passionnés par la promotion du tourisme durable en Guinée, en valorisant notre riche patrimoine
            culturel et naturel tout en créant des opportunités économiques pour les communautés locales.
          </motion.p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full" style={{ backgroundColor: stat.color + "20" }}>
                    <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: colors.surface }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: colors.primary + "20" }}>
                  <Target className="h-6 w-6" style={{ color: colors.primary }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                  Notre Mission
                </h2>
              </div>
              <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
                Promouvoir et développer un tourisme durable en Guinée qui valorise notre patrimoine exceptionnel tout
                en générant des bénéfices économiques pour les communautés locales.
              </p>
              <div className="space-y-3">
                {objectives.map((objective, index) => (
                  <motion.div
                    key={objective}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: colors.primary }} />
                    <span className="text-sm" style={{ color: colors.textSecondary }}>
                      {objective}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: "#4CAF50" + "20" }}>
                  <Eye className="h-6 w-6" style={{ color: "#4CAF50" }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                  Notre Vision
                </h2>
              </div>
              <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
                Faire de la Guinée une destination touristique de référence en Afrique de l'Ouest, reconnue pour la
                richesse de son patrimoine, l'authenticité de ses expériences et l'engagement de ses communautés.
              </p>
              <Card style={{ backgroundColor: colors.background, borderColor: colors.border }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    Nos Valeurs
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: Heart, text: "Authenticité et respect des traditions" },
                      { icon: Globe, text: "Durabilité environnementale" },
                      { icon: Users, text: "Inclusion des communautés locales" },
                      { icon: Award, text: "Excellence dans le service" },
                    ].map((value, index) => (
                      <div key={value.text} className="flex items-center space-x-3">
                        <value.icon className="h-4 w-4" style={{ color: colors.primary }} />
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          {value.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Notre Équipe
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Des professionnels passionnés au service du tourisme guinéen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="text-center h-full hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <CardContent className="p-6">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-2" style={{ color: colors.textPrimary }}>
                      {member.name}
                    </h3>
                    <Badge variant="outline" className="mb-3">
                      {member.role}
                    </Badge>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: colors.surface }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Nos Partenaires
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Ensemble pour développer le tourisme en Guinée
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="p-4 hover:shadow-md transition-all duration-300"
                  style={{ backgroundColor: colors.background, borderColor: colors.border }}
                >
                  <CardContent className="p-2">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full" style={{ backgroundColor: colors.primary + "20" }}>
                        <partner.icon className="h-6 w-6" style={{ color: colors.primary }} />
                      </div>
                    </div>
                    <h4 className="font-medium text-sm mb-1" style={{ color: colors.textPrimary }}>
                      {partner.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {partner.type}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Contactez-Nous
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
              Vous avez des questions ou souhaitez collaborer avec nous ?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>contact@guineetourisme.gn</span>
              </Button>
              <Button variant="outline" size="lg" className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+224 622 000 000</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center border-t transition-colors duration-300"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <div className="container mx-auto px-4">
          <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
            © 2023 GuinéeTourisme. Tous droits réservés.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-sm hover:opacity-80" style={{ color: colors.textSecondary }}>
              Politique de confidentialité
            </a>
            <a href="#" className="text-sm hover:opacity-80" style={{ color: colors.textSecondary }}>
              Conditions d'utilisation
            </a>
            <a href="#" className="text-sm hover:opacity-80" style={{ color: colors.textSecondary }}>
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage
