const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Importing routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const historyRoutes = require("./routes/historyRoutes");
const signUpRoutes = require("./routes/signUpRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Using routes with an API prefix for organization
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/sign-up", signUpRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/profiles", profileRoutes);

// Catch-all error handler for routes that do not exist
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
