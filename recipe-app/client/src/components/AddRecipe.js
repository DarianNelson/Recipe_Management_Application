import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingredients || !instructions) {
      setError('Please fill in all required fields.');
      return;
    }

    const newRecipe = {
      title,
      ingredients,
      instructions,
      image_url: imageUrl,
    };

    fetch('http://localhost:5001/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add recipe');
        return res.json();
      })
      .then(() => navigate('/'))
      .catch((err) => {
        console.error(err);
        setError('Failed to add recipe.');
      });
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded-4 p-4">
        <h2 className="mb-4 text-center">Add New Recipe</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Spaghetti Bolognese"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredients *</label>
            <textarea
              className="form-control"
              rows="4"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              placeholder="Separate ingredients with commas"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Instructions *</label>
            <textarea
              className="form-control"
              rows="5"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              placeholder="Step-by-step instructions"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Optional - Link to recipe image"
            />
          </div>

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