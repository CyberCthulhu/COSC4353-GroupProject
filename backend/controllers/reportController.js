const User = require('../models/userAuthModel');
const History = require('../models/historyModel');
const Profile = require('../models/profilesModel');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');

exports.generateUsersEventsReportCSV = async (req, res) => {
  try {
    const users = await User.find();
    const histories = await History.find().populate("eventIds");
    const profiles = await Profile.find();

    const data = users.map((user) => {
      const userHistory = histories.find(
        (history) => history.userId.toString() === user._id.toString()
      );
      const profile = profiles.find(
        (profile) => profile.userId === user._id.toString()
      );
      const events = userHistory
        ? userHistory.eventIds.map((event) => event.title).join(", ")
        : "";
      return {
        fullName: profile ? profile.fullName : "N/A",
        events,
      };
    });

    const csvWriter = createCsvWriter({
      path: "users_events_report.csv",
      header: [
        { id: "fullName", title: "Full Name" },
        { id: "events", title: "Events" },
      ],
    });

    await csvWriter.writeRecords(data);

    res.download("users_events_report.csv");
  } catch (error) {
    console.error("Error generating CSV report:", error);
    res.status(500).json({ message: "Error generating CSV report", error });
  }
};

exports.generateUsersEventsReportPDF = async (req, res) => {
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

    console.log('Data to be written to PDF:', data); 

    const doc = new PDFDocument();
    const desktopDir = path.join(os.homedir(), 'Desktop');
    const filePath = path.join(desktopDir, 'users_events_report.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(18).text('Users Events Report', { align: 'center' });
    doc.moveDown();

    data.forEach(item => {
      console.log(`Writing to PDF: Full Name: ${item.fullName}, Events: ${item.events}`);
      doc.fontSize(12).text(`Full Name: ${item.fullName}`);
      doc.fontSize(12).text(`Events: ${item.events}`);
      doc.moveDown();
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(filePath, 'users_events_report.pdf', (err) => {
        if (err) {
          console.error('Error sending PDF report:', err);
          res.status(500).json({ message: 'Error sending PDF report', error: err });
        } else {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting PDF report:', err);
            }
          });
        }
      });
    });
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ message: 'Error generating PDF report', error });
  }
};