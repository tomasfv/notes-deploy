# Ensolvers Notes Challenge

A full-stack web application for creating, editing, archiving, and filtering notes with categories.

## Live Deployment

- **Frontend:** https://notes-deploy-two.vercel.app
- **Backend API:** https://notes-deploy-production.up.railway.app
- **Health Check:** https://notes-deploy-production.up.railway.app/api/health

## Login Credentials
- **Username:** admin
- **Password:** admin123

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
| React Hot Toast | ^2.6.0 |
| Zod | ^4.6.1 |
| Jest | ^30.5.1 |
| ts-jest | ^29.4.12 |
| @testing-library/react | ^14.3.1 |
| @testing-library/user-event | ^14.6.7 |
| @testing-library/jest-dom | ^7.0.1 |

### Backend

| Technology | Version |
|------------|---------|
| Node.js | >= 20.x |
| Express | ^4.18.2 |
| Sequelize | ^6.35.2 |
| PostgreSQL | >= 16 |
| TypeScript | ^5.3.3 |
| Express Validator | ^7.3.2 |
| bcryptjs | ^3.0.3 |
| jsonwebtoken | ^9.0.3 |
| Jest | ^30.5.1 |
| ts-jest | ^29.4.12 |

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

### Docker (Development)

Run the entire stack with Docker Compose (backend + frontend + PostgreSQL):

```bash
docker-compose up
```

This will:
1. Start PostgreSQL on port 5432
2. Build and start the backend on port 3000
3. Build and start the frontend on port 5173

**Other commands:**

```bash
docker-compose up -d          # Detached mode
docker-compose down           # Stop all containers
docker-compose up --build     # Rebuild images
docker-compose down -v        # Stop and remove volumes (resets DB)
```

**URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

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
JWT_SECRET=your_jwt_secret_here
```

### Backend (Railway)

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `${{PostgreSQL.DATABASE_URL}}` (auto-linked) |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://notes-deploy-two.vercel.app` |
| `JWT_SECRET` | `your_production_jwt_secret` |

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

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Login, returns JWT token |
| GET | /api/auth/me | Yes | Returns current user info |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Returns `{ status: 'ok' }` |

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
| PUT | /api/categories/:id | Update a category |
| DELETE | /api/categories/:id | Delete a category |

## Features

### Authentication (JWT)

Simple authentication with JWT tokens:

| Action | Description |
|--------|-------------|
| Login | Redirects to `/login` if no token is found |
| Logout | Clears token and redirects to `/login` |
| Protected routes | All routes except `/login` require a valid JWT token |
| Auto-redirect | If token expires or is invalid, user is redirected to `/login` |

**Default credentials:**

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

The default user is created automatically on first server startup.

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

### Responsive Design

The app is fully responsive for mobile and desktop:

| Viewport | Sidebar | Hamburger | Content |
|----------|---------|-----------|---------|
| Mobile (< 768px) | Hidden, overlay on open | Visible (top-left) | Full width with top padding |
| Desktop (>= 768px) | Always visible, fixed | Hidden | Shifted right (ml-64) |

**Mobile features:**
- Hamburger menu button with SVG icon in a fixed top header
- Sidebar slides in from the left with backdrop overlay
- Clicking a link or the backdrop closes the sidebar
- Smooth transitions (200ms ease-in-out)
- Note/category titles truncate with ellipsis
- Grids adapt: 1 col (mobile) → 2 cols → 3 cols → 4 cols (desktop)

### CI/CD

- **CI:** GitHub Actions runs TypeScript checks and tests on every push to `main`/`develop` and on pull requests
- **CD:** Automatic deployment via Railway (backend) and Vercel (frontend)

## Testing

### Run Tests

```bash
# Backend (21 tests)
cd backend && npm test

# Frontend (29 tests)
cd frontend && npm test
```

### Test Coverage

| Area | Backend | Frontend |
|------|---------|----------|
| Validation | 10 tests (express-validator) | 11 tests (zod schemas) |
| Services | 11 tests (CRUD logic, mocking) | 3 tests (API calls) |
| Components | - | 15 tests (RTL, user interactions) |
| **Total** | **21 tests** | **29 tests** |

## Project Structure

```
├── .gitattributes           # Force LF line endings for shell scripts
├── .github/workflows/ci.yml # GitHub Actions CI
├── docker-compose.yml       # Docker Compose (dev)
├── setup.sh                 # Setup script for Linux/macOS
├── package.json             # Root package with concurrently
├── backend/
│   ├── Dockerfile           # Docker image for backend
│   ├── .dockerignore        # Docker ignore rules
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── models/          # Sequelize models (Note, Category, User)
│   │   ├── repositories/    # Data access layer
│   │   ├── services/        # Business logic layer (auth, note, category)
│   │   ├── controllers/     # HTTP request handlers
│   │   ├── routes/          # API routes (auth, notes, categories)
│   │   ├── validations/     # Express Validator schemas
│   │   ├── middlewares/     # Express middlewares (auth, validate, errorHandler)
│   │   ├── seeders/         # Auto-seed default user on startup
│   │   ├── __tests__/       # Jest unit tests
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   └── package.json
└── frontend/
    ├── Dockerfile           # Docker image for frontend
    ├── .dockerignore        # Docker ignore rules
    ├── src/
    │   ├── components/      # Reusable UI components (Sidebar, Modals, Cards)
    │   ├── pages/           # Page components (Notes, Categories, Archived, Login)
    │   ├── services/        # API services (auth, notes, categories)
    │   ├── validations/     # Zod schemas
    │   ├── types/           # TypeScript interfaces
    │   ├── __tests__/       # Jest unit tests
    │   │   ├── setup.ts     # Jest setup (jest-dom, TextEncoder)
    │   │   └── components/  # RTL component tests
    │   └── App.tsx          # Main app with routing
    └── package.json
```
