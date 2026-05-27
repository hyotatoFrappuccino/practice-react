import type { FunctionComponent } from 'react';
import styles from './BaseInput.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const BaseInput: FunctionComponent<Props> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className={styles.baseInput}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default BaseInput;
