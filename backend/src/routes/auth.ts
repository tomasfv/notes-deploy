import { Router } from 'express';
import { authController } from '../controllers/authController';
import { loginValidation } from '../validations/auth';
import { validate } from '../middlewares/validate';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/login', loginValidation, validate, authController.login);
router.get('/me', authMiddleware, authController.me);

export default router;
