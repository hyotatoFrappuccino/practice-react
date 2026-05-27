import type { FunctionComponent } from 'react';
import styles from './JudgeTable.module.css';
import type { JudgeResult } from '../api/api';

type Props = {
  rows: JudgeResult[];
};

const RESULT_STYLE: Record<string, { color: string; fontWeight: number }> = {
  '맞았습니다!': { color: '#009b72', fontWeight: 800 },
  '틀렸습니다!': { color: '#ff0000', fontWeight: 500 },
  '컴파일 에러': { color: '#81b8ff', fontWeight: 500 },
  '런타임 에러': { color: '#ff8c00', fontWeight: 500 },
  '시간 초과':   { color: '#ff8c00', fontWeight: 500 },
};

const JudgeTable: FunctionComponent<Props> = ({ rows }) => {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.columnHeader}>
          <div className={styles.col}><b className={styles.b}>제출 번호</b></div>
          <div className={styles.colId}><b className={styles.b}>아이디</b></div>
          <div className={styles.col}><b className={styles.b}>문제</b></div>
          <div className={styles.colResult}><b className={styles.b}>결과</b></div>
          <div className={styles.col}><b className={styles.b}>메모리</b></div>
          <div className={styles.col}><b className={styles.b}>시간</b></div>
          <div className={styles.col}><b className={styles.b}>언어</b></div>
          <div className={styles.col}><b className={styles.b}>코드 길이</b></div>
          <div className={styles.col}><b className={styles.b}>제출한 시간</b></div>
        </div>
        {rows.map((row) => {
          const rs = RESULT_STYLE[row.result] ?? { color: '#555', fontWeight: 500 };
          return (
            <div key={row.submitNo} className={styles.rowGroup}>
              <div className={styles.cell}><div className={styles.b}>{row.submitNo}</div></div>
              <div className={styles.cellId}><div className={styles.b}>{row.userId}</div></div>
              <div className={styles.cellProblem}><div className={styles.b}>{row.problemId}</div></div>
              <div className={styles.cellResult}>
                <div style={{ color: rs.color, fontWeight: rs.fontWeight, lineHeight: '150%' }}>{row.result}</div>
              </div>
              <div className={styles.cell}>
                <div className={styles.b}>
                  <span className={styles.span}>{row.memory}</span>
                  <span className={styles.unit}> KB</span>
                </div>
              </div>
              <div className={styles.cell}>
                <div className={styles.b}>
                  <span className={styles.span}>{row.time}</span>
                  <span className={styles.unit}> ms</span>
                </div>
              </div>
              <div className={styles.cell}><div className={styles.b}>{row.language}</div></div>
              <div className={styles.cell}>
                <div className={styles.b}>
                  <span className={styles.span}>{row.codeLength}</span>
                  <span className={styles.unit}> B</span>
                </div>
              </div>
              <div className={styles.cell}><div className={styles.b}>{row.submittedAt}</div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JudgeTable;
