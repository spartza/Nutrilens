import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import ProductCard from '../../components/product/ProductCard';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from '../../hooks/useHistory';
import { useFavorites } from '../../hooks/useFavorites';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { history, isLoading, fetchHistory } = useHistory(false);
  const { favorites, fetchFavorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
    fetchFavorites();
  }, [fetchHistory, fetchFavorites]);

  // Compute dashboard stat counts
  const stats = useMemo(() => {
    const totalScans = history.length;
    const totalFavorites = favorites.length;
    
    let additivesFlagged = 0;
    history.forEach(item => {
      const list = item.analysis?.additives || [];
      additivesFlagged += list.length;
    });

    return { totalScans, totalFavorites, additivesFlagged };
  }, [history, favorites]);

  const recentScans = useMemo(() => {
    return history.slice(0, 5);
  }, [history]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full select-none animate-fade-in">
        
        {/* Welcome Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
          <div>
            <h1 className="text-3xl font-black text-gray-805 tracking-tight leading-none">
              Namaste, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-sm text-gray-500 font-semibold mt-1.5 leading-none">
              Here is your nutritional status overview for today.
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate('/scanner')} className="shadow-sm">
            <i className="bx bx-plus text-lg" />
            <span>New Scan</span>
          </Button>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <Card className="flex items-center gap-4 p-5 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-inner">
              <i className="bx bx-barcode-reader" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800 leading-none">{stats.totalScans}</h3>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1.5 leading-none">Total Scans</p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-4 p-5 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-2xl shadow-inner">
              <i className="bx bx-heart" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800 leading-none">{stats.totalFavorites}</h3>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1.5 leading-none">Saved Favorites</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 p-5 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl shadow-inner">
              <i className="bx bx-shield-quarter" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800 leading-none">{stats.additivesFlagged}</h3>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1.5 leading-none">Additives Flagged</p>
            </div>
          </Card>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
          
          {/* Recent Scans Area */}
          <div className="lg:col-span-2 flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between px-1 select-none">
              <h2 className="font-extrabold text-[10px] text-gray-400 uppercase tracking-widest leading-none">Recent Evaluations</h2>
              <Button variant="ghost" onClick={() => navigate('/history')} className="text-xs text-primary-500 font-bold p-0">
                View All Scans
              </Button>
            </div>
            
            <Card className="flex flex-col gap-3 p-4">
              {isLoading ? (
                <Spinner />
              ) : recentScans.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {recentScans.map((item) => (
                    <ProductCard
                      key={item._id}
                      productName={item.productName}
                      brand={item.brand || 'Cached Scan'}
                      healthScore={item.healthScore}
                      grade={item.grade}
                      onClick={() => navigate(`/product/${item._id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-6 flex flex-col items-center gap-3">
                  <i className="bx bx-barcode-reader text-4xl text-gray-300 animate-pulse-slow" />
                  <p className="text-sm text-gray-400 max-w-xs leading-relaxed font-semibold">
                    You haven't scanned any food labels yet. Start scanning now!
                  </p>
                  <Button variant="primary" onClick={() => navigate('/scanner')} className="mt-2 text-xs">
                    Start Scanning
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Quick Health Guidelines */}
          <div className="flex flex-col gap-3 w-full">
            <h2 className="font-extrabold text-[10px] text-gray-400 uppercase tracking-widest px-1 leading-none">Nutrition Tips</h2>
            <Card className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <i className="bx bx-bulb text-amber-500 text-2xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800 leading-none mb-1">Check the Nutri-Score</h4>
                  <p className="text-xs text-gray-450 leading-relaxed">
                    A grade of A or B means excellent macros, low sodium/sugar, and a clean label profile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                <i className="bx bx-shield-x text-red-500 text-2xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800 leading-none mb-1">Avoid High-Risk Additives</h4>
                  <p className="text-xs text-gray-450 leading-relaxed">
                    Synthetic colorings (Yellow 5, Red 40) or preservatives will flag the product for avoidance.
                  </p>
                </div>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
