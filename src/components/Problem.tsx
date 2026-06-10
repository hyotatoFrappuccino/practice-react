import type { FunctionComponent } from 'react';
import styles from './Problem.module.css';

const DIFFICULTY_COLOR: Record<string, { bg: string; color: string }> = {
  '하': { bg: '#e8f5e9', color: '#2e7d32' },
  '중': { bg: '#fff8e1', color: '#e65100' },
  '상': { bg: '#fce4ec', color: '#c62828' },
};

type Props = {
  title: string;
  difficulty: string;
  algorithm: string;
  description: string;
  inputDesc: string;
  outputDesc: string;
  exampleInput: string;
  exampleOutput: string;
};

const Problem: FunctionComponent<Props> = ({
  title,
  difficulty,
  algorithm,
  description,
  inputDesc,
  outputDesc,
  exampleInput,
  exampleOutput,
}) => {
  const diffStyle = DIFFICULTY_COLOR[difficulty] ?? { bg: '#f0f0f0', color: '#555' };
  return (
    <div className={styles.div}>
      <div className={styles.baseInfo}>
        <div className={styles.baseInfo2}>
          <div className={styles.div2}>
            <b className={styles.b}>{title}</b>
            <span className={styles.diffBadge} style={{ backgroundColor: diffStyle.bg, color: diffStyle.color }}>
              {difficulty}
            </span>
          </div>
          <div className={styles.algoTags}>
            {algorithm.split('/').map(tag => (
              <span key={tag} className={styles.algoTag}>{tag.trim()}</span>
            ))}
          </div>
          <div className={styles.aB}>{description}</div>
        </div>
      </div>
      <div className={styles.div4}>
        <b className={styles.b2}>입력</b>
      </div>
      <div className={styles.aB}>{inputDesc}</div>
      <div className={styles.div4}>
        <b className={styles.b2}>출력</b>
      </div>
      <div className={styles.aB}>{outputDesc}</div>
      <div className={styles.div4}>
        <b className={styles.b2}>예제 입력 1</b>
      </div>
      <pre className={styles.exampleBlock}>{exampleInput}</pre>
      <div className={styles.div4}>
        <b className={styles.b2}>예제 출력 1</b>
      </div>
      <pre className={styles.exampleBlock}>{exampleOutput}</pre>
    </div>
  );
};

export default Problem;
