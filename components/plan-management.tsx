"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatePresence, motion } from "framer-motion"
import { Crown, DollarSign, Edit, Eye, MoreHorizontal, Search, TrendingUp, Users } from "lucide-react"
import { useState } from "react"
import { getThemeColors } from "./app-colors"
import { PlanDetailModal } from "./detail-modals/plan-detail-modal"
import { PlanStatsModal } from "./detail-modals/plan-stats-modal"
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
    transition: { duration: 0.5 },
  },
}

const statsCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

const subscriptionPlans = [
  {
    id: "basic",
    name: "Plan Standard",
    description: "Accès aux fonctionnalités essentielles pour découvrir la Guinée",
    price: "0",
    currency: "GNF",
    period: "mois",
    color: "#4CAF50",
    features: [
      "Accès aux sites touristiques",
      "Informations de base",
      "Carte interactive",
      "Support communautaire"
    ]
  },
  {
    id: "premium",
    name: "Plan Premium",
    description: "Expérience complète avec guide personnel et services exclusifs",
    price: "500000",
    currency: "GNF",
    period: "mois",
    color: "#2196F3",
    features: [
      "Tout du plan Standard",
      "Guide personnel",
      "Réservations prioritaires",
      "Support 24/7",
      "Accès aux événements exclusifs",
      "Photos HD des sites"
    ]
  }
]

interface PlanSubscription {
  id: string
  userId: string
  userName: string
  userEmail: string
  planId: string
  startDate: string
  endDate: string
  status: "active" | "expired" | "cancelled"
  autoRenew: boolean
  paymentMethod: string
}

export function PlanManagement() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<(typeof subscriptionPlans)[0] | null>(null)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [subscriptions, setSubscriptions] = useState<PlanSubscription[]>([
    {
      id: "1",
      userId: "1",
      userName: "Mamadou Diallo",
      userEmail: "mamadou.diallo@email.com",
      planId: "premium",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      status: "active",
      autoRenew: true,
      paymentMethod: "Orange Money",
    },
    {
      id: "2",
      userId: "2",
      userName: "Fatoumata Camara",
      userEmail: "fatoumata.camara@email.com",
      planId: "basic",
      startDate: "2024-02-20",
      endDate: "2024-12-20",
      status: "active",
      autoRenew: false,
      paymentMethod: "Gratuit",
    },
    {
      id: "3",
      userId: "3",
      userName: "Ibrahima Sow",
      userEmail: "ibrahima.sow@email.com",
      planId: "premium",
      startDate: "2024-03-10",
      endDate: "2024-06-10",
      status: "expired",
      autoRenew: false,
      paymentMethod: "MTN Mobile Money",
    },
    {
      id: "4",
      userId: "4",
      userName: "Aissatou Barry",
      userEmail: "aissatou.barry@email.com",
      planId: "premium",
      startDate: "2024-04-05",
      endDate: "2025-04-05",
      status: "active",
      autoRenew: true,
      paymentMethod: "Wave",
    },
  ])

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.planId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPlanInfo = (planId: string) => {
    return subscriptionPlans.find((plan) => plan.id === planId) || subscriptionPlans[0]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.success
      case "expired":
        return colors.error
      case "cancelled":
        return colors.warning
      default:
        return colors.textSecondary
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "expired":
        return "Expiré"
      case "cancelled":
        return "Annulé"
      default:
        return status
    }
  }

  // Statistiques des plans
  const planStats = subscriptionPlans.map((plan) => {
    const planSubscriptions = subscriptions.filter((sub) => sub.planId === plan.id)
    const activeSubscriptions = planSubscriptions.filter((sub) => sub.status === "active")
    const revenue = activeSubscriptions.length * Number(plan.price)

    return {
      ...plan,
      totalSubscriptions: planSubscriptions.length,
      activeSubscriptions: activeSubscriptions.length,
      monthlyRevenue: revenue,
    }
  })

  const totalRevenue = planStats.reduce((sum, plan) => sum + plan.monthlyRevenue, 0)
  const totalActiveSubscriptions = planStats.reduce((sum, plan) => sum + plan.activeSubscriptions, 0)

  return (
    <motion.div 
      className="space-y-6 p-6" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      style={{ backgroundColor: colors.background }}
    >
      {/* Statistiques générales */}
      <motion.div className="grid gap-4 md:grid-cols-4" variants={containerVariants}>
        {[
          {
            title: "Revenus Mensuels",
            value: `${totalRevenue.toLocaleString('fr-FR')} GNF`,
            icon: DollarSign,
            color: colors.primary,
          },
          {
            title: "Abonnements Actifs",
            value: totalActiveSubscriptions,
            icon: Users,
            color: colors.success,
          },
          {
            title: "Taux de Conversion",
            value: `${((totalActiveSubscriptions / subscriptions.length) * 100).toFixed(1)}%`,
            icon: TrendingUp,
            color: colors.info,
          },
          {
            title: "Plans Disponibles",
            value: subscriptionPlans.length,
            icon: Crown,
            color: colors.accent,
          },
        ].map((stat, index) => (
          <motion.div key={index} variants={statsCardVariants} whileHover={{ scale: 1.05, y: -5 }}>
            <Card 
              className="transition-colors duration-300 cursor-pointer"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                      {stat.title}
                    </p>
                    <motion.p
                      className="text-2xl font-bold"
                      style={{ color: colors.textPrimary }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Plans disponibles */}
      <motion.div variants={cardVariants} whileHover={{ scale: 1.01 }}>
        <Card 
          className="transition-colors duration-300"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CardTitle style={{ color: colors.textPrimary }}>Plans d'Abonnement</CardTitle>
                <CardDescription style={{ color: colors.textSecondary }}>
                  Gestion des plans et de leurs fonctionnalités
                </CardDescription>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setShowStatsModal(true)}
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                  }}
                  className="hover:opacity-90 transition-all duration-300"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Voir les statistiques
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div className="grid gap-4 md:grid-cols-2" variants={containerVariants}>
              {subscriptionPlans.map((plan, index) => {
                const stats = planStats.find((s) => s.id === plan.id)
                return (
                  <motion.div
                    key={plan.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      className="border-2 cursor-pointer transition-colors duration-300"
                      style={{ 
                        borderColor: plan.color,
                        backgroundColor: colors.surface,
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg" style={{ color: plan.color }}>
                            {plan.name}
                          </CardTitle>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Badge
                              variant="outline"
                              style={{
                                borderColor: plan.color,
                                color: plan.color,
                                backgroundColor: `${plan.color}20`,
                              }}
                            >
                              {stats?.activeSubscriptions} actifs
                            </Badge>
                          </motion.div>
                        </div>
                        <div className="flex items-baseline space-x-1">
                          <motion.span
                            className="text-3xl font-bold"
                            style={{ color: colors.textPrimary }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            {plan.price === "0" ? "Gratuit" : `${Number(plan.price).toLocaleString('fr-FR')} ${plan.currency}`}
                          </motion.span>
                          <span className="text-sm" style={{ color: colors.textSecondary }}>
                            {plan.price !== "0" && `/${plan.period}`}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                          {plan.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span style={{ color: colors.textSecondary }}>Revenus mensuels:</span>
                            <span className="font-medium" style={{ color: colors.textPrimary }}>
                              {stats?.monthlyRevenue.toLocaleString('fr-FR')} GNF
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span style={{ color: colors.textSecondary }}>Total abonnements:</span>
                            <span className="font-medium" style={{ color: colors.textPrimary }}>
                              {stats?.totalSubscriptions}
                            </span>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className="w-full mt-4 transition-all duration-300"
                            onClick={() => setSelectedPlan(plan)}
                            style={{
                              borderColor: plan.color,
                              color: plan.color,
                            }}
                          >
                            Voir les détails
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Abonnements des utilisateurs */}
      <motion.div variants={cardVariants} whileHover={{ scale: 1.01 }}>
        <Card 
          className="transition-colors duration-300"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <CardHeader>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <CardTitle style={{ color: colors.textPrimary }}>Abonnements des Utilisateurs</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>
                Liste des abonnements actifs et historique
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4" style={{ color: colors.textSecondary }} />
                <Input
                  placeholder="Rechercher par nom, email ou plan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 transition-all duration-300 focus:scale-105"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="rounded-md border transition-colors duration-300"
              style={{ borderColor: colors.border }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: colors.surfaceVariant }}>
                    <TableHead style={{ color: colors.textPrimary }}>Utilisateur</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Plan</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Période</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Statut</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Renouvellement</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Paiement</TableHead>
                    <TableHead className="w-[70px]" style={{ color: colors.textPrimary }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredSubscriptions.map((subscription, index) => {
                      const plan = getPlanInfo(subscription.planId)
                      return (
                        <motion.tr
                          key={subscription.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: `${colors.surfaceVariant}50` }}
                          className="transition-colors duration-200"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium" style={{ color: colors.textPrimary }}>
                                {subscription.userName}
                              </div>
                              <div className="text-sm" style={{ color: colors.textSecondary }}>
                                {subscription.userEmail}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                style={{
                                  borderColor: plan.color,
                                  color: plan.color,
                                  backgroundColor: `${plan.color}20`,
                                }}
                              >
                                {plan.name}
                              </Badge>
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm" style={{ color: colors.textSecondary }}>
                              <div>Du {new Date(subscription.startDate).toLocaleDateString("fr-FR")}</div>
                              <div>Au {new Date(subscription.endDate).toLocaleDateString("fr-FR")}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="outline"
                                style={{
                                  borderColor: getStatusColor(subscription.status),
                                  color: getStatusColor(subscription.status),
                                  backgroundColor: `${getStatusColor(subscription.status)}20`,
                                }}
                              >
                                {getStatusText(subscription.status)}
                              </Badge>
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={subscription.autoRenew ? "default" : "secondary"}
                              style={{
                                backgroundColor: subscription.autoRenew ? colors.success + "20" : colors.surfaceVariant,
                                color: subscription.autoRenew ? colors.success : colors.textSecondary,
                              }}
                            >
                              {subscription.autoRenew ? "Auto" : "Manuel"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm" style={{ color: colors.textSecondary }}>
                            {subscription.paymentMethod}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0"
                                    style={{ color: colors.textSecondary }}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent 
                                align="end"
                                style={{
                                  backgroundColor: colors.surface,
                                  borderColor: colors.border,
                                }}
                              >
                                <DropdownMenuItem style={{ color: colors.textPrimary }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir détails
                                </DropdownMenuItem>
                                <DropdownMenuItem style={{ color: colors.textPrimary }}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Modifier
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {selectedPlan && <PlanDetailModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
        {showStatsModal && <PlanStatsModal planStats={planStats} onClose={() => setShowStatsModal(false)} />}
      </AnimatePresence>
    </motion.div>
  )
}
