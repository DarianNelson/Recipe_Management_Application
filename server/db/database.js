// Import the sqlite3 module and enable verbose mode for detailed logging
const sqlite3 = require('sqlite3').verbose();

// Import the 'path' module to resolve file paths
const path = require('path');

// Create a new SQLite database instance, resolving the path to 'recipes.db'
// The database file will be created in the current directory if it doesn't exist
const db = new sqlite3.Database(path.resolve(__dirname, 'recipes.db'));

// Ensure the table is created if it doesn't already exist
db.serialize(() => {
  // Run a SQL query to create the 'recipes' table with the following columns:
  // id: a unique identifier that auto-increments for each new recipe
  // title: the name of the recipe (cannot be null)
  // ingredients: a string listing all ingredients (cannot be null)
  // instructions: a string containing the recipe instructions (cannot be null)
  // image_path: an optional path to an image of the recipe
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      image_path TEXT -- Changed from image_url to image_path for storing file names/paths
    )
  `);
});

// Export the database connection so it can be used in other parts of the application
module.exports = db;