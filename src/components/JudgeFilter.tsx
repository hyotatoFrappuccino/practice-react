import type { FunctionComponent } from 'react';
import styles from './JudgeFilter.module.css';

const RESULTS = ['전체', '맞았습니다!', '틀렸습니다!', '컴파일 에러', '런타임 에러', '시간 초과'];
const LANGUAGES = ['모든 언어', 'Python3', 'C++17', 'C++14', 'Java', 'C', 'C#', 'C99', 'Kotlin', 'Swift', 'Go'];

type Props = {
  userId: string;
  problemId: string;
  result: string;
  language: string;
  onUserIdChange: (v: string) => void;
  onProblemIdChange: (v: string) => void;
  onResultChange: (v: string) => void;
  onLanguageChange: (v: string) => void;
};

const JudgeFilter: FunctionComponent<Props> = ({
  userId, problemId, result, language,
  onUserIdChange, onProblemIdChange, onResultChange, onLanguageChange,
}) => {
  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        className={styles.textInput}
        placeholder="아이디"
        value={userId}
        onChange={e => onUserIdChange(e.target.value)}
      />
      <input
        type="text"
        className={styles.textInput}
        placeholder="문제 번호"
        value={problemId}
        onChange={e => onProblemIdChange(e.target.value)}
      />
      <div className={styles.selectWrapper}>
        <select
          className={`${styles.select} ${result !== '전체' ? styles.selectActive : ''}`}
          value={result}
          onChange={e => onResultChange(e.target.value)}
        >
          {RESULTS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div className={styles.selectWrapper}>
        <select
          className={`${styles.select} ${language !== '모든 언어' ? styles.selectActive : ''}`}
          value={language}
          onChange={e => onLanguageChange(e.target.value)}
        >
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
    </div>
  );
};

export default JudgeFilter;
