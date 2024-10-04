const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@mail.com",
    password: "password123",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@mail.com",
    password: "password456",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@mail.com",
    password: "password789",
  },
];

const userEventParticipation = {
  1: [1, 2, 3, 4], 
  2: [3],           
  3: [4],           
};

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
  {
    id: 4,
    title: "Animal Shelter Volunteering",
    date: "October 5, 2024",
    location: "Local Animal Shelter",
    description:
      "Spend time with animals and help take care of them at the local animal shelter.",
  },
];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log("User Data:", name, email, password);
  res.json({ message: "User registered successfully!" });
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.get("/history/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!userEventParticipation[userId]) {
    return res.status(404).json({ message: "User not found or no event participation" });
  }

  const eventIds = userEventParticipation[userId];

  const userParticipatedEvents = events.filter((event) => eventIds.includes(event.id));

  res.json(userParticipatedEvents);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
