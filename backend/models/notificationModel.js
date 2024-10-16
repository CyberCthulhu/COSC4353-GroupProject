const notifications = []; // This should be initialized globally

const createNotification = (volunteerId, message) => {
  const notification = {
    id: notifications.length + 1, // Unique ID
    volunteerId,
    message,
    isRead: false,
  };
  notifications.push(notification);
  return notification;
};


module.exports = { notifications, createNotification };
