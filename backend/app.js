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
const notificationRoutes = require("./routes/notificationRoutes");


app.use("/", notificationRoutes);
app.use("/", authRoutes);
app.use("/", eventRoutes);
app.use("/", historyRoutes);
app.use("/", signUpRoutes);
app.use("/", volunteerRoutes);

module.exports = app;
