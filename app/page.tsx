"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/user-management"
import { SiteManagement } from "@/components/site-management"
import { DashboardStats } from "@/components/dashboard-stats"
import { GuideManagement } from "@/components/guide-management"
import { AccommodationManagement } from "@/components/accommodation-management"
import { PlanManagement } from "@/components/plan-management"
import LandingPage from "@/components/landing-page"
import LoginPage from "@/components/auth/login-page"
import AdminHeader from "@/components/dashboard/admin-header"
import { AuthProvider, useAuth } from "@/components/auth/auth-context"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { useTheme } from "@/components/theme/theme-provider"
import { getThemeColors } from "@/components/app-colors"
import DestinationsPage from "@/components/destinations/destinations-page"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

const tabContentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 },
  },
}

function AppContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentView, setCurrentView] = useState<"landing" | "login" | "dashboard">("landing")
  const { isAuthenticated, isAdmin, login } = useAuth()
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  const handleLoginClick = () => {
    setCurrentView("login")
  }

  const handleLogin = (credentials: { email: string; password: string; role: string }) => {
    login(credentials)
    setCurrentView("dashboard")
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
  }

  // Si l'utilisateur est authentifié et admin, afficher le dashboard
  if (isAuthenticated && isAdmin && currentView === "dashboard") {
    return (
      <motion.div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: colors.background }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AdminHeader onBackToLanding={handleBackToLanding} />

        <div className="container mx-auto p-6">
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TabsList
                  className="grid w-full grid-cols-7 border transition-colors duration-300"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  {[
                    { value: "dashboard", label: "Tableau de Bord" },
                    { value: "users", label: "Utilisateurs" },
                    { value: "sites", label: "Sites" },
                    { value: "guides", label: "Guides" },
                    { value: "accommodations", label: "Logements" },
                    { value: "plans", label: "Plans" },
                    { value: "destinations", label: "Destinations" },
                  ].map((tab, index) => (
                    <motion.div
                      key={tab.value}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <TabsTrigger
                        value={tab.value}
                        className="transition-all duration-300 hover:scale-105"
                        style={
                          {
                            "--active-bg": colors.primary,
                            "--active-color": "white",
                          } as React.CSSProperties
                        }
                      >
                        {tab.label}
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <TabsContent value="dashboard">
                    <DashboardStats />
                  </TabsContent>

                  <TabsContent value="users">
                    <UserManagement />
                  </TabsContent>

                  <TabsContent value="sites">
                    <SiteManagement />
                  </TabsContent>

                  <TabsContent value="guides">
                    <GuideManagement />
                  </TabsContent>

                  <TabsContent value="accommodations">
                    <AccommodationManagement />
                  </TabsContent>

                  <TabsContent value="plans">
                    <PlanManagement />
                  </TabsContent>

                  <TabsContent value="destinations">
                    <DestinationsPage onBackToDashboard={() => setActiveTab("dashboard")} />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // Afficher la page de connexion
  if (currentView === "login") {
    return <LoginPage onLogin={handleLogin} onBackToLanding={handleBackToLanding} />
  }

  // Afficher la landing page par défaut
  return <LandingPage onLoginClick={handleLoginClick} />
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="guinee-tourisme-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
