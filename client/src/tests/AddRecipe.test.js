import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddRecipe from '../components/AddRecipe';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

// Mocking the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Wrap AddRecipe component with Router for routing functionalities
const setup = () => {
  return render(
    <Router>
      <AddRecipe />
    </Router>
  );
};

describe('AddRecipe', () => {
  afterEach(() => {
    // Reset all mocks to ensure a clean slate for each test
    jest.clearAllMocks();
  });

  test('renders the form correctly', () => {
    setup();

    // Check if title, ingredients, and instructions fields are rendered
    expect(screen.getByLabelText(/title \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instructions \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
  });

  test('shows validation error when required fields are not filled', async () => {
    setup();

    const submitButton = screen.getByRole('button', { name: /save recipe/i });

    userEvent.click(submitButton);

    // Check if validation error is displayed
    await waitFor(() => expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument());
  });

  test('submits the form successfully with valid input', async () => {
    setup();

    // Fill in the form fields
    userEvent.type(screen.getByLabelText(/title \*/i), 'Spaghetti Bolognese');
    userEvent.type(screen.getByLabelText(/ingredients \*/i), 'Spaghetti, Beef, Tomato Sauce');
    userEvent.type(screen.getByLabelText(/instructions \*/i), 'Boil pasta, cook beef, mix with sauce');

    // Simulate image URL input
    userEvent.type(screen.getByLabelText(/image url/i), 'http://example.com/spaghetti.jpg');

    const submitButton = screen.getByRole('button', { name: /save recipe/i });

    // Mock the fetch request
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(),
    });

    // Mock navigate function to prevent actual navigation
    const navigate = useNavigate();
    navigate.mockImplementation(jest.fn());

    userEvent.click(submitButton);

    // Check if the fetch was called and navigation happened (you can mock this too if necessary)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });
});