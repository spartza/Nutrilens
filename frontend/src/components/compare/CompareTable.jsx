import React from 'react';
import { getScoreTextColor } from '../../utils/scoreColor';

export const CompareTable = ({ products = [] }) => {
  if (!products || products.length < 2) return null;

  const productA = products[0];
  const productB = products[1];

  const getMacroVal = (product, path) => {
    // Read from nested aiAnalysisRef.extracted_macros or direct properties
    const macros = product.aiAnalysisRef?.extracted_macros || product.extracted_macros || {};
    return macros[path] !== undefined ? macros[path] : 0;
  };

  const getAdditivesCount = (product) => {
    const list = product.aiAnalysisRef?.additivesFlagged || product.additives || [];
    return list.length;
  };

  const getRecommendation = (product) => {
    return product.aiAnalysisRef?.recommendation || product.recommendation || 'No recommendation';
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">

      <div className="overflow-x-auto w-full border border-gray-150 rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-150 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/40">
              <th className="px-6 py-4 w-1/3">Nutritional Attribute</th>
              <th className="px-6 py-4 text-center">{productA.name || productA.productName}</th>
              <th className="px-6 py-4 text-center">{productB.name || productB.productName}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-4 text-sm font-semibold text-gray-500">Brand / Label</td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">{productA.brand || 'N/A'}</td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">{productB.brand || 'N/A'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-semibold text-gray-500">Nutri-Score Grade</td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex px-3 py-1 bg-gray-100 rounded-xl font-extrabold text-sm text-gray-800 uppercase border border-gray-150 shadow-inner">
                  {productA.grade || productA.nutri_score_grade || 'C'}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex px-3 py-1 bg-gray-100 rounded-xl font-extrabold text-sm text-gray-800 uppercase border border-gray-150 shadow-inner">
                  {productB.grade || productB.nutri_score_grade || 'C'}
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-semibold text-gray-500">Energy (per 100g)</td>
              <td className="px-6 py-4 text-center font-bold text-gray-700">{getMacroVal(productA, 'energy_100g')} kcal</td>
              <td className="px-6 py-4 text-center font-bold text-gray-700">{getMacroVal(productB, 'energy_100g')} kcal</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-semibold text-gray-500">Saturated Fat (per 100g)</td>
              <td className="px-6 py-4 text-center font-bold text-gray-700">{getMacroVal(productA, 'saturated_fat_100g')}g</td>
              <td className="px-6 py-4 text-center font-bold text-gray-700">{getMacroVal(productB, 'saturated_fat_100g')}g</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-semibold text-gray-500">Sugars (per 100g)</td>
              <td className="px-6 py-4 text-center font-bold text-gray-700">{getMacroVal(productA, 'sugars_100g')}g</td>
              <td className="px-6 py-4 text-center font-bold text-gray-700">{getMacroVal(productB, 'sugars_100g')}g</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-semibold text-gray-500">Flagged Additives</td>
              <td className={`px-6 py-4 text-center font-bold ${getAdditivesCount(productA) > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                {getAdditivesCount(productA)} additives
              </td>
              <td className={`px-6 py-4 text-center font-bold ${getAdditivesCount(productB) > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                {getAdditivesCount(productB)} additives
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-semibold text-gray-500">Recommendation</td>
              <td className="px-6 py-4 text-center text-xs text-gray-500 font-semibold">{getRecommendation(productA)}</td>
              <td className="px-6 py-4 text-center text-xs text-gray-500 font-semibold">{getRecommendation(productB)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareTable;
