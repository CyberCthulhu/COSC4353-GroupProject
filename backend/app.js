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
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");


app.use("/", notificationRoutes);
app.use("/", userAuthRoutes);
app.use("/", adminAuthRoutes);
app.use("/", eventRoutes);
app.use("/", historyRoutes);
app.use("/", signUpRoutes);
app.use("/", profileRoutes);
app.use("/", reportRoutes);

module.exports = app;
