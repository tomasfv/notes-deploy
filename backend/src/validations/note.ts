import { body, param, query } from 'express-validator';

export const createNoteValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be 200 characters or less'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 5000 }).withMessage('Content must be 5000 characters or less'),
  body('categoryIds')
    .optional()
    .isArray().withMessage('categoryIds must be an array'),
  body('categoryIds.*')
    .optional()
    .isUUID().withMessage('Each categoryId must be a valid UUID'),
];

export const updateNoteValidation = [
  param('id').isUUID().withMessage('Invalid note ID'),
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be 200 characters or less'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 5000 }).withMessage('Content must be 5000 characters or less'),
  body('categoryIds')
    .optional()
    .isArray().withMessage('categoryIds must be an array'),
  body('categoryIds.*')
    .optional()
    .isUUID().withMessage('Each categoryId must be a valid UUID'),
];

export const noteIdValidation = [
  param('id').isUUID().withMessage('Invalid note ID'),
];

export const categoryIdQueryValidation = [
  query('categoryId')
    .optional()
    .isUUID().withMessage('categoryId must be a valid UUID'),
];
