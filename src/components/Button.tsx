import type { FunctionComponent } from 'react';
import styles from './Button.module.css';

type Props = {
  label?: string;
  onClick?: () => void;
};

const Button: FunctionComponent<Props> = ({ label = '제출하기', onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <div className={styles.div}>{label}</div>
    </div>
  );
};

export default Button;
