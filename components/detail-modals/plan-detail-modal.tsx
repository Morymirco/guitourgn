"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Crown, Star } from "lucide-react"
import { AppColors } from "../app-colors"

interface Plan {
  id: string
  name: string
  price: number
  currency: string
  period: string
  color: string
  description: string
  features: string[]
  limitations: string[]
}

interface PlanDetailModalProps {
  plan: Plan
  onClose: () => void
}

export function PlanDetailModal({ plan, onClose }: PlanDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Crown className="h-6 w-6" style={{ color: plan.color }} />
            <div>
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                {plan.name}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-2xl font-bold" style={{ color: plan.color }}>
                  {plan.price}
                  {plan.currency}
                </span>
                <span className="text-sm" style={{ color: AppColors.textSecondary }}>
                  /{plan.period}
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <p style={{ color: AppColors.textSecondary }}>{plan.description}</p>
            </CardContent>
          </Card>

          {/* Fonctionnalités incluses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Star className="h-5 w-5" style={{ color: AppColors.success }} />
                <span style={{ color: AppColors.textPrimary }}>Fonctionnalités Incluses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-4 w-4 flex-shrink-0" style={{ color: AppColors.success }} />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Limitations (si il y en a) */}
          {plan.limitations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <X className="h-5 w-5" style={{ color: AppColors.error }} />
                  <span style={{ color: AppColors.textPrimary }}>Limitations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <X className="h-4 w-4 flex-shrink-0" style={{ color: AppColors.error }} />
                    <span style={{ color: AppColors.textSecondary }}>{limitation}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Informations supplémentaires */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Informations Supplémentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium" style={{ color: AppColors.textSecondary }}>
                    Type de facturation:
                  </span>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: plan.color,
                        color: plan.color,
                      }}
                    >
                      {plan.price === 0 ? "Gratuit" : "Mensuel"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium" style={{ color: AppColors.textSecondary }}>
                    Annulation:
                  </span>
                  <div className="mt-1">
                    <Badge variant="outline" style={{ borderColor: AppColors.success, color: AppColors.success }}>
                      À tout moment
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium" style={{ color: AppColors.textSecondary }}>
                  Support inclus:
                </span>
                <div className="mt-1">
                  {plan.id === "basic" && <Badge variant="outline">Support par email (48h)</Badge>}
                  {plan.id === "premium" && (
                    <Badge
                      variant="outline"
                      style={{ borderColor: AppColors.primaryGold, color: AppColors.primaryGold }}
                    >
                      Support prioritaire 24/7
                    </Badge>
                  )}
                  {plan.id === "enterprise" && (
                    <Badge
                      variant="outline"
                      style={{ borderColor: AppColors.planEnterprise, color: AppColors.planEnterprise }}
                    >
                      Support dédié + Formation
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
