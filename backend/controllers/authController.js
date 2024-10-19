const users = require("../models/volunteerModel");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  console.log("User Data:", name, email, password);
  res.json({ message: "User registered successfully!" });
};
