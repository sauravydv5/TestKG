const router = require("express").Router();
const controller = require("../controller/userController");
const { requireAuth } = require("../middleware/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", requireAuth, controller.getProfile);

module.exports = router;
