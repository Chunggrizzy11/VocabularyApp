import { Request, Response } from "express";
export declare const seedController: {
    /** GET /api/seed/definitions — list all seedable topics */
    getDefinitions: (_req: Request, res: Response) => void;
    /** POST /api/seed/topic — seed a single topic */
    seedTopic: (req: Request, res: Response) => Promise<void>;
    /** POST /api/seed/all — seed all predefined topics */
    seedAll: (_req: Request, res: Response) => Promise<void>;
    /** POST /api/seed/reseed — drop all vocabulary & topics, then re-seed from word bank */
    reseed: (_req: Request, res: Response) => Promise<void>;
    /** POST /api/seed/topic/:id — seed more words into an existing topic via API */
    seedIntoTopic: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=seed.controller.d.ts.map