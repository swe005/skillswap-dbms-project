const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/users');
const skillRoutes = require('./routes/skills');
const matchRoutes = require('./routes/matches');
const feedbackRoutes = require('./routes/feedback');

// Use routes
app.use('/users', userRoutes);
app.use('/skills', skillRoutes);
app.use('/matches', matchRoutes);
app.use('/feedback', feedbackRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('SkillSwap API is running!');
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
