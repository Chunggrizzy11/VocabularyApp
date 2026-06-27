import { Document } from "mongoose";

// Mongoose Document interface - extends Document for Mongoose methods
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

// Response interface (without password and comparePassword methods)
export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// Authentication tokens response
export interface IAuthTokens {
  accessToken: string;
  user: IUserResponse;
}

// DTOs for request validation
export type CreateUserDTO = Pick<IUser, "name" | "email" | "password">;
export type LoginDTO = Pick<IUser, "email" | "password">;
export type UpdateUserDTO = Partial<Pick<IUser, "name" | "email">>;

// Safe user representation (what we send to clients)
export type SafeUser = Omit<IUser, "password" | "comparePassword">;