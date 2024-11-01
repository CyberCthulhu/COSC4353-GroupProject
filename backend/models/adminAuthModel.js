const mongoose = require("mongoose")

const adminAuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model("Admin", adminAuthSchema)
module.exports = Admin