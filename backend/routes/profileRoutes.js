const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/user-profile/:id", profileController.getProfileById);

router.put("/user-profile/:id", profileController.updateProfileById);

router.post("/user-profile", profileController.createProfile);

router.get("/user-profiles", profileController.getProfiles);

router.get('/profiles/user/:userId', profileController.getFullNameByUserId);

router.get('/profiles/:userId', profileController.getProfileByUserId);
module.exports = router;