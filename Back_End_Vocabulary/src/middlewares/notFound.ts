import { Request, Response } from "express";
import { error } from "../utils/response";

export function notFound(_req: Request, res: Response) {
  error(res, "Route not found", 404);
}
