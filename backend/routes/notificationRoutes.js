const express = require("express");
const router = express.Router();
const { getNotificationsForVolunteer,getAllNotifications, markNotificationAsRead } = require("../controllers/notificationController");

router.get("/notifications/:volunteerId", getNotificationsForVolunteer);

router.get("/notifications", getAllNotifications);

router.put("/notifications/:notificationId/read", markNotificationAsRead);

module.exports = router;
