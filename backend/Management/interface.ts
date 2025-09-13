// Create new interfaces and enums
interface InterviewSession {
  sessionId: string;
  phase: 'introduction' | 'questions' | 'conclusion';
  currentQuestionIndex: number;
  totalQuestions: number;
  candidateAnswers: CandidateAnswer[];
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'abandoned';
}

interface CandidateAnswer {
  questionId: string;
  answer: string;
  timestamp: Date;
  evaluation?: AnswerEvaluation;
}

interface AnswerEvaluation {
  technicalAccuracy: number; // 1-10
  completeness: number; // 1-10
  clarity: number; // 1-10
  overallScore: number; // 1-10
  feedback: string;
  strengths: string[];
  areasForImprovement: string[];
}
