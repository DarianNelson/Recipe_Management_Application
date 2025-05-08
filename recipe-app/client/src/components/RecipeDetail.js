import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch recipe: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setRecipe(data))
      .catch(err => {
        console.error(err);
        setError('Failed to load recipe.');
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5001/recipes/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Delete failed: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        return {}; // if no JSON body
      })
      .then(() => navigate('/'))
      .catch(err => {
        console.error('Error deleting recipe:', err);
        setError('Failed to delete recipe.');
      });
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="card">
      <img
        src={recipe.image_url || 'https://via.placeholder.com/150'}
        className="card-img-top"
        alt={recipe.title}
      />
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
        <button onClick={() => navigate(`/recipes/${id}/edit`)} className="btn btn-warning">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default RecipeDetail;