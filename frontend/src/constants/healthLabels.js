export const HEALTH_LABELS = {
  POOR: 'Poor',
  AVERAGE: 'Average',
  GOOD: 'Good',
  EXCELLENT: 'Excellent',
};

export const getHealthLabel = (score) => {
  if (score < 35) return HEALTH_LABELS.POOR;
  if (score < 50) return HEALTH_LABELS.AVERAGE;
  if (score < 75) return HEALTH_LABELS.GOOD;
  return HEALTH_LABELS.EXCELLENT;
};
