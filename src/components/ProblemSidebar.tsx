import type { FunctionComponent } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import styles from './ProblemSidebar.module.css';

const DIFFICULTIES = ['하', '중', '상'];

const DIFF_COLOR: Record<string, { color: string }> = {
    '하': { color: '#2e7d32' },
    '중': { color: '#e65100' },
    '상': { color: '#c62828' },
};

export type RateSort = 'asc' | 'desc' | null;

type Props = {
    difficulties: string[];
    algorithms: string[];
    rateSort: RateSort;
    allAlgorithms: string[];
    onDifficultyToggle: (d: string) => void;
    onAlgorithmToggle: (a: string) => void;
    onRateSortChange: (s: RateSort) => void;
    onReset: () => void;
};

const ProblemSidebar: FunctionComponent<Props> = ({
    difficulties, algorithms, rateSort, allAlgorithms,
    onDifficultyToggle, onAlgorithmToggle, onRateSortChange, onReset,
}) => {
    const isActive = difficulties.length > 0 || algorithms.length > 0 || rateSort !== null;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <span className={styles.headerTitle}>필터</span>
                {isActive && (
                    <button className={styles.resetBtn} onClick={onReset}>초기화</button>
                )}
            </div>
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>난이도</h3>
                <div className={styles.chips}>
                    {DIFFICULTIES.map(d => {
                        const c = DIFF_COLOR[d];
                        const active = difficulties.includes(d);
                        return (
                            <button
                                key={d}
                                className={styles.diffChip}
                                style={{
                                    backgroundColor: active ? c.color : '#fff',
                                    color: active ? '#fff' : c.color,
                                    borderColor: c.color,
                                }}
                                onClick={() => onDifficultyToggle(d)}
                            >
                                {d}
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>정렬</h3>
                <div className={styles.sortButtons}>
                    <button
                        className={`${styles.sortBtn} ${rateSort === 'asc' ? styles.sortBtnActive : ''}`}
                        onClick={() => onRateSortChange(rateSort === 'asc' ? null : 'asc')}
                    >
                        <ChevronUp size={14} />
                        정답 비율 오름차순
                    </button>
                    <button
                        className={`${styles.sortBtn} ${rateSort === 'desc' ? styles.sortBtnActive : ''}`}
                        onClick={() => onRateSortChange(rateSort === 'desc' ? null : 'desc')}
                    >
                        <ChevronDown size={14} />
                        정답 비율 내림차순
                    </button>
                </div>
            </section>

            {allAlgorithms.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>알고리즘 분류</h3>
                    <div className={styles.algoList}>
                        {allAlgorithms.map(a => {
                            const active = algorithms.includes(a);
                            return (
                                <button
                                    key={a}
                                    className={`${styles.algoChip} ${active ? styles.algoChipActive : ''}`}
                                    onClick={() => onAlgorithmToggle(a)}
                                >
                                    {a}
                                </button>
                            );
                        })}
                    </div>
                </section>
            )}
        </aside>
    );
};

export default ProblemSidebar;
