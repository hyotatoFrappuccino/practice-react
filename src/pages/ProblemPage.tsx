import type { FunctionComponent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Problem from '../components/Problem';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import problems from '../data/problems';

const ProblemPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const problem = problems.find(p => p.id === Number(id));

  if (!problem) {
    return (
      <>
        <Header onSearchChange={() => {}} />
        <main style={{ padding: '40px', textAlign: 'center' }}>
          <p>문제를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/')}>목록으로 돌아가기</button>
        </main>
        <Footer />
      </>
    );
  }

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
        <Problem
          title={problem.title}
          description={problem.description}
          inputDesc={problem.inputDesc}
          outputDesc={problem.outputDesc}
          exampleInput={problem.exampleInput}
          exampleOutput={problem.exampleOutput}
        />
        <Button label="제출하기" onClick={() => navigate(`/problems/${id}/submit`)} />
      </main>
      <Footer />
    </>
  );
};

export default ProblemPage;
