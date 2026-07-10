export const getScoreTextColor = (score) => {
  if (score < 35) return 'text-red-500';
  if (score < 50) return 'text-orange-400';
  if (score < 75) return 'text-yellow-500';
  return 'text-green-500';
};

export const getScoreBgColor = (score) => {
  if (score < 35) return 'bg-red-500';
  if (score < 50) return 'bg-orange-400';
  if (score < 75) return 'bg-yellow-400';
  return 'bg-green-500';
};

export const getScoreBorderColor = (score) => {
  if (score < 35) return 'border-red-500';
  if (score < 50) return 'border-orange-400';
  if (score < 75) return 'border-yellow-400';
  return 'border-green-500';
};

export const getScoreColorHex = (score) => {
  if (score < 35) return '#ef4444';
  if (score < 50) return '#fb923c';
  if (score < 75) return '#eab308';
  return '#22c55e';
};
