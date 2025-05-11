import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);  // Add global error state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:5001/recipes');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);  // Handle error globally
      }
    };

    fetchRecipes();
  }, []);

  const getRecipeById = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/recipes/${id}`);
      if (!res.ok) throw new Error('Failed to fetch recipe');
      return await res.json();
    } catch (err) {
      setError(err.message);  // Set error globally
      throw err;
    }
  };

  const editRecipe = async (id, updatedRecipe) => {
    try {
      const res = await fetch(`http://localhost:5001/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!res.ok) throw new Error('Failed to update recipe');
      const data = await res.json();

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) => (recipe.id === id ? data : recipe))
      );

      return data;
    } catch (err) {
      setError(err.message);  // Set error globally
      throw err;
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete recipe');

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id.toString() !== id.toString())
      );
    } catch (err) {
      setError(err.message);  // Set error globally
      throw err;
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        searchTerm,
        setSearchTerm,
        error,  // Provide the error state
        setError,  // Provide setter if needed
        editRecipe,
        deleteRecipe,
        getRecipeById,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}