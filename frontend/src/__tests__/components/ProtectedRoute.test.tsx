import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import { authService } from '../../services/authService';

jest.mock('../../services/authService', () => ({
  authService: {
    getToken: jest.fn(),
    getMe: jest.fn(),
    logout: jest.fn(),
  },
}));

const renderWithRouter = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Protected Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to /login when there is no token', async () => {
    (authService.getToken as jest.Mock).mockReturnValue(null);

    renderWithRouter('/');

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('redirects to /login when getMe fails', async () => {
    (authService.getToken as jest.Mock).mockReturnValue('invalid-token');
    (authService.getMe as jest.Mock).mockRejectedValue(new Error('Unauthorized'));

    renderWithRouter('/');

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('renders children when token is valid', async () => {
    (authService.getToken as jest.Mock).mockReturnValue('valid-token');
    (authService.getMe as jest.Mock).mockResolvedValue({ id: '1', username: 'admin' });

    renderWithRouter('/');

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
});
