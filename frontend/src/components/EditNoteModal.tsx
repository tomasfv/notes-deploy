import { useState, useEffect } from 'react';
import { Note, Category } from '../types';
import { categoryService } from '../services/categoryService';
import { noteSchema } from '../validations/note';

interface EditNoteModalProps {
  isOpen: boolean;
  note: Note | null;
  onClose: () => void;
  onSubmit: (id: string, title: string, content: string, categoryIds?: string[]) => void;
}

const EditNoteModal = ({ isOpen, note, onClose, onSubmit }: EditNoteModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    if (isOpen) {
      categoryService.getCategories().then(setCategories).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedCategoryIds(note.categories?.map((c) => c.id) || []);
    }
  }, [note]);

  if (!isOpen || !note) return null;

  const validate = () => {
    const result = noteSchema.safeParse({ title, content });
    if (!result.success) {
      const fieldErrors: { title?: string; content?: string } = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as 'title' | 'content';
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(note.id, title.trim(), content.trim(), selectedCategoryIds);
    setErrors({});
    onClose();
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl transform transition-all">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100">
          <h2 className="text-xl font-semibold text-zinc-900">Edit Note</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 transition-colors p-1 hover:bg-zinc-100 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: undefined })); }}
              maxLength={200}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-zinc-900 transition-all ${
                errors.title ? 'border-red-500' : 'border-zinc-200'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1.5">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => { setContent(e.target.value); setErrors((prev) => ({ ...prev, content: undefined })); }}
              rows={6}
              maxLength={5000}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-zinc-900 resize-none transition-all ${
                errors.content ? 'border-red-500' : 'border-zinc-200'
              }`}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1.5">{errors.content}</p>}
          </div>
          {categories.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    title={category.name}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 max-w-[140px] truncate ${
                      selectedCategoryIds.includes(category.id)
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-150 font-medium shadow-sm hover:shadow-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
