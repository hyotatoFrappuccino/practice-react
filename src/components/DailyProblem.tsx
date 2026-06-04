import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Problem } from '../api/api';
import styles from './DailyProblem.module.css';

interface Props {
  problem: Problem;
}

const DailyProblem: FunctionComponent<Props> = ({ problem }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/problems/${problem.id}`)}>
      <div className={styles.badge}>오늘의 문제</div>
      <div className={styles.content}>
        <span className={styles.id}>#{problem.id}</span>
        <span className={styles.title}>{problem.title}</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.metaItem}>정답 비율 <b>{problem.rate}</b></span>
        <span className={styles.metaItem}>맞힌 사람 <b>{problem.solved.toLocaleString()}</b></span>
      </div>
    </div>
  );
};

export default DailyProblem;
