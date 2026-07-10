import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
