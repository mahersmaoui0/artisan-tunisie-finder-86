
import { useEffect } from "react";
import { updateMockArtisansWithImages, mockCategories } from "@/data/mockData";
import ArtisansList from "@/components/ArtisansList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const ArtisansPage = () => {
  // Initialize mock data and update with images if needed
  useEffect(() => {
    updateMockArtisansWithImages();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-tunisian-sand/10">
          <div className="container mx-auto px-4 py-12">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Trouvez un artisan
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez les meilleurs artisans pour tous vos projets
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/location">
                  <MapPin className="h-4 w-4" />
                  <span>Voir la carte des artisans</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section>
          <ArtisansList categories={mockCategories} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArtisansPage;
