const express = require("express");
const router = express.Router();
const { getNotificationsForVolunteer,getAllNotifications } = require("../controllers/notificationController");

router.get("/notifications/:volunteerId", getNotificationsForVolunteer);

router.get("/notifications", getAllNotifications);

module.exports = router;
