const CategoriesPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Categories</h1>
        <p className="text-zinc-500 mt-1">Organize your notes by category</p>
      </div>
      <div className="flex items-center justify-center h-64 bg-white border border-zinc-200 rounded-lg">
        <p className="text-zinc-400">No categories yet</p>
      </div>
    </div>
  );
};

export default CategoriesPage;
