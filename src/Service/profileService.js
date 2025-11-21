const { pool } = require("../config/Database");

const getProfile = async (userId) => {
  const [rows] = await pool.execute(
    "SELECT id, full_name, email, mobile, role FROM users WHERE id = ?",
    [userId]
  );

  if (!rows.length) return null;

  return rows[0];
};

module.exports = { getProfile };
