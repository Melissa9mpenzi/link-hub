# Quick Start Guide

Get FundiLink running in 5 minutes!

## 🚀 Rapid Setup

### 1. Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations (uses SQLite for quick start)
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start server
python manage.py runserver
```

**Backend running at:** http://localhost:8000
**Admin panel:** http://localhost:8000/admin
**API docs:** http://localhost:8000/api/docs

### 2. Frontend (2 minutes)

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Start development server
npm run dev
```

**Frontend running at:** http://localhost:3000

### 3. Test It (1 minute)

1. Open http://localhost:3000
2. Click "Become a Provider" to test registration
3. Check the backend admin at http://localhost:8000/admin

## 📱 Test the Authentication Flow

### Register a New User

**POST** `http://localhost:8000/api/v1/auth/register/`

```json
{
  "email": "test@example.com",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!",
  "full_name": "Test User",
  "phone": "+256700000000",
  "role": "customer"
}
```

### Login

**POST** `http://localhost:8000/api/v1/auth/login/`

```json
{
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

You'll receive JWT tokens in the response!

## 🎯 What to Build Next

Check `docs/NEXT_STEPS.md` for the complete 8-week roadmap.

**Immediate priorities:**
1. Create Provider Profile model
2. Create Service & Category models  
3. Build the search page
4. Build provider profile page

## 📝 Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/provider-profiles

# Make changes, then stage them
git add .

# Commit with descriptive message
git commit -m "Add provider profile model and API endpoints"

# Push to GitHub
git push origin feature/provider-profiles
```

## 🔗 Useful Commands

### Backend

```bash
# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Run shell
python manage.py shell
```

### Frontend

```bash
# Install package
npm install package-name

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🆘 Quick Troubleshooting

**Backend won't start?**
- Check if port 8000 is free
- Verify virtual environment is activated
- Check for migration errors: `python manage.py migrate`

**Frontend won't start?**
- Check if port 3000 is free
- Delete `node_modules` and run `npm install` again
- Clear Next.js cache: `rm -rf .next`

**CORS errors?**
- Verify `CORS_ALLOWED_ORIGINS` in `backend/config/settings.py`
- Make sure it includes `http://localhost:3000`

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `backend/config/settings.py` | Django configuration |
| `backend/config/urls.py` | API routes |
| `backend/accounts/models.py` | User model |
| `frontend/app/page.tsx` | Home page |
| `frontend/lib/api.ts` | API client |
| `docs/api.md` | API documentation |

## 🎓 Learn as You Build

- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js App Router](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

**You're all set!** Start building awesome features. 🚀
