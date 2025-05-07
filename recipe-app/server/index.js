const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const recipesRouter = require('./routes/recipes');
app.use('/recipes', recipesRouter);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});