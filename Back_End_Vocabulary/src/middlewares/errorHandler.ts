import { Request, Response, NextFunction } from "express";
import { error } from "../utils/response";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error("Error:", err.message);
  error(res, err.message || "Internal Server Error", 500);
}
