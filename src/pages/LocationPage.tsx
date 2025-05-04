
import { useEffect, useState } from "react";
import { getArtisans } from "@/utils/localStorage";
import { Artisan } from "@/types";
import { MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Fake coordinates for Tunisian cities since we don't have real GPS data
const cityCoordinates: Record<string, { x: number; y: number }> = {
  "Tunis": { x: 50, y: 20 },
  "Sfax": { x: 55, y: 70 },
  "Sousse": { x: 60, y: 40 },
  "Nabeul": { x: 70, y: 30 },
  "Hammamet": { x: 65, y: 35 },
  // Add more cities as needed
};

const LocationPage = () => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);

  useEffect(() => {
    const loadedArtisans = getArtisans();
    setArtisans(loadedArtisans);
  }, []);

  // Count artisans by city
  const artisansByCity = artisans.reduce((acc, artisan) => {
    acc[artisan.city] = (acc[artisan.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-tunisian-sand/10">
          <div className="container mx-auto px-4 py-12">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Où nous trouver
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez où sont basés nos artisans à travers la Tunisie
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4 md:col-span-1">
              <h2 className="text-xl font-semibold">Nos artisans par ville</h2>
              <div className="rounded-lg border bg-card">
                <div className="divide-y">
                  {Object.entries(artisansByCity).map(([city, count]) => (
                    <div 
                      key={city} 
                      className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50"
                      onClick={() => {
                        // Find first artisan from this city to show details
                        const firstArtisan = artisans.find(a => a.city === city);
                        setSelectedArtisan(firstArtisan || null);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-tunisian-terracotta" />
                        <span>{city}</span>
                      </div>
                      <span className="rounded-full bg-tunisian-sand/20 px-2.5 py-0.5 text-sm">
                        {count} {count > 1 ? "artisans" : "artisan"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="relative h-[400px] rounded-lg border bg-card p-4">
                <h2 className="mb-4 text-xl font-semibold">Carte de la Tunisie</h2>
                
                {/* Stylized map visualization */}
                <div className="relative h-[300px] rounded-lg bg-tunisian-blue/5 p-4">
                  <div className="absolute inset-0 opacity-10">
                    {/* Tunisia map outline - stylized */}
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      <path 
                        d="M30,10 Q40,5 50,10 Q60,15 70,10 L80,30 Q85,50 80,70 L70,85 Q60,90 50,85 Q40,80 30,85 L20,70 Q15,50 20,30 Z" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  
                  {/* City markers */}
                  {Object.entries(cityCoordinates).map(([city, coords]) => {
                    const count = artisansByCity[city] || 0;
                    const size = 10 + (count * 3); // Size based on number of artisans
                    
                    return (
                      <div 
                        key={city}
                        className="absolute cursor-pointer transition-all hover:z-10"
                        style={{ 
                          left: `${coords.x}%`, 
                          top: `${coords.y}%`, 
                          transform: 'translate(-50%, -50%)' 
                        }}
                        onClick={() => {
                          const firstArtisan = artisans.find(a => a.city === city);
                          setSelectedArtisan(firstArtisan || null);
                        }}
                      >
                        <div 
                          className={`flex h-${Math.min(size, 16)} w-${Math.min(size, 16)} items-center justify-center rounded-full bg-tunisian-terracotta text-white shadow-md hover:bg-tunisian-terracotta/80`}
                          style={{ width: `${size}px`, height: `${size}px` }}
                        >
                          <span className="text-xs font-medium">{count}</span>
                        </div>
                        <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                          {city}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected artisan info */}
                {selectedArtisan && (
                  <div className="mt-4 rounded-md bg-card p-4 shadow">
                    <h3 className="text-lg font-medium">{selectedArtisan.city}</h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {artisansByCity[selectedArtisan.city]} artisans disponibles
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Exemple:</span> {selectedArtisan.name} - {selectedArtisan.category}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationPage;
