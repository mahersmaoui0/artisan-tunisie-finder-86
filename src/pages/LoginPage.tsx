
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 pattern-bg py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  Connexion
                </CardTitle>
                <CardDescription>
                  Entrez votre email et mot de passe pour vous connecter
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-tunisian-blue hover:underline"
                      >
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Connexion en cours..."
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        <span>Se connecter</span>
                      </>
                    )}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Vous n'avez pas de compte?{" "}
                    <Link
                      to="/register"
                      className="text-tunisian-blue hover:underline"
                    >
                      S'inscrire
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
            
            <div className="mt-8 rounded-lg border bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold">Comptes de démonstration</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Utilisez ces comptes pour tester l'application:
              </p>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium">Client:</p>
                  <p className="text-muted-foreground">Email: sami.triki@example.com</p>
                  <p className="text-muted-foreground">Mot de passe: <span className="text-black">(laissez vide)</span></p>
                </div>
                
                <div>
                  <p className="font-medium">Artisan:</p>
                  <p className="text-muted-foreground">Email: ahmed.benali@example.com</p>
                  <p className="text-muted-foreground">Mot de passe: <span className="text-black">(laissez vide)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
