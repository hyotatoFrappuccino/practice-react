import type { FunctionComponent } from 'react';
import styles from './Label.module.css';

type Props = {
  text: string;
};

const Label: FunctionComponent<Props> = ({ text }) => {
  return (
    <div className={styles.label}>
      <div className={styles.label2}>{text}</div>
    </div>
  );
};

export default Label;
