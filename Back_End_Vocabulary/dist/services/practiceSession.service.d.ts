import type { IPracticeSession, PracticeWord } from "../interfaces/practiceSession.interface";
export declare const practiceSessionService: {
    create(data: {
        words: PracticeWord[];
        topicId?: string;
        topicName?: string;
        startedAt: Date;
        userId?: string;
    }): Promise<IPracticeSession>;
    getHistory(userId: string, limit?: number): Promise<IPracticeSession[]>;
    getStats(userId: string, topicId?: string): Promise<{
        totalSessions: number;
        totalWordsPracticed: number;
        averageScore: number;
    }>;
};
//# sourceMappingURL=practiceSession.service.d.ts.map