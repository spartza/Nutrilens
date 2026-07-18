import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Spinner from '../../components/ui/Spinner';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Subcomponents
import ProductHeader from '../../components/product/ProductHeader';
import HealthScoreCircle from '../../components/health/HealthScoreCircle';
import AIInsightSummary from '../../components/health/AIInsightSummary';
import BenefitsList from '../../components/health/BenefitsList';
import RisksList from '../../components/health/RisksList';
import DiabeticBadge from '../../components/health/DiabeticBadge';
import WeightLossBadge from '../../components/health/WeightLossBadge';
import AllergenBadges from '../../components/allergen/AllergenBadges';
import AllergenAlert from '../../components/allergen/AllergenAlert';
import NutritionTable from '../../components/product/NutritionTable';
import IngredientsList from '../../components/product/IngredientsList';
import FavoriteButton from '../../components/favorites/FavoriteButton';
import ShareButton from '../../components/share/ShareButton';

// Hooks & Context
import { useProduct } from '../../hooks/useProduct';
import { useHistory } from '../../hooks/useHistory';
import { useAllergen } from '../../hooks/useAllergen';
import { useCompare } from '../../hooks/useCompare';
import { useToast } from '../../hooks/useToast';

export const ProductDetailPage = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { fetchProduct, currentProduct, isLoading: productLoading } = useProduct();
  const { history, fetchHistory, isLoading: historyLoading } = useHistory(false);
  const { checkProductAllergens } = useAllergen();
  const { addProductToCompare } = useCompare();
  
  const [localProduct, setLocalProduct] = useState(null);

  // Check if parameter is a Mongoose ObjectId (24 hex characters)
  const isObjectId = useMemo(() => {
    return /^[0-9a-fA-F]{24}$/.test(barcode);
  }, [barcode]);

  useEffect(() => {
    const loadProductData = async () => {
      if (isObjectId) {
        const found = history.some(item => item._id === barcode);
        if (!found) {
          await fetchHistory();
        }
      } else {
        await fetchProduct(barcode);
      }
    };
    loadProductData();
  }, [barcode, isObjectId, history, fetchProduct, fetchHistory]);

  // Sync state once history or product loads
  useEffect(() => {
    if (isObjectId) {
      const historyItem = history.find(item => item._id === barcode);
      if (historyItem) {
        // Map history items into standard product schema
        setLocalProduct({
          _id: historyItem._id,
          name: historyItem.productName,
          brand: historyItem.brand || 'Manual Scan Log',
          healthScore: historyItem.healthScore,
          grade: historyItem.grade,
          imageUrl: historyItem.imageUrl || '',
          ingredientsText: historyItem.ingredientsText || '',
          aiAnalysisRef: {
            summary: historyItem.analysis?.summary,
            positives: historyItem.analysis?.positives,
            negatives: historyItem.analysis?.negatives,
            additivesFlagged: historyItem.analysis?.additives || [],
            recommendation: historyItem.analysis?.recommendation
          },
          extracted_macros: historyItem.analysis?.macros || {}
        });
      }
    } else {
      if (currentProduct && currentProduct.barcode === barcode) {
        setLocalProduct(currentProduct);
      }
    }
  }, [isObjectId, barcode, history, currentProduct]);

  const matchedAllergens = useMemo(() => {
    if (!localProduct) return [];
    return checkProductAllergens(localProduct.ingredientsText || '');
  }, [localProduct, checkProductAllergens]);

  const isLoading = productLoading || (isObjectId && historyLoading && !localProduct);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center flex-1 py-12">
          <Spinner size="lg" />
          <p className="text-xs font-semibold text-gray-500 mt-4 animate-pulse-slow">
            Loading food chemical report...
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (!localProduct) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
          <i className="bx bx-error-circle text-5xl text-gray-300 mb-3 animate-pulse-slow" />
          <h2 className="text-base font-bold text-gray-805 mb-2">Report Not Found</h2>
          <p className="text-sm text-gray-450 max-w-sm mb-6 leading-relaxed">
            We couldn't retrieve the analysis details. Back up and try scanning again.
          </p>
          <Button variant="primary" onClick={() => navigate('/scanner')}>
            Back to Scanner
          </Button>
        </div>
      </PageWrapper>
    );
  }

  const analysis = localProduct.aiAnalysisRef || {};
  const hasHighRiskAdditive = (analysis.additivesFlagged || []).some(
    add => add.riskLevel?.toUpperCase() === 'HIGH'
  );

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto select-none animate-fade-in pb-12">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center w-full select-none">
          <Button variant="ghost" onClick={() => navigate(-1)} className="px-0 py-0 text-gray-500 text-sm font-bold">
            <i className="bx bx-left-arrow-alt text-xl mr-1" />
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/scanner')}
            className="gap-1.5 text-xs py-1.5 px-3.5 rounded-xl font-bold shadow-sm"
          >
            <i className="bx bx-plus text-sm" />
            <span>New Scan</span>
          </Button>
        </div>

        {/* 1. Product Header */}
        <ProductHeader
          imageUrl={localProduct.imageUrl}
          name={localProduct.name}
          brand={localProduct.brand}
          barcode={isObjectId ? null : localProduct.barcode}
        />

        {/* Circular Gauge and AI Insights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-start">
          {/* 2. Health Score Circle */}
          <Card className="flex items-center justify-center py-8">
            <HealthScoreCircle grade={localProduct.grade} />
          </Card>
          
          {/* 3. AI Insight Summary */}
          <AIInsightSummary summary={analysis.summary} />
        </div>

        {/* 5. Benefits and Risks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-start">
          <BenefitsList positives={analysis.positives} />
          <RisksList negatives={analysis.negatives} />
        </div>

        {/* 6. Diabetic and Weight Loss Badges */}
        <Card className="flex flex-wrap gap-3 items-center justify-center py-4 bg-gray-50/20 border border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-full text-center mb-1 select-none">Dietary Flags</span>
          <DiabeticBadge sugars={getMacroVal(localProduct, 'sugars_100g')} />
          <WeightLossBadge 
            energy={getMacroVal(localProduct, 'energy_100g')} 
            fiber={getMacroVal(localProduct, 'fiber_100g')} 
          />
        </Card>

        {/* 7. Allergen Alerts and Badges */}
        {matchedAllergens.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            <AllergenAlert matchedAllergens={matchedAllergens} />
            <AllergenBadges matchedAllergens={matchedAllergens} />
          </div>
        )}

        {/* 8. Nutrition Table */}
        <NutritionTable macros={localProduct.aiAnalysisRef?.extracted_macros || localProduct.extracted_macros || {}} />

        {/* 9. Ingredients List with highlighting */}
        <IngredientsList 
          ingredientsText={localProduct.ingredientsText} 
          additives={analysis.additivesFlagged} 
        />

        {/* 10. Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-gray-150 rounded-3xl shadow-sm">
          <div className="flex gap-2">
            <FavoriteButton
              productName={localProduct.name}
              healthScore={localProduct.healthScore}
              grade={localProduct.grade}
            />
            <ShareButton productId={localProduct._id} />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => navigate('/scanner')}
              className="gap-2 text-xs py-2 px-3.5 shadow-sm"
            >
              <i className="bx bx-plus text-sm" />
              <span>New Scan</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => addProductToCompare(localProduct._id)}
              className="gap-2 text-xs py-2 px-3.5"
            >
              <i className="bx bx-git-compare" />
              <span>Add to Compare</span>
            </Button>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
};

const getMacroVal = (product, path) => {
  const macros = product.aiAnalysisRef?.extracted_macros || product.extracted_macros || {};
  return macros[path] !== undefined ? macros[path] : 0;
};

export default ProductDetailPage;
