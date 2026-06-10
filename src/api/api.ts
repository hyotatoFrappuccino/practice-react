const BASE_URL = import.meta.env.DEV ? 'http://localhost:8080' : '';

export type Problem = {
  id: number;
  title: string;
  solved: number;
  submissions: number;
  rate: string;
  difficulty: string;
  algorithm: string;
  description: string;
  inputDesc: string;
  outputDesc: string;
  exampleInput: string;
  exampleOutput: string;
};

export type JudgeResult = {
  submitNo: number;
  userId: string;
  problemId: number;
  result: string;
  memory: number;
  time: number;
  language: string;
  codeLength: number;
  submittedAt: string;
};

export type SubmitRequest = {
  userId?: string;
  language: string;
  code: string;
};

export async function fetchProblems(): Promise<Problem[]> {
  const res = await fetch(`${BASE_URL}/api/problems`);
  if (!res.ok) throw new Error('문제 목록을 불러오지 못했습니다.');
  return res.json();
}

export async function submitCode(problemId: number, body: SubmitRequest): Promise<JudgeResult> {
  const res = await fetch(`${BASE_URL}/api/submit/${problemId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    if (res.status === 400) throw new Error('제출 내용을 확인해주세요. (지원하지 않는 언어이거나 코드 길이를 초과했습니다.)');
    if (res.status === 429) throw new Error('제출 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.');
    if (res.status === 404) throw new Error('존재하지 않는 문제입니다.');
    throw new Error('제출에 실패했습니다.');
  }
  return res.json();
}

export async function fetchJudgeResults(): Promise<JudgeResult[]> {
  const res = await fetch(`${BASE_URL}/api/judge-results`);
  if (!res.ok) throw new Error('채점 결과를 불러오지 못했습니다.');
  return res.json();
}

// ── Board ──────────────────────────────────────────────────────────────────

export type PostSummary = {
  id: number;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  pinned: boolean;
};

export type PostComment = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
};

export type PostDetail = {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  pinned: boolean;
  comments: PostComment[];
};

export type PostsPage = {
  content: PostSummary[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export async function fetchPosts(params?: {
  category?: string;
  page?: number;
  size?: number;
}): Promise<PostsPage> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.page !== undefined) qs.set('page', String(params.page));
  if (params?.size !== undefined) qs.set('size', String(params.size));
  const res = await fetch(`${BASE_URL}/api/posts?${qs}`);
  if (!res.ok) throw new Error('게시글 목록을 불러오지 못했습니다.');
  return res.json();
}

export async function fetchPost(id: number): Promise<PostDetail> {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`);
  if (!res.ok) throw new Error('게시글을 불러오지 못했습니다.');
  return res.json();
}

export async function createPost(body: {
  category: string;
  title: string;
  content: string;
  author: string;
  password: string;
}): Promise<PostDetail> {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('게시글 작성에 실패했습니다.');
  return res.json();
}

export async function deletePost(id: number, password: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (res.status === 403) throw new Error('비밀번호가 일치하지 않습니다.');
  if (res.status === 404) throw new Error('존재하지 않는 게시글입니다.');
  if (!res.ok) throw new Error('삭제에 실패했습니다.');
}

export async function createComment(
  postId: number,
  body: { author: string; content: string },
): Promise<PostComment> {
  const res = await fetch(`${BASE_URL}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('댓글 작성에 실패했습니다.');
  return res.json();
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}. ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// ── Utils ──────────────────────────────────────────────────────────────────

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}
