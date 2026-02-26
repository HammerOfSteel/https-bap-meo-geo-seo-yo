# RandomMenu Backend Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with test users and menu items
npm run prisma:seed

# Start development server
npm run dev
```

## Database Seeding

The seed script (`prisma/seed.ts`) automatically creates:

### Test Users
- **Admin User**
  - Username: `adminuser`
  - Email: `adminuser@local.com`
  - Password: `adminpass`
  - Role: `ADMIN`

- **Regular User**
  - Username: `testuser`
  - Email: `test@randommenu.com`
  - Password: `testuser`
  - Role: `USER`

### Sample Data
- 2 menus (one for each user)
- 15 Korean food and drink items with:
  - Names in English and Korean
  - Descriptions
  - Cuisine type
  - Food/Drink classification
  - Restaurant search links (Google Maps)
  - Ratings (1-5 stars)

To re-seed the database (clears all data first):
```bash
npm run prisma:seed
```

## API Endpoints (Coming Soon)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `DELETE /api/users/me` - Delete user account

### Menus
- `POST /api/menus` - Create new menu
- `GET /api/menus` - Get user's menus
- `GET /api/menus/:id` - Get specific menu
- `PUT /api/menus/:id` - Update menu
- `DELETE /api/menus/:id` - Delete menu
- `POST /api/menus/:id/randomize` - Randomize menu items

### Menu Items
- `POST /api/menus/:id/items` - Add item to menu
- `PUT /api/menus/:menuId/items/:itemId` - Update menu item
- `DELETE /api/menus/:menuId/items/:itemId` - Delete menu item

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## Environment Variables

See `.env.example` for all required environment variables.

## Database Schema

The database includes the following tables:
- `User` - User accounts with role-based access
- `Menu` - User's created menus
- `MenuItem` - Individual food/drink items in menus

See `prisma/schema.prisma` for full schema definition.
