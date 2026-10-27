# FundiLink Setup Guide

This guide will walk you through setting up the FundiLink development environment.

## Prerequisites

Make sure you have the following installed:
- Python 3.12+
- Node.js 18+
- PostgreSQL 14+
- Git

## Backend Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Database

1. Create a PostgreSQL database:
```sql
CREATE DATABASE fundilink_db;
CREATE USER fundilink_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE fundilink_db TO fundilink_user;
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```
DB_NAME=fundilink_db
DB_USER=fundilink_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser

```bash
python manage.py createsuperuser
```

### 7. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/api/docs/`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

Update with your backend URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME=FundiLink
```

### 3. Run Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## GitHub Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `Link-Hub`
2. **Do not** initialize with README, .gitignore, or license (we already have these)

### 2. Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Link-Hub.git

# Push to GitHub
git push -u origin master
```

## Vercel Deployment (Frontend)

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL

### 3. Deploy via CLI (Alternative)

```bash
cd frontend
vercel
```

## Backend Deployment

### Option 1: Railway

1. Go to [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Add PostgreSQL database
4. Configure environment variables
5. Set root directory to `backend`

### Option 2: Render

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn config.wsgi:application`

## Testing the Setup

### 1. Test Backend

```bash
# In backend directory
python manage.py test
```

### 2. Test API

Visit `http://localhost:8000/api/docs/` to test endpoints

### 3. Test Frontend

Visit `http://localhost:3000` to see the landing page

## Common Issues

### Issue: PostgreSQL Connection Error

**Solution**: Make sure PostgreSQL is running and credentials in `.env` are correct

```bash
# Check PostgreSQL status (Windows)
sc query postgresql-x64-14

# Start PostgreSQL if not running
net start postgresql-x64-14
```

### Issue: Module Not Found (Frontend)

**Solution**: Delete `node_modules` and reinstall

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Migration Error

**Solution**: Reset migrations (development only)

```bash
python manage.py migrate --fake-initial
```

## Next Steps

After setup, check `docs/NEXT_STEPS.md` for development roadmap.

## Support

If you encounter issues:
1. Check the documentation in the `docs/` folder
2. Review error messages carefully
3. Search for similar issues on Stack Overflow
4. Check Django and Next.js official documentation

---

**Happy Coding!** 🚀
