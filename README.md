# RandomMenu - MVP 2.0
A modern web application for creating and managing randomized meal menus with user authentication and admin controls.

## Overview
RandomMenu is a full-stack application that allows users to build personalized randomized menus with food items and drinks. Users can save their menus, link to restaurants serving items, and rate them. Admin users have access to a dedicated UI for managing users and platform content.

**Current Version:** MVP 2.0 (85% Complete)  
**Last Updated:** February 26, 2026  
**Previous Version:** [Original Korean Food Tips App](https://bap-meo-geo-seo-yo.onrender.com/)

## MVP 2.0 Features

### Core Functionality
- **User Authentication**: Secure login system with email/password
- **User Roles**: 
  - **User**: Can create menus, add food items and drinks, save menus, and rate items
  - **Admin**: Full user management (CRUD), content monitoring, and system administration
- **Menu Management**:
  - Create randomized menus with food items and drinks
  - Add items with descriptions, cuisine type, and optional restaurant links
  - Save menus for later access
  - Rate menu items (1-5 stars)
- **Admin Interface**: Full CRUD operations for user management
- **Responsive UI**: Modern web interface for optimal viewing on all devices

## Tech Stack

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **API**: REST API with proper error handling

### Frontend
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Redux
- **UI Components**: Modern component library (to be selected)
- **HTTP Client**: Axios or Fetch API

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL in container

## Project Structure
```
/
├── docker-compose.yml
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── utils/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### Installation & Running
```bash
# Start all services with Docker Compose
docker-compose up --build

# Application will be available at http://localhost:3000
# API will be available at http://localhost:5000
```

## Future Enhancements (MVP 2.1+)
See [TODO.md](./TODO.md) for detailed roadmap
