import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  return (
    <div>
      <h1 className="mb-4">Recipes</h1>
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`} className="text-decoration-none text-dark">
              <div className="card h-100">
                <img
                  src={recipe.image_url || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={recipe.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    {recipe.ingredients.length > 100
                      ? recipe.ingredients.substring(0, 100) + '...'
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