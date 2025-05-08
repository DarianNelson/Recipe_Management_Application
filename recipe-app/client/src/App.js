// Import necessary modules from React Router
import { Routes, Route } from 'react-router-dom';

// Import components for different routes
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AddRecipe from './components/AddRecipe';
import RecipeEdit from './components/RecipeEdit';

function App() {
  return (
    <div className="App">
      {/* Define application routes */}
      <Routes>
        {/* Home page displays list of recipes */}
        <Route path="/" element={<RecipeList />} />

        {/* Detail view for a single recipe */}
        <Route path="/recipes/:id" element={<RecipeDetail />} />

        {/* Form to add a new recipe */}
        <Route path="/add" element={<AddRecipe />} />

        {/* Form to edit an existing recipe */}
        <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
      </Routes>
    </div>
  );
}

// Export the main App component
export default App;