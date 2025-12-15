# Constancium Wealth Management

## Overview

Constancium is a premium wealth management website for a French financial advisory firm. The application serves as a marketing and lead generation platform for Constancium Patrimoine & Capital, offering information about wealth management services, investment products, and tools like a compound interest calculator. The site targets French professionals and individuals seeking personalized financial planning, tax optimization, and estate planning services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens following a luxury/premium aesthetic
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL via Neon serverless

### Design System
The application follows a sophisticated design inspired by Goldman Sachs and BlackRock:
- Primary colors: Midnight Deep (#0F1729), Gold (#D4AF37)
- Typography: Playfair Display (headlines), Inter (body), Cormorant Garamond (accents)
- Dark mode by default with premium restraint principles

### Key Pages
- Home: Hero, services overview (no third-party logos for IP compliance)
- About: Founder bio and company information
- Gamme: Product offerings (structured products, bonds, real estate, insurance)
- Simulateur: Compound interest calculator, Mortgage capacity calculator, Real estate leverage calculator
- Demarche: Company approach and consultation process
- Contact: Contact form with email integration
- Legal pages: CGV, Cookies, Littérature Juridique

### Storage Pattern
- In-memory storage class for user data (development)
- Database schema defined in `shared/schema.ts` using Drizzle

## External Dependencies

### Third-Party Services
- **Email**: Resend API for contact form submissions
- **Calendar**: Zcal integration for scheduling consultations
- **Database**: Neon PostgreSQL (serverless)
- **WhatsApp**: Direct link widget for customer contact
- **Social Media**: LinkedIn profile link only (Instagram removed)

### Key NPM Packages
- `@neondatabase/serverless`: PostgreSQL database connectivity
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Data fetching and caching
- `@radix-ui/*`: Accessible UI primitives
- `wouter`: Client-side routing
- `zod`: Schema validation
- Google Fonts: Playfair Display, Inter, Cormorant Garamond

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `RESEND_API_KEY`: Email service API key (optional, for contact form)