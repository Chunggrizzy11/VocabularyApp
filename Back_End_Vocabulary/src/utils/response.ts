import { Response } from "express";

export function success(res: Response, data: unknown, statusCode: number = 200) {
  return res.status(statusCode).json({ success: true, data });
}

export function created(res: Response, data: unknown) {
  return success(res, data, 201);
}

export function noContent(res: Response) {
  return res.status(204).send();
}

export function error(res: Response, message: string, statusCode: number = 500) {
  return res.status(statusCode).json({ success: false, message });
}
