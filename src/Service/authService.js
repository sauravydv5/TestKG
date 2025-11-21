const { pool } = require("../config/Database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async ({ full_name, email, password, mobile }) => {
  const [existing] = await pool.execute(
    "SELECT * FROM users WHERE email=? OR mobile=?",
    [email, mobile]
  );
  if (existing.length > 0)
    throw new Error("Email or Mobile already registered");

  const password_hash = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    "INSERT INTO users (full_name, email, password_hash, mobile, role) VALUES (?, ?, ?, ?, 'user')",
    [full_name, email, password_hash, mobile]
  );

  return result.insertId;
};

exports.login = async ({ email, password }) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email=? LIMIT 1",
    [email]
  );
  const user = rows[0];
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
  };
};

exports.getProfile = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        id, full_name, email, mobile, gender, dob, address, city, state, pincode
      FROM users WHERE id = ?
    `;

    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);

      if (result.length === 0) return resolve(null);

      resolve(result[0]);
    });
  });
};
