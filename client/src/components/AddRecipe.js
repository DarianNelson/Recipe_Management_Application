import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  // State variables for form data and error handling
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageFile, setImageFile] = useState(null); // For file upload
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // To navigate after successfully adding a recipe

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  // Simple validation
  if (!title || !ingredients || !instructions) {
    setError('Please fill in all required fields.');
    return;
  }

  // Optional: client-side image type/size check
  if (imageFile) {
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(imageFile.type)) {
      setError('Only JPG or PNG images are allowed.');
      return;
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('title', title);
  formData.append('ingredients', ingredients);
  formData.append('instructions', instructions);
  if (imageFile) {
    formData.append('image', imageFile); // Matches backend multer field name
  }

  try {
    const res = await fetch('http://localhost:5001/recipes', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Failed to add recipe');
    await res.json();
    navigate('/');
  } catch (err) {
    console.error(err);
    setError('Failed to add recipe.');
  }
};

  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded-4 p-4">
        <h2 className="mb-4 text-center">Add New Recipe</h2>

        {/* Display error message if validation fails */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form to add a new recipe */}
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="mb-3">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state on change
              required // Ensure this field is not empty
              placeholder="e.g. Spaghetti Bolognese"
            />
          </div>

          {/* Ingredients input field */}
          <div className="mb-3">
            <label className="form-label">Ingredients *</label>
            <textarea
              className="form-control"
              rows="4"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)} // Update ingredients state on change
              required
              placeholder="Separate ingredients with commas"
            />
          </div>

          {/* Instructions input field */}
          <div className="mb-3">
            <label className="form-label">Instructions *</label>
            <textarea
              className="form-control"
              rows="5"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)} // Update instructions state on change
              required
              placeholder="Step-by-step instructions"
            />
          </div>

          {/* Image URL input field */}
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          {/* Cancel / Back button */}
          <div className="d-flex justify-content-start mb-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div> 
          {/* Submit button */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;