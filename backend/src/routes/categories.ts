import { Router } from 'express';
import categoryController from '../controllers/categoryController';

const router = Router();

router.get('/', (req, res) => categoryController.getCategories(req, res));
router.post('/', (req, res) => categoryController.createCategory(req, res));
router.put('/:id', (req, res) => categoryController.updateCategory(req, res));
router.delete('/:id', (req, res) => categoryController.deleteCategory(req, res));

export default router;
