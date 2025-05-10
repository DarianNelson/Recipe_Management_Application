import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
  // State variables for form data and error handling
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams(); // Get recipe ID from URL parameters
  const navigate = useNavigate(); // To navigate after successfully editing a recipe

  // Fetch the recipe data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title); // Set the initial title value
        setIngredients(data.ingredients); // Set the initial ingredients value
        setInstructions(data.instructions); // Set the initial instructions value
        setImageUrl(data.image_url); // Set the initial image URL value
      })
      .catch((err) => console.error(err)); // Log any errors during the fetch
  }, [id]); // Re-run the effect if the recipe ID changes

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

    // Create the updated recipe object to be sent to the server
    const updatedRecipe = {
      title,
      ingredients,
      instructions,
      image_url: imageUrl,
    };

    // Send PUT request to update the recipe
    fetch(`http://localhost:5001/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe), // Send the updated recipe as JSON
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update recipe'); // Handle errors from the server
        return res.json(); // Parse the response as JSON
      })
      .then(() => navigate(`/recipes/${id}`)) // Navigate to the recipe detail page after successful submission
      .catch((err) => {
        console.error(err); // Log any errors
        setError('Failed to update recipe.'); // Set an error message if the request fails
      });
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded-4 p-4">
        <h2 className="mb-4 text-center">Edit Recipe</h2>

        {/* Display error message if validation fails */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form to edit an existing recipe */}
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="mb-3">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state on change
              required
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;