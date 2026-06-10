import { useState, useEffect, useRef, type FunctionComponent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Problem from '../components/Problem';
import Header from '../components/Header';
import { fetchProblems, submitCode, type Problem as ProblemType } from '../api/api';
import styles from './ProblemPage.module.css';

const LANGUAGES = ['Python3', 'C++17', 'C++14', 'Java', 'C99', 'Kotlin', 'C#'];
const MAX_CODE_LENGTH = 65536;

const MONACO_LANG: Record<string, string> = {
  'Python3': 'python',
  'C++17':   'cpp',
  'C++14':   'cpp',
  'Java':    'java',
  'C99':     'c',
  'Kotlin':  'kotlin',
  'C#':      'csharp',
};
const DEFAULT_RIGHT_WIDTH = 480;
const MIN_WIDTH = 250;
const COLLAPSE_THRESHOLD = 80;

const ProblemPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<ProblemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState(false);

  const [rightWidth, setRightWidth] = useState(DEFAULT_RIGHT_WIDTH);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);

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

  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = rightWidth;

    const onMouseMove = (ev: MouseEvent) => {
      if (!splitRef.current) return;
      const total = splitRef.current.offsetWidth;
      const newWidth = startWidth + (startX - ev.clientX);

      if (newWidth < COLLAPSE_THRESHOLD) {
        setRightCollapsed(true);
        setLeftCollapsed(false);
      } else if (newWidth > total - COLLAPSE_THRESHOLD) {
        setLeftCollapsed(true);
        setRightCollapsed(false);
      } else {
        setRightCollapsed(false);
        setLeftCollapsed(false);
        setRightWidth(Math.max(MIN_WIDTH, Math.min(newWidth, total - MIN_WIDTH)));
      }
    };

    const onMouseUp = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const restoreRight = () => {
    setRightCollapsed(false);
    setRightWidth(DEFAULT_RIGHT_WIDTH);
  };

  const restoreLeft = () => {
    setLeftCollapsed(false);
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!code.trim()) {
      setCodeError(true);
      setSubmitError('코드를 입력해주세요.');
      return;
    }
    if (code.length > MAX_CODE_LENGTH) {
      setCodeError(true);
      setSubmitError(`코드 길이를 초과했습니다. (${code.length.toLocaleString()} / ${MAX_CODE_LENGTH.toLocaleString()}자)`);
      return;
    }
    setCodeError(false);
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
    <div className={styles.page}>
      <Header onSearchChange={() => {}} />

      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← 목록
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'Pretendard GOV' }}>
          불러오는 중...
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#ff383c', fontFamily: 'Pretendard GOV' }}>
          {error}
        </div>
      )}

      {problem && (
        <div className={styles.split} ref={splitRef}>
          {!leftCollapsed && (
            <div className={styles.leftPanel}>
              <Problem
                id={problem.id}
                title={problem.title}
                difficulty={problem.difficulty}
                algorithm={problem.algorithm}
                description={problem.description}
                inputDesc={problem.inputDesc}
                outputDesc={problem.outputDesc}
                exampleInput={problem.exampleInput}
                exampleOutput={problem.exampleOutput}
              />
            </div>
          )}

          {!leftCollapsed && !rightCollapsed && (
            <div className={styles.divider} onMouseDown={handleDividerMouseDown}>
              <div className={styles.dividerHandle} />
            </div>
          )}

          {!rightCollapsed && (
            <div
              className={styles.rightPanel}
              style={{ width: leftCollapsed ? undefined : rightWidth, flex: leftCollapsed ? 1 : undefined }}
            >
              <div className={styles.editorToolbar}>
                <select
                  className={styles.langSelect}
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <button
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? '채점 중...' : '제출하기'}
                </button>
              </div>

              <div className={`${styles.editorWrap}${codeError ? ` ${styles.editorError}` : ''}`}>
                <Editor
                  language={MONACO_LANG[language] ?? 'plaintext'}
                  value={code}
                  theme="vs"
                  onChange={val => {
                    const v = val ?? '';
                    setCode(v);
                    if (codeError && v.trim()) {
                      setCodeError(false);
                      setSubmitError(null);
                    }
                  }}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    tabSize: 4,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 },
                  }}
                />
              </div>

              <div className={styles.statusBar}>
                {submitError && <span className={styles.errorMsg}>{submitError}</span>}
              </div>
            </div>
          )}

          {rightCollapsed && (
            <button className={styles.restoreRight} onClick={restoreRight} title="에디터 열기">
              <span>{'<'}</span>
              <span className={styles.restoreLabel}>에디터</span>
            </button>
          )}
          {leftCollapsed && (
            <button className={styles.restoreLeft} onClick={restoreLeft} title="문제 보기">
              <span className={styles.restoreLabel}>문제</span>
              <span>{'>'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProblemPage;
