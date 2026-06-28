"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
exports.authController = {
    register: async (req, res) => {
        try {
            const result = await auth_service_1.authService.register(req.body);
            (0, response_1.created)(res, result);
        }
        catch (e) {
            const statusCode = e.fieldErrors ? 400 : 400;
            const payload = { success: false, message: e.message, fieldErrors: e.fieldErrors || {} };
            res.status(statusCode).json(payload);
        }
    },
    login: async (req, res) => {
        try {
            const result = await auth_service_1.authService.login(req.body);
            (0, response_1.success)(res, result);
        }
        catch (e) {
            const statusCode = e.fieldErrors ? 400 : 401;
            const payload = { success: false, message: e.message, fieldErrors: e.fieldErrors || {} };
            res.status(statusCode).json(payload);
        }
    },
    getMe: async (req, res) => {
        try {
            const user = await auth_service_1.authService.getMe(req.userId);
            (0, response_1.success)(res, user);
        }
        catch (e) {
            (0, response_1.error)(res, e.message, 404);
        }
    },
    getUsers: async (_req, res) => {
        try {
            const users = await auth_service_1.authService.getAllUsers();
            (0, response_1.success)(res, users);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    createAdmin: async (req, res) => {
        try {
            const result = await auth_service_1.authService.createAdmin(req.body);
            (0, response_1.created)(res, result);
        }
        catch (e) {
            (0, response_1.error)(res, e.message, 400);
        }
    },
};
//# sourceMappingURL=auth.controller.js.map