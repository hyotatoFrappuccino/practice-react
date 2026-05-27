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

const judgeResults: JudgeResult[] = [
  { submitNo: 12150, userId: 'hyojae.lee', problemId: 1, result: '맞았습니다!', memory: 5732, time: 52, language: 'Python3', codeLength: 244, submittedAt: '1분 전' },
  { submitNo: 12149, userId: 'kimcoding', problemId: 2, result: '틀렸습니다!', memory: 4096, time: 80, language: 'C++17', codeLength: 512, submittedAt: '2분 전' },
  { submitNo: 12148, userId: 'leedev', problemId: 3, result: '컴파일 에러', memory: 0, time: 0, language: 'Java', codeLength: 800, submittedAt: '5분 전' },
  { submitNo: 12147, userId: 'parkjava', problemId: 1, result: '맞았습니다!', memory: 6200, time: 64, language: 'C++14', codeLength: 380, submittedAt: '8분 전' },
  { submitNo: 12146, userId: 'choi99', problemId: 4, result: '런타임 에러', memory: 0, time: 0, language: 'C#', codeLength: 670, submittedAt: '10분 전' },
  { submitNo: 12145, userId: 'hyojae.lee', problemId: 2, result: '맞았습니다!', memory: 4512, time: 38, language: 'Python3', codeLength: 198, submittedAt: '12분 전' },
  { submitNo: 12144, userId: 'kimcoding', problemId: 5, result: '시간 초과', memory: 0, time: 2000, language: 'Java', codeLength: 920, submittedAt: '15분 전' },
  { submitNo: 12143, userId: 'leedev', problemId: 1, result: '맞았습니다!', memory: 5120, time: 44, language: 'C99', codeLength: 310, submittedAt: '18분 전' },
  { submitNo: 12142, userId: 'parkjava', problemId: 3, result: '틀렸습니다!', memory: 3840, time: 72, language: 'Kotlin', codeLength: 430, submittedAt: '20분 전' },
  { submitNo: 12141, userId: 'choi99', problemId: 2, result: '맞았습니다!', memory: 4224, time: 56, language: 'Python3', codeLength: 215, submittedAt: '22분 전' },
  { submitNo: 12140, userId: 'hyojae.lee', problemId: 4, result: '맞았습니다!', memory: 7168, time: 88, language: 'C++17', codeLength: 560, submittedAt: '25분 전' },
  { submitNo: 12139, userId: 'kimcoding', problemId: 1, result: '컴파일 에러', memory: 0, time: 0, language: 'Java', codeLength: 740, submittedAt: '28분 전' },
  { submitNo: 12138, userId: 'leedev', problemId: 5, result: '맞았습니다!', memory: 5888, time: 60, language: 'Python3', codeLength: 275, submittedAt: '30분 전' },
  { submitNo: 12137, userId: 'parkjava', problemId: 2, result: '맞았습니다!', memory: 4352, time: 42, language: 'C++14', codeLength: 340, submittedAt: '33분 전' },
  { submitNo: 12136, userId: 'choi99', problemId: 3, result: '틀렸습니다!', memory: 3712, time: 76, language: 'C#', codeLength: 490, submittedAt: '35분 전' },
  { submitNo: 12135, userId: 'hyojae.lee', problemId: 1, result: '맞았습니다!', memory: 5504, time: 48, language: 'Python3', codeLength: 230, submittedAt: '38분 전' },
  { submitNo: 12134, userId: 'kimcoding', problemId: 4, result: '런타임 에러', memory: 0, time: 0, language: 'C99', codeLength: 610, submittedAt: '40분 전' },
  { submitNo: 12133, userId: 'leedev', problemId: 2, result: '맞았습니다!', memory: 4480, time: 36, language: 'Kotlin', codeLength: 395, submittedAt: '42분 전' },
  { submitNo: 12132, userId: 'parkjava', problemId: 5, result: '시간 초과', memory: 0, time: 2000, language: 'Java', codeLength: 850, submittedAt: '45분 전' },
  { submitNo: 12131, userId: 'choi99', problemId: 1, result: '맞았습니다!', memory: 5248, time: 50, language: 'Python3', codeLength: 260, submittedAt: '48분 전' },
  { submitNo: 12130, userId: 'hyojae.lee', problemId: 3, result: '맞았습니다!', memory: 6400, time: 70, language: 'C++17', codeLength: 480, submittedAt: '50분 전' },
  { submitNo: 12129, userId: 'kimcoding', problemId: 2, result: '맞았습니다!', memory: 4608, time: 40, language: 'Python3', codeLength: 210, submittedAt: '55분 전' },
  { submitNo: 12128, userId: 'leedev', problemId: 4, result: '컴파일 에러', memory: 0, time: 0, language: 'C#', codeLength: 720, submittedAt: '1시간 전' },
  { submitNo: 12127, userId: 'parkjava', problemId: 1, result: '틀렸습니다!', memory: 3968, time: 68, language: 'C++14', codeLength: 365, submittedAt: '1시간 전' },
  { submitNo: 12126, userId: 'choi99', problemId: 5, result: '맞았습니다!', memory: 5376, time: 54, language: 'Python3', codeLength: 240, submittedAt: '1시간 전' },
];

export default judgeResults;
