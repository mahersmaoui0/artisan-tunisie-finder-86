
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase,
  Building,
  Calendar,
  Check,
  Clock,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Star,
  Trash,
  User,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getArtisanById,
  saveArtisan,
  getBookingsByArtisanId,
  saveBooking,
  mockCategories,
} from "@/utils/localStorage";
import { Artisan, Booking, Category } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("plumbing");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Availability
  const [availabilityDay, setAvailabilityDay] = useState("Lundi");
  const [availabilityTime, setAvailabilityTime] = useState("");
  const [availability, setAvailability] = useState<{[key: string]: string[]}>({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "artisan") {
      navigate("/");
      return;
    }

    // Try to load artisan data
    const foundArtisan = getArtisanById(user.id);
    
    if (foundArtisan) {
      setArtisan(foundArtisan);
      // Set form fields
      setName(foundArtisan.name);
      setCategory(foundArtisan.category);
      setDescription(foundArtisan.description);
      setSkills(foundArtisan.skills);
      setHourlyRate(foundArtisan.hourlyRate);
      setCity(foundArtisan.city);
      setAddress(foundArtisan.address);
      setPhone(foundArtisan.phone);
      setEmail(foundArtisan.email);
      setAvailability(foundArtisan.availability);
    } else {
      // Initialize new artisan
      const newArtisan: Artisan = {
        id: user.id,
        name: user.name,
        category: "plumbing",
        description: "",
        skills: [],
        hourlyRate: 25,
        city: "",
        address: "",
        phone: user.phone,
        email: user.email,
        availability: {},
        rating: 0,
        imageUrl: "/placeholder.svg",
        reviews: [],
      };
      
      setArtisan(newArtisan);
      setName(user.name);
      setPhone(user.phone);
      setEmail(user.email);
    }

    // Load bookings
    const artisanBookings = getBookingsByArtisanId(user.id);
    setBookings(artisanBookings);
  }, [user, navigate]);

  const handleSaveProfile = () => {
    if (!artisan) return;

    const updatedArtisan: Artisan = {
      ...artisan,
      name,
      category,
      description,
      skills,
      hourlyRate,
      city,
      address,
      phone,
      email,
      availability,
    };

    saveArtisan(updatedArtisan);
    setArtisan(updatedArtisan);
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    });
    
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddAvailability = () => {
    if (!availabilityDay || !availabilityTime) return;

    setAvailability((prev) => {
      const updatedAvailability = { ...prev };
      
      if (!updatedAvailability[availabilityDay]) {
        updatedAvailability[availabilityDay] = [];
      }
      
      if (!updatedAvailability[availabilityDay].includes(availabilityTime)) {
        updatedAvailability[availabilityDay] = [
          ...updatedAvailability[availabilityDay],
          availabilityTime,
        ];
      }
      
      return updatedAvailability;
    });
    
    setAvailabilityTime("");
  };

  const handleRemoveAvailability = (day: string, time: string) => {
    setAvailability((prev) => {
      const updatedAvailability = { ...prev };
      
      if (updatedAvailability[day]) {
        updatedAvailability[day] = updatedAvailability[day].filter(
          (t) => t !== time
        );
        
        if (updatedAvailability[day].length === 0) {
          delete updatedAvailability[day];
        }
      }
      
      return updatedAvailability;
    });
  };

  const handleUpdateBookingStatus = (booking: Booking, status: 'confirmed' | 'completed' | 'cancelled') => {
    const updatedBooking = { ...booking, status };
    saveBooking(updatedBooking);
    
    setBookings(bookings.map(b => b.id === booking.id ? updatedBooking : b));
    
    toast({
      title: "Réservation mise à jour",
      description: `La réservation a été marquée comme "${status === 'confirmed' ? 'confirmée' : status === 'completed' ? 'terminée' : 'annulée'}"`,
    });
  };

  if (!user || !artisan) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tunisian-sand/30 text-3xl">
              <Briefcase className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground">
                Gérez votre profil et vos réservations
              </p>
            </div>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Mon profil</TabsTrigger>
              <TabsTrigger value="bookings">
                Réservations ({bookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Profile Card */}
                <div className="col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Aperçu du profil</CardTitle>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? (
                            <Save className="h-4 w-4" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
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
                        <h3 className="text-xl font-semibold">{artisan.name}</h3>
                        <p className="text-sm capitalize text-muted-foreground">{artisan.category}</p>
                        
                        <div className="mt-2 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-tunisian-yellow text-tunisian-yellow" />
                          <span>{artisan.rating.toFixed(1)}</span>
                          <span className="text-sm text-muted-foreground">
                            ({artisan.reviews.length} avis)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{artisan.city || "Non spécifié"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{artisan.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{artisan.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{artisan.hourlyRate} DT/heure</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded bg-tunisian-blue/10 p-2 text-tunisian-blue">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <span>Réservations totales</span>
                          </div>
                          <span className="text-lg font-medium">{bookings.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded bg-tunisian-terracotta/10 p-2 text-tunisian-terracotta">
                              <Star className="h-5 w-5" />
                            </div>
                            <span>Avis</span>
                          </div>
                          <span className="text-lg font-medium">{artisan.reviews.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded bg-green-100 p-2 text-green-600">
                              <Check className="h-5 w-5" />
                            </div>
                            <span>Services terminés</span>
                          </div>
                          <span className="text-lg font-medium">
                            {bookings.filter((b) => b.status === "completed").length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Edit Profile Form */}
                <div className="col-span-1 lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations du profil</CardTitle>
                      <CardDescription>
                        Gérez les informations qui seront affichées sur votre profil
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Catégorie</Label>
                          <Select
                            value={category}
                            onValueChange={(value) => setCategory(value as Category)}
                            disabled={!isEditing}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockCategories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>
                                  <span className="mr-2">{cat.icon}</span>
                                  <span className="capitalize">{cat.name}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            disabled={!isEditing}
                            placeholder="Décrivez votre activité et votre expertise"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Compétences</Label>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                              <div
                                key={skill}
                                className="flex items-center gap-1 rounded-full bg-tunisian-blue/10 px-3 py-1 text-sm text-tunisian-blue"
                              >
                                <span>{skill}</span>
                                {isEditing && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="ml-1 rounded-full p-1 text-tunisian-blue/60 hover:bg-tunisian-blue/20 hover:text-tunisian-blue"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          {isEditing && (
                            <div className="mt-2 flex gap-2">
                              <Input
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Nouvelle compétence"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleAddSkill}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hourlyRate">Tarif horaire (DT)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            min={0}
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Ville</Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>Disponibilité</Label>
                          <div className="mt-2 rounded-md border p-4">
                            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                              {isEditing && (
                                <>
                                  <Select
                                    value={availabilityDay}
                                    onValueChange={setAvailabilityDay}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Jour" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[
                                        "Lundi",
                                        "Mardi",
                                        "Mercredi",
                                        "Jeudi",
                                        "Vendredi",
                                        "Samedi",
                                        "Dimanche",
                                      ].map((day) => (
                                        <SelectItem key={day} value={day}>
                                          {day}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    value={availabilityTime}
                                    onChange={(e) => setAvailabilityTime(e.target.value)}
                                    placeholder="Ex: 09:00 - 12:00"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleAddAvailability}
                                  >
                                    <Plus className="mr-2 h-4 w-4" />
                                    <span>Ajouter</span>
                                  </Button>
                                </>
                              )}
                            </div>
                            {Object.keys(availability).length === 0 ? (
                              <div className="text-center text-muted-foreground">
                                {isEditing
                                  ? "Ajoutez vos horaires de disponibilité"
                                  : "Aucune disponibilité définie"}
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {Object.entries(availability).map(([day, times]) => (
                                  <div key={day} className="flex flex-col space-y-1">
                                    <div className="font-medium">{day}</div>
                                    {times.map((time, index) => (
                                      <div
                                        key={`${day}-${index}`}
                                        className="flex items-center justify-between"
                                      >
                                        <div className="flex items-center gap-1">
                                          <Clock className="h-4 w-4 text-muted-foreground" />
                                          <span>{time}</span>
                                        </div>
                                        {isEditing && (
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveAvailability(day, time)}
                                            className="rounded-full p-1 text-red-500 hover:bg-red-50"
                                          >
                                            <Trash className="h-4 w-4" />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {isEditing && (
                        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-end">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Annuler
                          </Button>
                          <Button onClick={handleSaveProfile}>
                            Enregistrer les modifications
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Vos réservations</CardTitle>
                  <CardDescription>
                    Gérez les demandes de réservation de vos clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <h3 className="mb-2 text-lg font-medium">Aucune réservation</h3>
                      <p className="text-muted-foreground">
                        Vous n'avez pas encore reçu de demandes de réservation
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Date & Heure</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>Client #{booking.userId.slice(-4)}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div>{booking.service}</div>
                                  {booking.notes && (
                                    <div className="text-xs text-muted-foreground">
                                      Note: {booking.notes}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : booking.status === "completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {booking.status === "confirmed"
                                    ? "Confirmé"
                                    : booking.status === "pending"
                                    ? "En attente"
                                    : booking.status === "completed"
                                    ? "Terminé"
                                    : "Annulé"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {booking.status === "pending" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 gap-1"
                                        onClick={() => handleUpdateBookingStatus(booking, "confirmed")}
                                      >
                                        <Check className="h-3 w-3" />
                                        <span>Confirmer</span>
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 gap-1 text-red-500 hover:text-red-600"
                                        onClick={() => handleUpdateBookingStatus(booking, "cancelled")}
                                      >
                                        <X className="h-3 w-3" />
                                        <span>Refuser</span>
                                      </Button>
                                    </>
                                  )}
                                  {booking.status === "confirmed" && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 gap-1"
                                      onClick={() => handleUpdateBookingStatus(booking, "completed")}
                                    >
                                      <Check className="h-3 w-3" />
                                      <span>Marquer terminé</span>
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
