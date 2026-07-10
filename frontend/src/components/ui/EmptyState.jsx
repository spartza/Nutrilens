import React from 'react';

export const EmptyState = ({ icon = 'bx-search', title, description, children }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-150 rounded-2xl bg-gray-50/30">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 text-3xl mb-4 shadow-sm">
        <i className={`bx ${icon}`} />
      </div>
      <h3 className="text-base font-bold text-gray-850 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-550 max-w-xs mb-5 leading-relaxed">{description}</p>
      {children}
    </div>
  );
};

export default EmptyState;
