import { Routes, Route } from 'react-router-dom'; // Import routing components for navigation
import RecipeList from './components/RecipeList'; 
import RecipeDetail from './components/RecipeDetail';
import RecipeEdit from './components/RecipeEdit'; 
import AddRecipe from './components/AddRecipe'; 
import Navbar from './components/Navbar'; 
import NotFound from './components/NotFound';
import { RecipeProvider } from './contexts/RecipeContext'; // Context provider to manage recipes globally
import './styles/App.css';

function App() {
  return (
    // Wrap the app in RecipeProvider to allow access to recipe context throughout the app
    <RecipeProvider>
      <div className="App">
        
        {/* Navbar component is rendered at the top of the page */}
        <Navbar />
        
        {/* Main content area with top padding to account for sticky navbar */}
        <div className="container" style={{ paddingTop: '80px' }}>
          
          {/* Define routes for different pages */}
          <Routes>
            {/* Default route: Displays the list of recipes */}
            <Route path="/" element={<RecipeList />} />
            
            {/* Route for displaying the details of a specific recipe */}
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            
            {/* Route for editing an existing recipe */}
            <Route path="/edit/:id" element={<RecipeEdit />} />
            
            {/* Route for adding a new recipe */}
            <Route path="/add" element={<AddRecipe />} />
            
            {/* Fallback route for handling undefined paths (404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
        {/* Footer with copyright information */}
        <footer className="footer text-center py-4 mt-auto">
          <small className="text-muted">&copy; {new Date().getFullYear()} Darian Nelson</small>
        </footer>
      </div>
    </RecipeProvider>
  );
}

export default App;