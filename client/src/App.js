import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/RecipeEdit';
import AddRecipe from './components/AddRecipe';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import { RecipeProvider } from './contexts/RecipeContext';
import './App.css';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container" style={{ paddingTop: '80px' }}>
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/edit/:id" element={<EditRecipe />} /> 
              <Route path="/add" element={<AddRecipe />} />
              <Route path="*" element={<NotFound />} /> {/* Error 404 route */}
            </Routes>
          </div>
          <footer className="footer text-center py-4 mt-auto">
            <small className="text-muted">&copy; {new Date().getFullYear()} Darian Nelson</small>
          </footer>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;