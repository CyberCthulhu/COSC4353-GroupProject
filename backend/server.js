const app = require("./app");
const cron = require("node-cron"); // Make sure to install this package
const { notifyVolunteers } = require("./services/notificationService"); // Adjust the path as necessary
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});



cron.schedule('* * * * *', () => {
  console.log('Running cron job to notify volunteers...');
  notifyVolunteers(); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
