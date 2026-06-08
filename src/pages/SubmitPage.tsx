import { useState, useEffect, type FunctionComponent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Selectbox from '../components/Selectbox';
import BaseInput from '../components/BaseInput';
import Button from '../components/Button';
import { fetchProblems, submitCode, type Problem } from '../api/api';

const LANGUAGES = ['Python3', 'C++17', 'C++14', 'Java', 'C', 'Kotlin', 'Swift', 'Go'];

const SubmitPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [codeEmptyError, setCodeEmptyError] = useState(false);

  useEffect(() => {
    fetchProblems()
      .then(list => setProblem(list.find(p => p.id === Number(id)) ?? null))
      .catch(() => {});
  }, [id]);

  const handleSubmit = async () => {
    if (submitting) return;
    if (!code.trim()) {
      setCodeEmptyError(true);
      setSubmitError('코드를 입력해주세요.');
      return;
    }
    setCodeEmptyError(false);
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitCode(Number(id), { language, code });
      navigate('/status');
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : '제출에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header onSearchChange={() => {}} />
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 40px', maxWidth: '1280px', margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
        <button
          onClick={() => navigate(`/problems/${id}`)}
          style={{ alignSelf: 'flex-start', cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', border: '1px solid #c6c6c6', background: '#fff', fontSize: '15px', fontFamily: 'Pretendard GOV', color: '#1d1d1d' }}
        >
          ← 문제로 돌아가기
        </button>

        <h2 style={{ margin: 0, fontSize: '22px', fontFamily: 'Pretendard GOV', color: '#1d1d1d' }}>
          {problem ? `${problem.id}. ${problem.title}` : '문제'} — 코드 제출
        </h2>

        <Selectbox
          label="제출 언어"
          options={LANGUAGES}
          value={language}
          onChange={setLanguage}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '15px', fontFamily: 'Pretendard GOV', color: '#1d1d1d', lineHeight: '150%' }}>코드</div>
          <BaseInput
            value={code}
            onChange={value => {
              setCode(value);
              if (codeEmptyError && value.trim()) {
                setCodeEmptyError(false);
                setSubmitError(null);
              }
            }}
            placeholder={`${language} 코드를 입력하세요...`}
            error={codeEmptyError}
          />
        </div>

        {submitError && (
          <div style={{ fontSize: '14px', color: '#ff383c', fontFamily: 'Pretendard GOV' }}>{submitError}</div>
        )}

        <Button
          label={submitting ? '채점 중...' : '제출하기'}
          onClick={handleSubmit}
        />
      </main>
      <Footer />
    </>
  );
};

export default SubmitPage;
