const { events, createEvent } = require("../models/eventModel");

const getEventById = (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  const event = events.find(e => e.id === eventId);

  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

const updateEventById = (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  const eventIndex = events.findIndex(e => e.id === eventId);

  if (eventIndex !== -1) {
    events[eventIndex] = { ...events[eventIndex], ...req.body };

    res.status(200).json({
      message: "Event updated successfully",
      event: events[eventIndex]
    });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

const getEvents = (req, res) => {
  res.json(events);
};

const createNewEvent = (req, res) => {
  const { title, requiredSkills, location, description, urgency, date, zipCode } = req.body;

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

module.exports = {
  getEventById,
  updateEventById,
  getEvents,
  createNewEvent
};
