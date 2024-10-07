const volunteers = require("../models/userModel");

exports.getVounteers = (req, res) => {
  res.json(volunteers);
};

exports.getVolunteerById = (req, res) => {
    const volunteerId = req.params.volunteerId;
    const volunteer = volunteers.find((volunteer) => volunteer.id === volunteerId);
    if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
    }
    res.json(volunteer);
};

exports.createNewVolunteer = (req, res) => {
    const { name, skills, preferredLocation, email, password } = req.body;
  
    if (!name || !skills || !preferredLocation || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const newVolunteer = createVolunteer({ name, skills, preferredLocation, email, password });
    return res.status(201).json(newVolunteer);
  };
  
