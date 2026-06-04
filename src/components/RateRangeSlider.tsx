import { type FunctionComponent, useRef } from 'react';
import styles from './RateRangeSlider.module.css';

interface Props {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

const TOTAL_MIN = 0;
const TOTAL_MAX = 100;

const RateRangeSlider: FunctionComponent<Props> = ({ min, max, onChange }) => {
  const rangeRef = useRef<HTMLDivElement>(null);

  const leftPct = ((min - TOTAL_MIN) / (TOTAL_MAX - TOTAL_MIN)) * 100;
  const rightPct = ((max - TOTAL_MIN) / (TOTAL_MAX - TOTAL_MIN)) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), max - 1);
    onChange(val, max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), min + 1);
    onChange(min, val);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>정답 비율</span>
      <div className={styles.sliderArea}>
        <div className={styles.track} ref={rangeRef}>
          <div
            className={styles.fill}
            style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
          />
        </div>
        <input
          type="range"
          className={styles.thumb}
          min={TOTAL_MIN}
          max={TOTAL_MAX}
          value={min}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className={styles.thumb}
          min={TOTAL_MIN}
          max={TOTAL_MAX}
          value={max}
          onChange={handleMaxChange}
        />
      </div>
      <span className={styles.value}>{min}% – {max}%</span>
    </div>
  );
};

export default RateRangeSlider;
