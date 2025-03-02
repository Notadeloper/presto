import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorModal } from '../components/ErrorModal';

describe('ErrorModal', () => {
  it('renders the modal open with the error text', () => {
    const errorText = "Test Error Message";
    render(<ErrorModal onClose={() => {}} errorText={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close error/i })).toBeInTheDocument();
  });

  it('closes the modal on button click', () => {
    const handleClose = jest.fn();
    render(<ErrorModal onClose={handleClose} errorText="Test Error Message" />);
    fireEvent.click(screen.getByRole('button', { name: /close error/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});