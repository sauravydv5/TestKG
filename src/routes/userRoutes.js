const router = require("express").Router();
const controller = require("../controller/userController");

router.post("/register", controller.register);

module.exports = router;
