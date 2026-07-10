import React from 'react';
import HistoryItem from './HistoryItem';
import EmptyState from '../ui/EmptyState';

export const HistoryList = ({ history = [], onCardClick, onDelete }) => {
  if (!history || history.length === 0) {
    return (
      <EmptyState
        icon="bx-history"
        title="No Scan History Found"
        description="Your history is empty. Try paste-scanning some ingredient text or search barcode numbers."
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto select-none">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/40">
            <th className="px-6 py-3.5">Date</th>
            <th className="px-6 py-3.5">Product</th>
            <th className="px-6 py-3.5">Score</th>
            <th className="px-6 py-3.5">Grade</th>
            <th className="px-6 py-3.5">Recommendation</th>
            <th className="px-6 py-3.5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <HistoryItem
              key={item._id}
              item={item}
              onClick={() => onCardClick(item)}
              onDelete={() => onDelete(item._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryList;
