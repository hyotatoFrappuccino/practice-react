import { useState, type FunctionComponent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import styles from './ListPage.module.css';

const mockPosts = [
    { id: 1, category: '질문', title: '백트래킹과 DFS의 차이가 뭔가요?', author: '알고초보', date: '2026.06.10', views: 312, comments: 8 },
    { id: 2, category: '공지', title: '6월 정기 알고리즘 대회 안내', author: '운영팀', date: '2026.06.09', views: 1540, comments: 23 },
    { id: 3, category: '자유', title: '드디어 골드 달성했습니다!', author: '코딩왕', date: '2026.06.09', views: 891, comments: 47 },
    { id: 4, category: '질문', title: '세그먼트 트리 구현 도움 요청', author: '트리어려워', date: '2026.06.08', views: 204, comments: 5 },
    { id: 5, category: '정보', title: 'ICPC 2026 지역 예선 일정 공유', author: '대회매니아', date: '2026.06.08', views: 678, comments: 12 },
    { id: 6, category: '질문', title: '파이썬 재귀 깊이 제한 해결 방법', author: '파이써너', date: '2026.06.07', views: 445, comments: 19 },
    { id: 7, category: '자유', title: '코딩 테스트 후기 (카카오 인턴)', author: '취준생A', date: '2026.06.07', views: 2340, comments: 66 },
    { id: 8, category: '정보', title: '알고리즘 추천 강의 모음', author: '정보공유', date: '2026.06.06', views: 1123, comments: 31 },
    { id: 9, category: '질문', title: '다익스트라 음수 간선 처리 질문', author: '그래프봇', date: '2026.06.06', views: 187, comments: 3 },
    { id: 10, category: '자유', title: '매일 1문제 챌린지 100일 달성!', author: '꾸준함의힘', date: '2026.06.05', views: 763, comments: 28 },
];

const categoryColor: Record<string, string> = {
    '공지': '#003675',
    '질문': '#e65100',
    '정보': '#2e7d32',
    '자유': '#555',
};

const BoardPage: FunctionComponent = () => {
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 0);
    };

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.main}>
                <h2 className={styles.pageTitle}>게시판</h2>
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }}>번호</th>
                                <th style={{ width: '70px' }}>분류</th>
                                <th>제목</th>
                                <th style={{ width: '100px' }}>작성자</th>
                                <th style={{ width: '100px' }}>날짜</th>
                                <th style={{ width: '70px' }}>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockPosts.map(post => (
                                <tr key={post.id} className={styles.row} onClick={handleClick}>
                                    <td className={styles.center}>{post.id}</td>
                                    <td className={styles.center}>
                                        <span className={styles.badge} style={{ color: categoryColor[post.category], borderColor: categoryColor[post.category] }}>
                                            {post.category}
                                        </span>
                                    </td>
                                    <td>
                                        {post.title}
                                        {post.comments > 0 && (
                                            <span className={styles.commentCount}>[{post.comments}]</span>
                                        )}
                                    </td>
                                    <td className={styles.center}>{post.author}</td>
                                    <td className={styles.center}>{post.date}</td>
                                    <td className={styles.center}>{post.views.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
            {showToast && <Toast message="준비중인 기능입니다!" onClose={() => setShowToast(false)} />}
        </>
    );
};

export default BoardPage;
