"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Percent } from "lucide-react"
import { AppColors } from "../app-colors"

interface PlanStats {
  id: string
  name: string
  price: number
  currency: string
  color: string
  totalSubscriptions: number
  activeSubscriptions: number
  monthlyRevenue: number
}

interface PlanStatsModalProps {
  planStats: PlanStats[]
  onClose: () => void
}

export function PlanStatsModal({ planStats, onClose }: PlanStatsModalProps) {
  const totalRevenue = planStats.reduce((sum, plan) => sum + plan.monthlyRevenue, 0)
  const totalSubscriptions = planStats.reduce((sum, plan) => sum + plan.totalSubscriptions, 0)
  const totalActive = planStats.reduce((sum, plan) => sum + plan.activeSubscriptions, 0)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6" style={{ color: AppColors.primaryGold }} />
            <div>
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                Statistiques des Plans
              </div>
              <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                Analyse détaillée des performances des abonnements
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Résumé global */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6" style={{ color: AppColors.primaryGold }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {totalRevenue.toFixed(2)}€
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Revenus totaux
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6" style={{ color: AppColors.primaryGreen }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {totalSubscriptions}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Total abonnements
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6" style={{ color: AppColors.info }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {totalActive}
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Abonnements actifs
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Percent className="h-6 w-6" style={{ color: AppColors.warning }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                  {((totalActive / totalSubscriptions) * 100).toFixed(1)}%
                </div>
                <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                  Taux d'activation
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détails par plan */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: AppColors.textPrimary }}>Performance par Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planStats.map((plan) => {
                  const conversionRate =
                    plan.totalSubscriptions > 0 ? (plan.activeSubscriptions / plan.totalSubscriptions) * 100 : 0
                  const revenueShare = totalRevenue > 0 ? (plan.monthlyRevenue / totalRevenue) * 100 : 0

                  return (
                    <div key={plan.id} className="border rounded-lg p-4" style={{ borderColor: plan.color }}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium" style={{ color: plan.color }}>
                          {plan.name}
                        </h3>
                        <div className="text-right">
                          <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                            {plan.monthlyRevenue.toFixed(2)}€
                          </div>
                          <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                            {revenueShare.toFixed(1)}% du total
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: AppColors.textPrimary }}>
                            {plan.totalSubscriptions}
                          </div>
                          <div className="text-xs" style={{ color: AppColors.textSecondary }}>
                            Total abonnements
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: AppColors.success }}>
                            {plan.activeSubscriptions}
                          </div>
                          <div className="text-xs" style={{ color: AppColors.textSecondary }}>
                            Actifs
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: AppColors.info }}>
                            {conversionRate.toFixed(1)}%
                          </div>
                          <div className="text-xs" style={{ color: AppColors.textSecondary }}>
                            Taux de conversion
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: plan.color }}>
                            {plan.price}€
                          </div>
                          <div className="text-xs" style={{ color: AppColors.textSecondary }}>
                            Prix mensuel
                          </div>
                        </div>
                      </div>

                      {/* Barre de progression pour la part de revenus */}
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span style={{ color: AppColors.textSecondary }}>Part des revenus</span>
                          <span style={{ color: AppColors.textPrimary }}>{revenueShare.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${revenueShare}%`,
                              backgroundColor: plan.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: AppColors.textPrimary }}>Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {planStats.map((plan) => {
                  const conversionRate =
                    plan.totalSubscriptions > 0 ? (plan.activeSubscriptions / plan.totalSubscriptions) * 100 : 0

                  if (conversionRate < 50 && plan.totalSubscriptions > 0) {
                    return (
                      <div
                        key={plan.id}
                        className="p-3 rounded-md"
                        style={{ backgroundColor: `${AppColors.warning}20` }}
                      >
                        <div className="font-medium" style={{ color: AppColors.warning }}>
                          {plan.name} - Taux de conversion faible
                        </div>
                        <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                          Considérez réviser les fonctionnalités ou le prix de ce plan.
                        </div>
                      </div>
                    )
                  }

                  if (plan.monthlyRevenue === 0 && plan.id !== "basic") {
                    return (
                      <div key={plan.id} className="p-3 rounded-md" style={{ backgroundColor: `${AppColors.error}20` }}>
                        <div className="font-medium" style={{ color: AppColors.error }}>
                          {plan.name} - Aucun revenu
                        </div>
                        <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                          Ce plan ne génère aucun revenu actuellement.
                        </div>
                      </div>
                    )
                  }

                  return null
                })}

                {planStats.every((plan) => {
                  const conversionRate =
                    plan.totalSubscriptions > 0 ? (plan.activeSubscriptions / plan.totalSubscriptions) * 100 : 0
                  return conversionRate >= 50 || plan.monthlyRevenue > 0 || plan.id === "basic"
                }) && (
                  <div className="p-3 rounded-md" style={{ backgroundColor: `${AppColors.success}20` }}>
                    <div className="font-medium" style={{ color: AppColors.success }}>
                      Excellente performance !
                    </div>
                    <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                      Tous vos plans fonctionnent bien. Continuez sur cette lancée !
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
