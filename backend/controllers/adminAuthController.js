const User = require("../models/adminAuthModel.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        return res.status(201).json({ message: "User created successfully" })

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
            const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" })
            res.cookie("token", token, { httpOnly: true })
            return res.status(201).json({ message: "Login successful", token })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error logging in", error })
    }
}
module.exports = { signup, login }