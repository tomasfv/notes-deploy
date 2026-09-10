# Ensolvers Notes Challenge

A full-stack web application for creating, editing, archiving, and filtering notes with categories.

## Live Deployment

- **Frontend:** https://notes-deploy-two.vercel.app
- **Backend API:** https://notes-deploy-production.up.railway.app
- **Health Check:** https://notes-deploy-production.up.railway.app/api/health

## Tech Stack

### Frontend

| Technology | Version |
|------------|---------|
| React | ^18.2.0 |
| TypeScript | ^5.3.3 |
| Vite | ^5.0.10 |
| Tailwind CSS | ^3.4.0 |
| Axios | ^1.6.2 |
| React Router DOM | ^7.18.3 |
| React Hot Toast | ^2.5.2 |
| Zod | ^4.6.1 |

### Backend

| Technology | Version |
|------------|---------|
| Node.js | >= 20.x |
| Express | ^4.18.2 |
| Sequelize | ^6.35.2 |
| PostgreSQL | >= 16 |
| TypeScript | ^5.3.3 |
| Express Validator | ^7.3.2 |

## Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | >= 20.x | https://nodejs.org |
| npm | >= 10.x | Comes with Node.js |
| PostgreSQL | >= 16 | https://www.postgresql.org |

## Installation

### Linux / macOS

Run the setup script with a single command:

```bash
chmod +x setup.sh
./setup.sh
```

This will:
1. Verify Node.js and PostgreSQL are installed
2. Create the `ensolvers_notes` database if it doesn't exist
3. Install all dependencies (backend, frontend, root)
4. Start both servers (backend on port 3000, frontend on port 5173)

### Windows

Since the setup script is designed for Linux/macOS, follow these manual steps:

**1. Verify prerequisites:**

```bash
node --version
npm --version
psql --version
```

**2. Create the database:**

```bash
psql -U postgres -c "CREATE DATABASE ensolvers_notes"
```

**3. Install dependencies:**

```bash
# Root
npm install

# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

**4. Start the app:**

```bash
npm run dev
```

## Environment Variables

### Backend (local)

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ensolvers_notes
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### Backend (Railway)

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `${{PostgreSQL.DATABASE_URL}}` (auto-linked) |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://notes-deploy-two.vercel.app` |

### Frontend (Vercel)

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://notes-deploy-production.up.railway.app` |

## Running the App

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `cd backend && npm run dev` | Start only the backend |
| `cd frontend && npm run dev` | Start only the frontend |

### Access URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/api/health

## API Endpoints

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | List all active notes |
| GET | /api/notes/archived | List all archived notes |
| GET | /api/notes/:id | Get a note by ID |
| POST | /api/notes | Create a new note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |
| PUT | /api/notes/:id/archive | Archive a note |
| PUT | /api/notes/:id/unarchive | Unarchive a note |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | List all categories |
| POST | /api/categories | Create a category |
| DELETE | /api/categories/:id | Delete a category |
| POST | /api/notes/:id/categories | Assign categories to a note |
| DELETE | /api/notes/:id/categories/:categoryId | Remove a category from a note |

## Features

### Toast Notifications (React Hot Toast)

Non-intrusive toast notifications for user feedback:

| Action | Toast |
|--------|-------|
| Create note | Success / Error |
| Edit note | Success / Error |
| Delete note | Confirmation dialog → Success / Error |
| Archive note | Success / Error |
| Unarchive note | Success / Error |
| Create category | Success / Error |
| Edit category | Success / Error |
| Delete category | Confirmation dialog → Success / Error |

- Toasts are centered at the top of the screen
- Delete operations show a confirmation dialog before proceeding

### Input Validation

Validation is implemented on both backend and frontend:

- **Backend:** Express Validator middleware validates all request body and params before reaching controllers
- **Frontend:** Zod schemas validate form inputs with inline error messages

| Field | Rule |
|-------|------|
| Note title | Required, 1-200 characters |
| Note content | Required, 1-5000 characters |
| Category name | Required, 1-100 characters |
| Note/Category ID | Must be a valid UUID |

### Note View Modal

Clicking a note card opens a read-only modal showing the full note content, so users can read long notes without entering edit mode.

### CI/CD

- **CI:** GitHub Actions runs TypeScript checks and tests on every push to `main`/`develop` and on pull requests
- **CD:** Automatic deployment via Railway (backend) and Vercel (frontend)

## Testing

### Run Tests

```bash
# Backend (21 tests)
cd backend && npm test

# Frontend (14 tests)
cd frontend && npm test
```

### Test Coverage

| Area | Backend | Frontend |
|------|---------|----------|
| Validation | 10 tests (express-validator) | 11 tests (zod schemas) |
| Services | 11 tests (CRUD logic, mocking) | 3 tests (API calls) |
| **Total** | **21 tests** | **14 tests** |

## Project Structure

```
├── .github/workflows/ci.yml  # GitHub Actions CI
├── setup.sh              # Setup script for Linux/macOS
├── package.json          # Root package with concurrently
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── models/       # Sequelize models
│   │   ├── repositories/ # Data access layer
│   │   ├── services/     # Business logic layer
│   │   ├── controllers/  # HTTP request handlers
│   │   ├── routes/       # API routes
│   │   ├── validations/  # Express Validator schemas
│   │   ├── middlewares/  # Express middlewares (validate, errorHandler)
│   │   ├── __tests__/    # Jest unit tests
│   │   ├── app.ts        # Express app setup
│   │   └── server.ts     # Server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Page components
    │   ├── services/     # API service (Axios)
    │   ├── validations/  # Zod schemas
    │   ├── types/        # TypeScript interfaces
    │   ├── __tests__/    # Jest unit tests
    │   └── App.tsx       # Main app with routing
    └── package.json
```
