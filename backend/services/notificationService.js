const { volunteers } = require("../models/volunteerModel");
const { events } = require("../models/eventModel");
const { signUps } = require("../models/signUpModel");
const { notifications, createNotification } = require("../models/notificationModel");

const notifyVolunteers = () => {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  signUps.forEach((signUp) => {
    const volunteer = volunteers.find(v => v.id === signUp.volunteerId);
    const event = events.find(e => e.id === signUp.eventId);
    
    if (volunteer && event) {
      const eventDate = new Date(event.date);
      const timeDiff = eventDate - today;

      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      const existingNotification = notifications.find(
        (n) => n.volunteerId === volunteer.id && n.eventId === event.id
      );

      if (!existingNotification) {
        if (daysDiff === 7) {
          createNotification(volunteer.id, `You have an upcoming event in 7 days: ${event.title}`, event.id);
        } else if (daysDiff === 1) {
          createNotification(volunteer.id, `You have an event tomorrow: ${event.title}`, event.id);
        }
      }
    }
  });
};

module.exports = { notifyVolunteers };
