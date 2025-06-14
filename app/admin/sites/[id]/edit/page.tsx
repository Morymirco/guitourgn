'use client';

import { SiteForm } from '@/components/admin/sites/site-form';
import { useToast } from '@/components/ui/use-toast';
import { Site, getSite } from '@/lib/sites';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditSitePage() {
  const { id } = useParams();
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSite();
  }, [id]);

  const loadSite = async () => {
    try {
      const siteData = await getSite(id as string);
      setSite(siteData);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger le site',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  if (!site) {
    return <div className="p-6">Site non trouvé</div>;
  }

  return <SiteForm site={site} mode="edit" />;
} 