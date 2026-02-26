# Database Seeding & Login Credentials

## Test Users Created

### Admin Account
```
Email: adminuser@local.com
Password: adminpass
Role: ADMIN
```

### Regular User Account
```
Email: testuser@local.com
Password: testuser
Role: USER
```

---

## Database Content

### Menus
- **Korean Favorites** (testuser's menu with 15 items)
- **Admin Menu Library** (admin's menu with 5 sample items)

### Menu Items (15 Korean Foods & Drinks)

#### Foods 🍽️
1. **Bibimbap** - Mixed rice with vegetables and fried egg
2. **Bulgogi** - Marinated grilled beef
3. **Kimchi Jjigae** - Spicy kimchi stew
4. **Tteokbokki** - Spicy rice cakes
5. **Japchae** - Glass noodle stir-fry
6. **Samgyeopsal** - Grilled pork belly
7. **Dakgangjeong** - Crispy fried chicken in sweet/spicy sauce
8. **Hodugomul** - Sweet red bean pastry
9. **Galbi** - Grilled short ribs
10. **Sundubu Jjigae** - Soft tofu stew
11. **Gimbap** - Seaweed rice rolls

#### Drinks 🥤
1. **Sikhye** - Sweet rice drink
2. **Yujacha** - Warm citrus tea
3. **Korean Iced Coffee** - Cold brew coffee
4. **Omija Tea** - Five-flavor berry tea

### Item Details Include
✅ **Names** - English + Korean (Hangul)  
✅ **Descriptions** - What's in the dish  
✅ **Cuisine Type** - Korean  
✅ **Type** - Food or Drink  
✅ **Images** - High-quality food photos from Unsplash  
✅ **Ratings** - 1-5 stars (3-5 for all items)  
✅ **Restaurant Links** - Google Maps search links

---

## Quick Start (Docker)

```bash
# Navigate to project
cd /Users/terrygoleman/Documents/dev/https-bap-meo-geo-seo-yo

# Start all services (database, backend, frontend)
docker-compose up --build

# The database will be automatically initialized with:
# - Schema created
# - Test users added
# - Menu items seeded
# - All with images and ratings
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Postgres**: localhost:5432

---

## Testing the Setup

1. **Login as Admin**
   - Go to http://localhost:3000/login
   - Email: `adminuser@local.com`
   - Password: `adminpass`

2. **Login as Regular User**
   - Email: `testuser@local.com`
   - Password: `testuser`

3. **Test API**
   ```bash
   # Health check
   curl http://localhost:5000/api/health
   ```

---

## Database Commands

```bash
# View database in Prisma Studio
docker-compose exec backend npm run prisma:studio

# Manually reseed database (clears and repopulates)
docker-compose exec backend npm run prisma:seed

# View database migrations
docker-compose exec backend npx prisma migrate status

# Reset database completely
docker-compose exec backend npx prisma migrate reset
```

---

## Database Schema

### Users Table
```
- id (String, primary key)
- email (String, unique)
- username (String, unique)
- password (String, hashed with bcrypt)
- role (ENUM: USER | ADMIN)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Menus Table
```
- id (String, primary key)
- title (String)
- userId (Foreign key to User)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Menu Items Table
```
- id (String, primary key)
- name (String)
- description (String, optional)
- cuisineType (String, optional)
- restaurantUrl (String, optional)
- imageUrl (String, with fallback placeholder)
- rating (SmallInt 1-5, optional)
- itemType (ENUM: FOOD | DRINK)
- menuId (Foreign key to Menu)
- createdAt (DateTime)
- updatedAt (DateTime)
```

---

## Security Notes

⚠️ **Important for Production:**
- Change `JWT_SECRET` in `.env`
- Use strong passwords
- Enable HTTPS
- Add rate limiting
- Enable CORS restrictions
- Use environment-specific settings

---

## Files Modified/Created

**New Files:**
- `backend/prisma/seed.ts` - Database seeding script
- `backend/entrypoint.sh` - Docker initialization script
- `SETUP.md` - Comprehensive setup guide
- `TODO.md` - Development roadmap

**Updated Files:**
- `backend/prisma/schema.prisma` - Added imageUrl field
- `backend/package.json` - Added seed scripts
- `backend/Dockerfile` - Set up automatic initialization
- `docker-compose.yml` - Added entrypoint configuration
- `.env` - Database and JWT configuration

---

Happy coding! 🚀
