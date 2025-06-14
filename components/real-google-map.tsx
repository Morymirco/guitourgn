"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Layers, Loader2 } from "lucide-react"
import { regions } from "./app-colors"
import { useTheme } from "./theme/theme-provider"

// Données des sites touristiques guinéens
const touristSites = [
  {
    id: 1,
    name: "Chutes de Kinkon",
    region: "haute-guinee",
    lat: 10.7596,
    lng: -11.4346,
    category: "Nature",
    description: "Magnifiques chutes d'eau dans la région de Haute Guinée",
  },
  {
    id: 2,
    name: "Mont Nimba",
    region: "guinee-forestiere",
    lat: 7.6167,
    lng: -8.4167,
    category: "Montagne",
    description: "Réserve naturelle intégrale du mont Nimba",
  },
  {
    id: 3,
    name: "Îles de Loos",
    region: "basse-guinee",
    lat: 9.5167,
    lng: -13.8167,
    category: "Île",
    description: "Archipel pittoresque près de Conakry",
  },
  {
    id: 4,
    name: "Fouta Djallon",
    region: "moyenne-guinee",
    lat: 11.0,
    lng: -12.0,
    category: "Plateau",
    description: "Château d'eau de l'Afrique de l'Ouest",
  },
  {
    id: 5,
    name: "Parc National du Haut Niger",
    region: "haute-guinee",
    lat: 11.75,
    lng: -11.0,
    category: "Parc",
    description: "Parc national avec une riche biodiversité",
  },
  {
    id: 6,
    name: "Chutes de la Soumba",
    region: "moyenne-guinee",
    lat: 10.8,
    lng: -12.2,
    category: "Nature",
    description: "Cascades spectaculaires au cœur du Fouta Djallon",
  },
]

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function RealGoogleMap() {
  const [map, setMap] = useState<any>(null)
  const [selectedSite, setSelectedSite] = useState<(typeof touristSites)[0] | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isDark } = useTheme()

  const getRegionColor = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.color || "#757575"
  }

  const getRegionName = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.name || regionId
  }

  const filteredSites = selectedRegion ? touristSites.filter((site) => site.region === selectedRegion) : touristSites

  const initializeMap = useCallback(() => {
    if (!window.google) {
      setError("Google Maps API non disponible")
      setIsLoading(false)
      return
    }

    try {
      const mapInstance = new window.google.maps.Map(document.getElementById("google-map"), {
        center: { lat: 9.9456, lng: -9.6966 }, // Centre de la Guinée
        zoom: 7,
        styles: isDark
          ? [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ]
          : [],
      })

      // Ajouter les marqueurs
      filteredSites.forEach((site) => {
        const marker = new window.google.maps.Marker({
          position: { lat: site.lat, lng: site.lng },
          map: mapInstance,
          title: site.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getRegionColor(site.region),
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-sm">${site.name}</h3>
              <p class="text-xs text-gray-600 mt-1">${site.description}</p>
              <span class="inline-block mt-2 px-2 py-1 text-xs rounded" 
                    style="background-color: ${getRegionColor(site.region)}20; color: ${getRegionColor(site.region)}">
                ${getRegionName(site.region)}
              </span>
            </div>
          `,
        })

        marker.addListener("click", () => {
          setSelectedSite(site)
          infoWindow.open(mapInstance, marker)
        })
      })

      setMap(mapInstance)
      setIsLoading(false)
    } catch (err) {
      setError("Erreur lors de l'initialisation de la carte")
      setIsLoading(false)
    }
  }, [filteredSites, isDark])

  useEffect(() => {
    // Charger l'API Google Maps
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = initializeMap

      script.onerror = () => {
        setError("Impossible de charger Google Maps API")
        setIsLoading(false)
      }

      document.head.appendChild(script)
    } else {
      initializeMap()
    }
  }, [initializeMap])

  if (error) {
    return (
      <Card className="h-[500px] flex items-center justify-center">
        <CardContent>
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">Veuillez configurer votre clé API Google Maps</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Contrôles de la carte */}
      <motion.div
        className="flex flex-wrap gap-2 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant={selectedRegion === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedRegion(null)}
          className="transition-all duration-300"
        >
          <Layers className="mr-2 h-4 w-4" />
          Toutes les régions
        </Button>
        {regions.map((region) => (
          <motion.div key={region.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedRegion === region.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion(region.id)}
              style={{
                backgroundColor: selectedRegion === region.id ? region.color : "transparent",
                borderColor: region.color,
                color: selectedRegion === region.id ? "white" : region.color,
              }}
              className="transition-all duration-300"
            >
              {region.name}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Carte Google Maps */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="h-[500px] relative overflow-hidden">
            <CardContent className="p-0 h-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Chargement de la carte...</p>
                  </div>
                </div>
              ) : (
                <div id="google-map" className="w-full h-full" />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des sites */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-[500px]">
            <CardContent className="p-4 h-full overflow-y-auto">
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Sites Touristiques</h3>
                {filteredSites.map((site, index) => (
                  <motion.div
                    key={site.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedSite?.id === site.id ? "ring-2" : ""
                    }`}
                    style={{
                      borderColor: selectedSite?.id === site.id ? getRegionColor(site.region) : undefined,
                      backgroundColor: selectedSite?.id === site.id ? `${getRegionColor(site.region)}10` : undefined,
                      ringColor: selectedSite?.id === site.id ? getRegionColor(site.region) : undefined,
                    }}
                    onClick={() => setSelectedSite(site)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{site.name}</div>
                        <div className="text-xs mt-1 text-muted-foreground">{site.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            style={{
                              borderColor: getRegionColor(site.region),
                              color: getRegionColor(site.region),
                            }}
                          >
                            {getRegionName(site.region)}
                          </Badge>
                          <Badge variant="secondary">{site.category}</Badge>
                        </div>
                      </div>
                      <motion.div whileHover={{ rotate: 15 }}>
                        <Navigation className="h-4 w-4" style={{ color: getRegionColor(site.region) }} />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Légende des régions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Légende des Régions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {regions.map((region, index) => (
                <motion.div
                  key={region.id}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-sm">{region.name}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
