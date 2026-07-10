import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      {/* Content */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto z-10 animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-xl hover:bg-gray-55"
          >
            <i className='bx bx-x text-2xl'></i>
          </button>
        </div>
        <div className="flex-1 text-sm text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
