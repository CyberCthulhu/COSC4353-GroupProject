// historyController.js
const History = require("../models/historyModel");
const Event = require("../models/eventModel");

exports.getHistory = async (req, res) => {
  const userId = req.params.userId;

  try {
    console.log(`Fetching history for userId: ${userId}`);

    const userHistory = await History.findOne({ userId });

    if (!userHistory) {
      console.log("No events have been participated in");
      return res.status(404).json({ message: "No events have been participated in" });
    }

    const eventIds = userHistory.eventIds;
    console.log(`Event IDs: ${eventIds}`);

    const userEvents = await Event.find({ _id: { $in: eventIds } });
    console.log(`User Events: ${userEvents}`);

    res.json(userEvents);
  } catch (error) {
    console.error("Error retrieving user history:", error);
    res.status(500).json({ message: "Error retrieving user history", error });
  }
};