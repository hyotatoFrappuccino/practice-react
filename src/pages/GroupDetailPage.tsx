import { useState, type FunctionComponent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import styles from './Detail.module.css';

const AVATAR_COLORS = ['#003675', '#2e7d32', '#b71c1c', '#e65100', '#1565c0', '#6a1b9a', '#00695c', '#c62828'];

const mockGroups = [
    {
        id: 1, name: '삼성 SW 역량 테스트 준비반', members: 48, type: '공개', category: '취업',
        description: '삼성 SW 역량 테스트 A형/B형 대비 스터디 그룹입니다.\n매주 토요일 오전 10시에 온라인 스터디를 진행하며, 기출 문제 풀이와 코드 리뷰를 중심으로 운영합니다.\n현재 모집 중이며 누구든 가입 가능합니다.',
        memberList: ['홍길동', '김민준', '이서준', '박도윤', '최지호', '정시우', '강준서', '윤예준', '임도현', '신지후', '황민재', '오서진'],
        activities: [
            { text: '김민준님이 새 문제를 공유했습니다 — 「격자판 퍼즐」', date: '1시간 전' },
            { text: '이서준님이 풀이를 업로드했습니다 — 「2024 A형 1번」', date: '3시간 전' },
            { text: '박도윤님이 그룹에 가입했습니다.', date: '5시간 전' },
            { text: '홍길동님이 스터디 일정을 공지했습니다 — 6월 14일 (토) 오전 10시', date: '1일 전' },
            { text: '최지호님이 질문을 올렸습니다 — 「BFS vs DFS 선택 기준」', date: '2일 전' },
        ],
    },
    {
        id: 2, name: '카카오 코딩 테스트 스터디', members: 32, type: '공개', category: '취업',
        description: '카카오 계열사 코딩 테스트를 함께 준비합니다.\n2018년부터 최신 기출까지 매주 2~3문제씩 풀고 풀이를 공유합니다.',
        memberList: ['이현우', '김서연', '박준영', '최유진', '정민호', '강다은', '윤성재', '임하늘', '신동현'],
        activities: [
            { text: '이현우님이 풀이를 공유했습니다 — 「2025 카카오 1번」', date: '30분 전' },
            { text: '김서연님이 질문을 올렸습니다 — 「카카오 2번 시간초과 질문」', date: '2시간 전' },
            { text: '주간 스터디 공지 — 이번 주 문제: 2024 카카오 인턴 1~3번', date: '1일 전' },
        ],
    },
    {
        id: 3, name: '서울대 알고리즘 동아리', members: 67, type: '비공개', category: '동아리',
        description: '서울대학교 컴퓨터공학부 알고리즘 학습 동아리입니다.\n비공개 그룹으로, 재학생·졸업생만 가입 가능합니다.',
        memberList: ['김알고', '이씨피피', '박다익', '최소수', '정그래', '강이진', '윤카카'],
        activities: [
            { text: '내부 대회 결과 발표 — 1위 김알고', date: '2일 전' },
            { text: '5월 정기 세미나 자료 업로드', date: '5일 전' },
            { text: '신입 부원 OT 공지', date: '1주 전' },
        ],
    },
    {
        id: 4, name: '매일 1문제 챌린저스', members: 215, type: '공개', category: '스터디',
        description: '매일 알고리즘 문제 1개씩 꾸준히 풀어나가는 그룹입니다.\n인증 방식: 매일 자정 전까지 풀이 캡처 또는 링크를 공유해주세요.\n3일 연속 미인증 시 자동 퇴장됩니다.',
        memberList: ['꾸준이', '매일매일', '절대안쉬어', '코딩로봇', '1일1문제', '열정맨', '도전왕', '성실러'],
        activities: [
            { text: '오늘의 문제 — 백준 #2579 계단 오르기', date: '방금 전' },
            { text: '꾸준이님 100일 달성! 🎉', date: '1시간 전' },
            { text: '어제의 문제 풀이 공유 마감', date: '8시간 전' },
        ],
    },
    {
        id: 5, name: 'ICPC 2026 팀 모집', members: 12, type: '공개', category: '대회',
        description: 'ICPC 2026 국내 지역 예선 및 본선을 목표로 합니다.\n3인 1팀 구성을 위해 팀원을 모집 중입니다.\n주 2회 온라인 스터디, 실력 무관 열정 있는 분 환영합니다.',
        memberList: ['이아이씨', '박피씨', '최대회', '김수상'],
        activities: [
            { text: '팀 모집 공고 — C++ 능숙자 1명 추가 모집', date: '3시간 전' },
            { text: '연습 문제 업로드 — ICPC 2023 지역 예선 세트', date: '1일 전' },
        ],
    },
    {
        id: 6, name: '고등학생 알고리즘 모임', members: 89, type: '공개', category: '대회',
        description: '정보올림피아드 및 고등학생 대상 알고리즘 스터디입니다.\nKOI 지역·전국 대회 준비를 함께하며 멘토링도 제공합니다.',
        memberList: ['고딩킹', '올림픽꿈나무', '미래코더', '정보왕', '코딩천재'],
        activities: [
            { text: 'KOI 2026 일정 공유', date: '4시간 전' },
            { text: '이번 주 스터디 자료 — DP 심화', date: '2일 전' },
        ],
    },
    {
        id: 7, name: '네이버 공채 준비 그룹', members: 54, type: '비공개', category: '취업',
        description: '네이버 공개채용 코딩 테스트 대비 스터디입니다.\n비공개 그룹으로 초대를 통해서만 가입 가능합니다.',
        memberList: ['네이버희망', '초록창', '검색왕', '라인맨'],
        activities: [
            { text: '네이버 2025 하반기 기출 풀이 업로드', date: '1일 전' },
            { text: '주간 스터디 일정 공지', date: '3일 전' },
        ],
    },
    {
        id: 8, name: '알고리즘 오답 노트 공유', members: 130, type: '공개', category: '스터디',
        description: '틀린 문제를 함께 분석하고 풀이를 공유하는 그룹입니다.\n오답 원인 분석 → 정리 → 공유 사이클을 통해 실력을 키웁니다.',
        memberList: ['오답킹', '복습매니아', '꼼꼼한개발자', '틀렸습니다반성', '분석가'],
        activities: [
            { text: '이번 주 오답 모음 공유 — 5문제', date: '2시간 전' },
            { text: '복습매니아님 오답 노트 공유 — DP 오답 분석 10선', date: '1일 전' },
        ],
    },
    {
        id: 9,  name: 'Python 알고리즘 스터디',    members: 76,  type: '공개',  category: '스터디',
        description: 'Python으로 알고리즘 문제를 함께 풀어나가는 그룹입니다.\n매주 백준·프로그래머스 문제를 선정하고 각자 풀이 후 코드 리뷰를 진행합니다.',
        memberList: ['파이써너', '인덴트마스터', '리스트컴프', '람다왕', '제너레이터'],
        activities: [
            { text: '이번 주 문제 선정 — 백준 골드 3문제', date: '1시간 전' },
            { text: '파이써너님 코드 리뷰 — 메모이제이션 최적화', date: '5시간 전' },
        ],
    },
    {
        id: 10, name: 'POSTECH 알고리즘 랩',        members: 41,  type: '비공개', category: '동아리',
        description: 'POSTECH 컴퓨터공학과 알고리즘 연구 모임입니다.\n학술적 깊이 있는 알고리즘 학습과 논문 스터디를 병행합니다.',
        memberList: ['포항공대인', '알고연구원', '복잡도분석가'],
        activities: [
            { text: '이번 달 논문 스터디 — Minimum Cut 알고리즘', date: '3일 전' },
            { text: '세미나 발표 자료 업로드', date: '1주 전' },
        ],
    },
    {
        id: 11, name: '라인 코테 대비 스터디',      members: 28,  type: '공개',  category: '취업',
        description: '라인 및 네이버 계열 코딩 테스트를 집중적으로 준비합니다.\n기출 분석과 모의고사를 중심으로 진행합니다.',
        memberList: ['라인희망', '야후재팬', '네이버Z', '웹툰개발자'],
        activities: [
            { text: '라인 2024 기출 풀이 공유', date: '6시간 전' },
            { text: '다음 스터디 일정 공지 — 6월 15일', date: '2일 전' },
        ],
    },
    {
        id: 12, name: 'ICPC OB·OG 멘토링',          members: 23,  type: '비공개', category: '대회',
        description: 'ICPC 수상 경력자들이 후배를 멘토링하는 그룹입니다.\n월 1회 오프라인 모임과 온라인 코드 리뷰를 진행합니다.',
        memberList: ['월드파이널리스트', '금메달리스트', 'ICPC챔피언'],
        activities: [
            { text: '6월 오프라인 멘토링 일정 공지', date: '1일 전' },
            { text: '멘티 코드 리뷰 완료 — 3건', date: '4일 전' },
        ],
    },
    {
        id: 13, name: '취준생 알고리즘 벼락치기',   members: 187, type: '공개',  category: '취업',
        description: '2주 만에 코딩 테스트 통과를 목표로 하는 집중 스터디입니다.\n하루 3문제씩, 핵심 유형 위주로 빠르게 훑습니다.',
        memberList: ['벼락치기왕', '2주완성', '취업성공', '코테통과', '면접까지'],
        activities: [
            { text: 'Day 10 — 오늘의 문제: 이분 탐색 3문제', date: '방금 전' },
            { text: '벼락치기왕님이 그룹에 가입했습니다.', date: '30분 전' },
            { text: 'Day 9 풀이 총정리 업로드', date: '1일 전' },
        ],
    },
    {
        id: 14, name: 'C++ 고수들의 모임',           members: 35,  type: '공개',  category: '스터디',
        description: 'C++로 고난이도 알고리즘 문제를 함께 풀어봅니다.\n플래티넘 이상 문제 위주로 진행하며 구현 최적화 팁을 공유합니다.',
        memberList: ['씨쁠쁠', 'STL마스터', '포인터왕', '템플릿메타', '이터레이터'],
        activities: [
            { text: '이번 주 문제 — 백준 플래티넘 2문제', date: '2시간 전' },
            { text: 'STL마스터님 발표 자료 — 커스텀 해시 최적화', date: '3일 전' },
        ],
    },
];

const GroupDetailPage: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const group = mockGroups.find(g => g.id === Number(id));

    const toast = () => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 0);
    };

    if (!group) {
        return (
            <>
                <Header onSearchChange={() => {}} />
                <main className={styles.page}>
                    <button className={styles.backBtn} onClick={() => navigate('/groups')}>← 그룹 목록</button>
                    <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>그룹을 찾을 수 없습니다.</div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.page}>
                <button className={styles.backBtn} onClick={() => navigate('/groups')}>← 그룹 목록</button>

                <div className={styles.hero}>
                    <div className={styles.heroThumb} style={{ background: 'linear-gradient(135deg, #1a3a5c, #003675)' }}>
                        <span className={styles.heroThumbIcon}>👥</span>
                    </div>
                    <div className={styles.heroInfo}>
                        <div className={styles.badgeRow}>
                            <span
                                className={styles.badge}
                                style={{
                                    backgroundColor: group.type === '공개' ? '#e8f5e9' : '#fce4ec',
                                    color: group.type === '공개' ? '#2e7d32' : '#c62828',
                                }}
                            >
                                {group.type}
                            </span>
                            <span className={styles.badge} style={{ backgroundColor: '#e8eef6', color: '#003675' }}>
                                {group.category}
                            </span>
                        </div>
                        <h1 className={styles.heroTitle}>{group.name}</h1>
                        <div className={styles.heroMeta}>
                            <div className={styles.heroMetaItem}>멤버 <span className={styles.heroMetaValue}>{group.members}명</span></div>
                        </div>
                        <button className={styles.ctaBtn} onClick={toast}>가입하기</button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>그룹 소개</h2>
                    <p className={styles.desc}>{group.description}</p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>멤버 ({group.memberList.length})</h2>
                    <div className={styles.memberGrid}>
                        {group.memberList.map((name, i) => (
                            <div key={i} className={styles.memberCard}>
                                <div
                                    className={styles.avatar}
                                    style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                                >
                                    {name[0]}
                                </div>
                                <div className={styles.memberInfo}>
                                    <div className={styles.memberName}>{name}</div>
                                    <div className={styles.memberRole}>{i === 0 ? '그룹장' : '멤버'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>최근 활동</h2>
                    <div className={styles.activityList}>
                        {group.activities.map((act, i) => (
                            <div key={i} className={styles.activityItem}>
                                <div className={styles.activityDot} />
                                <div className={styles.activityContent}>
                                    <div className={styles.activityText}>{act.text}</div>
                                    <div className={styles.activityDate}>{act.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            {showToast && <Toast message="준비중인 기능입니다!" onClose={() => setShowToast(false)} />}
        </>
    );
};

export default GroupDetailPage;
