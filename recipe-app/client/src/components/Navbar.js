import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../contexts/RecipeContext'; 
import '../styles/Navbar.css'; 

function Navbar() {
  // Access setSearchTerm from the context
  const { setSearchTerm } = useContext(RecipeContext);

  // Handle search change and update context
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4 py-3">
      <Link to="/" className="navbar-brand text-muted fs-3">Darian's Recipe Journal</Link>
      <div className="ms-auto d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search Recipes"
          onChange={handleSearchChange} // Trigger context update on search
        />
        <Link to="/add" className="btn btn-outline-success ms-2">Add Recipe</Link>
      </div>
    </nav>
  );
}

export default Navbar;