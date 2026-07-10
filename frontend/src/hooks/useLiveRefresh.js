import { useEffect } from 'react';

export const useLiveRefresh = (fetchFn, intervalMs) => {
  useEffect(() => {
    fetchFn();
    if (!intervalMs) return;

    const interval = setInterval(() => {
      fetchFn();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [fetchFn, intervalMs]);
};
