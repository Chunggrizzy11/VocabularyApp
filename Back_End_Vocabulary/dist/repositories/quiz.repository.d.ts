import type { IQuizQuestion } from "../interfaces/quiz.interface";
export declare const quizRepository: {
    findAll: () => Promise<IQuizQuestion[]>;
    findById: (id: string) => Promise<IQuizQuestion | null>;
};
//# sourceMappingURL=quiz.repository.d.ts.map