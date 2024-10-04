const events = require("../models/eventModel");

exports.getEvents = (req, res) => {
  res.json(events);
};
