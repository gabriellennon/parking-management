import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DialogParking } from '../DialogParking';
import { Dialog } from '@radix-ui/themes';

jest.mock('../Loading', () => ({
    Loading: ({ title }: { title: string }) => <div>{title}</div>,
}));
jest.mock('../../assets/icons/done.svg', () => 'mocked-done.svg');

describe('DialogParking Component', () => {
    const mockHandleSubmit = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the title and plate correctly when not loading and not success', () => {
        render(
            <Dialog.Root open>
                <DialogParking
                    title="Confirmar pagamento?"
                    plate="AAA-1234"
                    titleButtonSubmit="Confirmar"
                    handleSubmit={mockHandleSubmit}
                />
            </Dialog.Root>
        );

        expect(screen.getByText(/Confirmar pagamento\?/i)).toBeInTheDocument();
        expect(screen.getByText(/AAA-1234/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Confirmar/i })).toBeInTheDocument();
    });

    it('calls handleSubmit when the Confirm button is clicked', () => {
        render(
            <Dialog.Root open>
                <DialogParking
                    title="Confirmar pagamento?"
                    plate="AAA-1234"
                    titleButtonSubmit="Confirmar"
                    handleSubmit={mockHandleSubmit}
                />
            </Dialog.Root>
        );

        const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
        fireEvent.click(confirmButton);

        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it('shows the loading state when isLoading is true', () => {
        render(
            <Dialog.Root open>
                <DialogParking
                    title="Confirmar pagamento?"
                    plate="AAA-1234"
                    titleButtonSubmit="Confirmar"
                    handleSubmit={mockHandleSubmit}
                    isLoading={true}
                />
            </Dialog.Root>
        );

        expect(screen.getByText(/Confirmando.../i)).toBeInTheDocument();
    });

    it('renders the close button correctly', () => {
        render(
            <Dialog.Root open>
                <DialogParking
                    title="Confirmar pagamento?"
                    plate="AAA-1234"
                    titleButtonSubmit="Confirmar"
                    handleSubmit={mockHandleSubmit}
                />
            </Dialog.Root>
        );

        expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
    });
});
