
import { Artisan } from "../types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtisanCardProps {
  artisan: Artisan;
}

const ArtisanCard = ({ artisan }: ArtisanCardProps) => {
  // Extraire les initiales du nom pour le fallback de l'avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative h-40 bg-tunisian-sand/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={artisan.imageUrl}
              alt={artisan.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="absolute top-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-tunisian-yellow text-tunisian-yellow" />
              <span>{artisan.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-tunisian-terracotta/20">
            <AvatarImage src={artisan.imageUrl} />
            <AvatarFallback className="bg-tunisian-blue/10 text-tunisian-blue">
              {getInitials(artisan.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{artisan.name}</h3>
            <p className="text-sm capitalize text-muted-foreground">
              {artisan.category}
            </p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{artisan.city}</span>
        </div>
        <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Phone className="h-3 w-3" />
          <span>{artisan.phone}</span>
        </div>
        <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>
            {Object.keys(artisan.availability).length} jours disponibles
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm">
          {artisan.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <span className="font-medium text-tunisian-terracotta">
          {artisan.hourlyRate} DT/heure
        </span>
        <Button asChild size="sm" variant="outline">
          <Link to={`/artisans/${artisan.id}`}>Voir détails</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArtisanCard;
