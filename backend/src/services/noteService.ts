import noteRepository from '../repositories/noteRepository';
import { Note } from '../models';

interface CreateNoteData {
  title: string;
  content: string;
  categoryIds?: string[];
}

interface UpdateNoteData {
  title?: string;
  content?: string;
  categoryIds?: string[];
}

class NoteService {
  async getActiveNotes(categoryId?: string): Promise<Note[]> {
    if (categoryId) {
      return noteRepository.findByCategoryId(categoryId, false);
    }
    return noteRepository.findAll(false);
  }

  async getArchivedNotes(categoryId?: string): Promise<Note[]> {
    if (categoryId) {
      return noteRepository.findByCategoryId(categoryId, true);
    }
    return noteRepository.findAll(true);
  }

  async getNoteById(id: string): Promise<Note> {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  }

  async createNote(data: CreateNoteData): Promise<Note> {
    if (!data.title || data.title.trim() === '') {
      throw new Error('Title is required');
    }
    if (!data.content || data.content.trim() === '') {
      throw new Error('Content is required');
    }
    return noteRepository.create({
      title: data.title.trim(),
      content: data.content.trim(),
      categoryIds: data.categoryIds,
    });
  }

  async updateNote(id: string, data: UpdateNoteData): Promise<Note> {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    if (data.title !== undefined && data.title.trim() === '') {
      throw new Error('Title cannot be empty');
    }
    if (data.content !== undefined && data.content.trim() === '') {
      throw new Error('Content cannot be empty');
    }
    const updateData: { title?: string; content?: string; categoryIds?: string[] } = {};
    if (data.title !== undefined) updateData.title = data.title.trim();
    if (data.content !== undefined) updateData.content = data.content.trim();
    if (data.categoryIds !== undefined) updateData.categoryIds = data.categoryIds;
    return noteRepository.update(id, updateData) as Promise<Note>;
  }

  async deleteNote(id: string): Promise<void> {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    await noteRepository.delete(id);
  }

  async archiveNote(id: string): Promise<Note> {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    return noteRepository.update(id, { archived: true }) as Promise<Note>;
  }

  async unarchiveNote(id: string): Promise<Note> {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    return noteRepository.update(id, { archived: false }) as Promise<Note>;
  }
}

export default new NoteService();
