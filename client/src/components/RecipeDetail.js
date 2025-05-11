import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../contexts/RecipeContext';

function RecipeDetail() {
  const { id } = useParams();
  const { getRecipeById, deleteRecipe } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Used for navigation

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, getRecipeById]);

  // Edit button handler: Navigate to the edit page
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // Delete button handler: Delete recipe and navigate back to the recipe list
  const handleDelete = async () => {
    try {
      await deleteRecipe(id); // Call the delete function from context
      navigate('/'); // Navigate back to the recipe list
    } catch (err) {
      setError('Failed to delete the recipe');
    }
  };

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

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>{recipe.title}</h2>
      <img src={recipe.image_url} alt={recipe.title} className="img-fluid" />
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