import React from 'react';

export const Toast = ({ message, type = 'success', onClose }) => {
  const styles = {
    success: 'bg-emerald-50 border-emerald-100 text-emerald-900',
    error: 'bg-red-50 border-red-100 text-red-900',
    warning: 'bg-amber-50 border-amber-100 text-amber-900',
    info: 'bg-sky-50 border-sky-100 text-sky-900'
  };

  const icons = {
    success: 'bx-check-circle text-emerald-550',
    error: 'bx-error-circle text-red-550',
    warning: 'bx-info-circle text-amber-550',
    info: 'bx-info-circle text-sky-550'
  };

  return (
    <div 
      className={`pointer-events-auto flex items-center justify-between gap-3 px-4.5 py-3.5 rounded-2xl border shadow-lg w-full max-w-sm bg-white/95 backdrop-blur-sm transition-all duration-300 ${styles[type]}`}
    >
      <div className="flex items-center gap-3">
        <i className={`bx ${icons[type]} text-2xl flex-shrink-0`} />
        <span className="text-sm font-semibold">{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-xl"
      >
        <i className='bx bx-x text-xl' />
      </button>
    </div>
  );
};

export default Toast;
