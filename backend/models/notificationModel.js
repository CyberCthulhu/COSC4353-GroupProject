// let notifications = [];

// const createNotification = (volunteerId, message, eventId) => {
//   const newNotification = {
//     id: notifications.length + 1,
//     volunteerId,
//     eventId,
//     message,
//     isRead: false,
//     createdAt: new Date().toISOString(),
//   };
//   notifications.push(newNotification);
// };

// module.exports = { notifications, createNotification };

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;