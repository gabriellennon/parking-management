import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleButton } from '../ToggleButton';

describe('ToggleButton Component', () => {
    const mockClick = jest.fn();

    it('renders the button with correct label', () => {
        render(<ToggleButton label="Entrada" isActive={false} onClick={mockClick} />);
        
        const buttonElement = screen.getByRole('button', { name: /entrada/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it('applies active styles when isActive is true', () => {
        render(<ToggleButton label="Saída" isActive={true} onClick={mockClick} />);
        
        const buttonElement = screen.getByRole('button', { name: /saída/i });
        expect(buttonElement).toHaveClass('bg-white border-b-2 border-blue-550 text-blue-550');
    });

    it('applies inactive styles when isActive is false', () => {
        render(<ToggleButton label="Entrada" isActive={false} onClick={mockClick} />);
        
        const buttonElement = screen.getByRole('button', { name: /entrada/i });
        expect(buttonElement).toHaveClass('bg-gray-94 border-none text-gray-550');
    });

    it('calls onClick function when clicked', () => {
        render(<ToggleButton label="Entrada" isActive={false} onClick={mockClick} />);

        const buttonElement = screen.getByRole('button', { name: /entrada/i });
        fireEvent.click(buttonElement);

        expect(mockClick).toHaveBeenCalledTimes(1);
    });
});
