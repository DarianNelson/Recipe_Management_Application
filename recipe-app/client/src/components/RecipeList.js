// Import React, useState and useEffect hooks, and Link from React Router
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  // State to store the list of recipes
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes when the component mounts
  useEffect(() => {
    fetch('http://localhost:5001/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  return (
    <div>
      {/* Page heading */}
      <h1 className="mb-4">Recipes</h1>

      {/* Navigation button to add a new recipe */}
      <div className="mb-4">
        <Link to="/add" className="btn btn-primary">
          Add New Recipe
        </Link>
      </div>

      {/* Render recipe cards using Bootstrap grid */}
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            {/* Link to the recipe detail view */}
            <Link to={`/recipes/${recipe.id}`} className="text-decoration-none text-dark">
              <div className="card h-100">
                {/* Recipe image or fallback placeholder */}
                <img
                  src={recipe.image_url || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={recipe.title}
                />
                <div className="card-body">
                  {/* Recipe title */}
                  <h5 className="card-title">{recipe.title}</h5>
                  {/* Preview of ingredients (truncate if too long) */}
                  <p className="card-text">
                    {recipe.ingredients.length > 100
                      ? `${recipe.ingredients.substring(0, 100)}...`
                      : recipe.ingredients}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;