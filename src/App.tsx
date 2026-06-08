import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer.tsx";
import Table from "./components/Table.tsx";
import Pagination from "./components/Pagination.tsx";
import RateRangeSlider from "./components/RateRangeSlider.tsx";
import DailyProblem from "./components/DailyProblem.tsx";
import { fetchProblems, type Problem } from './api/api';
import { getDailyIndex } from './utils/dailyHash';

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [rateMin, setRateMin] = useState(0);
  const [rateMax, setRateMax] = useState(100);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProblems()
      .then(setProblems)
      .catch(e => setError(e instanceof Error ? e.message : '오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleRateChange = (min: number, max: number) => {
    setRateMin(min);
    setRateMax(max);
    setCurrentPage(1);
  };

  const dailyProblem = problems.length > 0 ? problems[getDailyIndex(problems.length)] : null;

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.includes(searchQuery) || String(p.id).includes(searchQuery);
    const rate = parseFloat(p.rate);
    const matchesRate = isNaN(rate) || (rate >= rateMin && rate <= rateMax);
    return matchesSearch && matchesRate;
  });

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 16px', boxSizing: 'border-box' }}>
        {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'Pretendard GOV' }}>불러오는 중...</div>}
        {error && <div style={{ textAlign: 'center', padding: '40px', color: '#ff383c', fontFamily: 'Pretendard GOV' }}>{error}</div>}
        {!loading && !error && (
          <>
            {dailyProblem && <DailyProblem problem={dailyProblem} />}
            <div style={{ width: '100%', maxWidth: '1295px', margin: '0 auto', display: 'flex', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
              <RateRangeSlider min={rateMin} max={rateMax} onChange={handleRateChange} />
            </div>
            <Table rows={paginatedProblems} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
