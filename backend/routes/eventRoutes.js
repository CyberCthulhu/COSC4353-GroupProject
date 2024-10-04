const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/events", eventController.getEvents);

module.exports = router;
