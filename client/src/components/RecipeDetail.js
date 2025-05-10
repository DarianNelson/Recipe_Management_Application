import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5001/recipes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch recipe details');
        const data = await res.json();
        setRecipe(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Show loading indicator while fetching
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

  // Show error message if fetching fails
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
    </div>
  );
}

export default RecipeDetail;