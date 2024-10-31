const { signUps } = require("../models/signUpModel");
const History = require("../models/historyModel");

const updateParticipation = () => {
  const now = new Date();

  signUps.forEach((signUp, index) => {
    const eventDate = new Date(signUp.date);
    
    if (eventDate < now) {
      const { volunteerId, eventId } = signUp;

      if (!History[volunteerId]) {
        History[volunteerId] = [];
      }

      if (!History[volunteerId].includes(eventId)) {
        History[volunteerId].push(eventId);
      }

      signUps.splice(index, 1);
    }
  });
};

module.exports = { updateParticipation };
