import { Request, Response } from "express";
export declare const statisticsController: {
    getUserStats: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getLearningProgress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getHeatmapData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=statistics.controller.d.ts.map