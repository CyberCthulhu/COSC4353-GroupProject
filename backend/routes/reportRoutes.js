const express = require('express');
const router = express.Router();
const { generateUsersEventsReportCSV, generateUsersEventsReportPDF } = require('../controllers/reportController');

router.get('/users-events-report/csv', generateUsersEventsReportCSV);
router.get('/users-events-report/pdf', generateUsersEventsReportPDF);

module.exports = router;