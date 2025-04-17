
import { Artisan, User, Booking, Category, Review } from '../types';

// Artisans
export const getArtisans = (): Artisan[] => {
  const artisans = localStorage.getItem('artisans');
  return artisans ? JSON.parse(artisans) : [];
};

export const getArtisanById = (id: string): Artisan | undefined => {
  const artisans = getArtisans();
  return artisans.find((artisan) => artisan.id === id);
};

export const saveArtisan = (artisan: Artisan): void => {
  const artisans = getArtisans();
  const index = artisans.findIndex((a) => a.id === artisan.id);
  
  if (index !== -1) {
    artisans[index] = artisan;
  } else {
    artisans.push(artisan);
  }
  
  localStorage.setItem('artisans', JSON.stringify(artisans));
};

export const deleteArtisan = (id: string): void => {
  const artisans = getArtisans();
  const filteredArtisans = artisans.filter((artisan) => artisan.id !== id);
  localStorage.setItem('artisans', JSON.stringify(filteredArtisans));
};

// Users
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.id === id);
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === user.id);
  
  if (index !== -1) {
    users[index] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem('users', JSON.stringify(users));
};

// Bookings
export const getBookings = (): Booking[] => {
  const bookings = localStorage.getItem('bookings');
  return bookings ? JSON.parse(bookings) : [];
};

export const getBookingById = (id: string): Booking | undefined => {
  const bookings = getBookings();
  return bookings.find((booking) => booking.id === id);
};

export const getBookingsByArtisanId = (artisanId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter((booking) => booking.artisanId === artisanId);
};

export const getBookingsByUserId = (userId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter((booking) => booking.userId === userId);
};

export const saveBooking = (booking: Booking): void => {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === booking.id);
  
  if (index !== -1) {
    bookings[index] = booking;
  } else {
    bookings.push(booking);
  }
  
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

// Reviews
export const addReview = (artisanId: string, review: Review): void => {
  const artisan = getArtisanById(artisanId);
  
  if (artisan) {
    artisan.reviews.push(review);
    
    // Recalculate average rating
    const totalRating = artisan.reviews.reduce((sum, r) => sum + r.rating, 0);
    artisan.rating = totalRating / artisan.reviews.length;
    
    saveArtisan(artisan);
  }
};

// Authentication
export const getCurrentUser = (): User | null => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
