const express = require("express");
const router = express.Router();
const {createNewEvent, getEvents, getEventById, deleteEventById, updateEventById} = require("../controllers/eventController");

router.get("/events", getEvents);
router.get("/events/:eventId", getEventById);
router.post("/events", createNewEvent);
router.delete("/events/:eventId", deleteEventById);
router.put("/events/:eventId", updateEventById);


module.exports = router;

