import { Request, Response } from "express";
export declare const authController: {
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    getMe: (req: Request, res: Response) => Promise<void>;
    getUsers: (_req: Request, res: Response) => Promise<void>;
    createAdmin: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map