import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { success, created, error } from "../utils/response";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const result = await authService.register(req.body);
      created(res, result);
    } catch (e: any) {
      const statusCode = e.fieldErrors ? 400 : 400;
      const payload: any = { success: false, message: e.message, fieldErrors: e.fieldErrors || {} };
      res.status(statusCode).json(payload);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const result = await authService.login(req.body);
      success(res, result);
    } catch (e: any) {
      const statusCode = e.fieldErrors ? 400 : 401;
      const payload: any = { success: false, message: e.message, fieldErrors: e.fieldErrors || {} };
      res.status(statusCode).json(payload);
    }
  },

  getMe: async (req: Request, res: Response) => {
    try {
      const user = await authService.getMe(req.userId!);
      success(res, user);
    } catch (e: any) {
      error(res, e.message, 404);
    }
  },

  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await authService.getAllUsers();
      success(res, users);
    } catch (e: any) {
      error(res, e.message);
    }
  },

  createAdmin: async (req: Request, res: Response) => {
    try {
      const result = await authService.createAdmin(req.body);
      created(res, result);
    } catch (e: any) {
      error(res, e.message, 400);
    }
  },
};
