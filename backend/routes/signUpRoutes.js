const express = require("express");
const router = express.Router();
const { signUpForEvent, getAllSignups, getUserSignups } = require("../controllers/signUpController");

router.post("/event-signup", signUpForEvent);
router.get("/event-signups", getAllSignups);
router.get("/signups/user/:userId", getUserSignups);

module.exports = router;
