const mongoose = require("mongoose")

const userAuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userAuthSchema)
module.exports = User