import { Request, Response } from "express";
export declare const generationController: {
    /**
     * POST /api/generation/preview
     * Preview generated words WITHOUT saving.
     * Body: { topic: string, count?: number, difficulty?: "easy" | "medium" | "hard" }
     */
    preview: (req: Request, res: Response) => Promise<void>;
    /**
     * POST /api/generation/save
     * Generate words and save them directly to a topic.
     * Body: { topicId: string, topic: string, count?: number, difficulty?: string }
     */
    save: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/generation/lookup/:word
     * Look up a single word from the dictionary without saving.
     */
    lookup: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=generation.controller.d.ts.map