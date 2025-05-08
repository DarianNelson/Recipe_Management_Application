const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipes'); // Your routes file

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/recipes', recipeRoutes);

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});