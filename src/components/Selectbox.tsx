import type { FunctionComponent } from 'react';
import styles from './Selectbox.module.css';

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const Selectbox: FunctionComponent<Props> = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.selectbox}>
      <div className={styles.label}>
        <div className={styles.label2}>{label}</div>
      </div>
      <div className={styles.selectWrapper}>
        <select
          className={styles.baseInput}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Selectbox;
