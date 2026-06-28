import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userRole?: "user" | "admin";
        }
    }
}
export declare function protect(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function requireAdmin(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map