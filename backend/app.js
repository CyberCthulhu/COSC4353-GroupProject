const express = require("express");
const cors = require("cors");
const app = express();
const session = require('express-session');


const passport = require('./config/passportConf');
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const users = require('./models/authModel');
const protectedRoutes = require('./routes/protectedRoutes')

const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.post('/api/auth', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'You are authenticated as ' + user.email, token });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
});



const historyRoutes = require("./routes/historyRoutes");

app.use("/", authRoutes);
app.use("/api", protectedRoutes);
app.use("/", eventRoutes);
app.use("/", historyRoutes);

module.exports = app;