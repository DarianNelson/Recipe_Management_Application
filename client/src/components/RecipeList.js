import React, { useContext } from 'react';
import { RecipeContext } from '../contexts/RecipeContext'; // Importing context to access recipes and search term
import RecipeCard from './RecipeCard'; // Importing recipe card component
import '../styles/RecipeList.css'; // Import custom styling for the recipe list

function RecipeList() {
  const { searchTerm, recipes } = useContext(RecipeContext); // Get search term and recipes from context
  const { error } = useContext(RecipeContext); // Get error message from context

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Match search term with title
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase()) // Match search term with ingredients
  );

  // Show a loading indicator if the recipes array is empty
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
        {/* If no recipes match the search term */}
        {filteredRecipes.length === 0 ? (
          <p className="text-muted">No recipes match your search.</p>
        ) : (
          // If there are recipes, map them to a RecipeCard component
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} /> // Pass each recipe to RecipeCard
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeList;