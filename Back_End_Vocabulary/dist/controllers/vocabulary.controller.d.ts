import { Request, Response } from "express";
export declare const vocabularyController: {
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    search: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getDueForReview: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=vocabulary.controller.d.ts.map