const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token' });
    }
    jwt.verify(token.split(' ')[1], 'jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Invalid token' });
        }
        req.userId = decoded.id;
        next();
    });
};

const ensureAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token.split(' ')[1], 'jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token" });
        }
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyToken,
    ensureAdmin
};