import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Spinner from '../components/ui/Spinner';

// Lazy-loaded page bundles
const LandingPage = lazy(() => import('../pages/Landing/LandingPage'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('../pages/Auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const ScannerPage = lazy(() => import('../pages/Scanner/ScannerPage'));
const ProductDetailPage = lazy(() => import('../pages/Product/ProductDetailPage'));
const HistoryPage = lazy(() => import('../pages/History/HistoryPage'));
const FavoritesPage = lazy(() => import('../pages/Favorites/FavoritesPage'));
const ComparePage = lazy(() => import('../pages/Compare/ComparePage'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

const SuspenseLoader = ({ children }) => (
  <Suspense
    fallback={
      <div className="flex flex-col items-center justify-center flex-1 h-[60vh] select-none">
        <Spinner size="lg" />
        <span className="text-xs font-semibold text-gray-450 mt-3 animate-pulse-slow">Loading Viewport...</span>
      </div>
    }
  >
    {children}
  </Suspense>
);

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages (Guest Only) */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<SuspenseLoader><LandingPage /></SuspenseLoader>} />
        <Route path="/login" element={<SuspenseLoader><LoginPage /></SuspenseLoader>} />
        <Route path="/signup" element={<SuspenseLoader><SignupPage /></SuspenseLoader>} />
        <Route path="/forgot-password" element={<SuspenseLoader><ForgotPasswordPage /></SuspenseLoader>} />
      </Route>

      {/* Protected Pages (Auth Required) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<SuspenseLoader><DashboardPage /></SuspenseLoader>} />
        <Route path="/scanner" element={<SuspenseLoader><ScannerPage /></SuspenseLoader>} />
        <Route path="/product/:barcode" element={<SuspenseLoader><ProductDetailPage /></SuspenseLoader>} />
        <Route path="/history" element={<SuspenseLoader><HistoryPage /></SuspenseLoader>} />
        <Route path="/favorites" element={<SuspenseLoader><FavoritesPage /></SuspenseLoader>} />
        <Route path="/compare" element={<SuspenseLoader><ComparePage /></SuspenseLoader>} />
        <Route path="/profile" element={<SuspenseLoader><ProfilePage /></SuspenseLoader>} />
      </Route>

      {/* 404 Catch-All Page */}
      <Route path="*" element={<SuspenseLoader><NotFoundPage /></SuspenseLoader>} />
    </Routes>
  );
};

export default AppRoutes;
