// const { volunteers } = require("../models/volunteerModel");
// const { events } = require("../models/eventModel");
// const { signUps } = require("../models/signUpModel");
// const { notifications, createNotification } = require("../models/notificationModel");

// const notifyVolunteers = () => {
//   const now = new Date();

//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//   signUps.forEach((signUp) => {
//     const volunteer = volunteers.find(v => v.id === signUp.volunteerId);
//     const event = events.find(e => e.id === signUp.eventId);
    
//     if (volunteer && event) {
//       const eventDate = new Date(event.date);
//       const timeDiff = eventDate - today;

//       const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//       const existingNotification = notifications.find(
//         (n) => n.volunteerId === volunteer.id && n.eventId === event.id
//       );

//       if (!existingNotification) {
//         if (daysDiff === 7) {
//           createNotification(volunteer.id, `You have an upcoming event in 7 days: ${event.title}`, event.id);
//         } else if (daysDiff === 1) {
//           createNotification(volunteer.id, `You have an event tomorrow: ${event.title}`, event.id);
//         }
//       }
//     }
//   });
// };

// module.exports = { notifyVolunteers };


// // notificationService.js
// const User = require("../models/userAuthModel");
// const Event = require("../models/eventModel");
// const SignUp = require("../models/signUpModel");
// const Notification = require("../models/notificationModel");

// const notifyVolunteers = async () => {
//   const now = new Date();
//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//   try {
//     const signUps = await SignUp.find().populate('userId').populate('eventId');

//     for (const signUp of signUps) {
//       const user = signUp.userId;
//       const event = signUp.eventId;

//       if (user && event) {
//         const eventDate = new Date(event.date);
//         const timeDiff = eventDate - today;
//         const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//         const existingNotification = await Notification.findOne({
//           userId: user._id,
//           eventId: event._id,
//         });

//         if (!existingNotification) {
//           if (daysDiff === 7) {
//             await Notification.create({
//               userId: user._id,
//               eventId: event._id,
//               message: `You have an upcoming event in 7 days: ${event.title}`,
//             });
//           } else if (daysDiff === 1) {
//             await Notification.create({
//               userId: user._id,
//               eventId: event._id,
//               message: `You have an event tomorrow: ${event.title}`,
//             });
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error notifying volunteers:", error);
//   }
// };

// module.exports = { notifyVolunteers };

// notificationService.js
const User = require("../models/userAuthModel");
const Event = require("../models/eventModel");
const SignUp = require("../models/signUpModel");
const Notification = require("../models/notificationModel");

const notifyVolunteers = async () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    const signUps = await SignUp.find().populate('userId').populate('eventId');

    for (const signUp of signUps) {
      const user = signUp.userId;
      const event = signUp.eventId;

      if (user && event) {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate - today;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        const existingNotification = await Notification.findOne({
          userId: user._id,
          eventId: event._id,
        });

        if (!existingNotification) {
          if (daysDiff <= 7 && daysDiff >= 1) {
            await Notification.create({
              userId: user._id,
              eventId: event._id,
              message: `You have an upcoming event in ${daysDiff} days: ${event.title}`,
            });
          } else if (daysDiff === 0) {
            await Notification.create({
              userId: user._id,
              eventId: event._id,
              message: `You have an event today: ${event.title}`,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error notifying volunteers:", error);
  }
};

module.exports = { notifyVolunteers };