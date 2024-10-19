const passport = require("passport");
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

const authenticateUser = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log(`User ${user.email} has logged in.`);
            const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, 'jwt_secret', { expiresIn: '1h' });
            return res.json({
                message: "You are authenticated",
                token,
                redirect: "/",
            });
        });
    })(req, res, next);
};

const authenticateAdmin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        if (!user.isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log(`Admin ${user.email} has logged in.`);
            const token = jwt.sign({ id: user.id, email: user.email, role: 'admin' }, 'jwt_secret', { expiresIn: '1h' });
            return res.json({
                message: "You are authenticated",
                token,
                redirect: "/",
                welcome_message: `Welcome back, Admin ${user.name}`
            });
        });
    })(req, res, next);
};

module.exports = {
    authenticateUser,
    authenticateAdmin
};