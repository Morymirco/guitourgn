"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Star,
  MapPin,
  Mail,
  Calendar,
  Euro,
  Users,
  Wifi,
  Car,
  Coffee,
  Phone,
  MessageCircle,
  Globe,
  Facebook,
  Instagram,
  Clock,
  Shield,
} from "lucide-react"
import { AppColors } from "../app-colors"

interface Accommodation {
  id: string
  name: string
  type: string
  location: string
  address: string
  rating: number
  pricePerNight: number
  capacity: number
  amenities: string[]
  description: string
  images: string[]
  availability: boolean
  owner: string
  contact: string
  createdDate: string
  siteId: string
  contactInfo: {
    phone: string
    email: string
    website?: string
    whatsapp?: string
    facebook?: string
    instagram?: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: string
  languages: string[]
}

interface AccommodationDetailModalProps {
  accommodation: Accommodation
  onClose: () => void
}

export function AccommodationDetailModal({ accommodation, onClose }: AccommodationDetailModalProps) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-4 w-4" />
      case "Parking":
        return <Car className="h-4 w-4" />
      case "Petit-déjeuner":
        return <Coffee className="h-4 w-4" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getSiteName = (siteId: string) => {
    const sites = [
      { id: "1", name: "Tour Eiffel" },
      { id: "2", name: "Musée du Louvre" },
      { id: "3", name: "Parc des Buttes-Chaumont" },
      { id: "4", name: "Forêt de Ziama" },
    ]
    const site = sites.find((s) => s.id === siteId)
    return site?.name || "Site non trouvé"
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                {accommodation.name}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="outline"
                  style={{
                    borderColor: AppColors.primaryGold,
                    color: AppColors.primaryGold,
                  }}
                >
                  {accommodation.type}
                </Badge>
                <Badge
                  variant={accommodation.availability ? "default" : "secondary"}
                  style={{
                    backgroundColor: accommodation.availability ? AppColors.success : AppColors.error,
                    color: "white",
                  }}
                >
                  {accommodation.availability ? "Disponible" : "Indisponible"}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{accommodation.rating}</span>
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
                {accommodation.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${accommodation.name} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informations principales */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Euro className="h-6 w-6" style={{ color: AppColors.primaryGold }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {accommodation.pricePerNight}€
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Par nuit
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6" style={{ color: AppColors.primaryGreen }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {accommodation.capacity}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Personnes max
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6" style={{ color: AppColors.warning }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {accommodation.rating}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Note moyenne
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
                <span>{accommodation.location}</span>
              </div>
              <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                {accommodation.address}
              </div>
            </CardContent>
          </Card>

          {/* Site touristique associé */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Site Touristique Associé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" style={{ color: AppColors.info }} />
                <span className="font-medium">{getSiteName(accommodation.siteId)}</span>
              </div>
              <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                Ce logement est situé à proximité de ce site touristique
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
              <p style={{ color: AppColors.textSecondary }}>{accommodation.description}</p>
            </CardContent>
          </Card>

          {/* Équipements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Équipements et Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {accommodation.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div style={{ color: AppColors.primaryGold }}>{getAmenityIcon(amenity)}</div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informations de contact détaillées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Informations de Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                    <span className="font-medium">{accommodation.owner}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                    <span>{accommodation.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                    <span>{accommodation.contactInfo.phone}</span>
                  </div>
                  {accommodation.contactInfo.whatsapp && (
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-4 w-4" style={{ color: AppColors.success }} />
                      <span>WhatsApp: {accommodation.contactInfo.whatsapp}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {accommodation.contactInfo.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4" style={{ color: AppColors.info }} />
                      <a
                        href={accommodation.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Site web
                      </a>
                    </div>
                  )}
                  {accommodation.contactInfo.facebook && (
                    <div className="flex items-center space-x-3">
                      <Facebook className="h-4 w-4" style={{ color: AppColors.info }} />
                      <span>Facebook: {accommodation.contactInfo.facebook}</span>
                    </div>
                  )}
                  {accommodation.contactInfo.instagram && (
                    <div className="flex items-center space-x-3">
                      <Instagram className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                      <span>Instagram: {accommodation.contactInfo.instagram}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                    <span>Ajouté le {new Date(accommodation.createdDate).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horaires et politiques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Horaires et Politiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-4 w-4" style={{ color: AppColors.primaryGreen }} />
                    <span className="font-medium">Horaires</span>
                  </div>
                  <div className="ml-7 space-y-1">
                    <div className="text-sm">Check-in: {accommodation.checkInTime}</div>
                    <div className="text-sm">Check-out: {accommodation.checkOutTime}</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="h-4 w-4" style={{ color: AppColors.warning }} />
                    <span className="font-medium">Politique d'annulation</span>
                  </div>
                  <div className="ml-7">
                    <div className="text-sm">{accommodation.cancellationPolicy}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Langues parlées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Langues Parlées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {accommodation.languages.map((language, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    style={{
                      borderColor: AppColors.info,
                      color: AppColors.info,
                    }}
                  >
                    {language}
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
