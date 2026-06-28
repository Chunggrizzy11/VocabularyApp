"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const User_1 = require("../models/User");
const jwt_1 = require("../utils/jwt");
exports.authService = {
    async register(dto) {
        // Validate required fields
        const errors = {};
        if (!dto.name?.trim())
            errors.name = "Vui lòng nhập họ tên";
        else if (dto.name.trim().length < 2)
            errors.name = "Họ tên phải có ít nhất 2 ký tự";
        else if (dto.name.trim().length > 50)
            errors.name = "Họ tên không được vượt quá 50 ký tự";
        if (!dto.email?.trim())
            errors.email = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email.trim()))
            errors.email = "Email không đúng định dạng";
        else if (dto.email.trim().length > 100)
            errors.email = "Email không được vượt quá 100 ký tự";
        if (!dto.password)
            errors.password = "Vui lòng nhập mật khẩu";
        else if (dto.password.length < 6)
            errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        else if (dto.password.length > 100)
            errors.password = "Mật khẩu không được vượt quá 100 ký tự";
        if (Object.keys(errors).length > 0) {
            const err = new Error("Validation failed");
            err.fieldErrors = errors;
            throw err;
        }
        const exists = await User_1.User.findOne({ email: dto.email.toLowerCase() });
        if (exists) {
            const err = new Error("Email đã được sử dụng");
            err.fieldErrors = { email: "Email đã được sử dụng" };
            throw err;
        }
        const user = await User_1.User.create(dto);
        const token = (0, jwt_1.signJwt)({ userId: String(user._id), role: user.role });
        return { user: user.toJSON(), token };
    },
    async login(dto) {
        // Validate required fields
        const errors = {};
        if (!dto.email?.trim())
            errors.email = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email.trim()))
            errors.email = "Email không đúng định dạng";
        if (!dto.password)
            errors.password = "Vui lòng nhập mật khẩu";
        if (Object.keys(errors).length > 0) {
            const err = new Error("Validation failed");
            err.fieldErrors = errors;
            throw err;
        }
        const user = await User_1.User.findOne({ email: dto.email.toLowerCase() });
        if (!user) {
            const err = new Error("Email hoặc mật khẩu không đúng");
            err.fieldErrors = { email: "Email không tồn tại trong hệ thống" };
            throw err;
        }
        const isMatch = await user.comparePassword(dto.password);
        if (!isMatch) {
            const err = new Error("Email hoặc mật khẩu không đúng");
            err.fieldErrors = { password: "Mật khẩu không đúng" };
            throw err;
        }
        const token = (0, jwt_1.signJwt)({ userId: String(user._id), role: user.role });
        return { user: user.toJSON(), token };
    },
    async getMe(userId) {
        const user = await User_1.User.findById(userId).select("-password");
        if (!user)
            throw new Error("User not found");
        return user;
    },
    async getAllUsers() {
        const users = await User_1.User.find().select("-password").sort({ createdAt: -1 });
        return users;
    },
    async createAdmin(dto) {
        const exists = await User_1.User.findOne({ email: dto.email.toLowerCase() });
        if (exists) {
            if (exists.role === "admin")
                throw new Error("Admin account already exists");
            // Upgrade existing user to admin
            exists.role = "admin";
            await exists.save();
            return { user: exists.toJSON(), message: "User upgraded to admin" };
        }
        const user = await User_1.User.create({ ...dto, role: "admin" });
        return { user: user.toJSON(), message: "Admin account created" };
    },
};
//# sourceMappingURL=auth.service.js.map