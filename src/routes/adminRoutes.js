const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/auth");

const { adminLogin } = require("../controller/adminController");

// Admin Login Route
router.post("/login", adminLogin);

module.exports = router;
