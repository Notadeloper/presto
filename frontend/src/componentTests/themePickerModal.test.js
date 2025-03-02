import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemePickerModal } from '../components/ThemePickerModal';

describe('ThemePickerModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<ThemePickerModal onSubmit={mockOnSubmit} onClose={mockOnClose} />);
  });

  it('renders modal with default colors', () => {
    expect(screen.getByText('Choose Background Colors')).toBeInTheDocument();
    expect(screen.getAllByText('Choose current slide background:')).toHaveLength(1);
  });

  it('allows color selection and submits the selected colors', () => {
    const saturationPointer = screen.getAllByRole('slider')[0];
    userEvent.click(saturationPointer);

    fireEvent.change(saturationPointer, { target: { style: { top: '50%', left: '50%' } } });

    const saveButton = screen.getByText('Save Changes');
    userEvent.click(saveButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('closes the modal on cancel', () => {
    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});