const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const historyRoutes = require("./routes/historyRoutes");

app.use("/", authRoutes);
app.use("/", eventRoutes);
app.use("/", historyRoutes);

module.exports = app;
