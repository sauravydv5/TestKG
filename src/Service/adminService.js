const { pool } = require("../config/Database");

exports.getAllUsers = async () => {
  // Fetch only users, not admins
  const [rows] = await pool.query(
    "SELECT id, full_name, email, mobile, role, created_at FROM users WHERE role='user'"
  );
  return rows;
};
