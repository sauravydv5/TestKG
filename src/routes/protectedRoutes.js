const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");

// User-only route
router.get("/user", requireAuth, (req, res) => {
  if (req.user.role !== "user")
    return res.status(403).json({ error: "Forbidden" });
  res.json({ message: "Hello User!", user: req.user });
});

// Admin-only route
router.get("/admin", requireAuth, (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });
  res.json({ message: "Hello Admin!", user: req.user });
});

module.exports = router;
