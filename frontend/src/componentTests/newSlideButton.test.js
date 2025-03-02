import { render, screen, fireEvent } from '@testing-library/react';
import { NewSlideButton } from '../components/newSlideButton';

describe('NewSlideButton', () =>  {
    it('renders the button', () => {
        render(<NewSlideButton onClick={() => {}} presentationId="123" />);
        expect(screen.getByRole('button', { name: /new slide/i })).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<NewSlideButton onClick={handleClick} presentationId="123" />);
        const button = screen.getByRole('button', { name: /new slide/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledWith("123");
    });
});