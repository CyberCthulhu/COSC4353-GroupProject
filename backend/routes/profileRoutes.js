const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/user-profile/:id", profileController.getProfileById);

router.post("/user-profile/:id", profileController.updateProfileById);

router.post("/user-profile", profileController.createProfile);

router.get("/user-profiles", profileController.getProfiles);

router.get('/profiles/user/:userId', profileController.getFullNameByUserId);


module.exports = router;