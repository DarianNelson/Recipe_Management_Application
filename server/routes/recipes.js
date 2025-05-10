const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Database file

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

// GET a single recipe by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM recipes WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Error fetching recipe:', err);
      return res.status(500).json({ error: 'Failed to fetch recipe' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(row);
  });
});

// POST a new recipe with optional image upload
router.post('/', (req, res) => {
  const { title, ingredients, instructions } = req.body;
  // multer will have stored the file info in req.file
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // basic validation
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql    = `INSERT INTO recipes
                  (title, ingredients, instructions, image_url)
                  VALUES (?, ?, ?, ?)`;
  const params = [title, ingredients, instructions, imageUrl];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error inserting recipe:', err);
      return res.status(500).json({ error: 'Failed to add recipe' });
    }
    res.status(201).json({
      message: 'Recipe added successfully',
      recipe: {
        id: this.lastID,
        title,
        ingredients,
        instructions,
        image_url: imageUrl
      }
    });
  });
});

// PUT update a recipe by ID
router.put('/:id', (req, res) => {
  const { title, ingredients, instructions, image_url } = req.body;
  const { id } = req.params;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `UPDATE recipes 
               SET title = ?, ingredients = ?, instructions = ?, image_url = ? 
               WHERE id = ?`;

  const params = [title, ingredients, instructions, image_url || null, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error updating recipe:', err);
      return res.status(500).json({ error: 'Failed to update recipe' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.status(200).json({
      message: 'Recipe updated successfully',
      recipe: {
        id,
        title,
        ingredients,
        instructions,
        image_url: image_url || null,
      },
    });
  });
});

// DELETE a recipe by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`DELETE request received for ID: ${id}`); // 🔍 Add this

  const sql = `DELETE FROM recipes WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Error deleting recipe:', err);
      return res.status(500).json({ error: 'Failed to delete recipe' });
    }

    if (this.changes === 0) {
      console.warn(`No recipe found with ID: ${id}`); // 🔍 Log this too
      return res.status(404).json({ error: 'Recipe not found' });
    }

    console.log(`Recipe ID ${id} deleted successfully.`);
    res.status(200).json({ message: 'Recipe deleted successfully' });
  });
});

module.exports = router;