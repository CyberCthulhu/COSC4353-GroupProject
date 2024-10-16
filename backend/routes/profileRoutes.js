const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// Route to get a profile by ID
router.get("/user-profile/:id", profileController.getProfileById);

// POST route to handle user profile form submission
router.post("/user-profile/:id", profileController.updateProfileById);

module.exports = router;