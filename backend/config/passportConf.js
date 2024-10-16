const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/authModel');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        const user = users.find(user => user.email === email);
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
});

module.exports = passport;