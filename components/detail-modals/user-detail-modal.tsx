"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Calendar, MapPin, Clock, Shield } from "lucide-react"
import { AppColors, userRoles } from "../app-colors"

interface User {
  id: string
  name: string
  email: string
  registrationDate: string
  lastConnection: string
  status: "active" | "inactive"
  role: string
}

interface UserDetailModalProps {
  user: User
  onClose: () => void
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  // Données simulées pour enrichir le profil utilisateur
  const userStats = {
    totalBookings: 12,
    favoriteDestinations: ["Paris", "Lyon", "Marseille"],
    totalSpent: 2450,
    averageRating: 4.7,
    preferredLanguage: "Français",
    membershipLevel: "Gold",
  }

  const getRoleName = (roleId: string) => {
    const role = userRoles.find((r) => r.id === roleId)
    return role?.name || roleId
  }

  const getRoleColor = (roleId: string) => {
    const role = userRoles.find((r) => r.id === roleId)
    return role?.color || AppColors.textSecondary
  }

  const getRolePrivileges = (roleId: string) => {
    const role = userRoles.find((r) => r.id === roleId)
    return role?.privileges || []
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                {user.name}
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
                  style={{
                    backgroundColor: user.status === "active" ? AppColors.success : AppColors.textSecondary,
                    color: "white",
                  }}
                >
                  {user.status === "active" ? "Actif" : "Inactif"}
                </Badge>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: getRoleColor(user.role),
                    color: getRoleColor(user.role),
                  }}
                >
                  {getRoleName(user.role)}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Informations de Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>Inscrit le {new Date(user.registrationDate).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                <span>Dernière connexion: {new Date(user.lastConnection).toLocaleDateString("fr-FR")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Rôle et privilèges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Rôle et Privilèges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4" style={{ color: getRoleColor(user.role) }} />
                <span className="font-medium">{getRoleName(user.role)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {getRolePrivileges(user.role).map((privilege) => (
                  <div
                    key={privilege}
                    className="text-xs px-2 py-1 rounded-md bg-gray-100 flex items-center"
                    style={{ backgroundColor: `${getRoleColor(user.role)}15` }}
                  >
                    <span>
                      {privilege
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {userStats.totalBookings}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Réservations totales
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {userStats.totalSpent}€
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Montant total dépensé
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Destinations favorites */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Destinations Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userStats.favoriteDestinations.map((destination, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" style={{ color: AppColors.primaryGold }} />
                    <span>{destination}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Préférences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Préférences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: AppColors.textSecondary }}>Langue préférée:</span>
                <span className="font-medium">{userStats.preferredLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: AppColors.textSecondary }}>Note moyenne donnée:</span>
                <span className="font-medium">{userStats.averageRating}/5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
