"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, User, Settings, LogOut, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth/auth-context"
import { useTheme } from "@/components/theme/theme-provider"
import { getThemeColors } from "@/components/app-colors"
import ThemeToggle from "@/components/theme/theme-toggle"

interface AdminHeaderProps {
  onBackToLanding: () => void
}

export default function AdminHeader({ onBackToLanding }: AdminHeaderProps) {
  const { user, logout } = useAuth()
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  const handleLogout = () => {
    logout()
    onBackToLanding()
  }

  return (
    <motion.header
      className="border-b transition-colors duration-300"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="p-2 rounded-lg"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                GuinéeTourisme Admin
              </h1>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Tableau de bord administrateur
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Button variant="outline" onClick={onBackToLanding} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>

            {/* Profil utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 h-auto p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback style={{ backgroundColor: colors.primary, color: "white" }}>
                      {user?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium" style={{ color: colors.textPrimary }}>
                        {user?.name || "Administrateur"}
                      </span>
                      <Badge
                        variant="secondary"
                        style={{ backgroundColor: colors.success + "20", color: colors.success }}
                      >
                        Admin
                      </Badge>
                    </div>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      {user?.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center space-x-2 text-red-600" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
