const express = require("express");
const router = express.Router();
const cors = require('cors')
const userAuthController = require("../controllers/userAuthController");



router.post("/adminSignup", userAuthController.signup);
router.post("/adminLogin", userAuthController.login)

module.exports = router;
