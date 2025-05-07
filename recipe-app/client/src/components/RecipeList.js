import React, { useEffect, useState } from 'react';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🍽️ All Recipes</h2>
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card h-100">
              {recipe.image_url && (
                <img
                  src={recipe.image_url}
                  className="card-img-top"
                  alt={recipe.title}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                  <strong>Ingredients:</strong><br />
                  {recipe.ingredients}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;