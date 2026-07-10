import React, { useEffect, useState } from 'react';
import { getScoreColorHex } from '../../utils/scoreColor';
import { getHealthLabel } from '../../constants/healthLabels';

export const HealthScoreCircle = ({ score = 50 }) => {
  const [strokeDash, setStrokeDash] = useState('0, 100');
  const color = getScoreColorHex(score);
  const label = getHealthLabel(score);

  useEffect(() => {
    // Triggers smooth circle build-up transition
    const timer = setTimeout(() => {
      setStrokeDash(`${score}, 100`);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            className="text-gray-150"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle transition-all duration-1000 ease-out"
            strokeWidth="3"
            strokeDasharray={strokeDash}
            strokeLinecap="round"
            stroke={color}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text 
            x="18" 
            y="21" 
            className="font-black text-[9px] text-gray-800 text-center"
            fill="currentColor"
            textAnchor="middle"
          >
            {score}
          </text>
        </svg>
      </div>
      <div className="flex flex-col items-center leading-tight">
        <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">HEALTH SCORE</span>
        <span className="text-sm font-bold mt-0.5" style={{ color }}>{label}</span>
      </div>
    </div>
  );
};

export default HealthScoreCircle;
