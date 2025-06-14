"use client"

import { getThemeColors } from "@/components/app-colors"
import { useTheme } from "@/components/theme/theme-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/lib/firebase"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { Car, Coffee, Eye, MapPin, MoreHorizontal, Plus, Search, Star, Trash2, Wifi } from "lucide-react"
import { useEffect, useState } from "react"
import { AccommodationDetailModal } from "./detail-modals/accommodation-detail-modal"

interface Accommodation {
  id: string
  name: string
  type: string
  location: string
  address: string
  rating: number
  pricePerNight: number
  capacity: number
  amenities: string[]
  description: string
  images: string[]
  availability: boolean
  owner: string
  contact: string
  createdDate: string
  siteId: string
  contactInfo: {
    phone: string
    email: string
    website?: string
    whatsapp?: string
    facebook?: string
    instagram?: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: string
  languages: string[]
}

export function AccommodationManagement() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null)
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)

  const [newAccommodation, setNewAccommodation] = useState({
    name: "",
    type: "",
    location: "",
    address: "",
    pricePerNight: 0,
    capacity: 1,
    amenities: [] as string[],
    description: "",
    owner: "",
    contact: "",
    siteId: "",
    contactInfo: {
      phone: "",
      email: "",
      website: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
    },
    coordinates: {
      lat: 0,
      lng: 0,
    },
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "",
    languages: [] as string[],
  })

  const accommodationTypes = ["Hôtel", "Auberge", "Résidence", "Chambre d'hôtes", "Villa", "Studio", "Camping"]
  const amenityOptions = [
    "WiFi",
    "Parking",
    "Petit-déjeuner",
    "Climatisation",
    "Cuisine équipée",
    "Terrasse",
    "Jardin",
    "Piscine",
    "Spa",
    "Restaurant",
    "Plage privée",
    "Vue montagne",
    "Cuisine partagée",
  ]

  useEffect(() => {
    loadAccommodations()
  }, [])

  const loadAccommodations = async () => {
    try {
      const accommodationsCollection = collection(db, "accommodations")
      const accommodationsSnapshot = await getDocs(accommodationsCollection)
      const accommodationsList = accommodationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Accommodation[]
      setAccommodations(accommodationsList)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les logements",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredAccommodations = accommodations.filter(
    (accommodation) =>
      accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accommodation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accommodation.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAccommodation = async () => {
    if (newAccommodation.name && newAccommodation.type && newAccommodation.location) {
      try {
        const accommodationData = {
          ...newAccommodation,
          rating: 0,
          images: ["/placeholder.svg?height=200&width=300"],
          availability: true,
          createdDate: new Date().toISOString().split("T")[0],
        }

        const docRef = await addDoc(collection(db, "accommodations"), accommodationData)
        const newAccommodationWithId = { ...accommodationData, id: docRef.id }
        
        setAccommodations([...accommodations, newAccommodationWithId])
        setNewAccommodation({
          name: "",
          type: "",
          location: "",
          address: "",
          pricePerNight: 0,
          capacity: 1,
          amenities: [],
          description: "",
          owner: "",
          contact: "",
          siteId: "",
          contactInfo: {
            phone: "",
            email: "",
            website: "",
            whatsapp: "",
            facebook: "",
            instagram: "",
          },
          coordinates: {
            lat: 0,
            lng: 0,
          },
          checkInTime: "15:00",
          checkOutTime: "11:00",
          cancellationPolicy: "",
          languages: [],
        })
        setIsAddDialogOpen(false)
        
        toast({
          title: "Succès",
          description: "Le logement a été ajouté avec succès",
        })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter le logement",
          variant: "destructive",
        })
      }
    }
  }

  const deleteAccommodation = async (accommodationId: string) => {
    try {
      await deleteDoc(doc(db, "accommodations", accommodationId))
      setAccommodations(accommodations.filter((accommodation) => accommodation.id !== accommodationId))
      toast({
        title: "Succès",
        description: "Le logement a été supprimé avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le logement",
        variant: "destructive",
      })
    }
  }

  const toggleAvailability = async (accommodationId: string) => {
    try {
      const accommodation = accommodations.find((a) => a.id === accommodationId)
      if (accommodation) {
        await updateDoc(doc(db, "accommodations", accommodationId), {
          availability: !accommodation.availability,
        })
        setAccommodations(
          accommodations.map((a) =>
            a.id === accommodationId ? { ...a, availability: !a.availability } : a
          )
        )
        toast({
          title: "Succès",
          description: `Le logement est maintenant ${!accommodation.availability ? "disponible" : "indisponible"}`,
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la disponibilité",
        variant: "destructive",
      })
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-3 w-3" />
      case "Parking":
        return <Car className="h-3 w-3" />
      case "Petit-déjeuner":
        return <Coffee className="h-3 w-3" />
      default:
        return null
    }
  }

  const getSiteName = (siteId: string) => {
    const sites = [
      { id: "1", name: "Chutes de Kinkon" },
      { id: "6", name: "Fouta Djallon" },
      { id: "11", name: "Îles de Loos" },
      { id: "18", name: "Mont Nimba" },
      { id: "19", name: "Forêt de Ziama" },
      { id: "13", name: "Musée National" },
      { id: "25", name: "Chutes de Tinkisso" },
      { id: "7", name: "Chutes de la Soumba" },
    ]
    const site = sites.find((s) => s.id === siteId)
    return site?.name || "Site non trouvé"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card 
        className="border transition-colors duration-300" 
        style={{ 
          backgroundColor: colors.surface,
          borderColor: colors.border 
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ color: colors.textPrimary }}>Gestion des Logements</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>
                Gestion des hébergements près des sites touristiques guinéens
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  style={{
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    color: "white",
                  }}
                  className="hover:opacity-90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un Logement
                </Button>
              </DialogTrigger>
              <DialogContent 
                className="sm:max-w-[600px]"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <DialogHeader>
                  <DialogTitle>Ajouter un Nouveau Logement</DialogTitle>
                  <DialogDescription>Remplissez les informations du nouveau logement.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nom du logement</Label>
                      <Input
                        id="name"
                        value={newAccommodation.name}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
                        placeholder="Nom du logement"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newAccommodation.type}
                        onValueChange={(value) => setNewAccommodation({ ...newAccommodation, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type de logement" />
                        </SelectTrigger>
                        <SelectContent>
                          {accommodationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="site">Site touristique associé</Label>
                    <Select
                      value={newAccommodation.siteId}
                      onValueChange={(value) => setNewAccommodation({ ...newAccommodation, siteId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un site" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Chutes de Kinkon</SelectItem>
                        <SelectItem value="6">Fouta Djallon</SelectItem>
                        <SelectItem value="11">Îles de Loos</SelectItem>
                        <SelectItem value="18">Mont Nimba</SelectItem>
                        <SelectItem value="19">Forêt de Ziama</SelectItem>
                        <SelectItem value="13">Musée National</SelectItem>
                        <SelectItem value="25">Chutes de Tinkisso</SelectItem>
                        <SelectItem value="7">Chutes de la Soumba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={newAccommodation.location}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, location: e.target.value })}
                        placeholder="Ville, Région"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="capacity">Capacité</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={newAccommodation.capacity}
                        onChange={(e) =>
                          setNewAccommodation({ ...newAccommodation, capacity: Number.parseInt(e.target.value) || 1 })
                        }
                        placeholder="Nombre de personnes"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Adresse complète</Label>
                    <Input
                      id="address"
                      value={newAccommodation.address}
                      onChange={(e) => setNewAccommodation({ ...newAccommodation, address: e.target.value })}
                      placeholder="Adresse complète"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Prix par nuit (GNF)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newAccommodation.pricePerNight}
                        onChange={(e) =>
                          setNewAccommodation({
                            ...newAccommodation,
                            pricePerNight: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="Prix en francs guinéens"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="owner">Propriétaire</Label>
                      <Input
                        id="owner"
                        value={newAccommodation.owner}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, owner: e.target.value })}
                        placeholder="Nom du propriétaire"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      value={newAccommodation.contact}
                      onChange={(e) => setNewAccommodation({ ...newAccommodation, contact: e.target.value })}
                      placeholder="Email ou téléphone"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newAccommodation.description}
                      onChange={(e) => setNewAccommodation({ ...newAccommodation, description: e.target.value })}
                      placeholder="Description du logement"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={newAccommodation.contactInfo?.phone || ""}
                        onChange={(e) =>
                          setNewAccommodation({
                            ...newAccommodation,
                            contactInfo: { ...newAccommodation.contactInfo, phone: e.target.value },
                          })
                        }
                        placeholder="+224 6XX XX XX XX"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email de contact</Label>
                      <Input
                        id="email"
                        value={newAccommodation.contactInfo?.email || ""}
                        onChange={(e) =>
                          setNewAccommodation({
                            ...newAccommodation,
                            contactInfo: { ...newAccommodation.contactInfo, email: e.target.value },
                          })
                        }
                        placeholder="contact@logement.gn"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleAddAccommodation}
                    style={{
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                      color: "white",
                    }}
                    className="hover:opacity-90"
                  >
                    Ajouter le Logement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4" style={{ color: colors.textSecondary }} />
              <Input
                placeholder="Rechercher par nom, type ou localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
              />
            </div>
          </div>

          <div className="rounded-md border" style={{ borderColor: colors.border }}>
            <Table>
              <TableHeader>
                <TableRow style={{ backgroundColor: colors.background }}>
                  <TableHead style={{ color: colors.textPrimary }}>Logement</TableHead>
                  <TableHead style={{ color: colors.textPrimary }}>Type</TableHead>
                  <TableHead style={{ color: colors.textPrimary }}>Localisation</TableHead>
                  <TableHead style={{ color: colors.textPrimary }}>Site associé</TableHead>
                  <TableHead style={{ color: colors.textPrimary }}>Prix/Nuit</TableHead>
                  <TableHead style={{ color: colors.textPrimary }}>Capacité</TableHead>
                  <TableHead style={{ color: colors.textPrimary }}>Note</TableHead>
                  <TableHead style={{ color: colors.textPrimary }}>Disponibilité</TableHead>
                  <TableHead className="w-[70px]" style={{ color: colors.textPrimary }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccommodations.map((accommodation) => (
                  <TableRow 
                    key={accommodation.id}
                    style={{ 
                      backgroundColor: colors.surface,
                      borderColor: colors.border 
                    }}
                  >
                    <TableCell style={{ color: colors.textPrimary }}>
                      <div>
                        <div className="font-medium">{accommodation.name}</div>
                        <div className="text-sm flex items-center space-x-2" style={{ color: colors.textSecondary }}>
                          {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
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
                        {accommodation.type}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: colors.textPrimary }}>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" style={{ color: colors.textSecondary }} />
                        <span>{accommodation.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: colors.info,
                          color: colors.info,
                        }}
                      >
                        {getSiteName(accommodation.siteId)}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: colors.textPrimary }} className="font-medium">
                      {accommodation.pricePerNight} GNF
                    </TableCell>
                    <TableCell style={{ color: colors.textPrimary }}>
                      {accommodation.capacity} pers.
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span style={{ color: colors.textPrimary }}>{accommodation.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={accommodation.availability ? "default" : "secondary"}
                        style={{
                          backgroundColor: accommodation.availability ? colors.success : colors.error,
                          color: "white",
                        }}
                      >
                        {accommodation.availability ? "Disponible" : "Indisponible"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            style={{ color: colors.textPrimary }}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end"
                          style={{
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                          }}
                        >
                          <DropdownMenuItem 
                            onClick={() => setSelectedAccommodation(accommodation)}
                            style={{ color: colors.textPrimary }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => toggleAvailability(accommodation.id)}
                            style={{ color: colors.textPrimary }}
                          >
                            {accommodation.availability ? "Marquer indisponible" : "Marquer disponible"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteAccommodation(accommodation.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedAccommodation && (
        <AccommodationDetailModal
          accommodation={selectedAccommodation}
          onClose={() => setSelectedAccommodation(null)}
        />
      )}
    </div>
  )
}
