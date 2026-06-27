interface JwtPayload {
    userId: string;
    role: "user" | "admin";
}
export declare function signJwt(payload: JwtPayload): string;
export declare function verifyJwt(token: string): JwtPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map