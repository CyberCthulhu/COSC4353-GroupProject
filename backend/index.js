const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log("User Data:", name, email, password);
  res.json({ message: "User registered successfully!" });
});

app.get("/events", (req, res) => {
  const events = [
    {
      id: 1,
      title: "Beach Cleanup",
      date: "September 15, 2024",
      location: "Santa Monica Beach",
      description:
        "Help us clean up the beach and make it a cleaner place for everyone.",
    },
    {
      id: 2,
      title: "Food Bank Volunteering",
      date: "September 22, 2024",
      location: "Downtown Community Food Bank",
      description:
        "Assist in distributing food to those in need at the community food bank.",
    },
    {
      id: 3,
      title: "Tree Planting Event",
      date: "October 1, 2024",
      location: "City Park",
      description: "Join us in planting trees to help make our city greener.",
    },
  ];
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
