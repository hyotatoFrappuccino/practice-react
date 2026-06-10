import { useState, useEffect, type FunctionComponent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchPost, deletePost, createComment, formatDate, formatRelativeTime, type PostDetail, type PostComment } from '../api/api';
import styles from './Board.module.css';

const BADGE_COLOR: Record<string, { color: string; borderColor: string }> = {
    '공지': { color: '#c62828', borderColor: '#c62828' },
    '질문': { color: '#1565c0', borderColor: '#1565c0' },
    '자유': { color: '#2e7d32', borderColor: '#2e7d32' },
};

const PostDetailPage: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showDelete, setShowDelete] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [commentError, setCommentError] = useState<string | null>(null);
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        fetchPost(Number(id))
            .then(setPost)
            .catch(e => setError(e instanceof Error ? e.message : '오류가 발생했습니다.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!deletePassword.trim()) {
            setDeleteError('비밀번호를 입력해주세요.');
            return;
        }
        setDeleting(true);
        setDeleteError(null);
        try {
            await deletePost(Number(id), deletePassword);
            navigate('/board');
        } catch (e) {
            setDeleteError(e instanceof Error ? e.message : '삭제에 실패했습니다.');
        } finally {
            setDeleting(false);
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentAuthor.trim() || !commentContent.trim()) {
            setCommentError('작성자와 내용을 모두 입력해주세요.');
            return;
        }
        if (commentAuthor.length > 50) {
            setCommentError('작성자는 50자 이내로 입력해주세요.');
            return;
        }
        if (commentContent.length > 1000) {
            setCommentError('댓글은 1,000자 이내로 입력해주세요.');
            return;
        }
        setSubmittingComment(true);
        setCommentError(null);
        try {
            const newComment: PostComment = await createComment(Number(id), {
                author: commentAuthor,
                content: commentContent,
            });
            setPost(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : prev);
            setCommentAuthor('');
            setCommentContent('');
        } catch (e) {
            setCommentError(e instanceof Error ? e.message : '댓글 작성에 실패했습니다.');
        } finally {
            setSubmittingComment(false);
        }
    };

    const bc = post ? (BADGE_COLOR[post.category] ?? { color: '#555', borderColor: '#555' }) : null;

    return (
        <>
            <Header onSearchChange={() => {}} />
            <main className={styles.main}>
                <button className={styles.backBtn} onClick={() => navigate('/board')}>← 목록</button>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#555' }}>불러오는 중...</div>
                )}
                {error && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#ff383c' }}>{error}</div>
                )}

                {post && bc && (
                    <>
                        <div className={styles.postHeader}>
                            <h1 className={styles.postTitle}>
                                <span className={styles.badge} style={{ color: bc.color, borderColor: bc.borderColor }}>
                                    {post.category}
                                </span>
                                {post.pinned && (
                                    <span className={styles.pinnedBadge}>📌 고정</span>
                                )}
                                {post.title}
                            </h1>
                            <div className={styles.postMeta}>
                                <span>{post.author}</span>
                                <span>{formatDate(post.createdAt)}</span>
                                <span>조회 {post.viewCount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className={styles.postContent}>{post.content}</div>

                        <div className={styles.deleteArea}>
                            {!showDelete ? (
                                <button className={styles.deleteBtn} onClick={() => setShowDelete(true)}>
                                    삭제
                                </button>
                            ) : (
                                <div>
                                    <div className={styles.deleteConfirm}>
                                        <input
                                            type="password"
                                            className={styles.deleteInput}
                                            placeholder="비밀번호 입력"
                                            value={deletePassword}
                                            onChange={e => setDeletePassword(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleDelete()}
                                        />
                                        <button
                                            className={styles.deleteConfirmBtn}
                                            onClick={handleDelete}
                                            disabled={deleting}
                                        >
                                            {deleting ? '삭제 중...' : '확인'}
                                        </button>
                                        <button
                                            className={styles.deleteCancelBtn}
                                            onClick={() => { setShowDelete(false); setDeletePassword(''); setDeleteError(null); }}
                                        >
                                            취소
                                        </button>
                                    </div>
                                    {deleteError && <div className={styles.deleteError}>{deleteError}</div>}
                                </div>
                            )}
                        </div>

                        <div className={styles.commentsSection}>
                            <h2 className={styles.commentsTitle}>댓글 {post.comments.length}</h2>

                            {post.comments.length === 0 ? (
                                <div className={styles.noComments}>아직 댓글이 없습니다.</div>
                            ) : (
                                <div className={styles.commentList}>
                                    {post.comments.map(c => (
                                        <div key={c.id} className={styles.comment}>
                                            <div className={styles.commentMeta}>
                                                <span className={styles.commentAuthor}>{c.author}</span>
                                                <span className={styles.commentDate}>{formatRelativeTime(c.createdAt)}</span>
                                            </div>
                                            <div className={styles.commentContent}>{c.content}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className={styles.commentForm}>
                                <div className={styles.commentFormRow}>
                                    <input
                                        type="text"
                                        className={`${styles.commentInput} ${styles.commentAuthorInput}`}
                                        placeholder="작성자"
                                        value={commentAuthor}
                                        onChange={e => setCommentAuthor(e.target.value)}
                                    />
                                </div>
                                <textarea
                                    className={styles.commentTextarea}
                                    placeholder="댓글을 입력하세요..."
                                    value={commentContent}
                                    onChange={e => setCommentContent(e.target.value)}
                                />
                                {commentError && <div className={styles.formError}>{commentError}</div>}
                                <button
                                    className={styles.commentSubmitBtn}
                                    onClick={handleCommentSubmit}
                                    disabled={submittingComment}
                                >
                                    {submittingComment ? '등록 중...' : '댓글 등록'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
};

export default PostDetailPage;
