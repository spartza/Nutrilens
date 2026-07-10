import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/ui/Button';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center flex-1 py-12 px-4 select-none">
        {/* Hero Area */}
        <div className="text-center max-w-2xl flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-primary-100 text-primary-600 flex items-center justify-center text-4xl shadow-sm animate-pulse-slow">
            <i className="bx bx-analyse" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-800 tracking-tight leading-none">
            Scan ingredients. Choose <span className="text-primary-500">cleaner</span> foods.
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-lg">
            NutriLens decrypts ingredient lists and barcode labels using Gemini AI, helping you instantly identify harmful food additives and allergens.
          </p>
          
          <div className="flex gap-4 mt-2">
            <Button variant="primary" onClick={() => navigate('/signup')}>
              Get Started for Free
            </Button>
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>

        {/* Product Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-20">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-3">
            <i className="bx bx-scan text-primary-500 text-3xl" />
            <h3 className="font-extrabold text-sm text-gray-800 uppercase tracking-wider">AI Scanner</h3>
            <p className="text-xs text-gray-450 leading-relaxed">
              Scan barcode labels or paste ingredients directly. Gemini evaluates the list in seconds.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-3">
            <i className="bx bx-shield-quarter text-primary-500 text-3xl" />
            <h3 className="font-extrabold text-sm text-gray-800 uppercase tracking-wider">Additive Safety</h3>
            <p className="text-xs text-gray-450 leading-relaxed">
              Flags chemical preservatives and synthetic colorings, rating their risk factors.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-3">
            <i className="bx bx-git-compare text-primary-500 text-3xl" />
            <h3 className="font-extrabold text-sm text-gray-800 uppercase tracking-wider">Comparison Matrix</h3>
            <p className="text-xs text-gray-450 leading-relaxed">
              Compare items from your scan logs side-by-side to make healthier grocery selections.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LandingPage;
