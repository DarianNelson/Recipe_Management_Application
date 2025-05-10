const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const recipeRoutes = require('./routes/recipes');

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    // Prepend timestamp to avoid collisions
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Mount recipe routes, injecting multer middleware for POST /recipes
app.use('/recipes', upload.single('image'), recipeRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));