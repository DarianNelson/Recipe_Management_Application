// models/recipeModel.js
const db = require('../db/database');

// Fetch all recipes
function getAllRecipes(callback) {
  db.all('SELECT * FROM recipes', callback);
}

// Get a single recipe by ID
function getRecipeById(id, callback) {
  db.get('SELECT * FROM recipes WHERE id = ?', [id], callback);
}

// Add a new recipe
function addRecipe({ title, ingredients, instructions, image_path }, callback) {
  const query = `
    INSERT INTO recipes (title, ingredients, instructions, image_path)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [title, ingredients, instructions, image_path], callback);
}

// Update an existing recipe
function updateRecipe(id, { title, ingredients, instructions, image_path }, callback) {
  const query = `
    UPDATE recipes
    SET title = ?, ingredients = ?, instructions = ?, image_path = ?
    WHERE id = ?
  `;
  db.run(query, [title, ingredients, instructions, image_path, id], callback);
}

// Delete a recipe
function deleteRecipe(id, callback) {
  db.run('DELETE FROM recipes WHERE id = ?', [id], callback);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};