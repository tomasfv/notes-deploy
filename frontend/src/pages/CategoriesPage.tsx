import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Category } from '../types';
import { categoryService } from '../services/categoryService';
import { categorySchema } from '../validations/category';
import DropdownMenu from '../components/DropdownMenu';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newName, setNewName] = useState('');
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNameError('');
    const result = categorySchema.safeParse({ name: newName });
    if (!result.success) {
      setNameError(result.error.issues[0].message);
      return;
    }
    try {
      const created = await categoryService.createCategory(newName.trim());
      setCategories([...categories, created]);
      setNewName('');
      setIsCreateModalOpen(false);
      toast.success('Category created');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create category');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNameError('');
    if (!selectedCategory) return;
    const result = categorySchema.safeParse({ name: editName });
    if (!result.success) {
      setNameError(result.error.issues[0].message);
      return;
    }
    try {
      const updated = await categoryService.updateCategory(selectedCategory.id, editName.trim());
      setCategories(categories.map((c) => (c.id === updated.id ? updated : c)));
      setEditName('');
      setIsEditModalOpen(false);
      setSelectedCategory(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update category');
    }
  };

  const confirmDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-medium text-zinc-900">Delete this category?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await categoryService.deleteCategory(id);
                setCategories((prev) => prev.filter((c) => c.id !== id));
                toast.success('Category deleted');
              } catch (err) {
                toast.error('Failed to delete category');
              }
            }}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
          >
            Yes, delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-zinc-200 text-zinc-700 text-sm rounded-lg hover:bg-zinc-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setIsEditModalOpen(true);
    setError('');
    setNameError('');
  };

  const openCreateModal = () => {
    setNewName('');
    setError('');
    setNameError('');
    setIsCreateModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-500">Loading categories...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Categories</h1>
          <p className="text-zinc-500 mt-1">{categories.length} categories</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          + New Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-white border border-zinc-200 rounded-lg">
          <p className="text-zinc-400">No categories yet. Create one to organize your notes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-zinc-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-zinc-900 text-lg truncate min-w-0 pr-8">{category.name}</h3>
                <DropdownMenu
                  items={[
                    { label: 'Edit', onClick: () => openEditModal(category) },
                    { label: 'Delete', onClick: () => confirmDelete(category.id) },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center p-5 border-b border-zinc-200">
              <h2 className="text-lg font-semibold text-zinc-900">New Category</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-5">
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Category name"
                  value={newName}
                  onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
                  maxLength={100}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 text-zinc-900 ${
                    nameError ? 'border-red-500' : 'border-zinc-300'
                  }`}
                  autoFocus
                />
                {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center p-5 border-b border-zinc-200">
              <h2 className="text-lg font-semibold text-zinc-900">Edit Category</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedCategory(null);
                }}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEdit} className="p-5">
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Category name"
                  value={editName}
                  onChange={(e) => { setEditName(e.target.value); setNameError(''); }}
                  maxLength={100}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 text-zinc-900 ${
                    nameError ? 'border-red-500' : 'border-zinc-300'
                  }`}
                  autoFocus
                />
                {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
