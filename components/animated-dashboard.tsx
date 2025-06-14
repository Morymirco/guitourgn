"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Users, MapPin, Building, UserCheck, CreditCard, Home } from "lucide-react"
import { DashboardStats } from "./dashboard-stats"
import { UserManagement } from "./user-management"
import { SiteManagement } from "./site-management"
import { AccommodationManagement } from "./accommodation-management"
import { GuideManagement } from "./guide-management"
import { PlanManagement } from "./plan-management"
import { useTheme } from "./theme/theme-provider"
import { getThemeColors } from "./app-colors"

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function AnimatedDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  const tabs = [
    {
      id: "dashboard",
      label: "Tableau de Bord",
      icon: BarChart3,
      component: <DashboardStats />,
    },
    {
      id: "users",
      label: "Utilisateurs",
      icon: Users,
      component: <UserManagement />,
    },
    {
      id: "sites",
      label: "Sites Touristiques",
      icon: MapPin,
      component: <SiteManagement />,
    },
    {
      id: "accommodations",
      label: "Logements",
      icon: Building,
      component: <AccommodationManagement />,
    },
    {
      id: "guides",
      label: "Guides",
      icon: UserCheck,
      component: <GuideManagement />,
    },
    {
      id: "plans",
      label: "Plans d'Abonnement",
      icon: CreditCard,
      component: <PlanManagement />,
    },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.background }}>
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          className="w-64 min-h-screen border-r transition-colors duration-300"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6">
            <motion.div
              className="flex items-center space-x-3 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                  Dashboard
                </h2>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Administration
                </p>
              </div>
            </motion.div>

            <nav className="space-y-2">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id ? "shadow-md" : "hover:shadow-sm"
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? colors.primary : "transparent",
                    color: activeTab === tab.id ? "white" : colors.textPrimary,
                  }}
                  onClick={() => setActiveTab(tab.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              {tabs.find((tab) => tab.id === activeTab)?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
