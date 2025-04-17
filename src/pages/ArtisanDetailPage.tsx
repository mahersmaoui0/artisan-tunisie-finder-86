
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  Star,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { generateMockData } from "@/data/mockData";
import {
  getArtisanById,
  addReview,
  saveBooking,
  generateId,
} from "@/utils/localStorage";
import { Artisan, Booking, Review } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ArtisanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingService, setBookingService] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Initialize mock data if needed
  useEffect(() => {
    generateMockData();
  }, []);

  useEffect(() => {
    if (id) {
      const foundArtisan = getArtisanById(id);
      if (foundArtisan) {
        setArtisan(foundArtisan);
      }
    }
  }, [id]);

  const handleBookingSubmit = () => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour réserver un artisan",
        variant: "destructive",
      });
      return;
    }

    if (!bookingDate || !bookingTime || !bookingService) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    if (artisan) {
      const newBooking: Booking = {
        id: generateId(),
        artisanId: artisan.id,
        userId: user.id,
        date: bookingDate,
        time: bookingTime,
        service: bookingService,
        status: "pending",
        notes: bookingNotes,
      };

      saveBooking(newBooking);
      
      toast({
        title: "Réservation enregistrée",
        description: "Votre demande a été envoyée à l'artisan",
      });

      setBookingDate("");
      setBookingTime("");
      setBookingService("");
      setBookingNotes("");
      setOpenBookingDialog(false);
    }
  };

  const handleReviewSubmit = () => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour laisser un avis",
        variant: "destructive",
      });
      return;
    }

    if (!reviewComment) {
      toast({
        title: "Erreur",
        description: "Veuillez écrire un commentaire",
        variant: "destructive",
      });
      return;
    }

    if (artisan) {
      const newReview: Review = {
        id: generateId(),
        userId: user.id,
        userName: user.name,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString().split("T")[0],
      };

      addReview(artisan.id, newReview);
      
      // Update the artisan state with the new review
      setArtisan({
        ...artisan,
        reviews: [...artisan.reviews, newReview],
        rating: (artisan.rating * artisan.reviews.length + reviewRating) / (artisan.reviews.length + 1),
      });

      toast({
        title: "Avis enregistré",
        description: "Merci pour votre avis!",
      });

      setReviewRating(5);
      setReviewComment("");
      setOpenReviewDialog(false);
    }
  };

  if (!artisan) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl font-bold">Artisan non trouvé</h1>
            <p className="mb-8">
              Désolé, l'artisan que vous recherchez n'existe pas.
            </p>
            <Button asChild>
              <Link to="/artisans">Retour à la liste des artisans</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const availabilityDays = Object.keys(artisan.availability);
  const availabilityTimes = availabilityDays.length > 0 ? artisan.availability[availabilityDays[0]] : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Artisan Header */}
        <section className="bg-tunisian-sand/10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">{artisan.name}</h1>
                <p className="text-lg capitalize text-muted-foreground">
                  {artisan.category}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-sm">
                  <Star className="h-4 w-4 fill-tunisian-yellow text-tunisian-yellow" />
                  <span className="font-medium">{artisan.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">
                    ({artisan.reviews.length} avis)
                  </span>
                </div>
                <Dialog open={openBookingDialog} onOpenChange={setOpenBookingDialog}>
                  <DialogTrigger asChild>
                    <Button>Réserver</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Réserver {artisan.name}</DialogTitle>
                      <DialogDescription>
                        Remplissez ce formulaire pour réserver cet artisan.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time">Heure</Label>
                        <Select value={bookingTime} onValueChange={setBookingTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une heure" />
                          </SelectTrigger>
                          <SelectContent>
                            {availabilityTimes.map((time, index) => (
                              <SelectItem key={index} value={time.split(" - ")[0]}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="service">Service demandé</Label>
                        <Select value={bookingService} onValueChange={setBookingService}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un service" />
                          </SelectTrigger>
                          <SelectContent>
                            {artisan.skills.map((skill, index) => (
                              <SelectItem key={index} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">Notes (facultatif)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Détails supplémentaires sur votre demande"
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenBookingDialog(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleBookingSubmit}>Confirmer</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Artisan Details */}
        <section>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Profile Details */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Photo and Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle>À propos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                        <div className="relative h-40 w-40 overflow-hidden rounded-lg bg-muted sm:h-52 sm:w-52">
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
                        <div className="flex-1">
                          <p className="text-muted-foreground">{artisan.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {artisan.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-tunisian-blue/10 px-3 py-1 text-sm text-tunisian-blue"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tunisian-terracotta/10 text-tunisian-terracotta">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Adresse</h4>
                            <p className="text-sm text-muted-foreground">
                              {artisan.address}, {artisan.city}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tunisian-terracotta/10 text-tunisian-terracotta">
                            <Phone className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Téléphone</h4>
                            <p className="text-sm text-muted-foreground">{artisan.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tunisian-terracotta/10 text-tunisian-terracotta">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Email</h4>
                            <p className="text-sm text-muted-foreground">{artisan.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tunisian-terracotta/10 text-tunisian-terracotta">
                            <DollarSign className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Tarif horaire</h4>
                            <p className="text-sm text-muted-foreground">
                              {artisan.hourlyRate} DT/heure
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Avis</CardTitle>
                        <CardDescription>
                          {artisan.reviews.length} avis pour {artisan.name}
                        </CardDescription>
                      </div>
                      <Dialog open={openReviewDialog} onOpenChange={setOpenReviewDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>Ajouter un avis</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Laissez votre avis</DialogTitle>
                            <DialogDescription>
                              Partagez votre expérience avec {artisan.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="rating">Note</Label>
                              <Select value={reviewRating.toString()} onValueChange={(value) => setReviewRating(Number(value))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une note" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5 - Excellent</SelectItem>
                                  <SelectItem value="4">4 - Très bien</SelectItem>
                                  <SelectItem value="3">3 - Bien</SelectItem>
                                  <SelectItem value="2">2 - Moyen</SelectItem>
                                  <SelectItem value="1">1 - Décevant</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="comment">Commentaire</Label>
                              <Textarea
                                id="comment"
                                placeholder="Partagez votre expérience..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenReviewDialog(false)}>
                              Annuler
                            </Button>
                            <Button onClick={handleReviewSubmit}>Publier</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      {artisan.reviews.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-6 text-center">
                          <h3 className="mb-2 text-lg font-medium">Aucun avis pour le moment</h3>
                          <p className="text-muted-foreground">
                            Soyez le premier à donner votre avis sur {artisan.name}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {artisan.reviews.map((review) => (
                            <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-muted"></div>
                                  <span className="font-medium">{review.userName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-tunisian-yellow text-tunisian-yellow" />
                                  <span>{review.rating.toFixed(1)}</span>
                                </div>
                              </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {review.date}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="space-y-6">
                  {/* Availability */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>Disponibilité</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {availabilityDays.length > 0 ? (
                          availabilityDays.map((day) => (
                            <div key={day} className="flex justify-between">
                              <span className="font-medium">{day}</span>
                              <div>
                                {artisan.availability[day].map((time, index) => (
                                  <div key={index} className="text-muted-foreground">
                                    {time}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-muted-foreground">
                            Aucune disponibilité indiquée
                          </p>
                        )}
                      </div>
                      <Button className="mt-6 w-full" onClick={() => setOpenBookingDialog(true)}>
                        Réserver maintenant
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Services */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {artisan.skills.map((skill, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-tunisian-terracotta"></div>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArtisanDetailPage;
