const express = require('express');
const router = express.Router();
const connection = require('../db');

// Add feedback for a match
router.post('/add', (req, res) => {
    const { match_id, rating, comment } = req.body;
    const sql = 'INSERT INTO Feedback (match_id, rating, comment) VALUES (?, ?, ?)';
    connection.query(sql, [match_id, rating, comment], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        // Update avg_rating for user1 and user2
        const updateAvg = `
          UPDATE Users u
          JOIN Matches m ON (u.user_id = m.user1_id OR u.user_id = m.user2_id)
          JOIN Feedback f ON f.match_id = m.match_id
          SET u.avg_rating = (
              SELECT AVG(rating) FROM Feedback 
              JOIN Matches ON Feedback.match_id = Matches.match_id
              WHERE user1_id = u.user_id OR user2_id = u.user_id
          )
          WHERE m.match_id = ?;
        `;
        connection.query(updateAvg, [match_id], (err2) => {
            if (err2) console.log('Avg rating update error:', err2);
            res.json({ message: 'Feedback added!', id: result.insertId });
        });
    });
});

// Get all feedback
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Feedback';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

module.exports = router;
