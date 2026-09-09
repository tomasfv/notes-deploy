import { Router } from 'express';
import noteController from '../controllers/noteController';

const router = Router();

router.get('/archived', (req, res) => noteController.getArchivedNotes(req, res));
router.get('/:id', (req, res) => noteController.getNoteById(req, res));
router.get('/', (req, res) => noteController.getNotes(req, res));
router.post('/', (req, res) => noteController.createNote(req, res));
router.put('/:id', (req, res) => noteController.updateNote(req, res));
router.delete('/:id', (req, res) => noteController.deleteNote(req, res));
router.put('/:id/archive', (req, res) => noteController.archiveNote(req, res));
router.put('/:id/unarchive', (req, res) => noteController.unarchiveNote(req, res));

export default router;
