const adminService = require("../Service/adminService");
const { pool } = require("../config/Database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email=? LIMIT 1",
      [email]
    );

    if (!rows.length) return res.status(400).json({ error: "Admin not found" });

    const admin = rows[0];

    if (admin.role !== "admin")
      return res.status(403).json({ error: "Access denied, not admin" });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { sub: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      token,
      user: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { adminLogin };
