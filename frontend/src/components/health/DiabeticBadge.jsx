import React from 'react';
import Badge from '../ui/Badge';

export const DiabeticBadge = ({ sugars }) => {
  const isFriendly = sugars !== undefined && sugars < 5;

  return (
    <Badge variant={isFriendly ? 'success' : 'warning'} className="gap-1 shadow-sm flex items-center">
      <i className={`bx ${isFriendly ? 'bx-check-shield text-base' : 'bx-shield-x text-base'}`} />
      <span>{isFriendly ? 'Diabetic Friendly' : 'High Sugar content'}</span>
    </Badge>
  );
};

export default DiabeticBadge;
