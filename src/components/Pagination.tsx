import type {FunctionComponent} from 'react';
import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: FunctionComponent<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <div
        className={styles.basicPagination}
        style={{ cursor: currentPage > 1 ? 'pointer' : 'default', opacity: currentPage > 1 ? 1 : 0.4 }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <div className={styles.b}>이전</div>
      </div>

      {pages.map(page => (
        <div
          key={page}
          className={page === currentPage ? styles.basicPagination2 : styles.basicPagination3}
          style={{ cursor: 'pointer' }}
          onClick={() => onPageChange(page)}
        >
          <div className={styles.number}>
            {page === currentPage
              ? <b className={styles.b}>{page}</b>
              : <div className={styles.b}>{page}</div>
            }
          </div>
        </div>
      ))}

      <div
        className={styles.basicPagination13}
        style={{ cursor: currentPage < totalPages ? 'pointer' : 'default', opacity: currentPage < totalPages ? 1 : 0.4 }}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        <div className={styles.b}>다음</div>
      </div>
    </div>
  );
};

export default Pagination;
