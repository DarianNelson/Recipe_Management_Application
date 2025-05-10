import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditRecipe from '../components/RecipeEdit';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

// Mocking useParams from react-router-dom to simulate the route parameter
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Wrap EditRecipe component with Router for routing functionalities
const setup = (recipeId) => {
  useParams.mockReturnValue({ id: recipeId });

  return render(
    <Router>
      <Routes>
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
};

describe('EditRecipe', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test('renders the form with the existing recipe data', async () => {
    setup(1);

    // Mocking the fetch request to get recipe data
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        title: 'Spaghetti Bolognese',
        ingredients: 'Spaghetti, Beef, Tomato Sauce',
        instructions: 'Boil pasta, cook beef, mix with sauce',
        image_url: 'http://example.com/spaghetti.jpg',
      }),
    });

    // Wait for the form fields to be populated
    await waitFor(() => screen.getByLabelText(/title \*/i));

    // Check if fields are pre-filled with recipe data
    expect(screen.getByDisplayValue('Spaghetti Bolognese')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Spaghetti, Beef, Tomato Sauce')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Boil pasta, cook beef, mix with sauce')).toBeInTheDocument();
    expect(screen.getByDisplayValue('http://example.com/spaghetti.jpg')).toBeInTheDocument();
  });

  test('shows validation error when required fields are not filled', async () => {
    setup(1);

    // Mocking the fetch request to get recipe data
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        title: 'Spaghetti Bolognese',
        ingredients: 'Spaghetti, Beef, Tomato Sauce',
        instructions: 'Boil pasta, cook beef, mix with sauce',
        image_url: 'http://example.com/spaghetti.jpg',
      }),
    });

    // Wait for the form fields to be populated
    await waitFor(() => screen.getByLabelText(/title \*/i));

    const submitButton = screen.getByRole('button', { name: /save changes/i });

    userEvent.click(submitButton);

    // Check if validation error is displayed
    await waitFor(() => expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument());
  });

  test('submits the form successfully with valid input', async () => {
    setup(1);

    // Mocking the fetch request to get recipe data
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        title: 'Spaghetti Bolognese',
        ingredients: 'Spaghetti, Beef, Tomato Sauce',
        instructions: 'Boil pasta, cook beef, mix with sauce',
        image_url: 'http://example.com/spaghetti.jpg',
      }),
    });

    // Wait for the form fields to be populated
    await waitFor(() => screen.getByLabelText(/title \*/i));

    // Fill in the form fields
    userEvent.clear(screen.getByLabelText(/title \*/i));
    userEvent.type(screen.getByLabelText(/title \*/i), 'Spaghetti Carbonara');

    // Simulate other input changes
    userEvent.clear(screen.getByLabelText(/ingredients \*/i));
    userEvent.type(screen.getByLabelText(/ingredients \*/i), 'Spaghetti, Bacon, Egg, Parmesan');

    userEvent.clear(screen.getByLabelText(/instructions \*/i));
    userEvent.type(screen.getByLabelText(/instructions \*/i), 'Boil pasta, cook bacon, mix with egg and cheese');

    const submitButton = screen.getByRole('button', { name: /save changes/i });

    // Mock the fetch request for submission
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(),
    });

    userEvent.click(submitButton);

    // Check if the fetch was called
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});