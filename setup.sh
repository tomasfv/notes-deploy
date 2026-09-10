#!/bin/bash
set -e

echo "🚀 Setting up Ensolvers Notes..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Install it from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is required. Install it from https://www.postgresql.org"
    exit 1
fi

echo "✅ PostgreSQL found"

# Create database if it doesn't exist
echo "📦 Creating database..."
if ! sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = 'ensolvers_notes'" | grep -q 1; then
    sudo -u postgres psql -c "CREATE DATABASE ensolvers_notes"
    echo "✅ Database created"
else
    echo "✅ Database already exists"
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install root dependencies (concurrently)
echo "📦 Installing root dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting app..."
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
