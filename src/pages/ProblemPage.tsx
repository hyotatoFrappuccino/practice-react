import { useState, useEffect, type FunctionComponent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Problem from '../components/Problem';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchProblems, type Problem as ProblemType } from '../api/api';

const ProblemPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<ProblemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProblems()
      .then(list => {
        const found = list.find(p => p.id === Number(id));
        if (found) setProblem(found);
        else setError('문제를 찾을 수 없습니다.');
      })
      .catch(e => setError(e instanceof Error ? e.message : '오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header onSearchChange={() => {}} />
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 40px', maxWidth: '1280px', margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
        <button
          onClick={() => navigate('/')}
          style={{ alignSelf: 'flex-start', cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', border: '1px solid #c6c6c6', background: '#fff', fontSize: '15px', fontFamily: 'Pretendard GOV', color: '#1d1d1d' }}
        >
          ← 목록으로 돌아가기
        </button>
        {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'Pretendard GOV' }}>불러오는 중...</div>}
        {error && <div style={{ textAlign: 'center', padding: '40px', color: '#ff383c', fontFamily: 'Pretendard GOV' }}>{error}</div>}
        {problem && (
          <>
            <Problem
              title={problem.title}
              description={problem.description}
              inputDesc={problem.inputDesc}
              outputDesc={problem.outputDesc}
              exampleInput={problem.exampleInput}
              exampleOutput={problem.exampleOutput}
            />
            <Button label="제출하기" onClick={() => navigate(`/problems/${id}/submit`)} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProblemPage;
