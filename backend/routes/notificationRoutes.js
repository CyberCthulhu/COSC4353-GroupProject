const express = require("express");
const router = express.Router();
const { getNotificationsbyUser,getAllNotifications, markNotificationAsRead } = require("../controllers/notificationController");

router.get("/notifications/:userId", getNotificationsbyUser);

router.get("/notifications", getAllNotifications);

router.put("/notifications/:notificationId/read", markNotificationAsRead);

module.exports = router;
