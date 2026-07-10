export const highlightRiskyIngredients = (text, additives = []) => {
  if (!text) return '';
  let highlighted = text;

  // Extract names from additives array
  const names = additives.map(a => a.name).filter(Boolean);

  // Common high-risk or controversial ingredients to highlight by default
  const commonRisky = [
    'aspartame', 'phosphoric acid', 'monosodium glutamate', 'msg', 
    'palm oil', 'tbhq', 'sodium benzoate', 'carrageenan',
    'high fructose corn syrup', 'artificial color', 'yellow 5', 'red 40',
    'tartrazine', 'potassium bromate', 'propylparaben'
  ];
  
  const allToHighlight = [...new Set([...names.map(n => n.toLowerCase()), ...commonRisky])];

  allToHighlight.forEach(item => {
    if (item.length < 3) return; // Skip tiny strings
    try {
      const escaped = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="text-red-500 font-semibold underline decoration-wavy decoration-red-300">$1</span>');
    } catch (e) {
      // Ignore regex errors
    }
  });

  return highlighted;
};
