import type { FunctionComponent } from 'react';
import styles from './BaseInput.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
};

const BaseInput: FunctionComponent<Props> = ({ value, onChange, placeholder, error }) => {
  return (
    <textarea
      className={error ? `${styles.baseInput} ${styles.baseInputError}` : styles.baseInput}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default BaseInput;
