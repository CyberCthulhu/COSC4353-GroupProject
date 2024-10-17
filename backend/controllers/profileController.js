const profiles = require("../models/profilesModel");

const getProfileById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const profile = profiles.find(p => p.id === id);

  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
};

const updateProfileById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const profileIndex = profiles.findIndex(p => p.id === id);
  
    if (profileIndex !== -1) {
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
