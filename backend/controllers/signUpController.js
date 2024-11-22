// const {volunteers} = require("../models/volunteerModel");
// const {events} = require("../models/eventModel");
// const {signUps} = require("../models/signUpModel");
// const { createSignUp } = require("../models/signUpModel");



// const signUpForEvent = (req, res) => {
//   const { volunteerId, eventIds } = req.body;


//   const volunteer = volunteers.find((v) => v.id === volunteerId);
//   if (!volunteer) {
//     return res.status(404).json({ message: "Volunteer not found" });
//   }

//   const signedUpEvents = [];

//   for (let eventId of eventIds) {
//     const event = events.find((ev) => ev.id === eventId);
//     if (!event) {
//       return res.status(404).json({ message: `Event with ID ${eventId} not found` });
//     }

//     const existingSignUp = signUps.find(
//       (signUp) => signUp.volunteerId === volunteerId && signUp.eventId === eventId
//     );

//     if (existingSignUp) {
//       return res.status(400).json({ message: `Volunteer is already signed up for Event` });
//     }

//     const newSignUp = createSignUp(volunteerId, eventId);
//     signedUpEvents.push(newSignUp);
//   }

//   return res.status(201).json({
//     message: "Successfully signed up for the events",
//     signUps: signedUpEvents,
//   });
// };


// const getAllSignups = (req, res) => {
//   if (!signUps || signUps.length === 0) {
//     return res.status(404).json({ message: "No signups found" });
//   }
  
//   return res.status(200).json(signUps); 
// };

// module.exports = { getAllSignups, signUpForEvent };


// signUpController.js
const SignUp = require("../models/signUpModel");

// Sign up for an event
// const signUpForEvent = async (req, res) => {
//   const { userId, eventId } = req.body;

//   try {
//     // Check if the user is already signed up for the event
//     const existingSignUp = await SignUp.findOne({ userId, eventId });

//     if (existingSignUp) {
//       return res.status(400).json({ message: "User is already signed up for the event" });
//     }

//     // Create a new sign-up
//     const newSignUp = new SignUp({ userId, eventId });
//     await newSignUp.save();

//     return res.status(201).json({
//       message: "Successfully signed up for the event",
//       signUp: newSignUp,
//     });
//   } catch (error) {
//     console.error("Error signing up for event:", error);
//     res.status(500).json({ message: "Error signing up for event", error });
//   }
// };

const signUpForEvent = async (req, res) => {
  const { userId, eventIds } = req.body;

  if (!Array.isArray(eventIds)) {
    return res.status(400).json({ message: "eventIds must be an array" });
  }

  try {
    const signUpResults = [];

    for (const eventId of eventIds) {
      const existingSignUp = await SignUp.findOne({ userId, eventId });

      if (existingSignUp) {
        signUpResults.push({ eventId, message: "User is already signed up for the event" });
        continue;
      }

      const newSignUp = new SignUp({ userId, eventId });
      await newSignUp.save();
      signUpResults.push({ eventId, message: "Successfully signed up for the event", signUp: newSignUp });
    }

    return res.status(201).json(signUpResults);
  } catch (error) {
    console.error("Error signing up for events:", error);
    res.status(500).json({ message: "Error signing up for events", error });
  }
};

// Get all sign-ups
const getAllSignups = async (req, res) => {
  try {
    const signUps = await SignUp.find().populate('userId').populate('eventId');

    if (!signUps || signUps.length === 0) {
      return res.status(404).json({ message: "No sign-ups found" });
    }

    return res.status(200).json(signUps);
  } catch (error) {
    console.error("Error fetching sign-ups:", error);
    res.status(500).json({ message: "Error fetching sign-ups", error });
  }
};

const getUserSignups = async (req, res) => {
  const userId = req.params.userId;

  try {
    const signUps = await SignUp.find({ userId }).populate('eventId');

    if (!signUps || signUps.length === 0) {
      return res.status(404).json({ message: "No sign-ups found for this user" });
    }

    const events = signUps.map(signUp => signUp.eventId);

    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching user sign-ups:", error);
    res.status(500).json({ message: "Error fetching user sign-ups", error });
  }
};

module.exports = { getAllSignups, signUpForEvent, getUserSignups };