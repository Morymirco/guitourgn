"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Shield, Check, X } from "lucide-react"
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

interface UserPrivilegesModalProps {
  user: User
  onClose: () => void
  onUpdateRole: (userId: string, newRole: string) => void
}

export function UserPrivilegesModal({ user, onClose, onUpdateRole }: UserPrivilegesModalProps) {
  const [selectedRole, setSelectedRole] = useState(user.role)

  const handleSaveChanges = () => {
    onUpdateRole(user.id, selectedRole)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Shield className="h-5 w-5" style={{ color: AppColors.primaryGold }} />
            <div>
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                Privilèges de {user.name}
              </div>
              <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                Gérer les rôles et privilèges de l'utilisateur
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sélection du rôle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Rôle de l'utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="space-y-4">
                {userRoles.map((role) => (
                  <div key={role.id} className="flex items-start space-x-3 p-3 rounded-md border">
                    <RadioGroupItem value={role.id} id={`role-${role.id}`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor={`role-${role.id}`}
                          className="text-base font-medium"
                          style={{ color: AppColors.textPrimary }}
                        >
                          {role.name}
                        </Label>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: role.color,
                            color: role.color,
                          }}
                        >
                          {role.id}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1" style={{ color: AppColors.textSecondary }}>
                        {role.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Aperçu des privilèges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: AppColors.textPrimary }}>
                Privilèges associés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "manage_users",
                  "manage_sites",
                  "manage_guides",
                  "manage_accommodations",
                  "manage_regions",
                  "view_analytics",
                  "view_sites",
                  "view_accommodations",
                ].map((privilege) => {
                  const currentRole = userRoles.find((role) => role.id === selectedRole)
                  const hasPrivilege = currentRole?.privileges.includes(privilege)

                  return (
                    <div
                      key={privilege}
                      className="flex items-center justify-between p-2 rounded-md"
                      style={{ backgroundColor: hasPrivilege ? "rgba(76, 175, 80, 0.1)" : "rgba(229, 57, 53, 0.1)" }}
                    >
                      <span className="text-sm">
                        {privilege
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </span>
                      {hasPrivilege ? (
                        <Check className="h-4 w-4" style={{ color: AppColors.success }} />
                      ) : (
                        <X className="h-4 w-4" style={{ color: AppColors.error }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleSaveChanges}
            style={{
              backgroundColor: AppColors.primaryGold,
              borderColor: AppColors.primaryGold,
              color: "white",
            }}
            className="hover:opacity-90"
          >
            Enregistrer les modifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
