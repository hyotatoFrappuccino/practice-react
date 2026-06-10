import { useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import styles from './ListPage.module.css';

const mockGroups = [
    { id: 1,  name: '삼성 SW 역량 테스트 준비반',    members: 48,  type: '공개',  category: '취업',     description: '삼성 SW 역량 테스트 A형/B형 대비 스터디 그룹입니다.' },
    { id: 2,  name: '카카오 코딩 테스트 스터디',      members: 32,  type: '공개',  category: '취업',     description: '카카오 계열사 코딩 테스트를 함께 준비합니다.' },
    { id: 3,  name: '서울대 알고리즘 동아리',         members: 67,  type: '비공개', category: '동아리',   description: '서울대학교 알고리즘 학습 동아리입니다.' },
    { id: 4,  name: '매일 1문제 챌린저스',            members: 215, type: '공개',  category: '스터디',   description: '매일 알고리즘 문제 1개씩 꾸준히 풀어나가는 그룹입니다.' },
    { id: 5,  name: 'ICPC 2026 팀 모집',              members: 12,  type: '공개',  category: '대회',     description: 'ICPC 국내 지역 예선 및 본선을 목표로 합니다.' },
    { id: 6,  name: '고등학생 알고리즘 모임',         members: 89,  type: '공개',  category: '대회',     description: '정보올림피아드 및 고등학생 대상 알고리즘 스터디입니다.' },
    { id: 7,  name: '네이버 공채 준비 그룹',          members: 54,  type: '비공개', category: '취업',     description: '네이버 공개채용 코딩 테스트 대비 스터디입니다.' },
    { id: 8,  name: '알고리즘 오답 노트 공유',        members: 130, type: '공개',  category: '스터디',   description: '틀린 문제를 함께 분석하고 풀이를 공유하는 그룹입니다.' },
    { id: 9,  name: 'Python 알고리즘 스터디',         members: 76,  type: '공개',  category: '스터디',   description: 'Python으로 알고리즘 문제를 함께 풀어나가는 그룹입니다.' },
    { id: 10, name: 'POSTECH 알고리즘 랩',            members: 41,  type: '비공개', category: '동아리',   description: 'POSTECH 컴퓨터공학과 알고리즘 연구 모임입니다.' },
    { id: 11, name: '라인 코테 대비 스터디',          members: 28,  type: '공개',  category: '취업',     description: '라인 및 네이버 계열 코딩 테스트를 집중적으로 준비합니다.' },
    { id: 12, name: 'ICPC OB·OG 멘토링',             members: 23,  type: '비공개', category: '대회',     description: 'ICPC 수상 경력자들이 후배를 멘토링하는 그룹입니다.' },
    { id: 13, name: '취준생 알고리즘 벼락치기',       members: 187, type: '공개',  category: '취업',     description: '2주 만에 코딩 테스트 통과를 목표로 하는 집중 스터디입니다.' },
    { id: 14, name: 'C++ 고수들의 모임',              members: 35,  type: '공개',  category: '스터디',   description: 'C++로 고난이도 알고리즘 문제를 함께 풀어봅니다.' },
];

const CATEGORIES = ['전체', '스터디', '취업', '대회', '동아리'];

const GroupPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [category, setCategory] = useState('전체');

    const handleToast = () => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 0);
    };

    const filtered = category === '전체'
        ? mockGroups
        : mockGroups.filter(g => g.category === category);

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.main}>
                <h2 className={styles.pageTitle}>그룹</h2>

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
                    {filtered.map(group => (
                        <div key={group.id} className={styles.groupCard} onClick={() => navigate(`/groups/${group.id}`)}>
                            <div className={styles.groupHeader}>
                                <span className={styles.groupName}>{group.name}</span>
                                <span
                                    className={styles.typeBadge}
                                    style={{
                                        backgroundColor: group.type === '공개' ? '#e8f5e9' : '#fce4ec',
                                        color: group.type === '공개' ? '#2e7d32' : '#c62828',
                                    }}
                                >
                                    {group.type}
                                </span>
                            </div>
                            <div className={styles.groupDesc}>{group.description}</div>
                            <div className={styles.groupFooter}>
                                <span className={styles.memberCount}>멤버 {group.members}명</span>
                                <button className={styles.joinBtn} onClick={e => { e.stopPropagation(); handleToast(); }}>
                                    가입하기
                                </button>
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

export default GroupPage;
