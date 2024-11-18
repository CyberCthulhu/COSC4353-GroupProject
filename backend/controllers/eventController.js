// const {events, createEvent} = require("../models/eventModel");

// exports.getEvents = (req, res) => {
//   res.json(events);
// };

// exports.getEventById = (req, res) => {
//   const eventId = Number(req.params.eventId);
//   const event = events.find((event) => event.id === eventId);
//   if (!event) {
//     return res.status(404).json({ message: "Event not found" });
//   }
//   res.json(event);
// };

// exports.createNewEvent = (req, res) => {
//   const { title, requiredSkills, location, description, date, zipCode } =
//     req.body;

//   if (!title || !requiredSkills || !location || !date || !zipCode) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const newEvent = createEvent({
//     title,
//     requiredSkills,
//     location,
//     description,
//     date,
//     zipCode,
//   });
//   return res.status(201).json(newEvent);
// };

const Event = require("../models/eventModel");
const mongoose = require("mongoose");


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find(); 
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ message: "Error retrieving event", error });
  }
};

exports.createNewEvent = async (req, res) => {
  const { title, requiredSkills, location, description, date, urgency, zipCode } = req.body;

  if (!title || !requiredSkills || !location || !date || !zipCode || !urgency) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEvent = new Event({
      title,
      requiredSkills,
      location,
      description,
      date,
      urgency,
      zipCode,
    });
    await newEvent.save(); 
    return res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};