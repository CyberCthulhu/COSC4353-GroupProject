const { events, createEvent } = require("../models/eventModel");

exports.getEvents = (req, res) => {
  res.json(events);
};

exports.getEventById = (req, res) => {
  const eventId = Number(req.params.eventId);
  const event = events.find((event) => event.id === eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
};

exports.createNewEvent = (req, res) => {
  const { title, requiredSkills, location, description, urgency, date, zipCode } = req.body;

  console.log("Received date:", date);  // Debugging the date format received

  if (!title || !requiredSkills || !location || !description || !urgency || !date || !zipCode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEvent = createEvent({
    title,
    requiredSkills,
    location,
    description,
    urgency,
    date,
    zipCode,
  });

  return res.status(201).json(newEvent);
};
