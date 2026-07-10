import React from 'react';
import ProductCard from '../product/ProductCard';
import EmptyState from '../ui/EmptyState';

export const FavoritesList = ({ favorites = [], onCardClick, onRemove }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <EmptyState
        icon="bx-heart"
        title="No Bookmarked Favorites"
        description="Your bookmark list is empty. Tap the heart button on any product detail page to save it here."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {favorites.map((fav) => (
        <ProductCard
          key={fav._id}
          productName={fav.productName}
          brand={fav.brand || 'Cached Product'}
          healthScore={fav.healthScore}
          grade={fav.grade}
          onClick={() => onCardClick(fav)}
          onDelete={() => onRemove(fav.productName, fav.healthScore, fav.grade)}
          deleteIcon="bx-x"
        />
      ))}
    </div>
  );
};

export default FavoritesList;
