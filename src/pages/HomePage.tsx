
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { mockCategories } from "@/data/mockData";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { VirtualAssistant } from "@/components/VirtualAssistant";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to artisans page with search query
    window.location.href = `/artisans?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-tunisian-sand/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23e6d1a2\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Trouvez des artisans qualifiés en{" "}
                <span className="text-tunisian-terracotta">Tunisie</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Plombiers, électriciens, menuisiers, peintres et plus encore.
                Connectez-vous avec des professionnels de confiance pour tous vos projets.
              </p>
              
              <form onSubmit={handleSearch} className="mx-auto max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="De quel artisan avez-vous besoin ?"
                    className="pl-10 pr-20 py-6 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                  >
                    Rechercher
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center text-3xl font-bold">Nos catégories d'artisans</h2>
            <p className="mb-10 text-center text-muted-foreground">
              Découvrez des professionnels dans diverses spécialités
            </p>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {mockCategories.map((category) => (
                <Link key={category.id} to={`/artisans?category=${category.name}`}>
                  <Card className="transition-all hover:shadow-md hover:bg-accent/10">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <span className="mb-4 text-4xl">{category.icon}</span>
                      <h3 className="text-lg font-medium capitalize">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-tunisian-blue/5 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center text-3xl font-bold">Comment ça marche</h2>
            <p className="mb-12 text-center text-muted-foreground">
              Trouver un artisan qualifié en quelques étapes simples
            </p>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tunisian-terracotta text-white">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-xl font-medium">Recherchez</h3>
                <p className="text-muted-foreground">
                  Trouvez des artisans selon vos besoins et votre localisation
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tunisian-terracotta text-white">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-xl font-medium">Comparez</h3>
                <p className="text-muted-foreground">
                  Consultez les profils, tarifs et avis pour faire le meilleur choix
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tunisian-terracotta text-white">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="mb-2 text-xl font-medium">Réservez</h3>
                <p className="text-muted-foreground">
                  Contactez et réservez directement l'artisan qui vous convient
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link to="/artisans">Trouver un artisan maintenant</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center text-3xl font-bold">Témoignages clients</h2>
            <p className="mb-10 text-center text-muted-foreground">
              Découvrez ce que disent nos utilisateurs
            </p>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-tunisian-yellow"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "J'ai trouvé un excellent électricien grâce à ArtisanTunisie. 
                    Le service était rapide et professionnel. Je recommande vivement !"
                  </p>
                  <p className="font-medium">Sami Triki</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-tunisian-yellow"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "La plateforme est très facile à utiliser. J'ai pu comparer plusieurs plombiers 
                    et choisir celui qui correspondait le mieux à mes besoins et à mon budget."
                  </p>
                  <p className="font-medium">Leila Karoui</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-tunisian-yellow"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "En tant que menuisier, cette plateforme m'a permis de développer ma clientèle. 
                    L'interface est intuitive et les réservations sont faciles à gérer."
                  </p>
                  <p className="font-medium">Ahmed Ben Salem</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-tunisian-terracotta text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Vous êtes un artisan ?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Rejoignez notre plateforme pour élargir votre clientèle et gérer facilement vos réservations.
              Inscription gratuite et simple.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-tunisian-terracotta hover:bg-white/90" asChild>
              <Link to="/register">Devenir artisan sur la plateforme</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Virtual Assistant */}
      <VirtualAssistant />
    </div>
  );
};

export default HomePage;
