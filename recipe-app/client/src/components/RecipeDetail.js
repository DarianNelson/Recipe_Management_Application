import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(err => console.error('Failed to load recipe:', err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="card">
      <img src={recipe.image_url || 'https://via.placeholder.com/150'} className="card-img-top" alt={recipe.title} />
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        <h5>Ingredients:</h5>
        <ul>
          {recipe.ingredients.split(',').map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
        <h5>Instructions:</h5>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetail;