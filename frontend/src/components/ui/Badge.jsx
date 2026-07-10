import React from 'react';

export const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    success: 'bg-emerald-100 text-emerald-800',
    info: 'bg-sky-100 text-sky-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-700'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.75 rounded-full text-xs font-bold tracking-wide uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
