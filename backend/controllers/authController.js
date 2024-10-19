const passport = require("passport");
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

exports.authenticateUser = (req, res, next) => {
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
            console.log(`User ${user.email} has logged in.`)
            const token = jwt.sign({ id: user.id, email: user.email }, 'jwt_secret', { expiresIn: '1h' })
            return res.json({
                message: "You are authenticated", token, redirect: "/dashboard",
                welcome_message: `Welcome back, ${user.name}`
            });
        });
    })(req, res, next);
};