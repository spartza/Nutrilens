import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-300 shadow-sm hover:shadow-md active:scale-98',
    secondary: 'bg-gray-100 text-gray-850 hover:bg-gray-200 focus:ring-gray-200 active:scale-98',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-100 active:scale-98',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 shadow-sm active:scale-98'
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
