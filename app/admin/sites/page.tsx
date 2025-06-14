'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Site, deleteSite, getSites } from '@/lib/sites';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const sitesData = await getSites();
      setSites(sitesData);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les sites',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (siteId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce site ?')) {
      try {
        await deleteSite(siteId);
        toast({
          title: 'Site supprimé',
          description: 'Le site a été supprimé avec succès',
        });
        loadSites();
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de supprimer le site',
          variant: 'destructive',
        });
      }
    }
  };

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sites Touristiques</h1>
        <Button onClick={() => router.push('/admin/sites/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un site
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="border rounded-lg p-4 space-y-4 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {site.imageId && (
                <img
                  src={`/images/sites/${site.imageId}.jpg`}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold">{site.name}</h3>
              <p className="text-sm text-gray-500">{site.location}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Note:</span>
                <span className="text-sm">{site.rating}/5</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/admin/sites/${site.id}/edit`)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(site.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 