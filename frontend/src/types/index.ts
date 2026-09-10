export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  categories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  categoryIds?: string[];
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  categoryIds?: string[];
}
