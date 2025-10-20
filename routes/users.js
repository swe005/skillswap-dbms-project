const express = require('express');
const router = express.Router();
const connection = require('../db'); // your db.js

// GET all users
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Users', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// POST add new user
router.post('/add', (req, res) => {
    const { name, email, password_hash, bio, city } = req.body;
    const sql = 'INSERT INTO Users (name, email, password_hash, bio, city) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, password_hash, bio, city], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User added!', id: result.insertId });
    });
});

module.exports = router;
