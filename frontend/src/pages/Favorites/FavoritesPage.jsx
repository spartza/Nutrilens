import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Spinner from '../../components/ui/Spinner';
import FavoritesList from '../../components/favorites/FavoritesList';
import { useFavorites } from '../../hooks/useFavorites';
import { useHistoryStore } from '../../store/historyStore';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, isLoading, fetchFavorites, toggleFavorite } = useFavorites();
  const history = useHistoryStore((state) => state.history);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleCardClick = (fav) => {
    // Attempt to locate a scanned history item that matches this favorite product name
    const match = history.find(
      (h) => h.productName?.toLowerCase() === fav.productName?.toLowerCase()
    );
    if (match) {
      navigate(`/product/${match._id}`);
    } else {
      // Fallback redirecting to history log if exact matching evaluation log is not currently cached
      navigate('/history');
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full select-none animate-fade-in pb-12">
        <header className="flex flex-col gap-1 select-none">
          <h1 className="text-2xl font-black text-gray-805 leading-none">Bookmarked Favorites</h1>
          <p className="text-sm text-gray-400 font-semibold mt-1">
            Access clean-rated products you bookmarked for shopping.
          </p>
        </header>

        {isLoading && favorites.length === 0 ? (
          <Spinner />
        ) : (
          <FavoritesList
            favorites={favorites}
            onCardClick={handleCardClick}
            onRemove={toggleFavorite}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default FavoritesPage;
