// const profiles = require("../models/profilesModel");

// const getProfileById = (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const profile = profiles.find(p => p.id === id);

//   if (profile) {
//     res.status(200).json(profile);
//   } else {
//     res.status(404).json({ message: "Profile not found" });
//   }
// };

// const updateProfileById = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const profileIndex = profiles.findIndex(p => p.id === id);
  
//     if (profileIndex !== -1) {
//       profiles[profileIndex] = { ...profiles[profileIndex], ...req.body };
  
//       res.status(200).json({
//         message: "Profile updated successfully",
//         profile: profiles[profileIndex]
//       });
//     } else {
//       res.status(404).json({ message: "Profile not found" });
//     }
//   };
  
//   module.exports = {
//     getProfileById,
//     updateProfileById
//   };

const Profile = require("../models/profilesModel");
const mongoose = require("mongoose");

exports.getProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("received request for profile with id:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid profile ID format" });
    }
    const profile = await Profile.findById(id);

    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid profile ID format" });
    }
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });

    if (updatedProfile) {
      res.status(200).json({
        message: "Profile updated successfully",
        profile: updatedProfile
      });
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createProfile = async (req, res) => {
  try {
    console.log("Creating new profile with data:", req.body);  // Log incoming data
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    console.log("Profile successfully saved to database:", savedProfile);
    return res.status(201).json({
      message: "Profile created successfully",
      profile: savedProfile,
    });
  } catch (error) {
    console.error("Error creating profile in database:", error);  // Detailed error logging
    res.status(500).json({ message: "Error creating profile", error });
  }
};
