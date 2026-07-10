import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-45 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4.5 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate(isLoggedIn ? '/dashboard' : '/')}
      >
        <i className='bx bx-analyse text-primary-500 text-3xl font-bold animate-pulse-slow' />
        <span className="font-extrabold text-xl text-gray-800 tracking-tight">NutriLens</span>
      </div>
      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
              onClick={() => navigate('/profile')}
            >
              <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold uppercase shadow-sm">
                {user?.name?.[0] || 'U'}
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden sm:inline">{user?.name || 'User'}</span>
            </div>
            <button 
              onClick={logout}
              className="text-gray-400 hover:text-red-500 transition-colors p-2 text-xl rounded-xl hover:bg-red-50"
              title="Logout"
            >
              <i className='bx bx-log-out' />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')} 
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600 px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
