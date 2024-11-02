const User = require("../models/authModel.js");
const bcrypt = require('bcrypt')


const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const comparePasswords = async (password, hashed) => {
  return await bcrypt.compare(password, hashed)
}


const signup = async (req, res) => {
  const { name, password } = req.body
  const exist = await User.findOne({ name })

  if (exist) {
    return res.status(400).json({ message: "Username already taken" })
  }

  try {
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name, password: hashedPassword
    })
    // console.log(user._id)
    return res.status(201).json({ message: "User created successfully", userId: user._id })

  }
  catch (err) {
    return res.status(500).json({ message: "Error creating user", err });
  }

};

const login = async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (!user) {
      return res.status(400).json({ message: "Username not found" })
    }
    const match = await comparePasswords(password, user.password)
    if (!match) {
      return res.status(400).json({ message: "Invalid password" })
    }
    else {
      return res.status(201).json({ message: "Login successful" })
    }
  }
  catch (err) {
    return res.status(500).json({ message: "Error logging in", error })
  }
}
module.exports = { signup, login }