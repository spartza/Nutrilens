import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from './Navbar';
import Footer from './Footer';

export const PageWrapper = ({ children }) => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'bx-grid-alt' },
    { name: 'Scan & Analyze', path: '/scanner', icon: 'bx-scan' },
    { name: 'Scan History', path: '/history', icon: 'bx-history' },
    { name: 'Favorites', path: '/favorites', icon: 'bx-heart' },
    { name: 'Compare Foods', path: '/compare', icon: 'bx-git-compare' },
    { name: 'Profile Settings', path: '/profile', icon: 'bx-user' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar - Only shown on authenticated views and desktop screens */}
        {isLoggedIn && (
          <aside className="w-64 flex-shrink-0 border-r border-gray-150 hidden md:flex flex-col p-6 bg-white gap-6 select-none">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3">MENU</span>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                    (item.path === '/scanner' && location.pathname.startsWith('/product'));
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center gap-3.5 px-3 py-3 rounded-xl font-bold text-sm transition-all text-left ${
                        isActive 
                          ? 'bg-primary-50 text-primary-600 shadow-sm' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <i className={`bx ${item.icon} text-lg`} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="mt-auto flex flex-col gap-4 border-t border-gray-100 pt-4">
              <div 
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-xl"
                onClick={() => navigate('/profile')}
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold uppercase">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-xs font-bold text-gray-800 truncate">{user?.name || 'User'}</span>
                  <span className="text-[10px] text-gray-450 truncate">{user?.email || ''}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-3.5 px-3 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all text-left w-full"
              >
                <i className="bx bx-log-out text-lg" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>
        )}
        
        {/* Content Viewport */}
        <main className="flex-1 flex flex-col p-6 w-full overflow-x-hidden min-h-[70vh]">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default PageWrapper;
