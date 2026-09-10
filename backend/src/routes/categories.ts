import { Router, Request, Response } from 'express';
import categoryController from '../controllers/categoryController';
import { validate } from '../middlewares/validate';
import {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation,
} from '../validations/category';

const router = Router();

router.get('/', (req: Request, res: Response) => categoryController.getCategories(req, res));
router.post('/', createCategoryValidation, validate, (req: Request, res: Response) => categoryController.createCategory(req, res));
router.put('/:id', updateCategoryValidation, validate, (req: Request, res: Response) => categoryController.updateCategory(req, res));
router.delete('/:id', categoryIdValidation, validate, (req: Request, res: Response) => categoryController.deleteCategory(req, res));

export default router;
