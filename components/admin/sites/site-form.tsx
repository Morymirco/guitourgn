import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Site, addSite, updateSite } from '@/lib/sites';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SiteFormProps {
  site?: Site;
  mode: 'add' | 'edit';
}

export function SiteForm({ site, mode }: SiteFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Site>>(
    site || {
      name: '',
      location: '',
      rating: 0,
      imageId: '',
      description: '',
      entryPrice: '',
      recommendedDuration: '',
      bestPeriod: '',
      difficultyLevel: '',
      openingHours: '',
      contact: '',
      website: '',
      address: '',
      services: [],
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'add') {
        await addSite(formData as Omit<Site, 'createdAt' | 'updatedAt'>);
        toast({
          title: 'Site ajouté',
          description: 'Le site touristique a été ajouté avec succès',
        });
      } else {
        if (site?.id) {
          await updateSite(site.id, formData);
          toast({
            title: 'Site mis à jour',
            description: 'Le site touristique a été mis à jour avec succès',
          });
        }
      }
      router.push('/admin/sites');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const services = e.target.value.split(',').map((service) => service.trim());
    setFormData((prev) => ({ ...prev, services }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {mode === 'add' ? 'Ajouter un site' : 'Modifier le site'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nom du site
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Localisation
          </label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rating" className="text-sm font-medium">
            Note (0-5)
          </label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="entryPrice" className="text-sm font-medium">
            Prix d'entrée
          </label>
          <Input
            id="entryPrice"
            name="entryPrice"
            value={formData.entryPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="recommendedDuration" className="text-sm font-medium">
            Durée recommandée
          </label>
          <Input
            id="recommendedDuration"
            name="recommendedDuration"
            value={formData.recommendedDuration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bestPeriod" className="text-sm font-medium">
            Meilleure période
          </label>
          <Input
            id="bestPeriod"
            name="bestPeriod"
            value={formData.bestPeriod}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="difficultyLevel" className="text-sm font-medium">
            Niveau de difficulté
          </label>
          <Input
            id="difficultyLevel"
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="openingHours" className="text-sm font-medium">
            Horaires d'ouverture
          </label>
          <Input
            id="openingHours"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact" className="text-sm font-medium">
            Contact
          </label>
          <Input
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">
            Site web
          </label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Adresse
          </label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="services" className="text-sm font-medium">
            Services (séparés par des virgules)
          </label>
          <Input
            id="services"
            name="services"
            value={formData.services?.join(', ')}
            onChange={handleServicesChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="min-h-[150px]"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/sites')}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : mode === 'add' ? 'Ajouter' : 'Mettre à jour'}
        </Button>
      </div>
    </form>
  );
} 