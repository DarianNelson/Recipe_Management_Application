// src/components/RecipeList.js
import React, { useContext } from 'react';
import { RecipeContext } from '../contexts/RecipeContext';
import { Link } from 'react-router-dom';
import '../styles/RecipeList.css';

function RecipeList() {
  const { searchTerm, recipes } = useContext(RecipeContext);
  const { error } = useContext(RecipeContext);

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show a loading indicator if still loading
  if (recipes.length === 0) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  // Show an error message if there's an error
   if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="recipe-list container mt-4">
      <div className="row">
        {filteredRecipes.length === 0 ? (
          <p className="text-muted">No recipes match your search.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div className="col-md-6 col-lg-4 mb-4" key={recipe.id}>
              <div className="card h-100 shadow-sm recipe-card">
                {/* Optional cover image */}
                {recipe.image_url && (
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="card-img-top recipe-img"
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted">{recipe.ingredients}</p>
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="btn btn-outline-success mt-auto"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeList;