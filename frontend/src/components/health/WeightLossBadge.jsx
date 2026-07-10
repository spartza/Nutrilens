import React from 'react';
import Badge from '../ui/Badge';

export const WeightLossBadge = ({ energy, fiber }) => {
  const isFriendly = (energy !== undefined && energy < 150) || (fiber !== undefined && fiber > 3);

  return (
    <Badge variant={isFriendly ? 'success' : 'neutral'} className="gap-1 shadow-sm flex items-center">
      <i className={`bx ${isFriendly ? 'bx-trending-down text-base' : 'bx-minus text-base'}`} />
      <span>{isFriendly ? 'Weight Loss Friendly' : 'Standard Calorie Density'}</span>
    </Badge>
  );
};

export default WeightLossBadge;
