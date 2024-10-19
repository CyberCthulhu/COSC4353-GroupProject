const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/protected', authMiddleware.verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;