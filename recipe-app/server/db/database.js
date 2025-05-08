// Import sqlite3 and enable verbose mode for helpful debugging
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the SQLite database file located in the same directory
const db = new sqlite3.Database(path.resolve(__dirname, 'recipes.db'));

// Ensure the "recipes" table exists, or create it if it doesn't
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,      -- Unique ID for each recipe
      title TEXT NOT NULL,                       -- Recipe title
      ingredients TEXT NOT NULL,                 -- Comma-separated list of ingredients
      instructions TEXT NOT NULL,                -- Cooking instructions
      image_url TEXT                             -- Optional image URL
    )
  `);
});

// Export the database connection so it can be used in other files
module.exports = db;