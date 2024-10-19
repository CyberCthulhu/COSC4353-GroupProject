const { signUps } = require("../models/signUpModel");
const userParticipation = require("../models/userParticipationModel");

const updateParticipation = () => {
  const now = new Date();

  signUps.forEach((signUp, index) => {
    const eventDate = new Date(signUp.date);
    
    if (eventDate < now) {
      const { volunteerId, eventId } = signUp;

      if (!userParticipation[volunteerId]) {
        userParticipation[volunteerId] = [];
      }

      if (!userParticipation[volunteerId].includes(eventId)) {
        userParticipation[volunteerId].push(eventId);
      }

      signUps.splice(index, 1);
    }
  });
};

module.exports = { updateParticipation };
