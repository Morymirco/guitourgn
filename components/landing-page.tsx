"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  Star,
  Download,
  Menu,
  X,
  Shield,
  Compass,
  Camera,
  Heart,
  Globe,
  Smartphone,
  Navigation,
  Award,
  TrendingUp,
  Clock,
} from "lucide-react"
import { useTheme } from "@/components/theme/theme-provider"
import { getThemeColors } from "@/components/app-colors"
import ThemeToggle from "@/components/theme/theme-toggle"

interface LandingPageProps {
  onLoginClick: () => void
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1])
  const heroY = useTransform(scrollY, [0, 300], [0, -50])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

  const stats = [
    { icon: MapPin, label: "Sites Touristiques", value: "150+", color: colors.primary },
    { icon: Users, label: "Guides Certifiés", value: "200+", color: colors.secondary },
    { icon: Star, label: "Avis Positifs", value: "98%", color: colors.accent },
    { icon: Download, label: "Téléchargements", value: "50K+", color: colors.info },
  ]

  const features = [
    {
      icon: Compass,
      title: "Navigation GPS",
      description: "Trouvez facilement votre chemin vers les sites touristiques avec notre GPS intégré",
      color: colors.primary,
    },
    {
      icon: Camera,
      title: "Galerie Photos",
      description: "Découvrez les plus beaux paysages de Guinée en haute résolution",
      color: colors.secondary,
    },
    {
      icon: Heart,
      title: "Favoris",
      description: "Sauvegardez vos sites préférés pour les retrouver facilement",
      color: colors.accent,
    },
    {
      icon: Globe,
      title: "Hors Ligne",
      description: "Accédez aux informations même sans connexion internet",
      color: colors.info,
    },
    {
      icon: Users,
      title: "Guides Locaux",
      description: "Connectez-vous avec des guides expérimentés pour une expérience authentique",
      color: colors.success,
    },
    {
      icon: Award,
      title: "Certifié",
      description: "Tous nos guides sont certifiés et reconnus par le ministère du tourisme",
      color: colors.warning,
    },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300"
        style={{
          backgroundColor: colors.surface + "F0",
          borderColor: colors.border,
          opacity: headerOpacity,
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-2 rounded-lg" >
              <img src="/images/logo.jpg" alt="GuinéeTourisme" className="h-10 w-10 rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                  GuinéeTourisme
                </h1>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Découvrez la Guinée
                </p>
              </div>
            </motion.div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Accueil", "Destinations", "Guides", "À propos"].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === "Guides" ? "/guides" : item === "Destinations" ? "/destinations" : item === "À propos" ? "/about" : "/"}
                  className="text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: colors.textPrimary }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />

              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                <Button
                  onClick={onLoginClick}
                  className="hidden md:flex items-center space-x-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Shield className="h-4 w-4" />
                  <span>Connexion Admin</span>
                </Button>
              </motion.div>

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
                {["Accueil", "Destinations", "Guides", "À propos"].map((item) => (
                  <a key={item} href="#" className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {item}
                  </a>
                ))}
                <Button onClick={onLoginClick} className="w-full mt-3" style={{ backgroundColor: colors.primary }}>
                  <Shield className="h-4 w-4 mr-2" />
                  Connexion Admin
                </Button>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section className="relative pt-24 pb-16 overflow-hidden" style={{ y: heroY, opacity: heroOpacity }}>
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%)`
              : `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <Badge
                className="mb-6 px-4 py-2 text-sm"
                style={{ backgroundColor: colors.primary + "20", color: colors.primary }}
              >
                🇬🇳 Découvrez la beauté de la Guinée
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: colors.textPrimary }}>
                Explorez les Merveilles de la <span style={{ color: colors.primary }}>Guinée</span>
              </h1>

              <p
                className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                Découvrez les sites touristiques exceptionnels, connectez-vous avec des guides locaux expérimentés et
                vivez des expériences inoubliables à travers notre belle Guinée.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button size="lg" className="px-8 py-3 text-lg" style={{ backgroundColor: colors.primary }}>
                <Download className="mr-2 h-5 w-5" />
                Télécharger l'App
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                <Navigation className="mr-2 h-5 w-5" />
                Explorer Maintenant
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: stat.color + "20" }}
                  >
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Fonctionnalités Exceptionnelles
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
              Notre application vous offre tous les outils nécessaires pour une expérience touristique parfaite
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card
                  className="h-full p-6 border transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <CardContent className="p-0">
                    <div
                      className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: feature.color + "20" }}
                    >
                      <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: colors.textPrimary }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: colors.textSecondary }}>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Mockup Section */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: colors.surface }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge
                className="mb-4 px-3 py-1"
                style={{ backgroundColor: colors.secondary + "20", color: colors.secondary }}
              >
                📱 Application Mobile
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.textPrimary }}>
                Emportez la Guinée dans votre poche
              </h2>

              <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
                Notre application mobile vous permet d'explorer la Guinée où que vous soyez. Cartes hors ligne, guides
                audio, réalité augmentée et bien plus encore.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Smartphone, text: "Interface intuitive et moderne" },
                  { icon: Navigation, text: "Navigation GPS précise" },
                  { icon: Clock, text: "Accès hors ligne" },
                  { icon: TrendingUp, text: "Mises à jour en temps réel" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center space-x-3"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.primary + "20" }}
                    >
                      <item.icon className="h-4 w-4" style={{ color: colors.primary }} />
                    </div>
                    <span style={{ color: colors.textPrimary }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" style={{ backgroundColor: colors.primary }}>
                  <Download className="mr-2 h-5 w-5" />
                  App Store
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Éléments décoratifs */}
              <div
                className="absolute -top-10 -right-10 w-20 h-20 rounded-lg opacity-20"
                style={{ backgroundColor: colors.warning }}
              ></div>
              <div
                className="absolute -bottom-5 -left-5 w-12 h-12 rounded-md opacity-30"
                style={{ backgroundColor: colors.warning }}
              ></div>
              <div
                className="absolute top-1/2 -right-8 w-8 h-8 rounded opacity-25"
                style={{ backgroundColor: colors.warning }}
              ></div>

              {/* Image Mockup */}
              <div className="relative mx-auto w-72 h-[650px] rounded-[3rem] ">
                <img
                  src="/images/ap.png"
                  alt="GuinéeTourisme App Mockup"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.textPrimary }}>
              Prêt à découvrir la Guinée ?
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
              Rejoignez des milliers d'explorateurs qui ont déjà découvert les merveilles de notre pays
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3 text-lg" style={{ backgroundColor: colors.primary }}>
                <Download className="mr-2 h-5 w-5" />
                Commencer l'Aventure
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg" onClick={onLoginClick}>
                <Shield className="mr-2 h-5 w-5" />
                Espace Admin
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

     
      <footer
        className="border-t py-12 transition-colors duration-300"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  GuinéeTourisme
                </span>
              </div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Votre guide ultime pour découvrir les merveilles de la République de Guinée.
              </p>
            </div>

            {[
              {
                title: "Destinations",
                links: ["Conakry", "Fouta Djallon", "Guinée Forestière", "Haute Guinée"],
              },
              {
                title: "Services",
                links: ["Guides Touristiques", "Hébergements", "Transport", "Activités"],
              },
              {
                title: "Support",
                links: ["Centre d'aide", "Contact", "FAQ", "Conditions"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: colors.textSecondary }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: colors.border }}>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              © 2024 GuinéeTourisme. Tous droits réservés. Fait avec ❤️ en Guinée.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage