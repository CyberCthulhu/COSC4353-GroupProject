const express = require("express");
const router = express.Router();
const cors = require('cors')
const authController = require("../controllers/authController");


router.post("/signup", authController.signup);

module.exports = router;
