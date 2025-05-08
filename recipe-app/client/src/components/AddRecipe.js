import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  // State variables for form inputs
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // State for success/error messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!title || !ingredients || !instructions) {
      setError('Please fill out all required fields.');
      return;
    }

    const newRecipe = {
      title,
      ingredients,
      instructions,
      image_url: imageUrl || null,
    };

    // Send POST request to backend
    fetch('http://localhost:5001/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to add recipe.');
        return response.json();
      })
      .then(() => {
        // Clear form and show success message
        setTitle('');
        setIngredients('');
        setInstructions('');
        setImageUrl('');
        setError('');
        setSuccess('Recipe added successfully!');

        // Redirect after delay
        setTimeout(() => {
          setSuccess('');
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error adding recipe:', error);
        setError('An error occurred while adding the recipe. Please try again.');
      });
  };

  return (
    <div className="container">
      <h1>Add a New Recipe</h1>

      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Recipe Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Ingredients textarea */}
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          <textarea
            id="ingredients"
            className="form-control"
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        {/* Instructions textarea */}
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">Instructions</label>
          <textarea
            id="instructions"
            className="form-control"
            rows="4"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

        {/* Optional image URL input */}
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL (Optional)</label>
          <input
            type="text"
            id="imageUrl"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;