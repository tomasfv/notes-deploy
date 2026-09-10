import { body, param } from 'express-validator';

export const createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ max: 100 }).withMessage('Category name must be 100 characters or less'),
];

export const updateCategoryValidation = [
  param('id').isUUID().withMessage('Invalid category ID'),
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ max: 100 }).withMessage('Category name must be 100 characters or less'),
];

export const categoryIdValidation = [
  param('id').isUUID().withMessage('Invalid category ID'),
];
