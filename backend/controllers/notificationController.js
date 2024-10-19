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


const markNotificationAsRead = (req, res) => {
  const notificationId = parseInt(req.params.notificationId);
  const notification = notifications.find((n) => n.id === notificationId);

  if (notification) {
    notification.isRead = true;
    res.json({ message: "Notification marked as read" });
  } else {
    res.status(404).json({ error: "Notification not found" });
  }
};

module.exports = { getNotificationsForVolunteer, getAllNotifications, markNotificationAsRead };
