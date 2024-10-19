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
app.use("/notifications", notificationRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/history", historyRoutes);
app.use("/sign-up", signUpRoutes);
app.use("/volunteers", volunteerRoutes);
app.use("/profiles", profileRoutes);

// Catch-all error handler for routes that do not exist
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
