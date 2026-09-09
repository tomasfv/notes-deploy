import axios from 'axios';
import { Note, CreateNoteData, UpdateNoteData } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const noteService = {
  async getActiveNotes(): Promise<Note[]> {
    const { data } = await api.get<Note[]>('/notes');
    return data;
  },

  async getArchivedNotes(): Promise<Note[]> {
    const { data } = await api.get<Note[]>('/notes/archived');
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
