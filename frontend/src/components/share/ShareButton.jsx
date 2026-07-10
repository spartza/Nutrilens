import React from 'react';
import { useShare } from '../../hooks/useShare';
import Button from '../ui/Button';

export const ShareButton = ({ productId }) => {
  const { copyShareLink, sharing } = useShare();

  return (
    <Button
      variant="secondary"
      onClick={() => copyShareLink(productId)}
      disabled={sharing || !productId}
      className="gap-2 select-none"
    >
      {sharing ? (
        <i className="bx bx-loader-alt animate-spin" />
      ) : (
        <i className="bx bx-share-alt" />
      )}
      <span>Share</span>
    </Button>
  );
};

export default ShareButton;
