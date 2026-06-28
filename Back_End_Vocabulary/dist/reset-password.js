"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/vocabulary_app";
async function resetPassword() {
    const email = process.argv[2];
    const newPassword = process.argv[3];
    if (!email || !newPassword) {
        console.error("Usage: npx ts-node src/reset-password.ts <email> <new-password>");
        process.exit(1);
    }
    if (newPassword.length < 6) {
        console.error("Password must be at least 6 characters");
        process.exit(1);
    }
    await mongoose_1.default.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    // Dynamic import to avoid needing all model files
    const { User } = await Promise.resolve().then(() => __importStar(require("./models/User")));
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        console.error(`User with email "${email}" not found`);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
    user.password = newPassword;
    await user.save();
    console.log(`✅ Password reset successfully for: ${email}`);
    await mongoose_1.default.disconnect();
    process.exit(0);
}
resetPassword().catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
});
//# sourceMappingURL=reset-password.js.map