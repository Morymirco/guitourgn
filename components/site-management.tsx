"use client"

import { getThemeColors } from "@/components/app-colors"
import { useTheme } from "@/components/theme/theme-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Site, addSite, deleteSite, getSites, updateSite } from "@/lib/sites"
import { AnimatePresence, motion } from "framer-motion"
import { Clock, MapPin, MoreHorizontal, Pencil, Plus, Search, Star, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
}

export function SiteManagement() {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingSite, setEditingSite] = useState<Site | null>(null)
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const { toast } = useToast()

  const [formData, setFormData] = useState<Partial<Site>>({
    name: "",
    location: "",
    rating: 0,
    imageId: "",
    description: "",
    entryPrice: 0,
    recommendedDuration: 0,
    bestPeriod: "",
    difficultyLevel: 0,
    openingHours: "",
    contact: "",
    website: "",
    address: "",
    services: [],
  })

  useEffect(() => {
    loadSites()
  }, [])

  const loadSites = async () => {
    try {
      const sitesData = await getSites()
      setSites(sitesData)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les sites",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSite) {
        await updateSite(editingSite.id!, formData)
        toast({
          title: "Site mis à jour",
          description: "Le site a été mis à jour avec succès",
        })
      } else {
        await addSite(formData as Omit<Site, "createdAt" | "updatedAt">)
        toast({
          title: "Site ajouté",
          description: "Le site a été ajouté avec succès",
        })
      }
      setIsAddModalOpen(false)
      setEditingSite(null)
      setFormData({
        name: "",
        location: "",
        rating: 0,
        imageId: "",
        description: "",
        entryPrice: 0,
        recommendedDuration: 0,
        bestPeriod: "",
        difficultyLevel: 0,
        openingHours: "",
        contact: "",
        website: "",
        address: "",
        services: [],
      })
      loadSites()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (siteId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce site ?")) {
      try {
        await deleteSite(siteId)
        toast({
          title: "Site supprimé",
          description: "Le site a été supprimé avec succès",
        })
        loadSites()
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le site",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (site: Site) => {
    setEditingSite(site)
    setFormData(site)
    setIsAddModalOpen(true)
  }

  const filteredSites = sites.filter((site) =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  return (
    <motion.div
      className="p-6"
      style={{ backgroundColor: colors.background }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
              <CardTitle style={{ color: colors.textPrimary }}>Gestion des Sites Touristiques</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>
                Liste des sites touristiques avec leurs informations détaillées
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              className="flex items-center justify-between mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou localisation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 border transition-all duration-300 focus:scale-105"
                style={{
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un site
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingSite ? "Modifier le site" : "Ajouter un nouveau site"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                      <Label htmlFor="name">Nom du site</Label>
                      <Input
                        id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rating">Note (0-5)</Label>
                        <Input
                          id="rating"
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entryPrice">Prix d'entrée (GNF)</Label>
                        <Input
                          id="entryPrice"
                          type="number"
                          min="0"
                          value={formData.entryPrice}
                          onChange={(e) => setFormData({ ...formData, entryPrice: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recommendedDuration">Durée recommandée (heures)</Label>
                        <Input
                          id="recommendedDuration"
                          type="number"
                          min="0"
                          step="0.5"
                          value={formData.recommendedDuration}
                          onChange={(e) => setFormData({ ...formData, recommendedDuration: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bestPeriod">Meilleure période (mois)</Label>
                        <Input
                          id="bestPeriod"
                          type="text"
                          placeholder="ex: Novembre à Mars"
                          value={formData.bestPeriod}
                          onChange={(e) => setFormData({ ...formData, bestPeriod: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="difficultyLevel">Niveau de difficulté (1-5)</Label>
                        <Input
                          id="difficultyLevel"
                          type="number"
                          min="1"
                          max="5"
                          value={formData.difficultyLevel}
                          onChange={(e) => setFormData({ ...formData, difficultyLevel: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="openingHours">Horaires d'ouverture</Label>
                        <Input
                          id="openingHours"
                          type="text"
                          placeholder="ex: 8h-18h"
                          value={formData.openingHours}
                          onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact">Contact</Label>
                        <Input
                          id="contact"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Site web</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="services">Services (séparés par des virgules)</Label>
                        <Input
                          id="services"
                          value={formData.services?.join(", ")}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              services: e.target.value.split(",").map((s) => s.trim()),
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsAddModalOpen(false)
                          setEditingSite(null)
                        }}
                      >
                        Annuler
                      </Button>
                      <Button type="submit">
                        {editingSite ? "Mettre à jour" : "Ajouter"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                  <TableRow style={{ borderColor: colors.border }}>
                    <TableHead style={{ color: colors.textPrimary }}>Nom</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Localisation</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Note</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Prix</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Durée</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Difficulté</TableHead>
                    <TableHead className="w-[70px]" style={{ color: colors.textPrimary }}>
                      Actions
                    </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  <AnimatePresence>
                    {filteredSites.map((site, index) => (
                      <motion.tr
                        key={site.id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: `${colors.surface}50` }}
                        className="transition-colors duration-200"
                        style={{ borderColor: colors.border }}
                      >
                        <TableCell className="font-medium" style={{ color: colors.textPrimary }}>
                          {site.name}
                        </TableCell>
                        <TableCell style={{ color: colors.textSecondary }}>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{site.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        style={{
                              borderColor: colors.primary,
                              color: colors.primary,
                        }}
                      >
                            <Star className="h-4 w-4 mr-1" />
                            {site.rating}/5
                      </Badge>
                    </TableCell>
                        <TableCell style={{ color: colors.textSecondary }}>
                          {site.entryPrice.toLocaleString()} GNF
                        </TableCell>
                        <TableCell style={{ color: colors.textSecondary }}>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{site.recommendedDuration}h</span>
                          </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        style={{
                              borderColor: colors.secondary,
                              color: colors.secondary,
                        }}
                      >
                            Niveau {site.difficultyLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                              </motion.div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(site)}>
                                <Pencil className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(site.id!)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                      </motion.tr>
                ))}
                  </AnimatePresence>
              </TableBody>
            </Table>
            </motion.div>
                  </CardContent>
                </Card>
      </motion.div>
    </motion.div>
  )
}
