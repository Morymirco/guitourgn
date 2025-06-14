"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Star, Users, Clock, Camera, Map } from "lucide-react"
import { AppColors, regions } from "../app-colors"

interface TouristSite {
  id: string
  name: string
  description: string
  category: string
  location: string
  region: string
  images: string[]
  createdDate: string
}

interface SiteDetailModalProps {
  site: TouristSite
  onClose: () => void
}

export function SiteDetailModal({ site, onClose }: SiteDetailModalProps) {
  // Données simulées pour enrichir les informations du site
  const siteStats = {
    averageRating: 4.6,
    totalVisitors: 1250,
    averageVisitDuration: "2h 30min",
    popularTimes: ["10h-12h", "14h-16h"],
    nearbyAttractions: ["Café de Flore", "Jardin du Luxembourg"],
    accessibility: ["Accès PMR", "Parking disponible"],
  }

  const getRegionColor = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.color || AppColors.textSecondary
  }

  const getRegionName = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.name || regionId
  }

  const getRegionDescription = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.description || ""
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                {site.name}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="outline"
                  style={{
                    borderColor: AppColors.primaryGreen,
                    color: AppColors.primaryGreen,
                  }}
                >
                  {site.category}
                </Badge>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: getRegionColor(site.region),
                    color: getRegionColor(site.region),
                    backgroundColor: `${getRegionColor(site.region)}20`,
                  }}
                >
                  {getRegionName(site.region)}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{siteStats.averageRating}</span>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Images */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {site.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${site.name} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Région */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Région
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Map className="h-4 w-4" style={{ color: getRegionColor(site.region) }} />
                <span className="font-medium">{getRegionName(site.region)}</span>
              </div>
              <p style={{ color: AppColors.textSecondary }}>{getRegionDescription(site.region)}</p>
            </CardContent>
          </Card>

          {/* Statistiques principales */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6" style={{ color: AppColors.primaryGold }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {siteStats.totalVisitors}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Visiteurs totaux
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6" style={{ color: AppColors.primaryGreen }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {siteStats.averageVisitDuration}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Durée moyenne
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Camera className="h-6 w-6" style={{ color: AppColors.info }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {site.images.length}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Photos disponibles
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Localisation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Localisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>{site.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>Ajouté le {new Date(site.createdDate).toLocaleDateString("fr-FR")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: AppColors.textSecondary }}>{site.description}</p>
            </CardContent>
          </Card>

          {/* Heures populaires */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Heures Populaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {siteStats.popularTimes.map((time, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    style={{
                      borderColor: AppColors.primaryGold,
                      color: AppColors.primaryGold,
                    }}
                  >
                    {time}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attractions à proximité */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Attractions à Proximité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {siteStats.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" style={{ color: AppColors.primaryGreen }} />
                    <span>{attraction}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accessibilité */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Accessibilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {siteStats.accessibility.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    style={{
                      borderColor: AppColors.success,
                      color: AppColors.success,
                    }}
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
