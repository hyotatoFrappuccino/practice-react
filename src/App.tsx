import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer.tsx";
import Table from "./components/Table.tsx";
import Pagination from "./components/Pagination.tsx";
import problems from "./data/problems";

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');

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
        <Table rows={paginatedProblems} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
