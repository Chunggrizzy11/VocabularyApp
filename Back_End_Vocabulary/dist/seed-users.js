"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./configs/database");
const User_1 = require("./models/User");
async function run() {
    await (0, database_1.connectDatabase)();
    console.log("Connected to MongoDB");
    // Create or update admin with stronger password
    let admin = await User_1.User.findOne({ email: "admin@parroto.com" });
    if (admin) {
        admin.role = "admin";
        admin.password = "Parroto@Admin2026";
        await admin.save();
        console.log("✅ Admin updated: admin@parroto.com / Parroto@Admin2026");
    }
    else {
        await User_1.User.create({ name: "Admin", email: "admin@parroto.com", password: "Parroto@Admin2026", role: "admin" });
        console.log("✅ Admin created: admin@parroto.com / Parroto@Admin2026");
    }
    // Create regular user with stronger password
    let user = await User_1.User.findOne({ email: "john@test.com" });
    if (user) {
        user.password = "Parroto@User2026";
        await user.save();
        console.log("✅ User updated: john@test.com / Parroto@User2026");
    }
    else {
        await User_1.User.create({ name: "John", email: "john@test.com", password: "Parroto@User2026", role: "user" });
        console.log("✅ User created: john@test.com / Parroto@User2026");
    }
    console.log("\n🎉 Done! New login credentials:");
    console.log("   Admin: admin@parroto.com / Parroto@Admin2026");
    console.log("   User:  john@test.com / Parroto@User2026");
    process.exit(0);
}
run().catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
});
//# sourceMappingURL=seed-users.js.map