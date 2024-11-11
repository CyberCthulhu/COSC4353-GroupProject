const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const userAuthRoutes = require("./routes/userAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const eventRoutes = require("./routes/eventRoutes");
const historyRoutes = require("./routes/historyRoutes");
const signUpRoutes = require("./routes/signUpRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");



app.use("/", notificationRoutes);
app.use("/", userAuthRoutes);
app.use("/", adminAuthRoutes);
app.use("/", eventRoutes);
app.use("/", historyRoutes);
app.use("/", signUpRoutes);
app.use("/", volunteerRoutes);
app.use("/", profileRoutes);

module.exports = app;
