import React from 'react';
import { getScoreBgColor } from '../../utils/scoreColor';

export const CompareScoreBar = ({ scoreA = 0, scoreB = 0, nameA = 'Product A', nameB = 'Product B' }) => {
  const total = (scoreA || 0) + (scoreB || 0) || 1;
  const pctA = Math.round(((scoreA || 0) / total) * 100);
  const pctB = 100 - pctA;

  return (
    <div className="flex flex-col gap-2 w-full p-6 bg-white border border-gray-100 rounded-3xl shadow-sm select-none">
      <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-1">
        <span className="truncate max-w-[45%] text-gray-700">{nameA} ({scoreA})</span>
        <span className="truncate max-w-[45%] text-right text-gray-700">{nameB} ({scoreB})</span>
      </div>
      <div className="w-full h-4.5 bg-gray-100 rounded-full flex overflow-hidden shadow-inner border border-gray-50">
        <div 
          className={`h-full transition-all duration-1000 flex items-center justify-center text-[9px] text-white font-black ${getScoreBgColor(scoreA)}`}
          style={{ width: `${pctA}%` }}
        >
          {scoreA > 15 && `${scoreA}`}
        </div>
        <div 
          className={`h-full transition-all duration-1000 flex items-center justify-center text-[9px] text-white font-black bg-indigo-500`}
          style={{ width: `${pctB}%` }}
        >
          {scoreB > 15 && `${scoreB}`}
        </div>
      </div>
    </div>
  );
};

export default CompareScoreBar;
