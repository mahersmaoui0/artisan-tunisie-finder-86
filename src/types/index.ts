
export interface Artisan {
  id: string;
  name: string;
  category: Category;
  description: string;
  skills: string[];
  hourlyRate: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  availability: {
    [key: string]: string[]; // day: hours[]
  };
  rating: number;
  imageUrl: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  artisanId: string;
  userId: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export type UserRole = 'client' | 'artisan';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  bookings?: string[]; // booking ids
  reviewsGiven?: string[]; // review ids
}

export type Category = 
  | 'plumbing'
  | 'electricity'
  | 'carpentry' 
  | 'painting'
  | 'masonry'
  | 'gardening'
  | 'cleaning'
  | 'other';
