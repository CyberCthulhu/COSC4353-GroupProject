const UserParticipation = require("../models/userParticipationModel");
const Event = require("../models/eventModel");

exports.getHistory = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userParticipation = await UserParticipation.findOne({ userId });

    if (!userParticipation) {
      return res.status(404).json({ message: "No events have been participated in" });
    }

    const eventIds = userParticipation.eventIds;

    const userEvents = await Event.find({ _id: { $in: eventIds } });

    res.json(userEvents);
  } catch (error) {
    console.error("Error retrieving user history:", error);
    res.status(500).json({ message: "Error retrieving user history", error });
  }
};