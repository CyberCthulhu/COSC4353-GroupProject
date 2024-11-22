const SignUp = require("../models/signUpModel");
const History = require("../models/historyModel");

const updateParticipation = async () => {
  const now = new Date();

  try {
    const signUps = await SignUp.find();

    for (const signUp of signUps) {
      const eventDate = new Date(signUp.date);

      if (eventDate < now) {
        const { userId, eventId } = signUp;

        let userHistory = await History.findOne({ userId });

        if (!userHistory) {
          userHistory = new History({ userId, eventIds: [] });
        }

        if (!userHistory.eventIds.includes(eventId)) {
          userHistory.eventIds.push(eventId);
          await userHistory.save();
        }

        await SignUp.findByIdAndDelete(signUp._id);
      }
    }
  } catch (error) {
    console.error("Error updating participation:", error);
  }
};

module.exports = { updateParticipation };