export const getScoreTextColor = (grade) => {
  const g = (grade || 'C').toUpperCase();
  if (g === 'A') return 'text-green-500';
  if (g === 'B') return 'text-green-400';
  if (g === 'C') return 'text-yellow-500';
  if (g === 'D') return 'text-orange-400';
  return 'text-red-500'; // 'E'
};

export const getScoreBgColor = (grade) => {
  const g = (grade || 'C').toUpperCase();
  if (g === 'A') return 'bg-green-500';
  if (g === 'B') return 'bg-green-400';
  if (g === 'C') return 'bg-yellow-400';
  if (g === 'D') return 'bg-orange-400';
  return 'bg-red-500'; // 'E'
};

export const getScoreBorderColor = (grade) => {
  const g = (grade || 'C').toUpperCase();
  if (g === 'A') return 'border-green-500';
  if (g === 'B') return 'border-green-400';
  if (g === 'C') return 'border-yellow-400';
  if (g === 'D') return 'border-orange-400';
  return 'border-red-500'; // 'E'
};

export const getScoreColorHex = (grade) => {
  const g = (grade || 'C').toUpperCase();
  if (g === 'A') return '#22c55e';
  if (g === 'B') return '#4ade80';
  if (g === 'C') return '#eab308';
  if (g === 'D') return '#fb923c';
  return '#ef4444'; // 'E'
};
