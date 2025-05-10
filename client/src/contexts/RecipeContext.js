// src/contexts/RecipeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const RecipeContext = createContext();

// Create the provider component
export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch recipes once on load
  useEffect(() => {
    fetch('http://localhost:5001/recipes')
      .then((res) => res.json())
      .then(setRecipes)
      .catch((err) => console.error('Failed to fetch recipes:', err));
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, searchTerm, setSearchTerm }}>
      {children}
    </RecipeContext.Provider>
  );
}