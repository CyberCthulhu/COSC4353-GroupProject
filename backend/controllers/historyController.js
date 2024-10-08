const userParticipation = require("../models/userParticipationModel");
const {events} = require("../models/eventModel");

exports.getHistory = (req, res) => {
  const userId = req.params.userId;
  if (!userParticipation[userId]) {
    return res.status(404).json({ message: "No events have been participated in" });
  }
  const eventIds = userParticipation[userId];
  const userEvents = events.filter((event) => eventIds.includes(event.id));
  res.json(userEvents);
};
