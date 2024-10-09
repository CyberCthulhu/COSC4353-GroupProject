const express = require("express");
const router = express.Router();
const { createNewVolunteer, getVolunteers, getVolunteerById } = require("../controllers/volunteerController");


router.post("/volunteers", createNewVolunteer);
router.get("/volunteers/:volunteerId", getVolunteerById);

router.get("/volunteers", getVolunteers);

module.exports = router