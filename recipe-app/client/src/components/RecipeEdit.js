import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch recipe');
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setImageUrl(data.image_url || '');
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load recipe.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingredients || !instructions) {
      setError('Please fill in all required fields.');
      return;
    }

    const updatedRecipe = {
      title,
      ingredients,
      instructions,
      image_url: imageUrl,
    };

    fetch(`http://localhost:5001/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update recipe');
        return res.json();
      })
      .then(() => navigate(`/recipes/${id}`))
      .catch((err) => {
        console.error(err);
        setError('Failed to update recipe.');
      });
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded-4 p-4">
        <h2 className="mb-4 text-center">Edit Recipe</h2>

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
              placeholder="e.g. Chicken Alfredo"
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
              placeholder="Describe the cooking steps"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Optional image link"
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;