const { pool, DBConnection } = require("../config/Database");
const bcrypt = require("bcrypt");

const admin = {
  full_name: "KG FOUNDATION",
  email: "admin1@gmail.com",
  mobile: "9999990001",
};

const PASSWORD = "Admin@123";

const seedAdmin = async () => {
  await DBConnection();

  // Check if already exists
  const [existing] = await pool.execute("SELECT * FROM users WHERE email=?", [
    admin.email,
  ]);

  if (existing.length > 0) {
    console.log(`⚠️ Admin already exists → ${admin.email}`);
    process.exit(0);
  }

  // Hash password
  const password_hash = await bcrypt.hash(PASSWORD, 10);

  // Insert Admin
  await pool.execute(
    `INSERT INTO users (full_name, email, password_hash, mobile, role)
     VALUES (?, ?, ?, ?, 'admin')`,
    [admin.full_name, admin.email, password_hash, admin.mobile]
  );

  console.log(`✅ Admin created → ${admin.email}`);
  process.exit(0);
};

seedAdmin();
