const express = require("express");
const router = express.Router();
const { signUpForEvent } = require("../controllers/signUpController");

router.post("/signup", signUpForEvent);

module.exports = router;
