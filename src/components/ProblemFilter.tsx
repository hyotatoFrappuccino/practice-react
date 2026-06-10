import type { FunctionComponent } from 'react';
import RateRangeSlider from './RateRangeSlider';
import styles from './ProblemFilter.module.css';

const DIFFICULTIES = ['전체', '하', '중', '상'] as const;

type Props = {
  difficulty: string;
  rateMin: number;
  rateMax: number;
  onDifficultyChange: (v: string) => void;
  onRateChange: (min: number, max: number) => void;
};

const ProblemFilter: FunctionComponent<Props> = ({
  difficulty, rateMin, rateMax, onDifficultyChange, onRateChange,
}) => {
  return (
    <div className={styles.filterBar}>
      <span className={styles.label}>난이도</span>
      <div className={styles.pills}>
        {DIFFICULTIES.map(d => (
          <button
            key={d}
            className={`${styles.pill} ${difficulty === d ? styles.pillActive : ''}`}
            onClick={() => onDifficultyChange(d)}
          >
            {d}
          </button>
        ))}
      </div>
      <div className={styles.divider} />
      <RateRangeSlider min={rateMin} max={rateMax} onChange={onRateChange} />
    </div>
  );
};

export default ProblemFilter;
