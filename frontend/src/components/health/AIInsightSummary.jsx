import React from 'react';

export const AIInsightSummary = ({ summary }) => {
  return (
    <div className="bg-primary-50 border border-primary-100 rounded-3xl p-5 select-none text-gray-700 leading-relaxed text-sm shadow-sm flex items-start gap-3 w-full">
      <i className="bx bx-bot text-primary-500 text-2xl flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-extrabold text-primary-800 text-[10px] tracking-widest uppercase mb-1">Gemini AI Assistant</h4>
        <p className="font-semibold text-gray-800 text-sm leading-relaxed">{summary || "Running AI ingredient evaluation..."}</p>
      </div>
    </div>
  );
};

export default AIInsightSummary;
