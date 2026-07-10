import React from 'react';
import { useScoreBreakdown } from '../../hooks/useScoreBreakdown';

export const ScoreBreakdownSection = ({ score, grade, hasHighRiskAdditive }) => {
  const { getBreakdown } = useScoreBreakdown();
  const breakdown = getBreakdown(score, grade, hasHighRiskAdditive);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm select-none w-full">
      <h3 className="text-base font-bold text-gray-800 mb-4.5 flex items-center gap-2">
        <i className="bx bx-bar-chart-square text-primary-500 text-xl" />
        <span>Score Breakdown</span>
      </h3>
      
      <div className="flex flex-col gap-4.5">
        {breakdown.map((item) => (
          <div key={item.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
              <span>{item.name} ({item.weight}%)</span>
              <span className="font-bold text-gray-700">{item.score}/100</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${item.score}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBreakdownSection;
