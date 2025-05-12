import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../contexts/RecipeContext';

function RecipeEdit() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const navigate = useNavigate(); // Used to navigate programmatically
  const { getRecipeById } = useContext(RecipeContext); // Fetch the recipe details using context

  // Form state to store recipe fields
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image_path: '',
  });

  const [imageFile, setImageFile] = useState(null); // To hold the new image file (if any)
  const [error, setError] = useState(''); // Error message state

  // Fetch the recipe when component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id); // Get recipe data
        console.log("Image URL:", data.image_url);
        setFormData(data); // Populate form with existing data
      } catch (err) {
        setError('Failed to load recipe for editing.');
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id, getRecipeById]);

  // Handle text input and textarea changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, ingredients, instructions } = formData;

    // Basic validation
    if (!title || !ingredients || !instructions) {
      setError('Please fill in all required fields');
      return;
    }

    // Prepare form data for PUT request
    const dataToSend = new FormData();
    dataToSend.append('title', title);
    dataToSend.append('ingredients', ingredients);
    dataToSend.append('instructions', instructions);
    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      const res = await fetch(`http://localhost:5001/recipes/${id}`, {
        method: 'PUT',
        body: dataToSend, // Automatically handles headers for multipart/form-data
      });

      if (!res.ok) throw new Error('Failed to update recipe');

      navigate(`/recipes/${id}`); // Redirect to the updated recipe's detail page
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update recipe');
    }
  };

  return (
    <div className="container py-4">
      <h2>Edit Recipe</h2>

      {/* Show error message if there is one */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title Field */}
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

        {/* Ingredients Field */}
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

        {/* Instructions Field */}
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

        {/* Image Upload */}
        <div className="form-group">
          <label>Replace Image (optional)</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Display current image if exists */}
          {formData.image_path && (
            <div className="mt-2">
              <p>Current Image:</p>
              <img
                src={`http://localhost:5001/${formData.image_path}`}
                alt="Current recipe"
                style={{ maxWidth: '200px', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        {/* Save Changes Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default RecipeEdit;