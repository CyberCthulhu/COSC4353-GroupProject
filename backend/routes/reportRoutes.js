const express = require('express');
const router = express.Router();
const { generateUsersEventsReport } = require('../controllers/reportController');

router.get('/users-events-report', generateUsersEventsReport);

module.exports = router;