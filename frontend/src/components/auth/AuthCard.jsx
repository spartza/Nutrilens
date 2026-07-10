import React from 'react';

export const AuthCard = ({ children }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-lg p-8 flex flex-col gap-6">
      {children}
    </div>
  );
};

export default AuthCard;
