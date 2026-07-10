import React from 'react';
import { formatDate } from '../../utils/formatDate';
import { getScoreTextColor, getScoreBgColor } from '../../utils/scoreColor';

export const HistoryItem = ({ item, onClick, onDelete }) => {
  const { productName, healthScore, grade, createdAt, analysis } = item;

  return (
    <tr 
      onClick={onClick}
      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer select-none"
    >
      <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
        {formatDate(createdAt)}
      </td>
      <td className="px-6 py-4 text-sm font-bold text-gray-800">
        {productName || 'Unknown Product'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-sm font-black ${getScoreTextColor(healthScore)}`}>
          {healthScore}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-white font-extrabold text-sm ${getScoreBgColor(healthScore)}`}>
          {grade || 'C'}
        </span>
      </td>
      <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
        {analysis?.recommendation || 'Evaluated'}
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors"
        >
          <i className="bx bx-trash text-lg" />
        </button>
      </td>
    </tr>
  );
};

export default HistoryItem;
