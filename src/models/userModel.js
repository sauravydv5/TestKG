const { pool } = require("../config/Database");

exports.createUser = async ({ full_name, email, password_hash, mobile }) => {
  const sql = `
    INSERT INTO users (full_name, email, password_hash, mobile, role)
    VALUES (?, ?, ?, ?, 'user')
  `;

  const [result] = await pool.query(sql, [
    full_name,
    email,
    password_hash,
    mobile,
  ]);

  return result.insertId;
};

exports.findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
};
