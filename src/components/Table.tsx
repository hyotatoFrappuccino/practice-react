import type {FunctionComponent} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

type PropsDetail = {
    id: number;
    title: string;
    solved: number;
    submissions: number;
    rate: string;
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
                  {rows.map((row) => (
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
