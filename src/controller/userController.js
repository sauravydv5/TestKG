const authService = require("../Service/authService");
const validator = require("validator");
const userProfile = require("../Service/profileService");

const register = async (req, res) => {
  try {
    const { full_name, email, password, mobile } = req.body;

    if (!full_name || !email || !password || !mobile)
      return res.status(400).json({ error: "All fields required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ error: "Invalid email" });
    if (!validator.isMobilePhone(mobile, "en-IN"))
      return res.status(400).json({ error: "Invalid mobile number" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password must be at least 6 chars" });

    const userId = await authService.register({
      full_name,
      email,
      password,
      mobile,
    });
    res.status(201).json({ success: true, message: "User registered", userId });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const result = await authService.login({ email, password });
    const { token, user } = result;

    // 👉 Token Cookie me save kar do
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // localhost ke liye false, production me true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};

//get Profiles

const getProfile = async (req, res) => {
  try {
    const userId = req.user.sub;

    const user = await userProfile.getProfile(userId);

    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { register, login, getProfile };
