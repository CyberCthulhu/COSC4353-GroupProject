const express = require("express");
const router = express.Router();
const cors = require('cors')
const adminAuthController = require("../controllers/adminAuthController");



router.post("/admin_signup", adminAuthController.signup);
router.post("/admin_login", adminAuthController.login)

module.exports = router;
