const BASE_URL = 'http://localhost:8080';

export type Problem = {
  id: number;
  title: string;
  solved: number;
  submissions: number;
  rate: string;
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
  if (!res.ok) throw new Error(res.status === 404 ? '존재하지 않는 문제입니다.' : '제출에 실패했습니다.');
  return res.json();
}

export async function fetchJudgeResults(): Promise<JudgeResult[]> {
  const res = await fetch(`${BASE_URL}/api/judge-results`);
  if (!res.ok) throw new Error('채점 결과를 불러오지 못했습니다.');
  return res.json();
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}
