import type { CreateUserDTO, LoginDTO } from "../interfaces/user.interface";
export declare const authService: {
    register(dto: CreateUserDTO): Promise<{
        user: import("../interfaces/user.interface").IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    login(dto: LoginDTO): Promise<{
        user: import("../interfaces/user.interface").IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    getMe(userId: string): Promise<import("mongoose").Document<unknown, {}, import("../interfaces/user.interface").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../interfaces/user.interface").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/user.interface").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../interfaces/user.interface").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createAdmin(dto: CreateUserDTO): Promise<{
        user: import("../interfaces/user.interface").IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        message: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map