import React from 'react';
import { getScoreTextColor, getScoreBgColor } from '../../utils/scoreColor';

export const ProductCard = ({ productName, brand, healthScore, grade, onClick, onDelete, deleteIcon = 'bx-trash' }) => {
  return (
    <div 
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all select-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Nutri-Score badge */}
        <div className={`w-11 h-11 rounded-xl text-white font-extrabold text-xl flex items-center justify-center shadow-inner flex-shrink-0 ${getScoreBgColor(healthScore)}`}>
          {grade || 'C'}
        </div>
        
        <div className="flex flex-col min-w-0">
          <h4 className="font-bold text-gray-800 text-sm truncate">{productName || 'Unknown Product'}</h4>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide truncate">{brand || 'Standard Brand'}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end flex-shrink-0">
          <span className={`text-base font-black leading-none ${getScoreTextColor(healthScore)}`}>{healthScore}</span>
          <span className="text-[9px] text-gray-400 font-bold tracking-wider uppercase mt-1">SCORE</span>
        </div>
        
        {onDelete && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all text-lg flex items-center justify-center flex-shrink-0"
          >
            <i className={`bx ${deleteIcon}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
