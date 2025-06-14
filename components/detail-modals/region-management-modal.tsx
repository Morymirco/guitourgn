"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Map, Plus, Edit, Trash2 } from "lucide-react"
import { AppColors, regions } from "../app-colors"

interface RegionManagementModalProps {
  onClose: () => void
}

interface Region {
  id: string
  name: string
  color: string
  description: string
}

export function RegionManagementModal({ onClose }: RegionManagementModalProps) {
  const [regionsList, setRegionsList] = useState<Region[]>(regions)
  const [editingRegion, setEditingRegion] = useState<Region | null>(null)
  const [newRegion, setNewRegion] = useState({
    id: "",
    name: "",
    color: "#6B7280",
    description: "",
  })

  const handleAddRegion = () => {
    if (newRegion.id && newRegion.name) {
      setRegionsList([...regionsList, { ...newRegion }])
      setNewRegion({
        id: "",
        name: "",
        color: "#6B7280",
        description: "",
      })
    }
  }

  const handleEditRegion = (region: Region) => {
    setEditingRegion(region)
    setNewRegion({ ...region })
  }

  const handleUpdateRegion = () => {
    if (editingRegion && newRegion.id && newRegion.name) {
      setRegionsList(regionsList.map((r) => (r.id === editingRegion.id ? { ...newRegion } : r)))
      setEditingRegion(null)
      setNewRegion({
        id: "",
        name: "",
        color: "#6B7280",
        description: "",
      })
    }
  }

  const handleDeleteRegion = (regionId: string) => {
    setRegionsList(regionsList.filter((r) => r.id !== regionId))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Map className="h-5 w-5" style={{ color: AppColors.primaryGold }} />
            <div>
              <div className="text-xl font-bold" style={{ color: AppColors.textPrimary }}>
                Gestion des Régions
              </div>
              <div className="text-sm" style={{ color: AppColors.textSecondary }}>
                Gérer les régions pour la classification des sites touristiques
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Formulaire d'ajout/édition */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region-id">Identifiant de la région</Label>
                  <Input
                    id="region-id"
                    value={newRegion.id}
                    onChange={(e) =>
                      setNewRegion({ ...newRegion, id: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                    }
                    placeholder="haute-guinee"
                    disabled={!!editingRegion}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region-name">Nom de la région</Label>
                  <Input
                    id="region-name"
                    value={newRegion.name}
                    onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
                    placeholder="Haute Guinée"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region-color">Couleur</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="region-color"
                      type="color"
                      value={newRegion.color}
                      onChange={(e) => setNewRegion({ ...newRegion, color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={newRegion.color}
                      onChange={(e) => setNewRegion({ ...newRegion, color: e.target.value })}
                      placeholder="#FF0000"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region-description">Description</Label>
                  <Textarea
                    id="region-description"
                    value={newRegion.description}
                    onChange={(e) => setNewRegion({ ...newRegion, description: e.target.value })}
                    placeholder="Description de la région"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                {editingRegion ? (
                  <>
                    <Button variant="outline" onClick={() => setEditingRegion(null)}>
                      Annuler
                    </Button>
                    <Button
                      onClick={handleUpdateRegion}
                      style={{
                        backgroundColor: AppColors.primaryGreen,
                        color: "white",
                      }}
                    >
                      Mettre à jour
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleAddRegion}
                    style={{
                      backgroundColor: AppColors.primaryGold,
                      color: "white",
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une région
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Liste des régions */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium" style={{ color: AppColors.textPrimary }}>
              Régions existantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {regionsList.map((region) => (
                <Card key={region.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: region.color }}
                        title={region.color}
                      />
                      <div>
                        <div className="font-medium">{region.name}</div>
                        <div className="text-xs text-muted-foreground">{region.id}</div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEditRegion(region)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteRegion(region.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
