"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Phone, Mail, Calendar, Award, Languages, Users } from "lucide-react"
import { AppColors } from "../app-colors"

interface Guide {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  experience: number
  rating: number
  totalTours: number
  languages: string[]
  sites: string[]
  description: string
  avatar: string
  status: "active" | "inactive"
  joinDate: string
}

interface GuideDetailModalProps {
  guide: Guide
  onClose: () => void
}

export function GuideDetailModal({ guide, onClose }: GuideDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
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
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                {guide.name}
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={guide.status === "active" ? "default" : "secondary"}
                  style={{
                    backgroundColor: guide.status === "active" ? AppColors.success : AppColors.textSecondary,
                    color: "white",
                  }}
                >
                  {guide.status === "active" ? "Actif" : "Inactif"}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{guide.rating}</span>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations de contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Informations de Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>{guide.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>{guide.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>Membre depuis {new Date(guide.joinDate).toLocaleDateString("fr-FR")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6" style={{ color: AppColors.primaryGold }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {guide.experience}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Années d'expérience
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6" style={{ color: AppColors.primaryGreen }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {guide.totalTours}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Tours réalisés
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Languages className="h-6 w-6" style={{ color: AppColors.info }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {guide.languages.length}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Langues parlées
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: AppColors.textSecondary }}>{guide.description}</p>
            </CardContent>
          </Card>

          {/* Spécialités */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Spécialités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {guide.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    style={{
                      borderColor: AppColors.primaryGreen,
                      color: AppColors.primaryGreen,
                    }}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Langues */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Langues Parlées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {guide.languages.map((language, index) => (
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

          {/* Sites associés */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Sites Touristiques Associés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {guide.sites.map((site, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                    <span>{site}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
