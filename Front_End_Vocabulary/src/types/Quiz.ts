export interface QuizQuestion {
  _id: string;
  vocabularyId: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
}
