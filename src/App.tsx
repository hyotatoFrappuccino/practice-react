import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer.tsx";
import Table from "./components/Table.tsx";
import Pagination from "./components/Pagination.tsx";
import { fetchProblems, type Problem } from './api/api';

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
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

  const filteredProblems = problems.filter(p =>
    p.title.includes(searchQuery) || String(p.id).includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
        {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'Pretendard GOV' }}>불러오는 중...</div>}
        {error && <div style={{ textAlign: 'center', padding: '40px', color: '#ff383c', fontFamily: 'Pretendard GOV' }}>{error}</div>}
        {!loading && !error && (
          <>
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
