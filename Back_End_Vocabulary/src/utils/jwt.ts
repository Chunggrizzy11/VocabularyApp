import jwt from "jsonwebtoken";
import { env } from "../configs/env";

interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}
