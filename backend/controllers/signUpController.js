const volunteers = require("../models/volunteerModel");
const events = require("../models/eventModel");
const { createSignUp } = require("../models/signUpModel");

const signUpForEvent = (req, res) => {
  const { volunteerId, eventId } = req.body;

  const volunteer = volunteers.find((v) => v.id === volunteerId);
  const event = events.find((ev) => ev.id === eventId);

  if (!volunteer) {
    return res.status(404).json({ message: "Volunteer not found" });
  }
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const newSignUp = createSignUp(volunteerId, eventId);
  return res.status(201).json({
    message: "Successfully signed up for the event",
    signUp: newSignUp,
  });
};

module.exports = { signUpForEvent };
