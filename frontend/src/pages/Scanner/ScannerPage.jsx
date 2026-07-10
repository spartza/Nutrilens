import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import BarcodeScanner from '../../components/scanner/BarcodeScanner';
import ManualBarcodeInput from '../../components/scanner/ManualBarcodeInput';
import ProductNotFound from '../../components/product/ProductNotFound';
import Spinner from '../../components/ui/Spinner';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useProduct } from '../../hooks/useProduct';
import { useHealthAnalysis } from '../../hooks/useHealthAnalysis';
import { useToast } from '../../hooks/useToast';

export const ScannerPage = () => {
  const navigate = useNavigate();
  const { fetchProduct, isLoading: productLoading } = useProduct();
  const { analyzeIngredients, isLoading: scanLoading } = useHealthAnalysis();
  const { addToast } = useToast();
  
  const [notFoundBarcode, setNotFoundBarcode] = useState(null);
  const [textMode, setTextMode] = useState(false);
  const [productName, setProductName] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');

  const onBarcodeScan = async (barcode) => {
    setNotFoundBarcode(null);
    const product = await fetchProduct(barcode);
    if (product) {
      navigate(`/product/${barcode}`);
    } else {
      setNotFoundBarcode(barcode);
      addToast('Barcode not found in databases', 'warning');
    }
  };

  const onTextSubmit = async (e) => {
    e.preventDefault();
    if (!productName.trim() || !ingredientsText.trim()) {
      addToast('Please fill out both product name and ingredient list', 'warning');
      return;
    }

    const res = await analyzeIngredients(productName.trim(), ingredientsText.trim());
    if (res) {
      // Find history ID inside res.historyId or res._id
      const historyId = res.historyId || res._id || res.id;
      if (historyId) {
        navigate(`/product/${historyId}`);
      } else {
        addToast('Analysis completed successfully!', 'success');
        navigate('/history');
      }
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full select-none max-w-lg mx-auto animate-fade-in">
        
        <header className="text-center flex flex-col gap-1.5 select-none">
          <h1 className="text-2xl font-black text-gray-805">Scan & Analyze</h1>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Choose camera scan, manual barcode lookup, or paste ingredients list
          </p>
        </header>

        {/* Tab Toggles */}
        <div className="flex bg-gray-100 p-1 rounded-2xl w-full select-none">
          <button
            onClick={() => { setTextMode(false); setNotFoundBarcode(null); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
              !textMode ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <i className="bx bx-barcode-reader mr-1.5 text-sm" />
            Barcode Scan
          </button>
          <button
            onClick={() => setTextMode(true)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
              textMode ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <i className="bx bx-receipt mr-1.5 text-sm" />
            Ingredients Text
          </button>
        </div>

        {/* Barcode scan mode */}
        {!textMode && (
          <div className="flex flex-col gap-6 w-full">
            {notFoundBarcode ? (
              <ProductNotFound 
                barcode={notFoundBarcode} 
                onReset={() => setNotFoundBarcode(null)} 
              />
            ) : (
              <Card className="flex flex-col items-center gap-6 p-6">
                {(productLoading || scanLoading) ? (
                  <div className="h-56 flex flex-col items-center justify-center gap-4">
                    <Spinner size="lg" />
                    <p className="text-xs font-semibold text-gray-400 animate-pulse-slow">
                      Running lookup on ingredient databases...
                    </p>
                  </div>
                ) : (
                  <BarcodeScanner onScanSuccess={onBarcodeScan} />
                )}
                
                <ManualBarcodeInput 
                  onSubmit={onBarcodeScan} 
                  loading={productLoading} 
                />
              </Card>
            )}
          </div>
        )}

        {/* Ingredients paste mode */}
        {textMode && (
          <Card className="p-6">
            {scanLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-4">
                <Spinner size="lg" />
                <p className="text-xs font-semibold text-gray-450 animate-pulse-slow">
                  Gemini is analyzing food chemistry and additives...
                </p>
              </div>
            ) : (
              <form onSubmit={onTextSubmit} className="flex flex-col gap-4.5">
                <Input
                  label="Product Name"
                  placeholder="e.g. Crunchy Granola Cereal"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  icon={<i className="bx bx-purchase-tag-alt" />}
                  required
                />
                
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-semibold text-gray-600">Ingredients text</label>
                  <textarea
                    rows="6"
                    value={ingredientsText}
                    onChange={(e) => setIngredientsText(e.target.value)}
                    placeholder="Paste the ingredient text from packaging (e.g. Sugar, cocoa processed with alkali, canola oil, salt, natural flavor...)"
                    className="block w-full rounded-xl border border-gray-250 py-2.5 px-3.5 bg-white text-gray-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none text-sm leading-relaxed transition-all"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" className="mt-2" disabled={scanLoading}>
                  <i className="bx bx-bot text-lg" />
                  <span>Analyze with Gemini AI</span>
                </Button>
              </form>
            )}
          </Card>
        )}

      </div>
    </PageWrapper>
  );
};

export default ScannerPage;
