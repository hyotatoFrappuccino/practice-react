import type {FunctionComponent} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

const DIFFICULTY_COLOR: Record<string, { bg: string; color: string }> = {
    '하': { bg: '#e8f5e9', color: '#2e7d32' },
    '중': { bg: '#fff8e1', color: '#e65100' },
    '상': { bg: '#fce4ec', color: '#c62828' },
};

type PropsDetail = {
    id: number;
    title: string;
    solved: number;
    submissions: number;
    rate: string;
    difficulty: string;
    algorithm: string;
}

interface Props {
      rows: PropsDetail[];
}

const Table: FunctionComponent<Props> = ({ rows }) => {
      const navigate = useNavigate();

      return (
            <div className={styles.div}>
                  <div className={styles.columnHeader}>
                        <div className={styles.column}>
                              <b className={styles.b}>번호</b>
                        </div>
                        <div className={styles.column2}>
                              <b className={styles.b}>제목</b>
                        </div>
                        <div className={styles.columnNarrow}>
                              <b className={styles.b}>난이도</b>
                        </div>
                        <div className={styles.columnAlgo}>
                              <b className={styles.b}>알고리즘 분류</b>
                        </div>
                        <div className={styles.column}>
                              <b className={styles.b}>맞힌 사람</b>
                        </div>
                        <div className={styles.column}>
                              <b className={styles.b}>제출</b>
                        </div>
                        <div className={styles.column}>
                              <b className={styles.b}>정답 비율</b>
                        </div>
                  </div>
                  {rows.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'Pretendard GOV', fontSize: '15px' }}>
                              검색 결과가 없습니다.
                        </div>
                  ) : rows.map((row) => (
                        <div
                              key={row.id}
                              className={styles.rowGroup}
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate(`/problems/${row.id}`)}
                        >
                              <div className={styles.row}>
                                    <div className={styles.b}>{row.id}</div>
                              </div>
                              <div className={styles.row2}>
                                    <div className={styles.b}>{row.title}</div>
                              </div>
                              <div className={styles.rowNarrow}>
                                    {(() => {
                                          const d = DIFFICULTY_COLOR[row.difficulty] ?? { bg: '#f0f0f0', color: '#555' };
                                          return (
                                                <span className={styles.diffBadge} style={{ backgroundColor: d.bg, color: d.color }}>
                                                      {row.difficulty}
                                                </span>
                                          );
                                    })()}
                              </div>
                              <div className={styles.rowAlgo}>
                                    <div className={styles.algoTags}>
                                          {row.algorithm.split('/').map(tag => (
                                                <span key={tag} className={styles.algoTag}>{tag.trim()}</span>
                                          ))}
                                    </div>
                              </div>
                              <div className={styles.row}>
                                    <div className={styles.b}>{row.solved}</div>
                              </div>
                              <div className={styles.row}>
                                    <div className={styles.b}>{row.submissions}</div>
                              </div>
                              <div className={styles.row}>
                                    <div className={styles.b}>{row.rate}</div>
                              </div>
                        </div>
                  ))}
            </div>
      );
};

export default Table;
