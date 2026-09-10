import axios from 'axios';
import { Note, CreateNoteData, UpdateNoteData } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api',
});

export const noteService = {
  async getActiveNotes(categoryId?: string): Promise<Note[]> {
    const params = categoryId ? { categoryId } : {};
    const { data } = await api.get<Note[]>('/notes', { params });
    return data;
  },

  async getArchivedNotes(categoryId?: string): Promise<Note[]> {
    const params = categoryId ? { categoryId } : {};
    const { data } = await api.get<Note[]>('/notes/archived', { params });
    return data;
  },

  async getNoteById(id: string): Promise<Note> {
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
  },

  async createNote(noteData: CreateNoteData): Promise<Note> {
    const { data } = await api.post<Note>('/notes', noteData);
    return data;
  },

  async updateNote(id: string, noteData: UpdateNoteData): Promise<Note> {
    const { data } = await api.put<Note>(`/notes/${id}`, noteData);
    return data;
  },

  async deleteNote(id: string): Promise<void> {
    await api.delete(`/notes/${id}`);
  },

  async archiveNote(id: string): Promise<Note> {
    const { data } = await api.put<Note>(`/notes/${id}/archive`);
    return data;
  },

  async unarchiveNote(id: string): Promise<Note> {
    const { data } = await api.put<Note>(`/notes/${id}/unarchive`);
    return data;
  },
};
