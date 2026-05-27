import type { FunctionComponent } from 'react';
import styles from './Problem.module.css';

type Props = {
  title: string;
  description: string;
  inputDesc: string;
  outputDesc: string;
  exampleInput: string;
  exampleOutput: string;
};

const Problem: FunctionComponent<Props> = ({
  title,
  description,
  inputDesc,
  outputDesc,
  exampleInput,
  exampleOutput,
}) => {
  return (
    <div className={styles.div}>
      <div className={styles.baseInfo}>
        <div className={styles.baseInfo2}>
          <div className={styles.div2}>
            <b className={styles.b}>{title}</b>
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
      <div className={styles.aB}>{exampleInput}</div>
      <div className={styles.div4}>
        <b className={styles.b2}>예제 출력 1</b>
      </div>
      <div className={styles.aB}>{exampleOutput}</div>
    </div>
  );
};

export default Problem;
