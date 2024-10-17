const { notifications } = require("../models/notificationModel");

const getNotificationsForVolunteer = (req, res) => {
  const volunteerId = Number(req.params.volunteerId);
  const userNotifications = notifications.filter(
    (n) => n.volunteerId === volunteerId && !n.isRead
  );
  console.log(userNotifications); // Add logging to see what is returned
  res.json(userNotifications);
};

const getAllNotifications = (req, res) => {
  res.json(notifications);
};

module.exports = { getNotificationsForVolunteer, getAllNotifications };
