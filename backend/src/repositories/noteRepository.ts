import { Note } from '../models';

interface CreateNoteData {
  title: string;
  content: string;
}

interface UpdateNoteData {
  title?: string;
  content?: string;
  archived?: boolean;
}

class NoteRepository {
  async findAll(archived: boolean = false): Promise<Note[]> {
    return Note.findAll({ where: { archived }, order: [['createdAt', 'DESC']] });
  }

  async findById(id: string): Promise<Note | null> {
    return Note.findByPk(id);
  }

  async create(data: CreateNoteData): Promise<Note> {
    return Note.create({ title: data.title, content: data.content });
  }

  async update(id: string, data: UpdateNoteData): Promise<Note | null> {
    const note = await Note.findByPk(id);
    if (!note) return null;
    await note.update(data);
    return note;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await Note.destroy({ where: { id } });
    return deleted > 0;
  }
}

export default new NoteRepository();
