import { Note, Category } from '../models';

interface CreateNoteData {
  title: string;
  content: string;
  categoryIds?: string[];
}

interface UpdateNoteData {
  title?: string;
  content?: string;
  archived?: boolean;
  categoryIds?: string[];
}

class NoteRepository {
  async findAll(archived: boolean = false): Promise<Note[]> {
    return Note.findAll({
      where: { archived },
      include: [Category],
      order: [['createdAt', 'DESC']],
    });
  }

  async findById(id: string): Promise<Note | null> {
    return Note.findByPk(id, { include: [Category] });
  }

  async findByCategoryId(categoryId: string, archived: boolean = false): Promise<Note[]> {
    const { NoteCategory } = await import('../models');
    return Note.findAll({
      where: { archived },
      include: [
        {
          model: Category,
          where: { id: categoryId },
          through: { attributes: [] },
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async create(data: CreateNoteData): Promise<Note> {
    const note = await Note.create({ title: data.title, content: data.content });
    if (data.categoryIds && data.categoryIds.length > 0) {
      await note.setCategories(data.categoryIds);
    }
    return this.findById(note.id) as Promise<Note>;
  }

  async update(id: string, data: UpdateNoteData): Promise<Note | null> {
    const note = await Note.findByPk(id);
    if (!note) return null;
    const { categoryIds, ...updateData } = data;
    await note.update(updateData);
    if (categoryIds !== undefined) {
      await note.setCategories(categoryIds);
    }
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await Note.destroy({ where: { id } });
    return deleted > 0;
  }
}

export default new NoteRepository();
