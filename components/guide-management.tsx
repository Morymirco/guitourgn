"use client"

import { getThemeColors } from "@/components/app-colors"
import { useTheme } from "@/components/theme/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/lib/firebase"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { Eye, Mail, MoreHorizontal, Phone, Plus, Search, Star, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { GuideDetailModal } from "./detail-modals/guide-detail-modal"

interface Guide {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  experience: number
  rating: number
  reviews: number
  price: number
  languages: string[]
  services: string[]
  description: string
  avatar: string
  status: "active" | "inactive"
  certifications: string[]
  availability: string
}

const specialtyOptions = ["Fouta Djallon", "Conakry & Îles de Loos", "Guinée Forestière", "Haute Guinée", "Multi-régions", "Écotourisme"]
const languageOptions = ["Français", "Anglais", "Espagnol", "Italien", "Peul", "Soussou", "Malinké", "Kissi"]
const serviceOptions = ["Randonnées", "Visites culturelles", "Photographie", "Transport", "Visites urbaines", "Excursions îles", "Gastronomie", "Shopping", "Safari", "Observation faune", "Botanique", "Camping", "Artisanat", "Marchés locaux", "Cérémonies", "Musique", "Circuits complets", "Logistique", "Interprétation", "Urgences", "Écotourisme", "Conservation", "Éducation", "Recherche"]

export function GuideManagement() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)

  const [newGuide, setNewGuide] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: 0,
    languages: [] as string[],
    services: [] as string[],
    description: "",
    price: 0,
    certifications: [] as string[],
    availability: "",
  })

  useEffect(() => {
    loadGuides()
  }, [])

  const loadGuides = async () => {
    try {
      const guidesCollection = collection(db, "guides")
      const guidesSnapshot = await getDocs(guidesCollection)
      const guidesList = guidesSnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          specialty: data.specialty || "",
          experience: data.experience || 0,
          rating: data.rating || 0,
          reviews: data.reviews || 0,
          price: data.price || 0,
          languages: data.languages || [],
          services: data.services || [],
          description: data.description || "",
          avatar: data.avatar || "/placeholder.svg",
          status: data.status || "active",
          certifications: data.certifications || [],
          availability: data.availability || "Disponible",
        }
      })
      setGuides(guidesList)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les guides",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddGuide = async () => {
    try {
      const guideData = {
        ...newGuide,
        rating: 0,
        reviews: 0,
        avatar: "/placeholder.svg",
        status: "active",
      }

      const docRef = await addDoc(collection(db, "guides"), guideData)
      toast({
        title: "Succès",
        description: "Le guide a été ajouté avec succès",
      })
      setIsAddDialogOpen(false)
      setNewGuide({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        experience: 0,
        languages: [],
        services: [],
        description: "",
        price: 0,
        certifications: [],
        availability: "",
      })
      loadGuides()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le guide",
        variant: "destructive",
      })
    }
  }

  const deleteGuide = async (guideId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce guide ?")) {
      try {
        await deleteDoc(doc(db, "guides", guideId))
        toast({
          title: "Succès",
          description: "Le guide a été supprimé avec succès",
        })
        loadGuides()
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le guide",
          variant: "destructive",
        })
      }
    }
  }

  const toggleGuideStatus = async (guideId: string) => {
    try {
      const guide = guides.find(g => g.id === guideId)
      if (guide) {
        await updateDoc(doc(db, "guides", guideId), {
          status: guide.status === "active" ? "inactive" : "active"
        })
        toast({
          title: "Succès",
          description: `Le guide a été ${guide.status === "active" ? "désactivé" : "activé"} avec succès`,
        })
        loadGuides()
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut du guide",
        variant: "destructive",
      })
    }
  }

  const filteredGuides = guides.filter(
    (guide) =>
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  return (
    <motion.div
      className="p-6"
      style={{ backgroundColor: colors.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card
          className="transition-colors duration-300"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ color: colors.textPrimary }}>Gestion des Guides</CardTitle>
                <CardDescription style={{ color: colors.textSecondary }}>
                  Gestion des guides touristiques et de leurs spécialités
                </CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Ajouter un Nouveau Guide</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          value={newGuide.name}
                          onChange={(e) => setNewGuide({ ...newGuide, name: e.target.value })}
                          placeholder="Nom du guide"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Spécialité</Label>
                        <select
                          id="specialty"
                          value={newGuide.specialty}
                          onChange={(e) => setNewGuide({ ...newGuide, specialty: e.target.value })}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Sélectionner une spécialité</option>
                          {specialtyOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newGuide.email}
                          onChange={(e) => setNewGuide({ ...newGuide, email: e.target.value })}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={newGuide.phone}
                          onChange={(e) => setNewGuide({ ...newGuide, phone: e.target.value })}
                          placeholder="+224 6XX XXX XXX"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Expérience (années)</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={newGuide.experience}
                          onChange={(e) => setNewGuide({ ...newGuide, experience: Number(e.target.value) })}
                          placeholder="Années d'expérience"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Prix journalier (GNF)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newGuide.price}
                          onChange={(e) => setNewGuide({ ...newGuide, price: Number(e.target.value) })}
                          placeholder="Prix par jour"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="languages">Langues</Label>
                      <select
                        id="languages"
                        multiple
                        value={newGuide.languages}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, option => option.value)
                          setNewGuide({ ...newGuide, languages: selected })
                        }}
                        className="w-full p-2 border rounded-md"
                      >
                        {languageOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="services">Services</Label>
                      <select
                        id="services"
                        multiple
                        value={newGuide.services}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, option => option.value)
                          setNewGuide({ ...newGuide, services: selected })
                        }}
                        className="w-full p-2 border rounded-md"
                      >
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newGuide.description}
                        onChange={(e) => setNewGuide({ ...newGuide, description: e.target.value })}
                        placeholder="Description du guide et de ses compétences"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Disponibilité</Label>
                      <Input
                        id="availability"
                        value={newGuide.availability}
                        onChange={(e) => setNewGuide({ ...newGuide, availability: e.target.value })}
                        placeholder="ex: Disponible toute l'année"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddGuide}>
                      Ajouter le Guide
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, email ou spécialité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border transition-all duration-300 focus:scale-105"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.textPrimary,
                  }}
                />
              </div>
            </div>

            <div className="rounded-md border transition-colors duration-300" style={{ borderColor: colors.border }}>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: colors.border }}>
                    <TableHead style={{ color: colors.textPrimary }}>Guide</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Contact</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Spécialité</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Expérience</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Note</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Statut</TableHead>
                    <TableHead className="w-[70px]" style={{ color: colors.textPrimary }}>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredGuides.map((guide, index) => (
                      <motion.tr
                        key={guide.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: `${colors.surface}50` }}
                        className="transition-colors duration-200"
                        style={{ borderColor: colors.border }}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={guide.avatar} alt={guide.name} />
                              <AvatarFallback>
                                {guide.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium" style={{ color: colors.textPrimary }}>
                                {guide.name}
                              </div>
                              <div className="text-sm" style={{ color: colors.textSecondary }}>
                                {guide.reviews} avis
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span className="text-sm" style={{ color: colors.textSecondary }}>
                                {guide.email}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span className="text-sm" style={{ color: colors.textSecondary }}>
                                {guide.phone}
                              </span>
                            </div>
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
                            {guide.specialty}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ color: colors.textSecondary }}>
                          {guide.experience} ans
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span style={{ color: colors.textPrimary }}>{guide.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={guide.status === "active" ? "default" : "secondary"}
                            style={{
                              backgroundColor: guide.status === "active" ? colors.success : colors.textSecondary,
                              color: "white",
                            }}
                          >
                            {guide.status === "active" ? "Actif" : "Inactif"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedGuide(guide)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir détails
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleGuideStatus(guide.id)}>
                                {guide.status === "active" ? "Désactiver" : "Activer"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteGuide(guide.id)} className="text-red-600">
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
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {selectedGuide && <GuideDetailModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />}
    </motion.div>
  )
}
