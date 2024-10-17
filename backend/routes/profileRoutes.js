const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/user-profile/:id", profileController.getProfileById);

router.post("/user-profile/:id", profileController.updateProfileById);

module.exports = router;