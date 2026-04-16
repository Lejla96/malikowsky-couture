import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { Vendor, Booking, Review } from "./data";

const STORE_DIR = "/tmp/mlb-store";
const VENDORS_FILE = path.join(STORE_DIR, "vendors.json");
const BOOKINGS_FILE = path.join(STORE_DIR, "bookings.json");
const REVIEWS_FILE = path.join(STORE_DIR, "reviews.json");

function ensureDir() {
  if (!existsSync(STORE_DIR)) {
    mkdirSync(STORE_DIR, { recursive: true });
  }
}

function readJSON<T>(filepath: string): T[] {
  try {
    ensureDir();
    if (existsSync(filepath)) {
      return JSON.parse(readFileSync(filepath, "utf-8"));
    }
  } catch { /* ignore */ }
  return [];
}

function writeJSON<T>(filepath: string, data: T[]) {
  try {
    ensureDir();
    writeFileSync(filepath, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function getStoredVendors(): Vendor[] {
  return readJSON<Vendor>(VENDORS_FILE);
}

export function addStoredVendor(vendor: Vendor) {
  const vendors = getStoredVendors();
  vendors.push(vendor);
  writeJSON(VENDORS_FILE, vendors);
}

export function getStoredBookings(): Booking[] {
  return readJSON<Booking>(BOOKINGS_FILE);
}

export function addStoredBooking(booking: Booking) {
  const bookings = getStoredBookings();
  bookings.push(booking);
  writeJSON(BOOKINGS_FILE, bookings);
}

export function updateStoredBooking(id: string, updates: Partial<Booking>) {
  const bookings = getStoredBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    Object.assign(bookings[idx], updates);
    writeJSON(BOOKINGS_FILE, bookings);
    return bookings[idx];
  }
  return null;
}

export function getStoredReviews(): Review[] {
  return readJSON<Review>(REVIEWS_FILE);
}

export function addStoredReview(review: Review) {
  const reviews = getStoredReviews();
  reviews.push(review);
  writeJSON(REVIEWS_FILE, reviews);
}

export function updateStoredReview(id: string, updates: Partial<Review>) {
  const reviews = getStoredReviews();
  const idx = reviews.findIndex(r => r.id === id);
  if (idx !== -1) {
    Object.assign(reviews[idx], updates);
    writeJSON(REVIEWS_FILE, reviews);
    return reviews[idx];
  }
  return null;
}
