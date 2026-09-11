import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';

jest.mock('../../services/authService', () => ({
  authService: {
    login: jest.fn(),
  },
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderLoginPage = () => {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form with username and password inputs', () => {
    renderLoginPage();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows error toast when submitting with empty fields', async () => {
    renderLoginPage();
    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Please fill in all fields');
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('shows "Signing in..." text during loading', async () => {
    (authService.login as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'admin');
    await user.type(screen.getByLabelText(/password/i), 'admin123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  it('calls authService.login with correct credentials', async () => {
    (authService.login as jest.Mock).mockResolvedValue('token123');

    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'admin');
    await user.type(screen.getByLabelText(/password/i), 'admin123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(authService.login).toHaveBeenCalledWith('admin', 'admin123');
  });

  it('shows error toast when login fails', async () => {
    (authService.login as jest.Mock).mockRejectedValue(new Error('Invalid'));

    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'admin');
    await user.type(screen.getByLabelText(/password/i), 'wrong');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid username or password');
    });
  });
});
