
import { useState, useEffect } from "react";
import { Artisan, Category } from "../types";
import ArtisanCard from "./ArtisanCard";
import { getArtisans } from "../utils/localStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ArtisansListProps {
  categories: { id: string; name: Category; icon: string }[];
}

const ArtisansList = ({ categories }: ArtisansListProps) => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  useEffect(() => {
    const loadedArtisans = getArtisans();
    setArtisans(loadedArtisans);
    setFilteredArtisans(loadedArtisans);
  }, []);

  useEffect(() => {
    let filtered = artisans;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (artisan) =>
          artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artisan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artisan.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((artisan) => artisan.category === selectedCategory);
    }

    // Filter by city
    if (selectedCity !== "all") {
      filtered = filtered.filter((artisan) => artisan.city === selectedCity);
    }

    setFilteredArtisans(filtered);
  }, [searchQuery, selectedCategory, selectedCity, artisans]);

  // Get unique cities from artisans
  const cities = ["all", ...new Set(artisans.map((artisan) => artisan.city))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un artisan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <span className="mr-2">{category.icon}</span>
                    <span className="capitalize">{category.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city === "all" ? "Toutes les villes" : city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className="flex items-center gap-1 text-sm"
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? "all" : category.name
                )
              }
            >
              <span>{category.icon}</span>
              <span className="capitalize">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {filteredArtisans.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-xl font-medium">Aucun artisan trouvé</h3>
          <p className="mt-2 text-muted-foreground">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisansList;
