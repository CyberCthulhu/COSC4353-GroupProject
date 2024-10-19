const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../controllers/authController');
const { ensureAdmin } = require('../middleware/authMiddleware');

router.post('/login', authenticateAdmin);
router.get('/dashboard', ensureAdmin, (req, res) => {
});

module.exports = router;