import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../contexts/RecipeContext';

function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, editRecipe } = useContext(RecipeContext);

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image_url: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setFormData(data);
      } catch (err) {
        setError('Failed to load recipe for editing.');
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id, getRecipeById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.ingredients || !formData.instructions) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await editRecipe(id, formData);
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to update recipe');
    }
  };

  return (
    <div className="container py-4">
      <h2>Edit Recipe</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ingredients *</label>
          <textarea
            className="form-control"
            name="ingredients"
            rows="3"
            value={formData.ingredients}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Instructions *</label>
          <textarea
            className="form-control"
            name="instructions"
            rows="5"
            value={formData.instructions}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default RecipeEdit;