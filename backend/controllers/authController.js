const User = require("../models/authModel.js");

const signup = async (req, res) => {
  const { name, password } = req.body
  const exist = await User.findOne({ name })

  if (exist) {
    return res.status(400).json({ message: "Username already taken" })
  }

  try {
    const user = await User.create({
      name, password
    })
    return res.status(201).json({ message: "User created successfully" })

  }
  catch (err) {
    return res.status(500).json({ message: "Error creating user", error });
  }

};

module.exports = { signup }