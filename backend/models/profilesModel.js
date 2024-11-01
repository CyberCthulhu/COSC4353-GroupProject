// const profiles = [
//     {
//       id: 1,
//       fullName: "John Doe",
//       address1: "123 Main St",
//       address2: "Apt 4B",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//       skills: ["Teamwork", "Problem-solving"],
//       preferences: "Remote work",
//       availability: ["2024-10-15", "2024-10-16"]
//     },
//     {
//       id: 2,
//       fullName: "Jane Smith",
//       address1: "456 Oak St",
//       address2: "Apt 2A",
//       city: "Los Angeles",
//       state: "CA",
//       zipCode: "90001",
//       skills: ["Leadership", "Communication"],
//       preferences: "On-site work",
//       availability: ["2024-10-18", "2024-10-19"]
//     }
//     // Add more profiles if needed
//   ];
  
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  skills: { type: [String], required: true },
  preferences: { type: String, required: true },
  availability: { type: [String], required: true }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;