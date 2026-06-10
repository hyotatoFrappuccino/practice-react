import { useState, type FunctionComponent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import styles from './ListPage.module.css';

const mockGroups = [
    { id: 1, name: '삼성 SW 역량 테스트 준비반', members: 48, type: '공개', description: '삼성 SW 역량 테스트 A형/B형 대비 스터디 그룹입니다.' },
    { id: 2, name: '카카오 코딩 테스트 스터디', members: 32, type: '공개', description: '카카오 계열사 코딩 테스트를 함께 준비합니다.' },
    { id: 3, name: '서울대 알고리즘 동아리', members: 67, type: '비공개', description: '서울대학교 알고리즘 학습 동아리입니다.' },
    { id: 4, name: '매일 1문제 챌린저스', members: 215, type: '공개', description: '매일 알고리즘 문제 1개씩 꾸준히 풀어나가는 그룹입니다.' },
    { id: 5, name: 'ICPC 2026 팀 모집', members: 12, type: '공개', description: 'ICPC 국내 지역 예선 및 본선을 목표로 합니다.' },
    { id: 6, name: '고등학생 알고리즘 모임', members: 89, type: '공개', description: '정보올림피아드 및 고등학생 대상 알고리즘 스터디입니다.' },
    { id: 7, name: '네이버 공채 준비 그룹', members: 54, type: '비공개', description: '네이버 공개채용 코딩 테스트 대비 스터디입니다.' },
    { id: 8, name: '알고리즘 오답 노트 공유', members: 130, type: '공개', description: '틀린 문제를 함께 분석하고 풀이를 공유하는 그룹입니다.' },
];

const GroupPage: FunctionComponent = () => {
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 0);
    };

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.main}>
                <h2 className={styles.pageTitle}>그룹</h2>
                <div className={styles.grid}>
                    {mockGroups.map(group => (
                        <div key={group.id} className={styles.groupCard} onClick={handleClick}>
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
                                <button className={styles.joinBtn} onClick={e => { e.stopPropagation(); handleClick(); }}>
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
