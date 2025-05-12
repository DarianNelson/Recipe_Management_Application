// Import the SQLite database instance
const db = require('./database');

// Query all recipes from the database
db.all(`SELECT * FROM recipes`, (err, rows) => {
  if (err) {
    // Log any errors during the query
    return console.error('❌ Error fetching recipes:', err.message);
  }

  // Log the list of recipes in a table format for easy reading
  console.log('📋 Current Recipes in DB:');
  console.table(rows);

  // Always close the database connection after use
  db.close();
});