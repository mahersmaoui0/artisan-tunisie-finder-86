
import { Artisan, User, Booking, Category } from '../types';

export const generateMockData = () => {
  // Check if mock data already exists in localStorage
  const existingArtisans = localStorage.getItem('artisans');
  const existingUsers = localStorage.getItem('users');
  const existingBookings = localStorage.getItem('bookings');
  const existingCategories = localStorage.getItem('categories');

  // If not, create and store mock data
  if (!existingArtisans) {
    localStorage.setItem('artisans', JSON.stringify(mockArtisans));
  }

  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }

  if (!existingBookings) {
    localStorage.setItem('bookings', JSON.stringify(mockBookings));
  }

  if (!existingCategories) {
    localStorage.setItem('categories', JSON.stringify(mockCategories));
  }
};

export const mockCategories: {id: string, name: Category, icon: string}[] = [
  { id: '1', name: 'plumbing', icon: '🔧' },
  { id: '2', name: 'electricity', icon: '💡' },
  { id: '3', name: 'carpentry', icon: '🪚' },
  { id: '4', name: 'painting', icon: '🖌️' },
  { id: '5', name: 'masonry', icon: '🧱' },
  { id: '6', name: 'gardening', icon: '🌱' },
  { id: '7', name: 'cleaning', icon: '🧹' },
  { id: '8', name: 'other', icon: '🛠️' },
];

export const mockArtisans: Artisan[] = [
  {
    id: '1',
    name: 'Ahmed Ben Ali',
    category: 'plumbing',
    description: "Plombier professionnel avec plus de 10 ans d'expérience dans la réparation et l'installation de systèmes sanitaires.",
    skills: ['Installation sanitaire', 'Réparation fuites', 'Débouchage canalisations'],
    hourlyRate: 25,
    city: 'Tunis',
    address: '123 Avenue Habib Bourguiba, Tunis',
    phone: '+216 22 333 444',
    email: 'ahmed.benali@example.com',
    availability: {
      'Lundi': ['09:00 - 12:00', '14:00 - 18:00'],
      'Mardi': ['09:00 - 12:00', '14:00 - 18:00'],
      'Mercredi': ['09:00 - 12:00', '14:00 - 18:00'],
      'Jeudi': ['09:00 - 12:00', '14:00 - 18:00'],
      'Vendredi': ['09:00 - 12:00'],
      'Samedi': ['09:00 - 12:00'],
    },
    rating: 4.8,
    imageUrl: '/placeholder.svg',
    reviews: [
      {
        id: '101',
        userId: '1001',
        userName: 'Sami Triki',
        rating: 5,
        comment: 'Excellent travail, rapide et efficace!',
        date: '2023-12-15'
      },
      {
        id: '102',
        userId: '1002',
        userName: 'Leila Karoui',
        rating: 4.5,
        comment: 'Très professionnel et ponctuel',
        date: '2023-11-22'
      }
    ]
  },
  {
    id: '2',
    name: 'Mohamed Sassi',
    category: 'electricity',
    description: "Électricien certifié avec spécialisation en installations résidentielles et dépannage d'urgence.",
    skills: ['Installation électrique', 'Dépannage', 'Mise aux normes'],
    hourlyRate: 30,
    city: 'Sfax',
    address: '45 Rue Jawhara, Sfax',
    phone: '+216 55 666 777',
    email: 'mohamed.sassi@example.com',
    availability: {
      'Lundi': ['08:00 - 17:00'],
      'Mardi': ['08:00 - 17:00'],
      'Mercredi': ['08:00 - 17:00'],
      'Jeudi': ['08:00 - 17:00'],
      'Vendredi': ['08:00 - 12:00'],
      'Samedi': ['09:00 - 12:00'],
    },
    rating: 4.7,
    imageUrl: '/placeholder.svg',
    reviews: [
      {
        id: '103',
        userId: '1003',
        userName: 'Nour Brahmi',
        rating: 5,
        comment: 'Installation parfaite, je recommande vivement!',
        date: '2024-01-05'
      }
    ]
  },
  {
    id: '3',
    name: 'Rania Meddeb',
    category: 'carpentry',
    description: "Menuisière passionnée par le travail du bois. Fabrication de meubles sur mesure et réparations soignées.",
    skills: ['Meubles sur mesure', 'Restauration', 'Finitions bois'],
    hourlyRate: 35,
    city: 'Sousse',
    address: '78 Boulevard du 14 Janvier, Sousse',
    phone: '+216 99 123 456',
    email: 'rania.meddeb@example.com',
    availability: {
      'Lundi': ['09:00 - 16:00'],
      'Mardi': ['09:00 - 16:00'],
      'Mercredi': ['09:00 - 16:00'],
      'Jeudi': ['09:00 - 16:00'],
      'Vendredi': ['09:00 - 12:00'],
    },
    rating: 4.9,
    imageUrl: '/placeholder.svg',
    reviews: [
      {
        id: '104',
        userId: '1004',
        userName: 'Karim Bennour',
        rating: 5,
        comment: 'Travail exceptionnel, précision et créativité!',
        date: '2023-12-28'
      },
      {
        id: '105',
        userId: '1005',
        userName: 'Salma Riahi',
        rating: 4.8,
        comment: 'Très satisfaite du résultat final',
        date: '2023-11-15'
      }
    ]
  },
  {
    id: '4',
    name: 'Youssef Gharbi',
    category: 'painting',
    description: "Peintre décorateur spécialisé dans les finitions intérieures et extérieures. Travail soigné et respect des délais.",
    skills: ['Peinture intérieure', 'Peinture extérieure', 'Décoration murale'],
    hourlyRate: 28,
    city: 'Hammamet',
    address: '15 Rue de la Médina, Hammamet',
    phone: '+216 27 888 999',
    email: 'youssef.gharbi@example.com',
    availability: {
      'Lundi': ['08:30 - 17:30'],
      'Mardi': ['08:30 - 17:30'],
      'Mercredi': ['08:30 - 17:30'],
      'Jeudi': ['08:30 - 17:30'],
      'Vendredi': ['08:30 - 12:30'],
      'Samedi': ['09:00 - 13:00'],
    },
    rating: 4.6,
    imageUrl: '/placeholder.svg',
    reviews: [
      {
        id: '106',
        userId: '1006',
        userName: 'Fatma Kaddour',
        rating: 4.5,
        comment: 'Bon travail, propre et dans les délais',
        date: '2024-01-10'
      },
      {
        id: '107',
        userId: '1007',
        userName: 'Amine Ghanmi',
        rating: 4.7,
        comment: 'Très professionnel, je le recommande',
        date: '2023-12-05'
      }
    ]
  },
  {
    id: '5',
    name: 'Amira Zouari',
    category: 'cleaning',
    description: "Service de nettoyage professionnel pour résidences et bureaux. Utilisation de produits écologiques.",
    skills: ['Nettoyage résidentiel', 'Nettoyage bureaux', 'Nettoyage vitres'],
    hourlyRate: 20,
    city: 'Tunis',
    address: '56 Avenue Mohamed V, Tunis',
    phone: '+216 52 444 555',
    email: 'amira.zouari@example.com',
    availability: {
      'Lundi': ['08:00 - 16:00'],
      'Mardi': ['08:00 - 16:00'],
      'Mercredi': ['08:00 - 16:00'],
      'Jeudi': ['08:00 - 16:00'],
      'Vendredi': ['08:00 - 13:00'],
      'Samedi': ['09:00 - 13:00'],
    },
    rating: 4.5,
    imageUrl: '/placeholder.svg',
    reviews: [
      {
        id: '108',
        userId: '1008',
        userName: 'Rim Chaabane',
        rating: 4.5,
        comment: 'Nettoyage impeccable, service très fiable',
        date: '2023-12-20'
      }
    ]
  },
  {
    id: '6',
    name: 'Jamel Mabrouk',
    category: 'gardening',
    description: "Jardinier paysagiste avec expertise en aménagement d'espaces verts et entretien de jardins.",
    skills: ['Aménagement paysager', 'Taille arbustes', 'Entretien jardin'],
    hourlyRate: 22,
    city: 'Nabeul',
    address: '23 Rue des Orangers, Nabeul',
    phone: '+216 97 777 888',
    email: 'jamel.mabrouk@example.com',
    availability: {
      'Lundi': ['07:30 - 16:30'],
      'Mardi': ['07:30 - 16:30'],
      'Mercredi': ['07:30 - 16:30'],
      'Jeudi': ['07:30 - 16:30'],
      'Vendredi': ['07:30 - 11:30'],
    },
    rating: 4.7,
    imageUrl: '/placeholder.svg',
    reviews: [
      {
        id: '109',
        userId: '1009',
        userName: 'Samir Mahjoub',
        rating: 5,
        comment: 'Excellent travail, mon jardin est magnifique!',
        date: '2023-11-30'
      },
      {
        id: '110',
        userId: '1010',
        userName: 'Lina Bouazizi',
        rating: 4.4,
        comment: 'Bon service, ponctuel et efficace',
        date: '2023-10-25'
      }
    ]
  },
];

export const mockUsers: User[] = [
  {
    id: '1001',
    name: 'Sami Triki',
    email: 'sami.triki@example.com',
    phone: '+216 55 123 456',
    role: 'client',
    bookings: ['2001'],
    reviewsGiven: ['101'],
  },
  {
    id: '1002',
    name: 'Leila Karoui',
    email: 'leila.karoui@example.com',
    phone: '+216 22 987 654',
    role: 'client',
    bookings: ['2002'],
    reviewsGiven: ['102'],
  },
  {
    id: '1003',
    name: 'Nour Brahmi',
    email: 'nour.brahmi@example.com',
    phone: '+216 96 345 678',
    role: 'client',
    bookings: ['2003'],
    reviewsGiven: ['103'],
  },
  {
    id: '1',
    name: 'Ahmed Ben Ali',
    email: 'ahmed.benali@example.com',
    phone: '+216 22 333 444',
    role: 'artisan',
  },
  {
    id: '2',
    name: 'Mohamed Sassi',
    email: 'mohamed.sassi@example.com',
    phone: '+216 55 666 777',
    role: 'artisan',
  },
];

export const mockBookings: Booking[] = [
  {
    id: '2001',
    artisanId: '1',
    userId: '1001',
    date: '2024-01-20',
    time: '10:00',
    service: 'Réparation fuite robinet',
    status: 'completed',
    notes: 'Entrée de l\'immeuble: code 2580',
  },
  {
    id: '2002',
    artisanId: '1',
    userId: '1002',
    date: '2024-02-15',
    time: '14:30',
    service: 'Installation nouvelle douche',
    status: 'confirmed',
  },
  {
    id: '2003',
    artisanId: '2',
    userId: '1003',
    date: '2024-02-18',
    time: '09:00',
    service: 'Installation prises électriques',
    status: 'pending',
    notes: 'Prévoir 3 prises doubles',
  },
];
