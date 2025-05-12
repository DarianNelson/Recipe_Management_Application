import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../contexts/RecipeContext';
import '../styles/RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const { getRecipeById, deleteRecipe } = useContext(RecipeContext); // Access recipe functions from context
  const [recipe, setRecipe] = useState(null); // Store the current recipe
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Used for navigation

  // Fetch the recipe when the component mounts or the ID changes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id); // Get recipe details
        setRecipe(data); // Save to state
        setIsLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Handle error
        setIsLoading(false); // Stop loading even on error
      }
    };

    fetchRecipe();
  }, [id, getRecipeById]);

  // Navigate to the edit page
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // Delete the recipe and return to the homepage
  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete the recipe');
    }
  };

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  // Show error message if something goes wrong
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  // Render recipe details
  return (
    <div className="container py-4">
      <h2>{recipe.title}</h2>
      <div className="recipe-image">
        <img src={`http://localhost:5001${recipe.image_url}`} alt={recipe.title} />
      </div>
      <h4>Ingredients:</h4>
      <p>{recipe.ingredients}</p>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>

      <div className="d-flex mt-4">
        <button onClick={handleEdit} className="btn btn-warning mr-2">
          Edit Recipe
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;