import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditTitleModal } from '../components/EditTitleModal';

describe('EditTitleModal', () => {
  const presentationId = "pres123";
  const currentTitle = "Current Presentation Title";
  
  it('renders with the current presentation title', () => {
    render(<EditTitleModal presentationId={presentationId} currentPresentationTitle={currentTitle} onSubmit={() => {}} onClose={() => {}} />);

    expect(screen.getByLabelText(/presentation title/i).value).toBe(currentTitle);
  });

  it('calls onSubmit with the new title when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<EditTitleModal presentationId={presentationId} currentPresentationTitle={currentTitle} onSubmit={handleSubmit} onClose={() => {}} />);

    userEvent.type(screen.getByLabelText(/presentation title/i), ' Updated');
    fireEvent.submit(screen.getByRole('form'));

    expect(handleSubmit).toHaveBeenCalledWith(presentationId, `${currentTitle} Updated`);
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<EditTitleModal presentationId={presentationId} currentPresentationTitle={currentTitle} onSubmit={() => {}} onClose={handleClose} />);

    userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('closes the modal on submission', () => {
    const handleClose = jest.fn();
    render(<EditTitleModal presentationId={presentationId} currentPresentationTitle={currentTitle} onSubmit={() => {}} onClose={handleClose} />);

    fireEvent.submit(screen.getByRole('form'));
    expect(handleClose).toHaveBeenCalled();
  });
});