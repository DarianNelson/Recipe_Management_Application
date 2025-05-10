import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/RecipeEdit';
import AddRecipe from './components/AddRecipe';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
      <div className="App">
        <Navbar onSearch={handleSearch} />
        <div className="container" style={{ paddingTop: '80px' }}></div>
        <Outlet />
        <Routes>
          <Route path="/" element={<RecipeList searchQuery={searchQuery} />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/edit/:id" element={<EditRecipe />} /> 
          <Route path="/add" element={<AddRecipe />} />
        </Routes>
        <footer className="footer text-center py-4 mt-auto">
        <small className="text-muted">&copy; {new Date().getFullYear()} Recipe Journal</small>
      </footer>
      </div>
  );
}

export default App;