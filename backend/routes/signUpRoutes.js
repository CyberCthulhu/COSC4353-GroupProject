const express = require("express");
const router = express.Router();
const { signUpForEvent, getAllSignups } = require("../controllers/signUpController");

router.post("/event-signup", signUpForEvent);
router.get("/event-signups", getAllSignups);

module.exports = router;
