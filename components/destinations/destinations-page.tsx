"use client"

import { getThemeColors } from "@/components/app-colors"
import { useTheme } from "@/components/theme/theme-provider"
import ThemeToggle from "@/components/theme/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Compass, DollarSign, Home, MapPin, Menu, Search, Star, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Site {
  id: string
  name: string
  location: string
  description: string
  rating: number
  reviews: number
  entryPrice: number
  recommendedDuration: number
  difficultyLevel: number
  bestPeriod: string
  openingHours: string
  imageUrl: string
}

const DestinationSkeleton = () => {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header Skeleton */}
      <div className="h-16 bg-gray-200 animate-pulse" style={{ backgroundColor: colors.surfaceVariant }} />

      {/* Hero Section Skeleton */}
      <div className="h-96 relative">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ backgroundColor: colors.surfaceVariant }} />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Skeleton */}
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4" style={{ backgroundColor: colors.surfaceVariant }} />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-8" style={{ backgroundColor: colors.surfaceVariant }} />

          {/* Info Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" style={{ backgroundColor: colors.surfaceVariant }} />
            ))}
          </div>

          {/* Description Skeleton */}
          <div className="space-y-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ backgroundColor: colors.surfaceVariant }} />
            ))}
          </div>

          {/* Gallery Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse" style={{ backgroundColor: colors.surfaceVariant }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const DestinationDetail = ({ siteId }: { siteId: string }) => {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const router = useRouter()
  const { toast } = useToast()
  const [site, setSite] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSiteDetails()
  }, [siteId])

  const loadSiteDetails = async () => {
    try {
      const siteDoc = await getDoc(doc(db, "sites", siteId))
      if (siteDoc.exists()) {
        const data = siteDoc.data()
        setSite({
          id: siteDoc.id,
          name: data.name || "",
          location: data.location || "",
          description: data.description || "",
          rating: data.rating || 0,
          reviews: data.reviews || 0,
          entryPrice: data.entryPrice || 0,
          recommendedDuration: data.recommendedDuration || 0,
          difficultyLevel: data.difficultyLevel || 1,
          bestPeriod: data.bestPeriod || "",
          openingHours: data.openingHours || "",
          imageUrl: data.imageUrl || "/images/default-site.jpg"
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du site",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <DestinationSkeleton />
  }

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>Site non trouvé</h2>
          <Button onClick={() => router.push("/destinations")} style={{ backgroundColor: colors.primary }}>
            Retour aux destinations
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
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
            <Button
              variant="ghost"
              onClick={() => router.push("/destinations")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={site.imageUrl}
          alt={site.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {site.name}
            </motion.h1>
            <motion.div
              className="flex items-center text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{site.location}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>{site.rating}</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>{site.reviews} avis</div>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>{site.recommendedDuration}h</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Durée recommandée</div>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>{site.entryPrice.toLocaleString()} GNF</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Prix d'entrée</div>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <CardContent className="p-4 text-center">
                <Compass className="h-6 w-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>Niveau {site.difficultyLevel}/5</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Difficulté</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>À propos</h2>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              {site.description}
            </p>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>Informations pratiques</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-1" style={{ color: colors.textPrimary }}>Meilleure période</div>
                    <div style={{ color: colors.textSecondary }}>{site.bestPeriod}</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1" style={{ color: colors.textPrimary }}>Horaires d'ouverture</div>
                    <div style={{ color: colors.textSecondary }}>{site.openingHours}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>Services disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" style={{ borderColor: colors.primary, color: colors.primary }}>
                    Guide touristique
                  </Badge>
                  <Badge variant="outline" style={{ borderColor: colors.primary, color: colors.primary }}>
                    Parking
                  </Badge>
                  <Badge variant="outline" style={{ borderColor: colors.primary, color: colors.primary }}>
                    Boutique souvenirs
                  </Badge>
                  <Badge variant="outline" style={{ borderColor: colors.primary, color: colors.primary }}>
                    Restaurant
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Button size="lg" style={{ backgroundColor: colors.primary }}>
              Réserver une visite guidée
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const DestinationsPage = () => {
  const params = useParams()
  const siteId = params?.id as string

  if (siteId) {
    return <DestinationDetail siteId={siteId} />
  }

  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const { toast } = useToast()
  const router = useRouter()
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    loadSites()
  }, [])

  const loadSites = async () => {
    try {
      const sitesCollection = collection(db, "sites")
      const sitesSnapshot = await getDocs(sitesCollection)
      const sitesList = sitesSnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name || "",
          location: data.location || "",
          description: data.description || "",
          rating: data.rating || 0,
          reviews: data.reviews || 0,
          entryPrice: data.entryPrice || 0,
          recommendedDuration: data.recommendedDuration || 0,
          difficultyLevel: data.difficultyLevel || 1,
          bestPeriod: data.bestPeriod || "",
          openingHours: data.openingHours || "",
          imageUrl: data.imageUrl || "/images/default-site.jpg"
        }
      })
      setSites(sitesList)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les sites touristiques",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSiteClick = (siteId: string) => {
    router.push(`/destinations/${siteId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
          <p className="mt-4" style={{ color: colors.textPrimary }}>Chargement des destinations...</p>
        </div>
      </div>
    )
  }

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
                <Compass className="h-6 w-6 text-white" />
              </div>
    <div>
                <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                  GuinéeTourisme
                </h1>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Destinations
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
                  style={{ color: item.href === "/destinations" ? colors.primary : colors.textPrimary }}
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
                    style={{ color: item.href === "/destinations" ? colors.primary : colors.textPrimary }}
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
            Découvrez la Guinée
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explorez les merveilles naturelles et culturelles de notre pays
          </motion.p>
          <motion.div
            className="flex justify-center space-x-8 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                {sites.length}+
              </div>
              <div style={{ color: colors.textSecondary }}>Sites Touristiques</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                4.7★
              </div>
              <div style={{ color: colors.textSecondary }}>Note Moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                500+
              </div>
              <div style={{ color: colors.textSecondary }}>Avis Clients</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Rechercher une destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
            {filteredSites.length} destination{filteredSites.length > 1 ? "s" : ""} trouvée
            {filteredSites.length > 1 ? "s" : ""}
          </motion.p>
        </div>
      </section>

      {/* Sites Grid */}
      <section className="pb-12 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site, index) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleSiteClick(site.id)}
                className="cursor-pointer"
              >
                <Card
                  className="h-full hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{site.name}</h3>
                      <div className="flex items-center text-white/90">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{site.location}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                      {site.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }}>
                          {site.rating} ({site.reviews} avis)
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }}>
                          {site.recommendedDuration} heures recommandées
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }}>
                          {site.entryPrice.toLocaleString()} GNF
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" style={{ borderColor: colors.primary, color: colors.primary }}>
                        Niveau {site.difficultyLevel}/5
                      </Badge>
                      <Badge variant="outline" style={{ borderColor: colors.primary, color: colors.primary }}>
                        {site.bestPeriod}
                      </Badge>
                    </div>

                    <Button className="w-full mt-4" style={{ backgroundColor: colors.primary }}>
                      Voir les détails
                    </Button>
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
          © 2024 GuinéeTourisme. Tous droits réservés.
        </p>
      </footer>
    </div>
  )
}

export default DestinationsPage
