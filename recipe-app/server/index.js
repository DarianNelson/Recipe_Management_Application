const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
const db = require('./db/database');

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

app.get('/recipes/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else if (!row) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(row);
    }
  });
});