// profileController.js

const profiles = require("../models/profilesModel");

// Controller to get profile by ID
const getProfileById = (req, res) => {
  const id = parseInt(req.params.id, 10); // Get profile ID from request params
  const profile = profiles.find(p => p.id === id);

  if (profile) {
    res.status(200).json(profile);  // Return the profile data if found
  } else {
    res.status(404).json({ message: "Profile not found" });  // Return 404 if not found
  }
};

// Update profile by ID
const updateProfileById = (req, res) => {
    const id = parseInt(req.params.id, 10);  // Extract ID from the route
    const profileIndex = profiles.findIndex(p => p.id === id);
  
    if (profileIndex !== -1) {
      // Update profile with the data from the request body
      profiles[profileIndex] = { ...profiles[profileIndex], ...req.body };
  
      res.status(200).json({
        message: "Profile updated successfully",
        profile: profiles[profileIndex]
      });
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  };
  
  module.exports = {
    getProfileById,
    updateProfileById
  };
