const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const historyRoutes = require("./routes/historyRoutes");
const signUpRoutes = require("./routes/signUpRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const profileRoutes = require("./routes/profileRoutes");


app.use("/", authRoutes);
app.use("/", eventRoutes);
app.use("/", historyRoutes);
app.use("/", signUpRoutes);
app.use("/", volunteerRoutes);
app.use("/", profileRoutes);

module.exports = app;
