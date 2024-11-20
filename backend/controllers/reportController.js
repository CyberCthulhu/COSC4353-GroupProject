const User = require('../models/userAuthModel');
const History = require('../models/historyModel');
const Profile = require('../models/profilesModel');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.generateUsersEventsReport = async (req, res) => {
  try {
    const users = await User.find();
    const histories = await History.find().populate('eventIds');
    const profiles = await Profile.find();

    const data = users.map(user => {
      const userHistory = histories.find(history => history.userId.toString() === user._id.toString());
      const profile = profiles.find(profile => profile.userId === user._id.toString());
      const events = userHistory ? userHistory.eventIds.map(event => event.title).join(', ') : '';
      return {
        fullName: profile ? profile.fullName : 'N/A',
        events,
      };
    });

    const csvWriter = createCsvWriter({
      path: 'users_events_report.csv',
      header: [
        { id: 'fullName', title: 'Full Name' },
        { id: 'events', title: 'Events' },
      ],
    });

    await csvWriter.writeRecords(data);

    res.download('users_events_report.csv');
  } catch (error) {
    console.error('Error generating CSV report:', error);
    res.status(500).json({ message: 'Error generating CSV report', error });
  }
};