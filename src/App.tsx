import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer.tsx";
import Table from "./components/Table.tsx";
import Pagination from "./components/Pagination.tsx";
import ProblemSidebar, { type RateSort } from "./components/ProblemSidebar.tsx";
import DailyProblem from "./components/DailyProblem.tsx";
import { fetchProblems, type Problem } from './api/api';
import { getDailyIndex } from './utils/dailyHash';

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [rateSort, setRateSort] = useState<RateSort>(null);
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

  const toggleDifficulty = (d: string) => {
    setDifficulties(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    setCurrentPage(1);
  };

  const toggleAlgorithm = (a: string) => {
    setAlgorithms(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
    setCurrentPage(1);
  };

  const handleRateSortChange = (s: RateSort) => {
    setRateSort(s);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setDifficulties([]);
    setAlgorithms([]);
    setRateSort(null);
    setCurrentPage(1);
  };

  const dailyProblem = problems.length > 0 ? problems[getDailyIndex(problems.length)] : null;

  const allAlgorithms = useMemo(() => {
    const set = new Set<string>();
    problems.forEach(p => p.algorithm.split('/').forEach(a => set.add(a.trim())));
    return Array.from(set).sort();
  }, [problems]);

  const filteredProblems = useMemo(() => {
    let result = problems.filter(p => {
      const matchesSearch = p.title.includes(searchQuery) || String(p.id).includes(searchQuery);
      const matchesDifficulty = difficulties.length === 0 || difficulties.includes(p.difficulty);
      const pAlgos = p.algorithm.split('/').map(a => a.trim());
      const matchesAlgorithm = algorithms.length === 0 || algorithms.some(a => pAlgos.includes(a));
      return matchesSearch && matchesDifficulty && matchesAlgorithm;
    });

    if (rateSort) {
      result = [...result].sort((a, b) => {
        const ra = parseFloat(a.rate);
        const rb = parseFloat(b.rate);
        return rateSort === 'asc' ? ra - rb : rb - ra;
      });
    }

    return result;
  }, [problems, searchQuery, difficulties, algorithms, rateSort]);

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 16px', boxSizing: 'border-box', maxWidth: '1295px', margin: '0 auto', width: '100%' }}>
        {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'Pretendard GOV' }}>불러오는 중...</div>}
        {error && <div style={{ textAlign: 'center', padding: '40px', color: '#ff383c', fontFamily: 'Pretendard GOV' }}>{error}</div>}
        {!loading && !error && (
          <>
            {dailyProblem && <DailyProblem problem={dailyProblem} />}
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
              <ProblemSidebar
                difficulties={difficulties}
                algorithms={algorithms}
                rateSort={rateSort}
                allAlgorithms={allAlgorithms}
                onDifficultyToggle={toggleDifficulty}
                onAlgorithmToggle={toggleAlgorithm}
                onRateSortChange={handleRateSortChange}
                onReset={handleReset}
              />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Table rows={paginatedProblems} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
