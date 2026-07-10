import { useState } from 'react';
import { useToast } from './useToast';

export const useShare = () => {
  const { addToast } = useToast();
  const [sharing, setSharing] = useState(false);

  const getShareLink = (productId) => {
    return `${window.location.origin}/share/${productId}`;
  };

  const copyShareLink = async (productId) => {
    if (!productId) return false;
    setSharing(true);
    const link = getShareLink(productId);
    try {
      await navigator.clipboard.writeText(link);
      addToast('Public share link copied to clipboard! 🌐', 'success');
      return true;
    } catch (e) {
      addToast('Failed to copy. Share link: ' + link, 'warning');
      return false;
    } finally {
      setSharing(false);
    }
  };

  return {
    copyShareLink,
    getShareLink,
    sharing,
  };
};
