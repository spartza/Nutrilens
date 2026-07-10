import React from 'react';

export const HistoryFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex flex-wrap gap-3.5 w-full bg-white p-4 border border-gray-100 rounded-2xl shadow-sm select-none">
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">Filter by Grade</label>
        <select 
          value={filter.grade}
          onChange={(e) => setFilter(prev => ({ ...prev, grade: e.target.value }))}
          className="bg-gray-50 border border-gray-150 text-sm font-bold text-gray-650 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          <option value="">All Grades</option>
          <option value="A">Grade A (Excellent)</option>
          <option value="B">Grade B (Good)</option>
          <option value="C">Grade C (Average)</option>
          <option value="D">Grade D (Mediocre)</option>
          <option value="E">Grade E (Poor)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">Sort by Score</label>
        <select 
          value={filter.sort}
          onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value }))}
          className="bg-gray-50 border border-gray-150 text-sm font-bold text-gray-650 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          <option value="latest">Latest Scans</option>
          <option value="highest">Highest Score First</option>
          <option value="lowest">Lowest Score First</option>
        </select>
      </div>
    </div>
  );
};

export default HistoryFilter;
