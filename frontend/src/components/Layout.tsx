import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Mobile header with hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-900 z-20 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-1 hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-bold ml-3 text-lg">ENSOLVERS</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-zinc-400 hover:text-white text-sm transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

      {/* Main content */}
      <main className="p-4 pt-20 md:p-8 md:pt-8 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
