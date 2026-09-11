import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRouter from './routes/notes';
import categoriesRouter from './routes/categories';
import authRouter from './routes/auth';
import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/auth';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', authMiddleware, notesRouter);
app.use('/api/categories', authMiddleware, categoriesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

export default app;
