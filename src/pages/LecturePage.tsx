import { useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './ListPage.module.css';

const mockLectures = [
    { id: 1,  title: '알고리즘 기초 완성',            instructor: '김코딩',  level: '입문', category: '알고리즘', duration: '12시간', enrolled: 1842, rating: 4.8 },
    { id: 2,  title: '자료구조 심화 과정',             instructor: '이자바',  level: '중급', category: '자료구조', duration: '18시간', enrolled: 963,  rating: 4.6 },
    { id: 3,  title: '동적 프로그래밍 마스터',         instructor: '박알고',  level: '고급', category: '알고리즘', duration: '10시간', enrolled: 527,  rating: 4.9 },
    { id: 4,  title: '그래프 이론과 탐색 알고리즘',    instructor: '최그래프', level: '중급', category: '알고리즘', duration: '14시간', enrolled: 741,  rating: 4.7 },
    { id: 5,  title: 'Python으로 배우는 코딩 테스트',  instructor: '정파이썬', level: '입문', category: '언어',     duration: '20시간', enrolled: 3102, rating: 4.9 },
    { id: 6,  title: 'C++ STL 완전 정복',              instructor: '강씨피피', level: '중급', category: '언어',     duration: '8시간',  enrolled: 488,  rating: 4.5 },
    { id: 7,  title: '정렬 알고리즘 총정리',           instructor: '김코딩',  level: '입문', category: '알고리즘', duration: '6시간',  enrolled: 2156, rating: 4.7 },
    { id: 8,  title: '트리와 이진 탐색 트리',          instructor: '이자바',  level: '중급', category: '자료구조', duration: '9시간',  enrolled: 612,  rating: 4.6 },
    { id: 9,  title: '수학으로 풀어보는 알고리즘',     instructor: '박알고',  level: '고급', category: '알고리즘', duration: '11시간', enrolled: 334,  rating: 4.8 },
    { id: 10, title: '코딩 테스트 실전 모의고사',      instructor: '정파이썬', level: '중급', category: '코딩테스트', duration: '16시간', enrolled: 1275, rating: 4.7 },
    { id: 11, title: 'Java로 배우는 알고리즘',         instructor: '이자바',  level: '입문', category: '언어',     duration: '15시간', enrolled: 890,  rating: 4.5 },
    { id: 12, title: '해시·힙·우선순위 큐',           instructor: '최그래프', level: '중급', category: '자료구조', duration: '7시간',  enrolled: 543,  rating: 4.6 },
    { id: 13, title: '네트워크 플로우 & 매칭',         instructor: '박알고',  level: '고급', category: '알고리즘', duration: '13시간', enrolled: 218,  rating: 4.9 },
    { id: 14, title: 'KAKAO 기출 완전 분석',           instructor: '김코딩',  level: '중급', category: '코딩테스트', duration: '19시간', enrolled: 2341, rating: 4.8 },
    { id: 15, title: '삼성 SW 역량 테스트 A형 대비',   instructor: '강씨피피', level: '중급', category: '코딩테스트', duration: '22시간', enrolled: 1672, rating: 4.7 },
    { id: 16, title: '문자열 알고리즘 (KMP·트라이)',   instructor: '최그래프', level: '고급', category: '알고리즘', duration: '8시간',  enrolled: 296,  rating: 4.8 },
    { id: 17, title: '백트래킹 & 브루트포스 전략',     instructor: '박알고',  level: '입문', category: '알고리즘', duration: '10시간', enrolled: 1430, rating: 4.6 },
    { id: 18, title: 'Kotlin 코딩 테스트 입문',        instructor: '이자바',  level: '입문', category: '언어',     duration: '12시간', enrolled: 407,  rating: 4.5 },
];

const LEVEL_COLOR: Record<string, string> = {
    '입문': '#2e7d32',
    '중급': '#1565c0',
    '고급': '#b71c1c',
};

const CATEGORIES = ['전체', '알고리즘', '자료구조', '언어', '코딩테스트'];

const LecturePage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('전체');

    const filtered = category === '전체'
        ? mockLectures
        : mockLectures.filter(l => l.category === category);

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.main}>
                <h2 className={styles.pageTitle}>강의</h2>

                <div className={styles.filterTabs}>
                    {CATEGORIES.map(c => (
                        <button
                            key={c}
                            className={`${styles.filterTab} ${category === c ? styles.filterTabActive : ''}`}
                            onClick={() => setCategory(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filtered.map(lecture => (
                        <div key={lecture.id} className={styles.card} onClick={() => navigate(`/lectures/${lecture.id}`)}>
                            <div className={styles.cardThumb}>
                                <span className={styles.levelBadge} style={{ backgroundColor: LEVEL_COLOR[lecture.level] }}>
                                    {lecture.level}
                                </span>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.cardTitle}>{lecture.title}</div>
                                <div className={styles.cardMeta}>
                                    <span>{lecture.instructor}</span>
                                    <span className={styles.dot}>·</span>
                                    <span>{lecture.duration}</span>
                                </div>
                                <div className={styles.cardFooter}>
                                    <span className={styles.cardSub}>{lecture.enrolled.toLocaleString()}명 수강</span>
                                    <span className={styles.rating}>★ {lecture.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LecturePage;
