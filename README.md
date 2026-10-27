# FundiLink (Link Hub)

A local services marketplace connecting customers with trusted service providers in Uganda.

## Overview

FundiLink helps customers find and hire reliable plumbers, electricians, mechanics, cleaners, tailors, and other skilled workers. Service providers can create professional profiles, showcase their work, receive quotation requests, and manage bookings.

## Features

### Customer Experience
- Search for services by category and location
- View provider profiles, portfolios, and reviews
- Request quotations and compare offers
- Book providers and track booking status
- Leave reviews after completed jobs

### Service Provider Experience
- Create professional business profiles
- List services with pricing and service areas
- Upload portfolio photos of completed work
- Receive and respond to quotation requests
- Manage bookings and update job status

### Administrator Experience
- Review provider verification submissions
- Manage service categories and listings
- Moderate reviews and user reports
- Monitor platform activity

## Technology Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form** for form handling

### Backend
- **Python 3.12**
- **Django 5.x**
- **Django REST Framework**
- **PostgreSQL**

### Hosting & Services
- **Vercel** (Frontend)
- **Railway/Render** (Backend & Database)
- **Cloudinary/S3** (Image storage)

## Project Structure

```
fundilink/
├── backend/              # Django REST API
│   ├── config/          # Project settings
│   ├── accounts/        # User authentication
│   ├── providers/       # Provider profiles
│   ├── services/        # Service listings
│   ├── quotations/      # Quote requests & responses
│   ├── bookings/        # Booking management
│   ├── reviews/         # Reviews & ratings
│   ├── notifications/   # In-app notifications
│   └── manage.py
├── frontend/            # Next.js application
│   ├── src/
│   │   ├── app/        # App router pages
│   │   ├── components/ # Reusable components
│   │   ├── features/   # Feature-specific modules
│   │   ├── lib/        # Utilities & API client
│   │   └── types/      # TypeScript types
│   └── package.json
├── docs/               # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL 14+
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file with required variables (see `.env.example`)

5. Run migrations:
```bash
python manage.py migrate
```

6. Create superuser:
```bash
python manage.py createsuperuser
```

7. Run development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file with required variables

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Development Roadmap

- [x] Week 1: Project setup and foundation
- [ ] Week 2: Database models and authentication
- [ ] Week 3-4: Profiles, listings, and quotations
- [ ] Week 5: Bookings and reviews
- [ ] Week 6: Admin dashboards and moderation
- [ ] Week 7: Testing and hardening
- [ ] Week 8: Deployment and launch

## API Documentation

API documentation is available at `/api/docs/` when the backend server is running.

## Contributing

This is a portfolio project. For questions or suggestions, please open an issue.

## License

MIT License - see LICENSE file for details

## Author

Built as a portfolio project demonstrating full-stack development skills.

---

**Status**: 🚧 In Development
**Version**: 0.1.0 (MVP)
