import { Router, Request, Response } from 'express';
import noteController from '../controllers/noteController';
import { validate } from '../middlewares/validate';
import {
  createNoteValidation,
  updateNoteValidation,
  noteIdValidation,
  categoryIdQueryValidation,
} from '../validations/note';

const router = Router();

router.get('/archived', categoryIdQueryValidation, validate, (req: Request, res: Response) => noteController.getArchivedNotes(req, res));
router.get('/:id', noteIdValidation, validate, (req: Request, res: Response) => noteController.getNoteById(req, res));
router.get('/', categoryIdQueryValidation, validate, (req: Request, res: Response) => noteController.getNotes(req, res));
router.post('/', createNoteValidation, validate, (req: Request, res: Response) => noteController.createNote(req, res));
router.put('/:id', updateNoteValidation, validate, (req: Request, res: Response) => noteController.updateNote(req, res));
router.delete('/:id', noteIdValidation, validate, (req: Request, res: Response) => noteController.deleteNote(req, res));
router.put('/:id/archive', noteIdValidation, validate, (req: Request, res: Response) => noteController.archiveNote(req, res));
router.put('/:id/unarchive', noteIdValidation, validate, (req: Request, res: Response) => noteController.unarchiveNote(req, res));

export default router;
