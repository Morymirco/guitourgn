"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"
import { Activity, MapPin, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { getThemeColors } from "./app-colors"
import { BrandedBarChart } from "./charts/branded-bar-chart"
import { BrandedLineChart } from "./charts/branded-line-chart"
import { BrandedPieChart } from "./charts/branded-pie-chart"
import { GoogleMapComponent } from "./google-map"
import { useTheme } from "./theme/theme-provider"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const chartVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function DashboardStats() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [stats, setStats] = useState([
    {
      title: "Utilisateurs Totaux",
      value: "0",
      description: "Chargement...",
      icon: Users,
      color: colors.success,
      bgColor: colors.success + "20",
    },
    {
      title: "Sites Touristiques",
      value: "0",
      description: "Chargement...",
      icon: MapPin,
      color: colors.primary,
      bgColor: colors.primary + "20",
    },
    {
      title: "Logements",
      value: "0",
      description: "Chargement...",
      icon: Activity,
      color: colors.success,
      bgColor: colors.success + "20",
    },
    {
      title: "Guides",
      value: "0",
      description: "Chargement...",
      icon: TrendingUp,
      color: colors.info,
      bgColor: colors.info + "20",
    },
  ])

  const [monthlyUsersData, setMonthlyUsersData] = useState([])
  const [siteCategoryData, setSiteCategoryData] = useState([])
  const [userActivityData, setUserActivityData] = useState([])

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Charger les utilisateurs
      const usersCollection = collection(db, "users")
      const usersSnapshot = await getDocs(usersCollection)
      const totalUsers = usersSnapshot.size

      // Charger les sites touristiques
      const sitesCollection = collection(db, "sites")
      const sitesSnapshot = await getDocs(sitesCollection)
      const totalSites = sitesSnapshot.size

      // Charger les logements
      const accommodationsCollection = collection(db, "accommodations")
      const accommodationsSnapshot = await getDocs(accommodationsCollection)
      const totalAccommodations = accommodationsSnapshot.size

      // Charger les guides
      const guidesCollection = collection(db, "guides")
      const guidesSnapshot = await getDocs(guidesCollection)
      const totalGuides = guidesSnapshot.size

      // Mettre à jour les statistiques
      setStats([
        {
          title: "Utilisateurs Totaux",
          value: totalUsers.toString(),
          description: "Utilisateurs inscrits",
          icon: Users,
          color: colors.success,
          bgColor: colors.success + "20",
        },
        {
          title: "Sites Touristiques",
          value: totalSites.toString(),
          description: "Sites répertoriés",
          icon: MapPin,
          color: colors.primary,
          bgColor: colors.primary + "20",
        },
        {
          title: "Logements",
          value: totalAccommodations.toString(),
          description: "Hébergements disponibles",
          icon: Activity,
          color: colors.success,
          bgColor: colors.success + "20",
        },
        {
          title: "Guides",
          value: totalGuides.toString(),
          description: "Guides certifiés",
          icon: TrendingUp,
          color: colors.info,
          bgColor: colors.info + "20",
        },
      ])

      // Charger les données des sites par catégorie
      const categories = {}
      sitesSnapshot.forEach(doc => {
        const site = doc.data()
        if (site.category) {
          categories[site.category] = (categories[site.category] || 0) + 1
        }
      })

      const categoryData = Object.entries(categories).map(([category, value]) => ({
        category,
        value,
        color: colors[Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]]
      }))

      setSiteCategoryData(categoryData)

      // Simuler les données d'activité (à remplacer par des données réelles)
      const activityData = [
        { day: "Lun", visits: Math.floor(Math.random() * 100) + 50 },
        { day: "Mar", visits: Math.floor(Math.random() * 100) + 50 },
        { day: "Mer", visits: Math.floor(Math.random() * 100) + 50 },
        { day: "Jeu", visits: Math.floor(Math.random() * 100) + 50 },
        { day: "Ven", visits: Math.floor(Math.random() * 100) + 50 },
        { day: "Sam", visits: Math.floor(Math.random() * 100) + 50 },
        { day: "Dim", visits: Math.floor(Math.random() * 100) + 50 },
      ]

      setUserActivityData(activityData)

    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error)
    }
  }

  return (
    <motion.div
      className="space-y-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
        {stats.map((stat, index) => (
          <motion.div key={index} variants={cardVariants} whileHover={{ scale: 1.02, y: -5 }}>
            <Card
              className="transition-colors duration-300 hover-lift cursor-pointer"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                  {stat.title}
                </CardTitle>
                <motion.div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-2xl font-bold"
                  style={{ color: colors.textPrimary }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
        <motion.div variants={chartVariants} whileHover={{ scale: 1.02 }}>
          <Card
            className="transition-colors duration-300"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: colors.textPrimary }}>Évolution des Utilisateurs</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>
                Nouveaux utilisateurs vs utilisateurs actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BrandedLineChart data={monthlyUsersData} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={chartVariants} whileHover={{ scale: 1.02 }}>
          <Card
            className="transition-colors duration-300"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: colors.textPrimary }}>Sites par Catégorie</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>
                Répartition des sites touristiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BrandedPieChart data={siteCategoryData} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={chartVariants} whileHover={{ scale: 1.02 }}>
          <Card
            className="transition-colors duration-300"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: colors.textPrimary }}>Activité Hebdomadaire</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>Visites par jour de la semaine</CardDescription>
            </CardHeader>
            <CardContent>
              <BrandedBarChart data={userActivityData} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Section avec la carte Google Maps */}
      <motion.div 
        variants={chartVariants} 
        whileHover={{ scale: 1.01 }} 
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Card
          className="transition-colors duration-300 overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ color: colors.textPrimary }}>Localisation des Sites Touristiques</CardTitle>
                <CardDescription style={{ color: colors.textSecondary }}>
                  Carte interactive des sites touristiques en Guinée
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: colors.primary + "20",
                    color: colors.primary
                  }}
                >
                  {stats[1].value} sites
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-[500px] w-full">
              <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${colors.surface}00 0%, ${colors.surface} 100%)`,
                  height: "100px",
                  bottom: 0,
                }}
              />
              <GoogleMapComponent />
            </div>
            <div 
              className="p-4 border-t"
              style={{ 
                borderColor: colors.border,
                backgroundColor: colors.surfaceVariant
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <span style={{ color: colors.textSecondary }}>Sites Touristiques</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors.success }}
                    />
                    <span style={{ color: colors.textSecondary }}>Guides Disponibles</span>
                  </div>
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Dernière mise à jour: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
