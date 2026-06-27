import { Request, Response, NextFunction } from "express";

export function validateRequest(keys: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = keys.filter((k) => !(k in req.body));
    if (missing.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
      return;
    }
    next();
  };
}
