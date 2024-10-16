const { volunteers } = require("../models/volunteerModel");
const { events } = require("../models/eventModel");
const { createNotification } = require("../models/notificationModel");

// const notifyVolunteers = () => {
//   const now = new Date();
  
//   // Loop through each event and volunteer
//   events.forEach((event) => {
//     const eventDate = new Date(event.date); // This will be at midnight of the event date
//     const timeDiff = eventDate - now;

//     // Check if the event is in 7 days or 1 day
//     const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//     if (daysDiff === 7) {
//       createNotification(volunteer.id, `You have an upcoming event in 7 days: ${event.title}`);
//     } else if (daysDiff === 1) {
//       createNotification(volunteer.id, `You have an event tomorrow: ${event.title}`);
//     }
//   });
// };


const notifyVolunteers = () => {
    const now = new Date();
    
    // Check today's date without time for accurate comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
    events.forEach((event) => {
      volunteers.forEach((volunteer) => {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate - today;
  
        // Calculate days difference
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
        if (daysDiff === 7) {
          createNotification(volunteer.id, `You have an upcoming event in 7 days: ${event.title}`);
        } else if (daysDiff === 1) {
          createNotification(volunteer.id, `You have an event tomorrow: ${event.title}`);
        }
      });
    });
  };
  
module.exports = { notifyVolunteers };
