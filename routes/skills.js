const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new skill
router.post('/add', (req, res) => {
  const { skill_name } = req.body;
  const query = 'INSERT INTO Skills (skill_name) VALUES (?)';
  db.query(query, [skill_name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Skill added!', id: result.insertId });
  });
});

// Get all skills
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Skills';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
