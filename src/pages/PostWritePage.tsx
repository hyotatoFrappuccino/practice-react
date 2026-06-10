import { useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createPost } from '../api/api';
import styles from './Board.module.css';

const CATEGORIES = ['질문', '자유', '공지'];
const MAX_TITLE = 200;
const MAX_CONTENT = 5000;
const MAX_AUTHOR = 50;

const PostWritePage: FunctionComponent = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState(CATEGORIES[0]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const validate = (): string | null => {
        if (!title.trim()) return '제목을 입력해주세요.';
        if (title.length > MAX_TITLE) return `제목은 ${MAX_TITLE}자 이내로 입력해주세요.`;
        if (!content.trim()) return '본문을 입력해주세요.';
        if (content.length > MAX_CONTENT) return `본문은 ${MAX_CONTENT.toLocaleString()}자 이내로 입력해주세요.`;
        if (!author.trim()) return '작성자를 입력해주세요.';
        if (author.length > MAX_AUTHOR) return `작성자는 ${MAX_AUTHOR}자 이내로 입력해주세요.`;
        if (!password.trim()) return '비밀번호를 입력해주세요.';
        if (password.length < 4 || password.length > 20) return '비밀번호는 4~20자로 입력해주세요.';
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validate();
        if (validationError) { setError(validationError); return; }
        setError(null);
        setSubmitting(true);
        try {
            const post = await createPost({ category, title, content, author, password });
            navigate(`/board/${post.id}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : '게시글 작성에 실패했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.main}>
                <button className={styles.backBtn} onClick={() => navigate('/board')}>← 목록</button>
                <h1 className={styles.pageTitle}>글쓰기</h1>

                <div className={styles.writeForm}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>분류</label>
                        <select
                            className={styles.select}
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>
                            제목
                            <span className={styles.labelSub}>최대 {MAX_TITLE}자</span>
                        </label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            maxLength={MAX_TITLE}
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>
                            본문
                            <span className={`${styles.labelSub} ${content.length > MAX_CONTENT ? styles.charCountOver : ''}`}>
                                {content.length.toLocaleString()} / {MAX_CONTENT.toLocaleString()}자
                            </span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>

                    <div className={styles.halfRow}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>
                                작성자
                                <span className={styles.labelSub}>최대 {MAX_AUTHOR}자</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="닉네임"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                maxLength={MAX_AUTHOR}
                            />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>
                                비밀번호
                                <span className={styles.labelSub}>4~20자 (삭제 시 사용)</span>
                            </label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="비밀번호"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                maxLength={20}
                            />
                        </div>
                    </div>

                    {error && <div className={styles.formError}>{error}</div>}

                    <div className={styles.formActions}>
                        <button className={styles.cancelBtn} onClick={() => navigate('/board')}>
                            취소
                        </button>
                        <button
                            className={styles.submitWriteBtn}
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? '등록 중...' : '등록하기'}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default PostWritePage;
