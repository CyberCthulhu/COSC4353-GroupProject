const express = require("express");
const router = express.Router();
const { createNewEvent, getEvents, getEventById, updateEventById } = require("../controllers/eventController");

router.get("/events", getEvents);
router.get("/events/:eventId", getEventById);
router.post("/events", createNewEvent);
router.post("/events/:eventId", updateEventById);

module.exports = router;
