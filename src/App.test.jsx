import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Psychology Tic-Tac-Toe title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Psychology Tic-Tac-Toe/i);
  expect(titleElement).toBeInTheDocument();
});
