const express = require('express');
const router = express.Router();
const upload = require('../helpers/fileUpload');
const path = require('path');
const fs = require('fs');
const Recipe = require('../models/recipeModel');

// RESTful Recipe Routes
// GET /api/recipes — Get all recipes
router.get('/', (req, res) => {
  Recipe.getAllRecipes((err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch recipes' });
    res.json(rows);
  });
});

// GET /api/recipes/:id — Get single recipe by ID
router.get('/:id', (req, res) => {
  Recipe.getRecipeById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch recipe' });
    if (!row) return res.status(404).json({ error: 'Recipe not found' });
    res.json(row);
  });
});
// POST /api/recipes — Add a new recipe with an image
router.post('/', upload.single('image'), (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const image_path = req.file ? `/uploads/${req.file.filename}` : null; // Store relative path in DB

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  Recipe.addRecipe(title, ingredients, instructions, image_path, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add recipe' });

    res.status(201).json({
      message: 'Recipe added successfully',
      recipe: {
        id: result.lastID,
        title,
        ingredients,
        instructions,
        image_path,
      },
    });
  });
});

// PUT /api/recipes/:id — Update an existing recipe
router.put('/:id', upload.single('image'), (req, res) => {

console.log('Body:', req.body);
console.log('File:', req.file);
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  Recipe.getRecipeById(id, (err, row) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch recipe' });

    const oldImagePath = row?.image_path
      ? path.join(__dirname, '..', 'public', row.image_path)
      : null;
    const newImageUrl = req.file ? `/uploads/${req.file.filename}` : row.image_path;

    Recipe.updateRecipe(id, title, ingredients, instructions, newImageUrl, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update recipe' });
      if (result.changes === 0) return res.status(404).json({ error: 'Recipe not found' });

      // Delete old image if a new one was uploaded
      if (req.file && oldImagePath && fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }

      res.status(200).json({
        message: 'Recipe updated successfully',
        recipe: {
          id,
          title,
          ingredients,
          instructions,
          image_path: newImageUrl,
        },
      });
    });
  });
});

// DELETE /api/recipes/:id — Delete a recipe and its image
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Get the recipe first to locate its image
  Recipe.getRecipeById(id, (err, row) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch recipe' });

    const imagePath = row?.image_path
      ? path.join(__dirname, '..', 'public', row.image_path)
      : null;

    // Delete recipe from DB
    Recipe.deleteRecipe(id, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to delete recipe' });
      if (result.changes === 0) return res.status(404).json({ error: 'Recipe not found' });

      // Delete image file from filesystem
      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting image on delete:', err);
        });
      }

      res.status(200).json({ message: 'Recipe deleted successfully' });
    });
  });
});

module.exports = router;