export declare const statisticsService: {
    getUserStats: (userId: string) => Promise<{
        totalWordsLearned: number;
        totalWordsMastered: number;
        totalReviewSessions: number;
        totalQuizSessions: number;
        averageQuizScore: number;
        currentStreak: number;
        longestStreak: number;
        totalTimeSpentMs: number;
        lastActiveDate: null;
    }>;
    getLearningProgress: (userId: string, days?: number) => Promise<any[]>;
    getHeatmapData: (userId: string, year?: number) => Promise<{
        date: any;
        count: any;
        level: number;
    }[]>;
};
//# sourceMappingURL=statistics.service.d.ts.map