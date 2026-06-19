import { Response } from "express";
export declare function success(res: Response, data: unknown, statusCode?: number): Response<any, Record<string, any>>;
export declare function created(res: Response, data: unknown): Response<any, Record<string, any>>;
export declare function noContent(res: Response): Response<any, Record<string, any>>;
export declare function error(res: Response, message: string, statusCode?: number): Response<any, Record<string, any>>;
//# sourceMappingURL=response.d.ts.map