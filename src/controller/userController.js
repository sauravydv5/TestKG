const authService = require("../Service/authService");

// validate simple inputs
const validate = ({ full_name, email, password, mobile }) => {
  if (!full_name || !email || !password)
    throw new Error("Full Name, Email & Password required");

  if (!email.includes("@")) throw new Error("Invalid email");

  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");

  return true;
};

exports.register = async (req, res) => {
  try {
    validate(req.body);

    const id = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user_id: id,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
