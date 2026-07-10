import React from 'react';

export const RisksList = ({ negatives = [] }) => {
  if (!negatives || negatives.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm select-none w-full">
      <h3 className="text-base font-bold text-gray-800 mb-3.5 flex items-center gap-2">
        <i className="bx bx-shield-quarter text-red-550 text-xl" />
        <span>Risks & Drawbacks</span>
      </h3>
      <ul className="flex flex-col gap-2">
        {negatives.map((neg, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
            <i className="bx bx-error-circle text-red-500 text-xl flex-shrink-0" />
            <span>{neg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RisksList;
