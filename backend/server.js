const app = require("./app");
const cron = require("node-cron"); 
const mongoose = require("mongoose");
const { notifyVolunteers } = require("./services/notificationService"); 
const { updateParticipation } = require("./services/updateParticipationService");
const PORT = 4000;
const dotenv = require("dotenv");

dotenv.config();




mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });



app.get("/", (req, res) => {
  res.send("Backend is running");
});



cron.schedule('* * * * *', () => {
  console.log('Running cron job to notify volunteers...');
  notifyVolunteers(); 
  updateParticipation();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
