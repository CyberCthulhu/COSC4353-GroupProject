const express = require("express");
const router = express.Router();
const {createEvent, getEvents, getEventById} = require("../controllers/eventController");

router.get("/events", getEvents);
router.get("/events/:eventId", getEventById);
router.post("/events", createEvent);

module.exports = router;
