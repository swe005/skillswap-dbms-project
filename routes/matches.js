const express = require('express');
const router = express.Router();
const connection = require('../db');

// Add a new match request
router.post('/add', (req, res) => {
    const { user1_id, user2_id, status } = req.body;
    const sql = 'INSERT INTO Matches (user1_id, user2_id, status) VALUES (?, ?, ?)';
    connection.query(sql, [user1_id, user2_id, status || 'pending'], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Match request added!', id: result.insertId });
    });
});

// Get all matches
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Matches';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Update match status (accept/reject)
router.put('/:id', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Matches SET status = ? WHERE match_id = ?';
    connection.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Match status updated!' });
    });
});

module.exports = router;
