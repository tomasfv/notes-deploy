import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-zinc-900 text-white fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-zinc-700">
        <h1 className="text-xl font-bold tracking-tight">ENSOLVERS</h1>
        <p className="text-xs text-zinc-400 mt-1">Notes App</p>
      </div>
      <nav className="flex-1 p-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive
                ? 'bg-white text-zinc-900'
                : 'text-zinc-300 hover:bg-zinc-800'
            }`
          }
        >
          <span className="text-lg">📝</span>
          <span className="font-medium">All Notes</span>
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive
                ? 'bg-white text-zinc-900'
                : 'text-zinc-300 hover:bg-zinc-800'
            }`
          }
        >
          <span className="text-lg">📁</span>
          <span className="font-medium">Categories</span>
        </NavLink>
        <NavLink
          to="/archived"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive
                ? 'bg-white text-zinc-900'
                : 'text-zinc-300 hover:bg-zinc-800'
            }`
          }
        >
          <span className="text-lg">📦</span>
          <span className="font-medium">Archived Notes</span>
        </NavLink>
      </nav>
      <div className="p-4 border-t border-zinc-700 text-xs text-zinc-500">
        v1.0.0
      </div>
    </aside>
  );
};

export default Sidebar;
