import { useState, type FunctionComponent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JudgeFilter from '../components/JudgeFilter';
import JudgeTable from '../components/JudgeTable';
import Pagination from '../components/Pagination';
import allResults from '../data/judgeResults';

const ITEMS_PER_PAGE = 10;

const GradingStatusPage: FunctionComponent = () => {
  const [userId, setUserId] = useState('');
  const [problemId, setProblemId] = useState('');
  const [result, setResult] = useState('전체');
  const [language, setLanguage] = useState('모든 언어');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allResults.filter(r => {
    if (userId && !r.userId.includes(userId)) return false;
    if (problemId && String(r.problemId) !== problemId) return false;
    if (result !== '전체' && r.result !== result) return false;
    if (language !== '모든 언어' && r.language !== language) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setCurrentPage(1);
  };

  return (
    <>
      <Header onSearchChange={() => {}} />
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 40px', maxWidth: '1280px', margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
        <JudgeFilter
          userId={userId}
          problemId={problemId}
          result={result}
          language={language}
          onUserIdChange={handleFilterChange(setUserId)}
          onProblemIdChange={handleFilterChange(setProblemId)}
          onResultChange={handleFilterChange(setResult)}
          onLanguageChange={handleFilterChange(setLanguage)}
        />
        <JudgeTable rows={paginated} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </main>
      <Footer />
    </>
  );
};

export default GradingStatusPage;
