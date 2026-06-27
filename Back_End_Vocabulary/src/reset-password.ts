import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Dynamic import to avoid needing all model files
  const { User } = await import("./models/User");

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    console.error(`User with email "${email}" not found`);
    await mongoose.disconnect();
    process.exit(1);
  }

  user.password = newPassword;
  await user.save();

  console.log(`✅ Password reset successfully for: ${email}`);
  await mongoose.disconnect();
  process.exit(0);
}

resetPassword().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
