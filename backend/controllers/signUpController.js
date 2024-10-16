const {volunteers} = require("../models/volunteerModel");
const {events} = require("../models/eventModel");
const {signUps} = require("../models/signUpModel");
const { createSignUp } = require("../models/signUpModel");



const signUpForEvent = (req, res) => {
  const { volunteerId, eventIds } = req.body;


  const volunteer = volunteers.find((v) => v.id === volunteerId);
  if (!volunteer) {
    return res.status(404).json({ message: "Volunteer not found" });
  }

  const signedUpEvents = [];

  for (let eventId of eventIds) {
    const event = events.find((ev) => ev.id === eventId);
    if (!event) {
      return res.status(404).json({ message: `Event with ID ${eventId} not found` });
    }

    const existingSignUp = signUps.find(
      (signUp) => signUp.volunteerId === volunteerId && signUp.eventId === eventId
    );

    if (existingSignUp) {
      return res.status(400).json({ message: `Volunteer is already signed up for Event` });
    }

    const newSignUp = createSignUp(volunteerId, eventId);
    signedUpEvents.push(newSignUp);
  }

  return res.status(201).json({
    message: "Successfully signed up for the events",
    signUps: signedUpEvents,
  });
};


const getAllSignups = (req, res) => {
  if (!signUps || signUps.length === 0) {
    return res.status(404).json({ message: "No signups found" });
  }
  
  return res.status(200).json(signUps); 
};

module.exports = { getAllSignups, signUpForEvent };
