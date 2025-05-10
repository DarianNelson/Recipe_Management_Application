import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  // State variables for form data and error handling
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // To navigate after successfully adding a recipe

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear any previous error messages
    setError('');

    // Validation check for required fields (title, ingredients, instructions)
    if (!title || !ingredients || !instructions) {
      setError('Please fill in all required fields.');
      return; // Stop function execution if validation fails
    }

    // Create the new recipe object to be sent to the server
    const newRecipe = {
      title,
      ingredients,
      instructions,
      image_url: imageUrl,
    };

    // Send POST request to add the recipe
    fetch('http://localhost:5001/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe), // Send the new recipe as JSON
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add recipe'); // Handle errors from the server
        return res.json(); // Parse the response as JSON
      })
      .then(() => navigate('/')) // Navigate back to the homepage after successful submission
      .catch((err) => {
        console.error(err); // Log any errors
        setError('Failed to add recipe.'); // Set an error message if the request fails
      });
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
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)} // Update imageUrl state on change
              placeholder="Optional - Link to recipe image"
            />
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