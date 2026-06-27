import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { User } from "../models/User";
import { error } from "../utils/response";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: "user" | "admin";
    }
  }
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      error(res, "Not authorized, no token", 401);
      return;
    }

    const token = header.split(" ")[1];
    const decoded = verifyJwt(token);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      error(res, "Not authorized, user not found", 401);
      return;
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch {
    error(res, "Not authorized, token invalid", 401);
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.userRole !== "admin") {
    error(res, "Access denied, admin only", 403);
    return;
  }
  next();
}
