// Import required packages
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Test route to check if server works
app.get('/', (req, res) => {
    res.send('SkillSwap API is running!');
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
