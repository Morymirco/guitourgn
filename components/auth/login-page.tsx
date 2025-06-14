"use client"

import { getThemeColors } from "@/components/app-colors"
import { useTheme } from "@/components/theme/theme-provider"
import ThemeToggle from "@/components/theme/theme-toggle"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth"
import { motion } from "framer-motion"
import { ArrowLeft, Eye, EyeOff, Lock, Shield, User } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string; role: string }) => void
  onBackToLanding: () => void
}

export default function LoginPage({ onLogin, onBackToLanding }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await signIn(email, password)
      
      // Vérifier si l'utilisateur est l'admin
      if (user.email === "morykoulibaly2023@gmail.com") {
        onLogin({ email, password, role: "admin" })
      } else {
        setError("Accès non autorisé. Seuls les administrateurs peuvent se connecter.")
      }
    } catch (error: any) {
      setError(error.message || "Erreur de connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
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
                Connexion sécurisée
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="outline" onClick={onBackToLanding} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="transition-colors duration-300"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <CardHeader className="text-center">
              <CardTitle style={{ color: colors.textPrimary }}>Connexion Administrateur</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>
                Connectez-vous pour accéder au tableau de bord
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ color: colors.textPrimary }}>
                    Email
                  </Label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 transition-colors duration-300"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.textPrimary,
                      }}
                      placeholder="admin@guineetourisme.gn"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" style={{ color: colors.textPrimary }}>
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 transition-colors duration-300"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.textPrimary,
                      }}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" style={{ color: colors.textSecondary }} />
                      ) : (
                        <Eye className="h-4 w-4" style={{ color: colors.textSecondary }} />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="remember" className="text-sm" style={{ color: colors.textSecondary }}>
                    Se souvenir de moi
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full transition-all duration-300"
                  style={{ backgroundColor: colors.primary }}
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
