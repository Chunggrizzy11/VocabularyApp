"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const User_1 = require("../models/User");
const jwt_1 = require("../utils/jwt");
exports.authService = {
    async register(dto) {
        const exists = await User_1.User.findOne({ email: dto.email.toLowerCase() });
        if (exists)
            throw new Error("Email already exists");
        const user = await User_1.User.create(dto);
        const token = (0, jwt_1.signJwt)({ userId: String(user._id), role: user.role });
        return { user: user.toJSON(), token };
    },
    async login(dto) {
        const user = await User_1.User.findOne({ email: dto.email.toLowerCase() });
        if (!user)
            throw new Error("Invalid email or password");
        const isMatch = await user.comparePassword(dto.password);
        if (!isMatch)
            throw new Error("Invalid email or password");
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