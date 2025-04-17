
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMockData, mockCategories } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Star, Clock, Search, MessageSquare } from "lucide-react";

const HomePage = () => {
  // Initialize mock data if needed
  useEffect(() => {
    generateMockData();
  }, []);

  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pattern-bg">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                  Trouvez le{" "}
                  <span className="text-tunisian-terracotta">meilleur artisan</span> pour 
                  tous vos projets
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Plombiers, électriciens, menuisiers et bien plus encore. Notre plateforme 
                  vous connecte aux artisans qualifiés de Tunisie.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/artisans">
                      <Search className="h-5 w-5" />
                      <span>Trouver un artisan</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link to="/register">
                      <span>Devenir artisan</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md rounded-lg bg-tunisian-sand/30 p-4 shadow-lg">
                  <div className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border-2 border-dashed border-tunisian-terracotta"></div>
                  <img
                    src="/placeholder.svg"
                    alt="Artisan tunisien au travail"
                    className="h-full w-full rounded object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Nos services proposés
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Découvrez la variété de services proposés par nos artisans qualifiés
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mockCategories.map((category) => (
                <Link key={category.id} to={`/artisans?category=${category.name}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tunisian-sand/30 text-3xl">
                        {category.icon}
                      </div>
                      <h3 className="mb-2 text-lg font-medium capitalize">
                        {category.name}
                      </h3>
                      <Button
                        variant="ghost"
                        className="mt-2 text-tunisian-terracotta"
                      >
                        Explorer
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-tunisian-blue/5 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Comment ça marche?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Trouver et réserver un artisan n'a jamais été aussi simple
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-tunisian-terracotta/10 text-tunisian-terracotta">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Recherchez</h3>
                <p className="text-muted-foreground">
                  Parcourez les profils des artisans et choisissez celui qui correspond à vos besoins
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-tunisian-blue/10 text-tunisian-blue">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Réservez</h3>
                <p className="text-muted-foreground">
                  Sélectionnez une date et une heure qui vous conviennent et confirmez votre réservation
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-tunisian-olive/10 text-tunisian-olive">
                  <Star className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Évaluez</h3>
                <p className="text-muted-foreground">
                  Après le service, partagez votre expérience et notez l'artisan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-lg bg-tunisian-terracotta/10 p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                  Vous êtes un artisan qualifié?
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Rejoignez notre plateforme pour développer votre activité et trouver de nouveaux clients.
                </p>
                <Button asChild size="lg" className="bg-tunisian-terracotta">
                  <Link to="/register">Rejoindre en tant qu'artisan</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-tunisian-sand/10 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ce que disent nos clients
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Découvrez les expériences de personnes qui ont fait confiance à nos artisans
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="flex text-tunisian-yellow">
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                    </div>
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "J'ai fait appel à un plombier via cette plateforme. Service rapide et travail de qualité. Je recommande vivement!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-tunisian-sand"></div>
                    <div>
                      <h4 className="font-medium">Sarah Mansour</h4>
                      <p className="text-sm text-muted-foreground">Tunis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="flex text-tunisian-yellow">
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "Excellente expérience avec l'électricien que j'ai trouvé. Professionnel, ponctuel et tarifs raisonnables."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-tunisian-sand"></div>
                    <div>
                      <h4 className="font-medium">Karim Ben Salah</h4>
                      <p className="text-sm text-muted-foreground">Sousse</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="flex text-tunisian-yellow">
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                      <Star className="h-4 w-4 fill-tunisian-yellow" />
                    </div>
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "La menuisière a fait un travail remarquable pour mon placard sur mesure. Je n'hésiterai pas à refaire appel à elle."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-tunisian-sand"></div>
                    <div>
                      <h4 className="font-medium">Lina Bouazizi</h4>
                      <p className="text-sm text-muted-foreground">Sfax</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
