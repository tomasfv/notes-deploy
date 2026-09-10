import { Request, Response } from 'express';
import categoryService from '../services/categoryService';

class CategoryController {
  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const category = await categoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Category name is required') {
          res.status(400).json({ message: error.message });
          return;
        }
        if (error.message === 'Category name already exists') {
          res.status(400).json({ message: error.message });
          return;
        }
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const category = await categoryService.updateCategory(req.params.id, name);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Category not found') {
          res.status(404).json({ message: error.message });
          return;
        }
        if (error.message === 'Category name is required' || error.message === 'Category name already exists') {
          res.status(400).json({ message: error.message });
          return;
        }
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === 'Category not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new CategoryController();
