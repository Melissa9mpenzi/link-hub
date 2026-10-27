# FundiLink Architecture

## System Overview

FundiLink is a two-tier web application with a React-based frontend (Next.js) and a Python backend (Django REST Framework), connected via RESTful APIs.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Next.js Frontend (TypeScript)            │   │
│  │  - App Router Pages                              │   │
│  │  - React Components                              │   │
│  │  - Tailwind CSS Styling                          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS/REST API
                          │
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │      Django REST Framework (Python)              │   │
│  │  - Authentication & Authorization                │   │
│  │  - Business Logic                                │   │
│  │  - API Endpoints                                 │   │
│  │  - Request Validation                            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ ORM (Django Models)
                          │
┌─────────────────────────────────────────────────────────┐
│                   Data Layer                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │           PostgreSQL Database                    │   │
│  │  - Users & Authentication                        │   │
│  │  - Providers & Services                          │   │
│  │  - Quotations & Bookings                         │   │
│  │  - Reviews & Notifications                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Database Schema

### Core Entities

#### Users & Authentication
- `users` - Base user accounts (email, password, role)
- `provider_profiles` - Extended provider information
- `verification_documents` - KYC documents for providers

#### Services & Catalogue
- `categories` - Service categories (plumbing, electrical, etc.)
- `services` - Service listings with pricing
- `portfolio_items` - Provider work samples

#### Quotations & Bookings
- `quote_requests` - Customer job requests
- `quotes` - Provider quotation responses
- `bookings` - Accepted quotes with scheduling
- `booking_status_history` - Audit trail

#### Reviews & Feedback
- `reviews` - Customer ratings and comments
- `reports` - User-submitted reports

#### Notifications
- `notifications` - In-app notification system

### Key Relationships

```
User (1) ──────────── (1) ProviderProfile
  │
  ├── (1:N) QuoteRequests (as customer)
  ├── (1:N) Quotes (as provider)
  ├── (1:N) Bookings (as customer or provider)
  └── (1:N) Reviews (as reviewer)

ProviderProfile (1) ─── (N) Services
                    └── (N) PortfolioItems

QuoteRequest (1) ────── (N) Quotes
Quote (1) ─────────────── (0:1) Booking
Booking (1) ──────────── (0:1) Review
```

## API Design

### Authentication
- Token-based authentication (JWT or Django sessions)
- Role-based access control (Customer, Provider, Admin)

### Endpoints Pattern

```
/api/v1/
├── auth/
│   ├── register/
│   ├── login/
│   ├── logout/
│   └── password-reset/
├── providers/
│   ├── {id}/
│   ├── {id}/services/
│   └── {id}/portfolio/
├── services/
│   └── search/
├── quote-requests/
│   ├── my/
│   └── {id}/quotes/
├── bookings/
│   ├── my/
│   └── {id}/status/
├── reviews/
└── notifications/
```

### Security Measures

1. **Authentication**
   - Secure password hashing (PBKDF2/Argon2)
   - HTTPS-only in production
   - HttpOnly cookies for session tokens

2. **Authorization**
   - Row-level permissions
   - Role-based access control
   - Resource ownership validation

3. **Input Validation**
   - Django REST Framework serializers
   - File upload validation
   - Rate limiting on sensitive endpoints

4. **Data Protection**
   - SQL injection prevention (ORM)
   - XSS protection
   - CSRF tokens
   - CORS configuration

## Frontend Architecture

### Page Structure

```
/                       # Landing page
/search                 # Service search
/providers/{id}         # Provider profile
/dashboard/customer     # Customer dashboard
/dashboard/provider     # Provider dashboard
/dashboard/admin        # Admin dashboard
/bookings/{id}          # Booking details
```

### State Management
- Server state: React Query / SWR
- Form state: React Hook Form
- UI state: React Context (minimal)

### Component Organization

```
components/
├── ui/              # Reusable UI components (buttons, inputs)
├── layout/          # Layout components (header, footer)
├── features/        # Feature-specific components
│   ├── auth/
│   ├── providers/
│   ├── bookings/
│   └── reviews/
└── shared/          # Shared business components
```

## Deployment Architecture

### Production Setup

```
┌──────────────────┐
│  Vercel (CDN)    │ ← Next.js Frontend
└──────────────────┘
         │
         ↓ API Calls
┌──────────────────┐
│ Railway/Render   │ ← Django API
└──────────────────┘
         │
         ↓
┌──────────────────┐
│   PostgreSQL     │ ← Database
└──────────────────┘

┌──────────────────┐
│ Cloudinary/S3    │ ← Image Storage
└──────────────────┘
```

### Environment Configuration

**Frontend (Vercel)**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

**Backend (Railway/Render)**
- `DATABASE_URL`
- `SECRET_KEY`
- `ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `CLOUDINARY_URL`

## Performance Considerations

1. **Database**
   - Indexes on frequently queried fields
   - Query optimization with `select_related` and `prefetch_related`
   - Database connection pooling

2. **Caching**
   - Redis for session storage (optional)
   - Django cache framework
   - CDN caching for static assets

3. **Frontend**
   - Next.js image optimization
   - Code splitting and lazy loading
   - Static page generation where appropriate

## Monitoring & Logging

- Application logs (Django logging)
- Error tracking (Sentry recommended)
- Performance monitoring
- Database query analysis

## Scalability Path

1. **Phase 1** (MVP): Monolithic deployment
2. **Phase 2**: Add Redis caching and background jobs (Celery)
3. **Phase 3**: Database read replicas
4. **Phase 4**: Microservices for specific domains if needed

## Testing Strategy

- **Backend**: Django TestCase, pytest, coverage
- **Frontend**: Jest, React Testing Library
- **E2E**: Playwright (optional for critical flows)
- **API**: Postman/Thunder Client collections

## Development Workflow

1. Feature branches from `main`
2. Local development and testing
3. Pull request with code review
4. CI/CD pipeline runs tests
5. Merge to `main` triggers deployment

---

**Document Version**: 1.0  
**Last Updated**: January 2025
