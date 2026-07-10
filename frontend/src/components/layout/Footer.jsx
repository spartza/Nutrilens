import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-450 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} NutriLens. All rights reserved.</p>
        <p className="mt-1">Analyze chemical additives, check allergens, and choose clean ingredients.</p>
      </div>
    </footer>
  );
};

export default Footer;
