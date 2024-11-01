const express = require("express");
const router = express.Router();
const cors = require('cors')
const authController = require("../controllers/authController");



router.post("/signup", authController.signup);
router.post("/login", authController.login)

module.exports = router;
