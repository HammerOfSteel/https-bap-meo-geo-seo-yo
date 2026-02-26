# RandomMenu MVP 2.0 - Complete Setup Guide

Welcome to RandomMenu MVP 2.0! This guide will help you get the application up and running.

## 📋 Project Overview

RandomMenu is a modern full-stack web application built with:
- **Backend**: Express.js + TypeScript + PostgreSQL
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Orchestration**: Docker Compose

## 🚀 Quick Start (with Docker Compose)

### Prerequisites
- Docker and Docker Compose installed on your system
- For M1/M2/M3 Macs: Docker Desktop is recommended

### Installation & Running

1. **Clone/Navigate to project**
   ```bash
   cd /Users/terrygoleman/Documents/dev/https-bap-meo-geo-seo-yo
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

   First run will take longer as it builds images and initializes the database.
   Wait for the backend and frontend to be fully started (you'll see their logs).

3. **Database Setup** (Automatic)
   - Database migrations run automatically on first startup
   - Test data is automatically seeded (admin user + test user + menu items)
   - No manual database setup required!

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Database**: PostgreSQL on localhost:5432

5. **Test Login Credentials**
   - **Admin User**: 
     - Email: `adminuser@local.com`
     - Password: `adminpass`
   - **Regular User**:
     - Email: `testuser@local.com`
     - Password: `testuser`

6. **Verify everything is working**
   - Frontend: http://localhost:3000 (should show home page)
   - API Health: http://localhost:5000/api/health (should return `{"status":"OK",...}`)

### Stopping Services
```bash
docker-compose down
```

To also remove database data:
```bash
docker-compose down -v
```

## 🛠️ Local Development (without Docker)

If you prefer to run services locally:

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Start dev server
npm run dev
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start dev server
npm run dev
```

## 📁 Project Structure

```
randommenu/
├── docker-compose.yml          # Docker Compose configuration
├── .env                         # Environment variables (create from .env.example)
├── .gitignore                   # Git ignore rules
├── README.md                    # Project overview
├── TODO.md                      # Development roadmap
├── SETUP.md                     # This file
│
├── backend/                     # Express.js backend
│   ├── src/
│   │   ├── server.ts           # Main Express app
│   │   ├── types/              # TypeScript type definitions
│   │   ├── middleware/         # Express middleware (auth, etc.)
│   │   ├── utils/              # Utility functions
│   │   ├── routes/             # API routes (coming soon)
│   │   ├── controllers/        # Route controllers (coming soon)
│   │   └── services/           # Business logic services (coming soon)
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── .env.example
│   ├── .npmrc
│   └── README.md
│
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/            # React Context
│   │   │   └── AuthContext.tsx
│   │   ├── App.tsx             # Main App component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── Dockerfile
│   ├── .env.example
│   ├── .npmrc
│   └── README.md
```

## 🗄️ Database Configuration

The application uses **PostgreSQL** with **Prisma** ORM.

### Current Schema
- **User** table: Stores user accounts with role-based access (USER/ADMIN)
- **Menu** table: User-created menus
- **MenuItem** table: Individual food/drink items in menus

### Database Operations

```bash
# Apply pending migrations
docker-compose exec backend npm run prisma:migrate

# Open Prisma Studio (visual DB browser)
docker-compose exec backend npm run prisma:studio

# Regenerate Prisma client
docker-compose exec backend npm run prisma:generate
```

## 🔐 Authentication

- JWT-based authentication with Bearer tokens
- Passwords are hashed using bcryptjs
- Two user roles: **USER** and **ADMIN**
- Tokens stored in browser localStorage

## 📝 Key Features Implemented

✅ **Authentication**
- User registration and login
- JWT token management
- Protected routes

✅ **User Roles**
- User role: Can create and manage menus
- Admin role: Full user management access

✅ **UI Structure**
- Home page with feature overview
- Login/Register pages
- Protected dashboard for users
- Admin panel for admins
- Responsive Tailwind design

## 🔨 Next Steps in Development

1. **Phase 1**: Database migrations & Prisma setup
2. **Phase 2**: Implement authentication endpoints
3. **Phase 3**: Create menu management API
4. **Phase 4**: Build admin user management API
5. **Phase 5**: Connect frontend to API
6. **Phase 6**: Add menu randomization logic
7. **Phase 7**: Integrate restaurant features
8. **Phase 8**: Testing & deployment

See [TODO.md](./TODO.md) for detailed development roadmap.

## 🐳 Docker Compose Services

The `docker-compose.yml` defines three services:

### 1. PostgreSQL Database
- **Image**: postgres:15-alpine
- **Port**: 5432
- **Volume**: `postgres_data` (persists data)
- **Health Check**: Enabled

### 2. Express Backend
- **Build**: From `backend/Dockerfile`
- **Port**: 5000
- **Depends on**: PostgreSQL (waits for health check)
- **Hot Reload**: Enabled via volume mount

### 3. React Frontend
- **Build**: From `frontend/Dockerfile`
- **Port**: 3000
- **Depends on**: Backend service
- **Hot Reload**: Enabled via volume mount

## 🔧 Environment Variables

See `.env` file for configuration. Key variables:

```
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# Frontend API
VITE_API_URL=http://localhost:5000
```

## ⚠️ Important Security Notes

- **Change JWT_SECRET** before deploying to production
- Never commit `.env` files with real secrets
- Use strong passwords in production
- Enable HTTPS in production
- Implement rate limiting on API endpoints
- Add input validation on all endpoints

## 📚 Useful Commands

```bash
# Stop all services
docker-compose down

# Stop services and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute command in running container
docker-compose exec backend npm run prisma:studio

# Rebuild all services
docker-compose build --no-cache
```

## 🤝 Contributing

- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Update TODO.md when adding new features

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com)

## 🆘 Troubleshooting

### Port Already in Use
If port 3000, 5000, or 5432 is already in use:
```bash
docker-compose down  # Stop current containers
# Or change ports in docker-compose.yml
```

### Database Connection Error
```bash
# Check database health
docker-compose ps

# Restart database service
docker-compose restart postgres
```

### Node modules issues
```bash
# Rebuild without cache
docker-compose build --no-cache

# Start fresh
docker-compose down -v
docker-compose up --build
```

---

Happy coding! 🚀

For questions or issues, refer to [TODO.md](./TODO.md) or the individual README files in `backend/` and `frontend/` directories.
