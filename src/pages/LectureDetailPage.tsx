import { useState, type FunctionComponent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import styles from './Detail.module.css';

const LEVEL_COLOR: Record<string, { bg: string; color: string }> = {
    '입문': { bg: '#e8f5e9', color: '#2e7d32' },
    '중급': { bg: '#e3f2fd', color: '#1565c0' },
    '고급': { bg: '#fce4ec', color: '#b71c1c' },
};

const mockLectures = [
    { id: 1,  title: '알고리즘 기초 완성',            instructor: '김코딩',  level: '입문', category: '알고리즘', duration: '12시간', enrolled: 1842, rating: 4.8,
      desc: '알고리즘의 기초 개념부터 시작해 코딩 테스트에 자주 출제되는 핵심 유형을 모두 다룹니다.\n완전 탐색, 정렬, 이진 탐색, 스택/큐, 재귀 등 필수 주제를 단계별로 학습합니다.',
      curriculum: [
        { title: '오리엔테이션', lessons: ['강의 소개 및 커리큘럼', '개발 환경 설정', '시간복잡도 개념'] },
        { title: '완전 탐색', lessons: ['브루트포스 기초', '순열·조합', '재귀 함수 활용', '연습 문제 풀이'] },
        { title: '정렬 알고리즘', lessons: ['선택·삽입·버블 정렬', '합병 정렬', '퀵 정렬', '파이썬 내장 정렬'] },
        { title: '이진 탐색', lessons: ['이진 탐색 원리', '구현 패턴', '파라메트릭 서치', '실전 문제'] },
        { title: '스택 & 큐', lessons: ['스택 개념과 활용', '큐와 덱', '단조 스택 패턴'] },
      ],
    },
    { id: 2,  title: '자료구조 심화 과정',             instructor: '이자바',  level: '중급', category: '자료구조', duration: '18시간', enrolled: 963,  rating: 4.6,
      desc: '선형 자료구조를 넘어 트리, 그래프, 해시 등 고급 자료구조를 깊이 있게 학습합니다.\nJava로 직접 구현하며 동작 원리를 완전히 이해하는 것을 목표로 합니다.',
      curriculum: [
        { title: '복습 및 준비', lessons: ['배열·연결 리스트 복습', '시간복잡도 분석'] },
        { title: '트리 구조', lessons: ['이진 트리', '이진 탐색 트리', 'AVL 트리', '트리 순회'] },
        { title: '힙과 우선순위 큐', lessons: ['힙 구조', '힙 구현', '힙 정렬', '우선순위 큐 활용'] },
        { title: '해시 테이블', lessons: ['해시 함수', '충돌 처리', 'LinkedHashMap 활용', '실전 응용'] },
        { title: '그래프 기초', lessons: ['인접 행렬·리스트', 'BFS', 'DFS', '연결 요소'] },
      ],
    },
    { id: 3,  title: '동적 프로그래밍 마스터',         instructor: '박알고',  level: '고급', category: '알고리즘', duration: '10시간', enrolled: 527,  rating: 4.9,
      desc: 'DP의 핵심 패턴을 완벽하게 마스터합니다.\n탑다운·바텀업 방식부터 비트마스크 DP, 트리 DP, 구간 DP까지 고급 패턴을 모두 다룹니다.',
      curriculum: [
        { title: 'DP 기초', lessons: ['메모이제이션', '타뷸레이션', '피보나치·계단 DP'] },
        { title: '1차원 DP', lessons: ['LIS', 'LCS', '배낭 문제', '동전 교환'] },
        { title: '2차원 DP', lessons: ['격자 DP', '구간 DP', '팰린드롬 DP'] },
        { title: '고급 DP', lessons: ['비트마스크 DP', '트리 DP', '확률 DP', '최적화 기법'] },
      ],
    },
    { id: 4,  title: '그래프 이론과 탐색 알고리즘',    instructor: '최그래프', level: '중급', category: '알고리즘', duration: '14시간', enrolled: 741,  rating: 4.7,
      desc: '그래프의 이론적 배경부터 실전 응용까지 체계적으로 다룹니다.\n최단 경로, 최소 신장 트리, 위상 정렬 등 코딩 테스트 단골 주제를 완전 정복합니다.',
      curriculum: [
        { title: '그래프 기초', lessons: ['그래프 표현', 'BFS·DFS 심화', '연결 요소·이분 그래프'] },
        { title: '최단 경로', lessons: ['다익스트라', '벨만-포드', '플로이드-워셜', '실전 문제'] },
        { title: '최소 신장 트리', lessons: ['크루스칼', '프림', 'Union-Find'] },
        { title: '위상 정렬', lessons: ['위상 정렬 원리', '사이클 탐지', '실전 응용'] },
      ],
    },
    { id: 5,  title: 'Python으로 배우는 코딩 테스트',  instructor: '정파이썬', level: '입문', category: '언어',     duration: '20시간', enrolled: 3102, rating: 4.9,
      desc: 'Python 문법 기초부터 코딩 테스트 실전 전략까지 한 번에 학습합니다.\n실제 기업 코딩 테스트 문제를 Python으로 풀며 실력을 키웁니다.',
      curriculum: [
        { title: 'Python 기초', lessons: ['변수·자료형', '조건문·반복문', '함수', '클래스'] },
        { title: 'Python 내장 함수', lessons: ['리스트 컴프리헨션', 'itertools', 'collections', 'heapq'] },
        { title: '기본 알고리즘', lessons: ['정렬·이진 탐색', '스택·큐', 'BFS·DFS', 'DP 입문'] },
        { title: '실전 문제 풀이', lessons: ['카카오 기출', '삼성 기출', '백준 단계별', '모의고사'] },
      ],
    },
    { id: 6,  title: 'C++ STL 완전 정복',              instructor: '강씨피피', level: '중급', category: '언어',     duration: '8시간',  enrolled: 488,  rating: 4.5,
      desc: 'C++ STL을 활용해 알고리즘 문제를 빠르고 정확하게 풀 수 있도록 훈련합니다.\nvector, map, set, priority_queue 등 핵심 컨테이너를 완벽하게 익힙니다.',
      curriculum: [
        { title: 'STL 기초', lessons: ['vector·array', 'string', 'pair·tuple'] },
        { title: '연관 컨테이너', lessons: ['map·unordered_map', 'set·multiset', '활용 패턴'] },
        { title: '알고리즘 라이브러리', lessons: ['sort·lower_bound', 'next_permutation', 'STL로 구현하는 BFS'] },
      ],
    },
    { id: 7,  title: '정렬 알고리즘 총정리',           instructor: '김코딩',  level: '입문', category: '알고리즘', duration: '6시간',  enrolled: 2156, rating: 4.7,
      desc: '모든 정렬 알고리즘을 시각적으로 이해하고 직접 구현합니다.\n각 알고리즘의 시간복잡도와 공간복잡도를 비교 분석합니다.',
      curriculum: [
        { title: '기본 정렬', lessons: ['버블 정렬', '선택 정렬', '삽입 정렬'] },
        { title: '고급 정렬', lessons: ['합병 정렬', '퀵 정렬', '힙 정렬'] },
        { title: '특수 정렬', lessons: ['계수 정렬', '기수 정렬', '언제 무엇을 쓸까'] },
      ],
    },
    { id: 8,  title: '트리와 이진 탐색 트리',          instructor: '이자바',  level: '중급', category: '자료구조', duration: '9시간',  enrolled: 612,  rating: 4.6,
      desc: '트리 자료구조의 모든 것을 다룹니다.\n이진 탐색 트리 구현부터 균형 트리 이론, 세그먼트 트리 기초까지 학습합니다.',
      curriculum: [
        { title: '트리 기초', lessons: ['트리 용어 정리', '트리 순회 3종', '레벨 순회'] },
        { title: 'BST', lessons: ['삽입·삭제·탐색', 'BST 구현', '활용 문제'] },
        { title: '응용 트리', lessons: ['세그먼트 트리 입문', '펜윅 트리', 'LCA'] },
      ],
    },
    { id: 9,  title: '수학으로 풀어보는 알고리즘',     instructor: '박알고',  level: '고급', category: '알고리즘', duration: '11시간', enrolled: 334,  rating: 4.8,
      desc: '정수론, 조합론, 확률을 기반으로 한 알고리즘 문제를 풀어봅니다.\n수학적 직관이 필요한 고난이도 문제들을 체계적으로 접근하는 법을 배웁니다.',
      curriculum: [
        { title: '정수론', lessons: ['소수 판별·에라토스테네스', 'GCD·LCM', '모듈러 산술'] },
        { title: '조합론', lessons: ['순열·조합 공식', '파스칼 삼각형', '중복 조합'] },
        { title: '기하', lessons: ['벡터 외적', 'CCW 판별', '컨벡스 헐'] },
      ],
    },
    { id: 10, title: '코딩 테스트 실전 모의고사',      instructor: '정파이썬', level: '중급', category: '코딩테스트', duration: '16시간', enrolled: 1275, rating: 4.7,
      desc: '실제 기업 코딩 테스트와 동일한 환경에서 모의고사를 진행합니다.\n카카오, 삼성, 네이버 등 주요 기업 기출 문제를 시간 제한을 두고 풀어봅니다.',
      curriculum: [
        { title: '모의고사 1회', lessons: ['카카오 2024 유형', '풀이 해설', '오답 분석'] },
        { title: '모의고사 2회', lessons: ['삼성 SW 유형', '풀이 해설', '오답 분석'] },
        { title: '모의고사 3회', lessons: ['네이버·라인 유형', '풀이 해설', '최종 정리'] },
      ],
    },
    { id: 11, title: 'Java로 배우는 알고리즘',         instructor: '이자바',  level: '입문', category: '언어',     duration: '15시간', enrolled: 890,  rating: 4.5,
      desc: 'Java의 문법과 알고리즘을 동시에 배웁니다.\nJava Collections Framework를 활용한 효율적인 알고리즘 구현법을 익힙니다.',
      curriculum: [
        { title: 'Java 기초', lessons: ['Java 문법 빠르게 훑기', '컬렉션 프레임워크', '람다·스트림'] },
        { title: '알고리즘 구현', lessons: ['정렬·탐색', 'BFS·DFS', 'DP 패턴'] },
        { title: '실전 적용', lessons: ['백준 실버 문제', '백준 골드 문제', '기출 풀이'] },
      ],
    },
    { id: 12, title: '해시·힙·우선순위 큐',           instructor: '최그래프', level: '중급', category: '자료구조', duration: '7시간',  enrolled: 543,  rating: 4.6,
      desc: '해시, 힙, 우선순위 큐를 완전히 이해하고 다양한 문제에 적용하는 법을 배웁니다.',
      curriculum: [
        { title: '해시', lessons: ['해시 함수·충돌', 'HashMap 활용', '해시 문제 패턴'] },
        { title: '힙·우선순위 큐', lessons: ['힙 구조', '최소·최대 힙', '다익스트라에서의 활용'] },
      ],
    },
    { id: 13, title: '네트워크 플로우 & 매칭',         instructor: '박알고',  level: '고급', category: '알고리즘', duration: '13시간', enrolled: 218,  rating: 4.9,
      desc: '최대 유량, 이분 매칭 등 고급 그래프 알고리즘을 다룹니다.\nPS 상위권을 목표로 하는 분께 추천합니다.',
      curriculum: [
        { title: '최대 유량', lessons: ['포드-풀커슨', '에드몬즈-카프', '디닉 알고리즘'] },
        { title: '매칭', lessons: ['이분 매칭', '헝가리안 알고리즘', '최소 비용 최대 유량'] },
      ],
    },
    { id: 14, title: 'KAKAO 기출 완전 분석',           instructor: '김코딩',  level: '중급', category: '코딩테스트', duration: '19시간', enrolled: 2341, rating: 4.8,
      desc: '2018년부터 2025년까지 카카오 공채·인턴 코딩 테스트 전 문제를 분석합니다.',
      curriculum: [
        { title: '2022~2025', lessons: ['2025 공채 풀이', '2024 인턴 풀이', '2023 공채 풀이'] },
        { title: '2019~2021', lessons: ['2021 공채 풀이', '2020 인턴 풀이', '2019 공채 풀이'] },
        { title: '유형 총정리', lessons: ['자주 나오는 유형 분석', '풀이 전략', '모의 풀이'] },
      ],
    },
    { id: 15, title: '삼성 SW 역량 테스트 A형 대비',   instructor: '강씨피피', level: '중급', category: '코딩테스트', duration: '22시간', enrolled: 1672, rating: 4.7,
      desc: '삼성 SDS·DS·전자 입사를 위한 SW 역량 테스트 A형을 집중적으로 준비합니다.\n삼성 특유의 구현·시뮬레이션 문제 유형을 완벽하게 분석합니다.',
      curriculum: [
        { title: '시뮬레이션', lessons: ['2D 배열 시뮬레이션', '회전·이동', '우선순위 구현'] },
        { title: '탐색', lessons: ['BFS 활용 시뮬레이션', 'DFS + 백트래킹', '복합 탐색'] },
        { title: '기출 특강', lessons: ['최신 기출 5문제', '자주 나오는 패턴', '실전 모의고사'] },
      ],
    },
    { id: 16, title: '문자열 알고리즘 (KMP·트라이)',   instructor: '최그래프', level: '고급', category: '알고리즘', duration: '8시간',  enrolled: 296,  rating: 4.8,
      desc: '문자열 처리에 특화된 고급 알고리즘을 학습합니다.\nKMP, Z-function, Aho-Corasick, Suffix Array 등을 구현부터 응용까지 다룹니다.',
      curriculum: [
        { title: '패턴 매칭', lessons: ['KMP 알고리즘', 'Z-function', 'Rabin-Karp'] },
        { title: '트라이', lessons: ['트라이 구현', 'Aho-Corasick', '문자열 압축'] },
      ],
    },
    { id: 17, title: '백트래킹 & 브루트포스 전략',     instructor: '박알고',  level: '입문', category: '알고리즘', duration: '10시간', enrolled: 1430, rating: 4.6,
      desc: '완전 탐색과 백트래킹의 핵심 전략을 배웁니다.\n가지치기 최적화부터 비트마스크 활용까지 다양한 기법을 익힙니다.',
      curriculum: [
        { title: '완전 탐색', lessons: ['브루트포스 기초', '순열·조합 탐색', '모든 경우 열거'] },
        { title: '백트래킹', lessons: ['N-Queens', '스도쿠', '가지치기 전략', '연습 문제'] },
      ],
    },
    { id: 18, title: 'Kotlin 코딩 테스트 입문',        instructor: '이자바',  level: '입문', category: '언어',     duration: '12시간', enrolled: 407,  rating: 4.5,
      desc: 'Kotlin의 간결한 문법으로 알고리즘 문제를 빠르게 풀어봅니다.\nAndroid 개발자 혹은 Kotlin에 익숙한 분께 특히 추천합니다.',
      curriculum: [
        { title: 'Kotlin 기초', lessons: ['변수·함수·클래스', '컬렉션 API', '확장 함수'] },
        { title: '알고리즘 응용', lessons: ['정렬·탐색', 'BFS·DFS', 'DP 입문'] },
      ],
    },
];

const LectureDetailPage: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });

    const lecture = mockLectures.find(l => l.id === Number(id));

    const toast = () => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 0);
    };

    const toggleSection = (i: number) =>
        setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));

    if (!lecture) {
        return (
            <>
                <Header onSearchChange={() => {}} />
                <main className={styles.page}>
                    <button className={styles.backBtn} onClick={() => navigate('/lectures')}>← 강의 목록</button>
                    <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>강의를 찾을 수 없습니다.</div>
                </main>
                <Footer />
            </>
        );
    }

    const lc = LEVEL_COLOR[lecture.level] ?? { bg: '#f0f0f0', color: '#555' };

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.page}>
                <button className={styles.backBtn} onClick={() => navigate('/lectures')}>← 강의 목록</button>

                <div className={styles.hero}>
                    <div className={styles.heroThumb}>
                        <span className={styles.heroThumbIcon}>📚</span>
                    </div>
                    <div className={styles.heroInfo}>
                        <div className={styles.badgeRow}>
                            <span className={styles.badge} style={{ backgroundColor: lc.bg, color: lc.color }}>{lecture.level}</span>
                            <span className={styles.badge} style={{ backgroundColor: '#e8eef6', color: '#003675' }}>{lecture.category}</span>
                        </div>
                        <h1 className={styles.heroTitle}>{lecture.title}</h1>
                        <div className={styles.heroMeta}>
                            <div className={styles.heroMetaItem}>강사 <span className={styles.heroMetaValue}>{lecture.instructor}</span></div>
                            <div className={styles.heroMetaItem}>총 <span className={styles.heroMetaValue}>{lecture.duration}</span></div>
                            <div className={styles.heroMetaItem}>수강생 <span className={styles.heroMetaValue}>{lecture.enrolled.toLocaleString()}명</span></div>
                            <div className={styles.heroMetaItem}><span className={styles.rating}>★ {lecture.rating}</span></div>
                        </div>
                        <button className={styles.ctaBtn} onClick={toast}>수강 신청</button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>강의 소개</h2>
                    <p className={styles.desc}>{lecture.desc}</p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>커리큘럼</h2>
                    <div className={styles.curriculum}>
                        {lecture.curriculum.map((sec, i) => (
                            <div key={i} className={styles.curriculumSection}>
                                <div className={styles.curriculumHeader} onClick={() => toggleSection(i)}>
                                    <div className={styles.curriculumHeaderLeft}>
                                        <span className={styles.curriculumSectionTitle}>{sec.title}</span>
                                        <span className={styles.curriculumCount}>{sec.lessons.length}강</span>
                                    </div>
                                    <span style={{ color: '#888', fontSize: '13px' }}>{openSections[i] ? '▲' : '▼'}</span>
                                </div>
                                {openSections[i] && (
                                    <div className={styles.curriculumLessons}>
                                        {sec.lessons.map((lesson, j) => (
                                            <div key={j} className={styles.curriculumLesson} onClick={toast}>
                                                <div className={styles.lessonLeft}>
                                                    <span className={styles.lessonNum}>{j + 1}</span>
                                                    <span>{lesson}</span>
                                                </div>
                                                <span className={styles.lessonDuration}>▶ 재생</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
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

export default LectureDetailPage;
