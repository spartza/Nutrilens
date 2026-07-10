import React from 'react';
import Badge from '../ui/Badge';

export const AllergenBadges = ({ matchedAllergens = [] }) => {
  if (!matchedAllergens || matchedAllergens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 w-full select-none">
      {matchedAllergens.map((allergen) => (
        <Badge key={allergen} variant="error" className="gap-1 flex items-center">
          <i className="bx bx-shield-x text-sm" />
          <span>{allergen}</span>
        </Badge>
      ))}
    </div>
  );
};

export default AllergenBadges;
