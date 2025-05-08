import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image_url: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5001/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(err => console.error('Failed to fetch recipe:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5001/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    })
      .then(res => res.json())
      .then(() => navigate(`/recipes/${id}`))
      .catch(err => console.error('Failed to update recipe:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={recipe.title} onChange={handleChange} required />
      <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
      <textarea name="instructions" value={recipe.instructions} onChange={handleChange} required />
      <input name="image_url" value={recipe.image_url} onChange={handleChange} />
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
}

export default EditRecipe;