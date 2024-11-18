const express = require("express");
const router = express.Router();
const {createNewEvent, getEvents, getEventById} = require("../controllers/eventController");

router.get("/events", getEvents);
router.get("/events/:eventId", getEventById);
router.post("/events", createNewEvent);

module.exports = router;

