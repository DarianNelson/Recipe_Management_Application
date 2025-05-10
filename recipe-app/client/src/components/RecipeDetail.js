import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch recipe: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load recipe.');
      });
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    fetch(`http://localhost:5001/recipes/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Delete failed: ${res.status}`);
        }
        return res.json().catch(() => ({})); // if no body
      })
      .then(() => navigate('/'))
      .catch((err) => {
        console.error('Error deleting recipe:', err);
        setError('Failed to delete recipe.');
      });
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded-4 overflow-hidden">
        <img
          src={recipe.image_url || 'https://via.placeholder.com/600x300?text=No+Image'}
          className="card-img-top object-fit-cover"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
          alt={recipe.title}
        />
        <div className="card-body">
          <h2 className="card-title mb-3">{recipe.title}</h2>

          <h5 className="text-muted">Ingredients</h5>
          <ul className="list-group mb-3">
            {recipe.ingredients.split(',').map((item, index) => (
              <li key={index} className="list-group-item">
                {item.trim()}
              </li>
            ))}
          </ul>

          <h5 className="text-muted">Instructions</h5>
          <p>{recipe.instructions}</p>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="btn btn-outline-warning"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;