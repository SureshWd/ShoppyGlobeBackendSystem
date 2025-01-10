const express = require("express");
const router = express.Router();
const User = require("../controller/User.Controller.js");

router.post("/register", User.register);
router.post("/login", User.login);

module.exports = router;