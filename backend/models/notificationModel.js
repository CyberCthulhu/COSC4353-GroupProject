let notifications = [];

const createNotification = (volunteerId, message, eventId) => {
  const newNotification = {
    id: notifications.length + 1,
    volunteerId,
    eventId,
    message,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  notifications.push(newNotification);
};

module.exports = { notifications, createNotification };
