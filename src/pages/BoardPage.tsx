import { useState, useEffect, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { fetchPosts, formatRelativeTime, type PostSummary } from '../api/api';
import styles from './Board.module.css';
import tableStyles from './ListPage.module.css';

const CATEGORIES = ['전체', '공지', '질문', '자유'];
const PAGE_SIZE = 20;

const BADGE_COLOR: Record<string, { color: string; borderColor: string }> = {
    '공지': { color: '#c62828', borderColor: '#c62828' },
    '질문': { color: '#1565c0', borderColor: '#1565c0' },
    '자유': { color: '#2e7d32', borderColor: '#2e7d32' },
};

const BoardPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchPosts({
            category: category === '전체' ? undefined : category,
            page: currentPage - 1,
            size: PAGE_SIZE,
        })
            .then(data => {
                setPosts(data.content);
                setTotalPages(Math.max(1, data.totalPages));
            })
            .catch(e => setError(e instanceof Error ? e.message : '오류가 발생했습니다.'))
            .finally(() => setLoading(false));
    }, [category, currentPage]);

    const handleCategoryChange = (c: string) => {
        setCategory(c);
        setCurrentPage(1);
    };

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={tableStyles.main}>
                <div className={styles.tabs}>
                    {CATEGORIES.map(c => (
                        <button
                            key={c}
                            className={`${styles.tab} ${category === c ? styles.tabActive : ''}`}
                            onClick={() => handleCategoryChange(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className={styles.toolbar}>
                    <button className={styles.writeBtn} onClick={() => navigate('/board/write')}>
                        글쓰기
                    </button>
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'Pretendard GOV' }}>
                        불러오는 중...
                    </div>
                )}
                {error && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#ff383c', fontFamily: 'Pretendard GOV' }}>
                        {error}
                    </div>
                )}
                {!loading && !error && (
                    <>
                        <div className={tableStyles.tableWrap}>
                            <table className={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '60px' }}>번호</th>
                                        <th style={{ width: '70px' }}>분류</th>
                                        <th>제목</th>
                                        <th style={{ width: '100px' }}>작성자</th>
                                        <th style={{ width: '90px' }}>날짜</th>
                                        <th style={{ width: '60px' }}>조회</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#aaa', fontFamily: 'Pretendard GOV' }}>
                                                게시글이 없습니다.
                                            </td>
                                        </tr>
                                    ) : posts.map(post => {
                                        const bc = BADGE_COLOR[post.category] ?? { color: '#555', borderColor: '#555' };
                                        return (
                                            <tr
                                                key={post.id}
                                                className={`${tableStyles.row} ${post.pinned ? tableStyles.pinnedRow : ''}`}
                                                onClick={() => navigate(`/board/${post.id}`)}
                                            >
                                                <td className={tableStyles.center}>
                                                    {post.pinned
                                                        ? <span className={tableStyles.pinIcon}>📌</span>
                                                        : post.id}
                                                </td>
                                                <td className={tableStyles.center}>
                                                    <span className={styles.badge} style={{ color: bc.color, borderColor: bc.borderColor }}>
                                                        {post.category}
                                                    </span>
                                                </td>
                                                <td>
                                                    {post.title}
                                                    {post.commentCount > 0 && (
                                                        <span style={{ marginLeft: '6px', color: '#003675', fontSize: '13px', fontWeight: 600 }}>
                                                            [{post.commentCount}]
                                                        </span>
                                                    )}
                                                </td>
                                                <td className={tableStyles.center}>{post.author}</td>
                                                <td className={tableStyles.center}>{formatRelativeTime(post.createdAt)}</td>
                                                <td className={tableStyles.center}>{post.viewCount.toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
};

export default BoardPage;
