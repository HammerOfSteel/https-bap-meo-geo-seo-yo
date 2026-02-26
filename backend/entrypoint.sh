#!/bin/sh

echo "🚀 RandomMenu Backend Initialization"
echo "====================================="
echo ""

echo "⏳ Waiting for database to be ready..."
sleep 15

echo "📦 Generating Prisma Client..."
npm run prisma:generate

echo "🗄️ Setting up database schema..."
npx prisma db push --skip-generate --accept-data-loss

echo "🌱 Populating database with seed data..."
npm run prisma:seed

echo ""
echo "✅ Initialization complete!"
echo "🚀 Starting server..."
echo ""

# Use exec to replace the shell process with npm start
exec npm start
