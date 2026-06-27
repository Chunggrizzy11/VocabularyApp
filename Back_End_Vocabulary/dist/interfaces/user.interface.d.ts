import { Document } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
}
export interface IUserResponse {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}
export interface IAuthTokens {
    accessToken: string;
    user: IUserResponse;
}
export type CreateUserDTO = Pick<IUser, "name" | "email" | "password">;
export type LoginDTO = Pick<IUser, "email" | "password">;
export type UpdateUserDTO = Partial<Pick<IUser, "name" | "email">>;
export type SafeUser = Omit<IUser, "password" | "comparePassword">;
//# sourceMappingURL=user.interface.d.ts.map