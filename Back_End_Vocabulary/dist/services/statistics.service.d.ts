export declare const statisticsService: {
    getUserStats: () => Promise<{
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
    getLearningProgress: (days?: number) => Promise<any[]>;
    getHeatmapData: (year?: number) => Promise<{
        date: any;
        count: any;
        level: number;
    }[]>;
};
//# sourceMappingURL=statistics.service.d.ts.map