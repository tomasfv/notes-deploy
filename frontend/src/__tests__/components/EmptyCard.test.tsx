import { render, screen, fireEvent } from '@testing-library/react';
import EmptyCard from '../../components/EmptyCard';

describe('EmptyCard', () => {
  it('renders the "New Note" text', () => {
    render(<EmptyCard onClick={() => {}} />);
    expect(screen.getByText('New Note')).toBeInTheDocument();
  });

  it('renders the SVG icon', () => {
    const { container } = render(<EmptyCard onClick={() => {}} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<EmptyCard onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('New Note'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
