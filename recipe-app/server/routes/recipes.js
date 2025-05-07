const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all recipes
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM recipes';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    }
    res.json(rows);
  });
});

module.exports = router;