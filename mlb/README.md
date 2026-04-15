# MLB Marketplace - Premium Event Planning Platform

MLB is Macedonia's premier digital event planning marketplace, connecting couples and families with the finest event professionals. The platform focuses on promoting and supporting Roma-owned and Roma-friendly businesses.

## Features

- **Multilingual** - Full English and Macedonian support with language toggle
- **Vendor Marketplace** - Browse vendors by category, location, and event type
- **Detailed Vendor Profiles** - Photos, descriptions, reviews, ratings, and contact info
- **Book Consultation** - Form collecting name, email, phone, location, event type, date, and message
- **Join MLB** - Vendor registration with admin approval workflow
- **Admin Dashboard** - Secure login with full vendor, booking, and review management
- **Favorites System** - Save vendors for later
- **Reviews & Ratings** - Submit and manage vendor reviews
- **Responsive Design** - Luxurious, elegant UI optimized for all devices
- **Search & Filter** - Find vendors by category, location, event type, and keyword

## Vendor Categories

- Musicians & Bands
- Restaurants & Catering
- Hair & Makeup Artists
- Fashion & Clothing Designers
- Event Decorators
- Photographers & Videographers

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion animations
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (easily swappable to PostgreSQL)
- **Authentication**: JWT-based admin auth with bcrypt
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Push database schema and seed data
npx prisma db push

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

The database is automatically seeded with sample categories and vendors on first page load.

### Admin Access

Navigate to `/admin/login` and use the credentials from your `.env` file:

- **Email**: admin@mlb.mk
- **Password**: Admin123!

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # REST API endpoints
│   │   ├── auth/         # Login, logout, auth check
│   │   ├── vendors/      # Vendor CRUD
│   │   ├── bookings/     # Booking management
│   │   ├── reviews/      # Review management
│   │   ├── categories/   # Category listing
│   │   ├── favorites/    # Favorites toggle
│   │   └── admin/        # Admin stats
│   ├── vendors/          # Vendor listing and profile pages
│   ├── join/             # Vendor registration
│   ├── admin/            # Admin login and dashboard
│   ├── about/            # About page
│   └── contact/          # Contact page
├── components/
│   ├── layout/           # Header, Footer, Providers
│   ├── home/             # Homepage sections
│   ├── vendors/          # Vendor listing and profile components
│   ├── forms/            # Booking, review, and join forms
│   └── admin/            # Admin dashboard components
├── i18n/                 # Translation files (en, mk)
└── lib/                  # Prisma client, auth utilities, seed data
```

## Design System

The platform uses a luxury wedding aesthetic with:

- **Colors**: Ivory, champagne gold, soft beige, charcoal/black accents
- **Typography**: Playfair Display (serif headings) + Inter (sans-serif body)
- **Effects**: Smooth animations, gold shimmer text, premium card hover effects
- **Layout**: Spacious sections with strong visual hierarchy

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors` | List vendors (with filters) |
| POST | `/api/vendors` | Create vendor (registration) |
| GET | `/api/vendors/[slug]` | Get vendor details |
| PUT | `/api/vendors/[slug]` | Update vendor |
| DELETE | `/api/vendors/[slug]` | Delete vendor |
| GET | `/api/categories` | List categories |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | List bookings |
| PUT | `/api/bookings/[id]` | Update booking status |
| POST | `/api/reviews` | Create review |
| GET | `/api/reviews` | List reviews |
| PUT | `/api/reviews/[id]` | Approve/reject review |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| GET | `/api/auth/me` | Check auth status |
| POST | `/api/favorites` | Toggle favorite |
| GET | `/api/admin/stats` | Dashboard statistics |

## License

Private - All rights reserved.
