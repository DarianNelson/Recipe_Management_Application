import React, { createContext, useState, useEffect } from 'react';

// Create a context to share the recipe data and functions
export const RecipeContext = createContext();

// RecipeProvider component to manage state and provide it to the app
export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]); // Store the list of recipes
  const [searchTerm, setSearchTerm] = useState(''); // Store the search term for filtering recipes
  const [error, setError] = useState(null);  // Add global error state

  // Fetch recipes on initial load
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:5001/recipes');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipes(data); // Update recipes state with fetched data
      } catch (err) {
        setError(err.message);  // Handle error globally
      }
    };

    fetchRecipes();
  }, []);

  // Fetch a recipe by its ID
  const getRecipeById = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/recipes/${id}`);
      if (!res.ok) throw new Error('Failed to fetch recipe');
      return await res.json(); // Return the fetched recipe data
    } catch (err) {
      setError(err.message);  // Set error globally
      throw err;  // Propagate the error
    }
  };

  // Edit a recipe's details
  const editRecipe = async (id, updatedRecipe) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedRecipe.title);
      formData.append('ingredients', updatedRecipe.ingredients);
      formData.append('instructions', updatedRecipe.instructions);

      if (updatedRecipe.imageFile) {
        formData.append('image', updatedRecipe.imageFile); // Append new image if available
      }

      const res = await fetch(`http://localhost:5001/recipes/${id}`, {
        method: 'PUT',
        body: formData, // Send the updated recipe data
      });

      if (!res.ok) throw new Error('Failed to update recipe');
      const data = await res.json();

      // Update the recipe list with the updated recipe
      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === id ? data.recipe : recipe))
      );

      return data; // Return the updated recipe
    } catch (err) {
      setError(err.message);  // Set error globally
      throw err;  // Propagate the error
    }
  };

  // Delete a recipe by its ID
  const deleteRecipe = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/recipes/${id}`, {
        method: 'DELETE', // Send DELETE request to remove the recipe
      });

      if (!res.ok) throw new Error('Failed to delete recipe');

      // Remove the deleted recipe from the state
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id.toString() !== id.toString())
      );
    } catch (err) {
      setError(err.message);  // Set error globally
      throw err;  // Propagate the error
    }
  };

  return (
    // Provide the context values to the app
    <RecipeContext.Provider
      value={{
        recipes, // List of recipes
        setRecipes, // Function to update the recipes list
        searchTerm, // Current search term
        setSearchTerm, // Function to update the search term
        error,  // Global error state
        setError,  // Setter for error if needed
        editRecipe, // Function to edit a recipe
        deleteRecipe, // Function to delete a recipe
        getRecipeById, // Function to fetch a recipe by ID
      }}
    >
      {children} {/* Render the child components */}
    </RecipeContext.Provider>
  );
}