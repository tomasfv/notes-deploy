import { Request, Response } from 'express';
import noteService from '../services/noteService';

class NoteController {
  async getNotes(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.query;
      const notes = await noteService.getActiveNotes(categoryId as string | undefined);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getArchivedNotes(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.query;
      const notes = await noteService.getArchivedNotes(categoryId as string | undefined);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getNoteById(req: Request, res: Response): Promise<void> {
    try {
      const note = await noteService.getNoteById(req.params.id);
      res.json(note);
    } catch (error) {
      if (error instanceof Error && error.message === 'Note not found') {
        res.status(404).json({ message: 'Note not found' });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createNote(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, categoryIds } = req.body;
      const note = await noteService.createNote({ title, content, categoryIds });
      res.status(201).json(note);
    } catch (error) {
      if (error instanceof Error && (error.message === 'Title is required' || error.message === 'Content is required')) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, categoryIds } = req.body;
      const note = await noteService.updateNote(req.params.id, { title, content, categoryIds });
      res.json(note);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Note not found') {
          res.status(404).json({ message: 'Note not found' });
          return;
        }
        if (error.message === 'Title cannot be empty' || error.message === 'Content cannot be empty') {
          res.status(400).json({ message: error.message });
          return;
        }
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      await noteService.deleteNote(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === 'Note not found') {
        res.status(404).json({ message: 'Note not found' });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async archiveNote(req: Request, res: Response): Promise<void> {
    try {
      const note = await noteService.archiveNote(req.params.id);
      res.json(note);
    } catch (error) {
      if (error instanceof Error && error.message === 'Note not found') {
        res.status(404).json({ message: 'Note not found' });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async unarchiveNote(req: Request, res: Response): Promise<void> {
    try {
      const note = await noteService.unarchiveNote(req.params.id);
      res.json(note);
    } catch (error) {
      if (error instanceof Error && error.message === 'Note not found') {
        res.status(404).json({ message: 'Note not found' });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new NoteController();
