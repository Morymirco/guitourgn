"use client"

import { getThemeColors } from "@/components/app-colors"
import { useTheme } from "@/components/theme/theme-provider"
import ThemeToggle from "@/components/theme/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Compass, DollarSign, MapPin, Star } from "lucide-react"
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

export default function DestinationDetail() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [site, setSite] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const siteId = params?.id as string
    if (siteId) {
      loadSiteDetails(siteId)
    }
  }, [params])

  const loadSiteDetails = async (siteId: string) => {
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