import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import HistoryFilter from '../../components/history/HistoryFilter';
import HistoryList from '../../components/history/HistoryList';
import { useHistory } from '../../hooks/useHistory';

export const HistoryPage = () => {
  const navigate = useNavigate();
  // Enable active polling every 15s by passing 'true' to hook
  const { history, isLoading, deleteItem } = useHistory(true);
  
  const [filter, setFilter] = useState({
    grade: '',
    sort: 'latest'
  });

  const filteredHistory = useMemo(() => {
    let result = [...history];

    if (filter.grade) {
      result = result.filter(item => item.grade === filter.grade);
    }

    if (filter.sort === 'latest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter.sort === 'highest') {
      result.sort((a, b) => b.healthScore - a.healthScore);
    } else if (filter.sort === 'lowest') {
      result.sort((a, b) => a.healthScore - b.healthScore);
    }

    return result;
  }, [history, filter]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full select-none animate-fade-in pb-12">
        <header className="flex flex-col gap-1 select-none">
          <h1 className="text-2xl font-black text-gray-805 leading-none">Scan History</h1>
          <p className="text-sm text-gray-400 font-semibold mt-1">
            Access previous food label scans and chemical reports (polls automatically).
          </p>
        </header>

        {/* Dynamic Filters */}
        <HistoryFilter filter={filter} setFilter={setFilter} />

        {/* History table container */}
        <Card className="p-4 w-full overflow-hidden">
          {isLoading && history.length === 0 ? (
            <Spinner />
          ) : (
            <HistoryList
              history={filteredHistory}
              onCardClick={(item) => navigate(`/product/${item._id}`)}
              onDelete={deleteItem}
            />
          )}
        </Card>
      </div>
    </PageWrapper>
  );
};

export default HistoryPage;
