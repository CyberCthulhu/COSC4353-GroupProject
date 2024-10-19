const app = require("./app");
const cron = require("node-cron"); 
const { notifyVolunteers } = require("./services/notificationService"); 
const { updateParticipation } = require("./services/updateParticipationService");
const PORT = 4000;

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
