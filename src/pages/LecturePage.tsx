import { useState, type FunctionComponent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import styles from './ListPage.module.css';

const mockLectures = [
    { id: 1, title: '알고리즘 기초 완성', instructor: '김코딩', level: '입문', duration: '12시간', enrolled: 1842 },
    { id: 2, title: '자료구조 심화 과정', instructor: '이자바', level: '중급', duration: '18시간', enrolled: 963 },
    { id: 3, title: '동적 프로그래밍 마스터', instructor: '박알고', level: '고급', duration: '10시간', enrolled: 527 },
    { id: 4, title: '그래프 이론과 탐색 알고리즘', instructor: '최그래프', level: '중급', duration: '14시간', enrolled: 741 },
    { id: 5, title: 'Python으로 배우는 코딩 테스트', instructor: '정파이썬', level: '입문', duration: '20시간', enrolled: 3102 },
    { id: 6, title: 'C++ STL 완전 정복', instructor: '강씨피피', level: '중급', duration: '8시간', enrolled: 488 },
    { id: 7, title: '정렬 알고리즘 총정리', instructor: '김코딩', level: '입문', duration: '6시간', enrolled: 2156 },
    { id: 8, title: '트리와 이진 탐색 트리', instructor: '이자바', level: '중급', duration: '9시간', enrolled: 612 },
    { id: 9, title: '수학으로 풀어보는 알고리즘', instructor: '박알고', level: '고급', duration: '11시간', enrolled: 334 },
    { id: 10, title: '코딩 테스트 실전 모의고사', instructor: '정파이썬', level: '중급', duration: '16시간', enrolled: 1275 },
];

const levelColor: Record<string, string> = {
    '입문': '#2e7d32',
    '중급': '#1565c0',
    '고급': '#b71c1c',
};

const LecturePage: FunctionComponent = () => {
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 0);
    };

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.main}>
                <h2 className={styles.pageTitle}>강의</h2>
                <div className={styles.grid}>
                    {mockLectures.map(lecture => (
                        <div key={lecture.id} className={styles.card} onClick={handleClick}>
                            <div className={styles.cardThumb}>
                                <span className={styles.levelBadge} style={{ backgroundColor: levelColor[lecture.level] }}>
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
                                <div className={styles.cardSub}>{lecture.enrolled.toLocaleString()}명 수강</div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
            {showToast && <Toast message="준비중인 기능입니다!" onClose={() => setShowToast(false)} />}
        </>
    );
};

export default LecturePage;
