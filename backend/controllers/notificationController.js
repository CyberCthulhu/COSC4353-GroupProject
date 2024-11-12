// const { notifications } = require("../models/notificationModel");

// const getNotificationsForVolunteer = (req, res) => {
//   const volunteerId = Number(req.params.volunteerId);
//   const userNotifications = notifications.filter(
//     (n) => n.volunteerId === volunteerId && !n.isRead
//   );
//   console.log(userNotifications); 
//   res.json(userNotifications);
// };

// const getAllNotifications = (req, res) => {
//   res.json(notifications);
// };


// const markNotificationAsRead = (req, res) => {
//   const notificationId = parseInt(req.params.notificationId);
//   const notification = notifications.find((n) => n.id === notificationId);

//   if (notification) {
//     notification.isRead = true;
//     res.json({ message: "Notification marked as read" });
//   } else {
//     res.status(404).json({ error: "Notification not found" });
//   }
// };

// module.exports = { getNotificationsForVolunteer, getAllNotifications, markNotificationAsRead };

// notificationController.js
// const Notification = require("../models/notificationModel");

// // Get notifications for a specific volunteer (user)
// const getNotificationsForVolunteer = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const userNotifications = await Notification.find({ userId, isRead: false });
//     console.log(userNotifications);
//     res.json(userNotifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({ message: "Error fetching notifications", error });
//   }
// };

// // Get all notifications
// const getAllNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find();
//     res.json(notifications);
//   } catch (error) {
//     console.error("Error fetching all notifications:", error);
//     res.status(500).json({ message: "Error fetching all notifications", error });
//   }
// };

// // Mark a notification as read
// const markNotificationAsRead = async (req, res) => {
//   const notificationId = req.params.notificationId;

//   try {
//     const notification = await Notification.findById(notificationId);

//     if (notification) {
//       notification.isRead = true;
//       await notification.save();
//       res.json({ message: "Notification marked as read" });
//     } else {
//       res.status(404).json({ error: "Notification not found" });
//     }
//   } catch (error) {
//     console.error("Error marking notification as read:", error);
//     res.status(500).json({ message: "Error marking notification as read", error });
//   }
// };

// module.exports = { getNotificationsForVolunteer, getAllNotifications, markNotificationAsRead };


// notificationController.js
const mongoose = require('mongoose');
const Notification = require("../models/notificationModel");

// Get notifications for a specific volunteer (user)
const getNotificationsbyUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const userNotifications = await Notification.find({ userId, isRead: false });
    console.log(userNotifications);
    res.json(userNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching all notifications:", error);
    res.status(500).json({ message: "Error fetching all notifications", error });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.notificationId;

  try {
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ message: "Invalid notification ID format" });
    }

    const notification = await Notification.findById(notificationId);

    if (notification) {
      notification.isRead = true;
      await notification.save();
      res.json({ message: "Notification marked as read" });
    } else {
      res.status(404).json({ error: "Notification not found" });
    }
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Error marking notification as read", error });
  }
};

module.exports = { getNotificationsbyUser, getAllNotifications, markNotificationAsRead };