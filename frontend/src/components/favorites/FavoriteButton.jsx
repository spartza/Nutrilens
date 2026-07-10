import React, { useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites';

export const FavoriteButton = ({ productName, healthScore, grade }) => {
  const { toggleFavorite, isFavorited } = useFavorites();
  const [animating, setAnimating] = useState(false);
  const active = isFavorited(productName);

  const handleClick = async (e) => {
    e.stopPropagation();
    setAnimating(true);
    await toggleFavorite(productName, healthScore, grade);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2.5 rounded-xl border border-gray-150 shadow-sm flex items-center justify-center transition-all bg-white hover:bg-red-50 text-gray-450 hover:text-red-500 ${
        active ? 'text-red-500 bg-red-50/20 border-red-100' : ''
      } ${animating ? 'scale-110' : 'active:scale-95'}`}
      title={active ? 'Remove from Favorites' : 'Add to Favorites'}
    >
      <i className={`bx ${active ? 'bxs-heart animate-pulse-slow' : 'bx-heart'} text-xl`} />
    </button>
  );
};

export default FavoriteButton;
