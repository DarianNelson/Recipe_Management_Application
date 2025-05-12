import React from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages
import '../styles/RecipeCard.css'; // Import custom styling for the recipe card

function RecipeCard({ recipe }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm recipe-card">
        {/* Show the recipe image if available */}
        {recipe.image_path && (
          <img
            src={`http://localhost:5001${recipe.image_path}`} // Adjusts the URL to reflect where your images are hosted
            alt={recipe.title}
            className="card-img-top recipe-img"
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text text-muted">{recipe.ingredients}</p>
          {/* Button to navigate to the detailed view of the recipe */}
          <Link
            to={`/recipes/${recipe.id}`}
            className="btn btn-outline-success mt-auto"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;