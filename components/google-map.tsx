"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut } from "lucide-react"
import { AppColors, regions } from "./app-colors"

// Données simulées des sites touristiques en Guinée
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
]

export function GoogleMapComponent() {
  const [selectedSite, setSelectedSite] = useState<(typeof touristSites)[0] | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 9.9456, lng: -9.6966 }) // Centre de la Guinée
  const [zoom, setZoom] = useState(7)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const handleSiteClick = useCallback((site: (typeof touristSites)[0]) => {
    setSelectedSite(site)
    setMapCenter({ lat: site.lat, lng: site.lng })
    setZoom(10)
  }, [])

  const getRegionColor = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.color || AppColors.textSecondary
  }

  const getRegionName = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.name || regionId
  }

  const filteredSites = selectedRegion ? touristSites.filter((site) => site.region === selectedRegion) : touristSites

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
        {/* Carte simulée */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="h-[500px] relative overflow-hidden">
            <CardContent className="p-0 h-full">
              {/* Fond de carte simulé */}
              <div
                className="w-full h-full relative"
                style={{
                  background: `linear-gradient(135deg, ${AppColors.lightGreen}40, ${AppColors.lightGold}40)`,
                }}
              >
                {/* Contrôles de zoom */}
                <motion.div
                  className="absolute top-4 right-4 z-10 flex flex-col gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white"
                    onClick={() => setZoom(Math.min(zoom + 1, 15))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white"
                    onClick={() => setZoom(Math.max(zoom - 1, 5))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </motion.div>

                {/* Marqueurs des sites */}
                {filteredSites.map((site, index) => (
                  <motion.div
                    key={site.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${((site.lng + 15) / 10) * 100}%`,
                      top: `${((15 - site.lat) / 10) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSiteClick(site)}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: getRegionColor(site.region) }}
                    >
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                    {selectedSite?.id === site.id && (
                      <motion.div
                        className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border min-w-[200px]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-sm font-medium">{site.name}</div>
                        <div className="text-xs text-gray-600">{site.description}</div>
                        <Badge
                          variant="outline"
                          className="mt-1"
                          style={{
                            borderColor: getRegionColor(site.region),
                            color: getRegionColor(site.region),
                          }}
                        >
                          {getRegionName(site.region)}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Indicateur de centre */}
                <motion.div
                  className="absolute"
                  style={{
                    left: `${((mapCenter.lng + 15) / 10) * 100}%`,
                    top: `${((15 - mapCenter.lat) / 10) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedSite ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-4 h-4 border-2 border-red-500 rounded-full bg-red-200 animate-pulse" />
                </motion.div>

                {/* Overlay d'informations */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                  <div className="text-sm font-medium">Zoom: {zoom}</div>
                  <div className="text-xs text-gray-600">
                    Sites visibles: {filteredSites.length}/{touristSites.length}
                  </div>
                </div>
              </div>
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
                <h3 className="font-medium text-lg" style={{ color: AppColors.textPrimary }}>
                  Sites Touristiques
                </h3>
                {filteredSites.map((site, index) => (
                  <motion.div
                    key={site.id}
                    className="p-3 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
                    style={{
                      borderColor: selectedSite?.id === site.id ? getRegionColor(site.region) : AppColors.divider,
                      backgroundColor: selectedSite?.id === site.id ? `${getRegionColor(site.region)}10` : "white",
                    }}
                    onClick={() => handleSiteClick(site)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm" style={{ color: AppColors.textPrimary }}>
                          {site.name}
                        </div>
                        <div className="text-xs mt-1" style={{ color: AppColors.textSecondary }}>
                          {site.description}
                        </div>
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
            <h4 className="font-medium mb-3" style={{ color: AppColors.textPrimary }}>
              Légende des Régions
            </h4>
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

export default GoogleMapComponent
