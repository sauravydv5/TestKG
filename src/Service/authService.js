const { hashPassword } = require("../utils/hash");
const User = require("../models/userModel");

exports.register = async ({ full_name, email, password, mobile }) => {
  // Check existing
  const existing = await User.findByEmail(email);
  if (existing) throw new Error("Email already registered");

  // Hash password
  const password_hash = await hashPassword(password);

  // Insert User
  const id = await User.createUser({
    full_name,
    email,
    password_hash,
    mobile,
  });

  return id;
};
