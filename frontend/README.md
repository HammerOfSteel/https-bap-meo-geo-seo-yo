# RandomMenu Frontend Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
npm run preview # Preview production build locally
```

## Project Structure

```
src/
├── pages/      # Page components (Login, Register, Dashboard, etc.)
├── components/ # Reusable components (Navbar, ProtectedRoute, etc.)
├── context/    # React Context for state management (Auth, etc.)
├── services/   # API service functions (coming soon)
├── types/      # TypeScript type definitions (coming soon)
├── App.tsx     # Main app component
└── main.tsx    # Entry point
```

## Features

### Current Implementation
- ✅ Authentication UI (Login/Register pages)
- ✅ Protected routes with role-based access
- ✅ Admin page template
- ✅ Dashboard template
- ✅ Responsive Tailwind CSS styling
- ✅ JWT token management

### Coming Soon
- Menu management interface
- Menu item addition and editing
- Menu randomization UI
- User profile pages
- Admin user management interface
- Restaurant link integration
- Rating system UI

## Environment Variables

See `.env.example` for all required environment variables.

## Technologies Used
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
