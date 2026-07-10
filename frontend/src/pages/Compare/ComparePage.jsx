import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import CompareTable from '../../components/compare/CompareTable';
import { useCompare } from '../../hooks/useCompare';

export const ComparePage = () => {
  const { 
    selectedProductIds, 
    runComparison, 
    comparisonResults, 
    isLoading, 
    error, 
    clearCompareQueue 
  } = useCompare();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProductIds.length >= 2) {
      runComparison();
    }
  }, [selectedProductIds, runComparison]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full select-none animate-fade-in pb-12">
        <header className="flex flex-col gap-1 select-none">
          <h1 className="text-2xl font-black text-gray-805 leading-none">Compare Food Products</h1>
          <p className="text-sm text-gray-400 font-semibold mt-1">
            Compare calories, ingredients, health grades, and additives side-by-side.
          </p>
        </header>

        {selectedProductIds.length < 2 ? (
          <EmptyState
            icon="bx-git-compare"
            title="Compare List is Empty"
            description="Select at least two products to compare. You can click 'Add to Compare' on any barcode scan details page."
          >
            <Button variant="primary" onClick={() => navigate('/dashboard')} className="mt-2 text-xs">
              Go to Dashboard
            </Button>
          </EmptyState>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {/* Header row */}
            <div className="flex justify-between items-center px-1 select-none">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                Comparing {selectedProductIds.length} Products
              </span>
              <Button variant="ghost" onClick={clearCompareQueue} className="text-xs text-red-500 font-bold p-0">
                Clear Compare Queue
              </Button>
            </div>

            {isLoading ? (
              <Card className="py-12 flex flex-col items-center justify-center gap-4">
                <Spinner size="lg" />
                <p className="text-xs font-semibold text-gray-450 animate-pulse-slow">
                  Compiling comparison matrix...
                </p>
              </Card>
            ) : error ? (
              <Card className="py-12 text-center flex flex-col items-center gap-3">
                <i className="bx bx-error-circle text-4xl text-red-400" />
                <p className="text-sm text-gray-450 font-semibold max-w-xs">{error}</p>
                <Button variant="secondary" onClick={runComparison}>Retry Comparison</Button>
              </Card>
            ) : (
              comparisonResults && <CompareTable products={comparisonResults} />
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ComparePage;
