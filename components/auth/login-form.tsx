import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue dans votre espace administrateur',
      });
      router.push('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description: 'Vérifiez vos identifiants et réessayez',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Connexion Admin</h2>
        <p className="text-center text-gray-500">Connectez-vous à votre espace administrateur</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Mot de passe
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  );
} 