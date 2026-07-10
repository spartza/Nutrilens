import { useCallback } from 'react';
import { useHistoryStore } from '../store/historyStore';
import * as historyApi from '../api/history.api';
import { useLiveRefresh } from './useLiveRefresh';
import { useToast } from './useToast';
import { parseApiError } from '../utils/parseApiError';

export const useHistory = (shouldPoll = false) => {
  const { history, setHistory, removeHistoryItem, setLoading, setError, isLoading, error } = useHistoryStore();
  const { addToast } = useToast();

  const fetchHistory = useCallback(async () => {
    setError(null);
    try {
      const res = await historyApi.getHistory();
      if (res.success) {
        setHistory(res.history || res.data || []);
      }
    } catch (e) {
      setError(parseApiError(e));
    }
  }, [setHistory, setError]);

  // Poll history dynamically every 15s if requested, otherwise run once
  useLiveRefresh(fetchHistory, shouldPoll ? 15000 : null);

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await historyApi.deleteHistoryItem(id);
      if (res.success) {
        removeHistoryItem(id);
        addToast(res.message || 'Scan history item deleted 🗑️', 'success');
      }
    } catch (e) {
      addToast(parseApiError(e), 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    history,
    isLoading,
    error,
    fetchHistory,
    deleteItem,
  };
};
