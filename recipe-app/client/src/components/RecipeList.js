import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../contexts/RecipeContext'; 
import '../styles/RecipeList.css'; 

function RecipeList() {
  // Access searchTerm from the context
  const { recipes, searchTerm } = useContext(RecipeContext); 
  // Filter recipes based on the search term (case-insensitive match on title or ingredients)
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

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