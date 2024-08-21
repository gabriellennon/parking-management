import { renderHook, act } from '@testing-library/react';
import { 
  useRegisterParking, 
  useRegisterPaymentParking, 
  useRegisterExitParking, 
  useGetHistoryParking 
} from '../useParking';
import { 
  registerParkingService, 
  registerPaymentParkingService, 
  registerExitParkingService, 
  getHistoryParkingService 
} from '../../services/parkingService';

jest.mock('../../services/parkingService');

describe('Parking Hooks', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useRegisterParking', () => {
    it('should handle plate registration successfully', async () => {
      const mockData = { message: 'Placa registrada' };
      (registerParkingService as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useRegisterParking());

      await act(async () => {
        const response = await result.current.submitPlate('AAA-1234');
        expect(response).toEqual(mockData);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);
      expect(result.current.error).toBe(null);
    });

    it('should handle errors during plate registration', async () => {
      (registerParkingService as jest.Mock).mockRejectedValue(new Error('Erro'));

      const { result } = renderHook(() => useRegisterParking());

      await act(async () => {
        await result.current.submitPlate('AAA-1234');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(false);
      expect(result.current.error).toBe('Erro ao enviar a placa. Por favor, tente novamente.');
    });
  });

  describe('useRegisterPaymentParking', () => {
    it('should handle payment successfully', async () => {
      const mockData = { message: 'Pagamento registrado' };
      (registerPaymentParkingService as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useRegisterPaymentParking());

      await act(async () => {
        const response = await result.current.handlePay('AAA-1234');
        expect(response).toEqual(mockData);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);
      expect(result.current.error).toBe(null);
    });

    it('should handle errors during payment', async () => {
      (registerPaymentParkingService as jest.Mock).mockRejectedValue(new Error('Erro'));

      const { result } = renderHook(() => useRegisterPaymentParking());

      await act(async () => {
        await result.current.handlePay('AAA-1234');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(false);
      expect(result.current.error).toBe('Ocorreu um erro ao processar o pagamento.');
    });
  });

  describe('useRegisterExitParking', () => {
    it('should handle exit registration successfully', async () => {
      const mockData = { message: 'Saída registrada' };
      (registerExitParkingService as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useRegisterExitParking());

      await act(async () => {
        const response = await result.current.handleRegisterExit('AAA-1234');
        expect(response).toEqual(mockData);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);
      expect(result.current.error).toBe(null);
    });

    it('should handle errors during exit registration', async () => {
      (registerExitParkingService as jest.Mock).mockRejectedValue(new Error('Erro'));

      const { result } = renderHook(() => useRegisterExitParking());

      await act(async () => {
        await result.current.handleRegisterExit('AAA-1234');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(false);
      expect(result.current.error).toBe('Ocorreu um erro ao processar a saída.');
    });
  });

  describe('useGetHistoryParking', () => {
    it('should fetch history successfully', async () => {
      const mockData = [{ plate: 'AAA-1234', date: '2024-08-20' }];
      (getHistoryParkingService as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useGetHistoryParking());

      await act(async () => {
        await result.current.fetchHistoryParking('AAA-1234');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.data).toEqual(mockData);
    });

    it('should handle errors during history fetching', async () => {
      (getHistoryParkingService as jest.Mock).mockRejectedValue(new Error('Erro'));

      const { result } = renderHook(() => useGetHistoryParking());

      await act(async () => {
        await result.current.fetchHistoryParking('AAA-1234');
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(false);
      expect(result.current.error).toBe('Erro ao consultar o histórico dessa placa. Por favor, tente novamente.');
      expect(result.current.data).toBe(null);
    });

    it('should refetch history when refetch is called', async () => {
      const mockData = [{ plate: 'AAA-1234', date: '2024-08-20' }];
      (getHistoryParkingService as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useGetHistoryParking());

      await act(async () => {
        await result.current.fetchHistoryParking('AAA-1234');
        result.current.refetch();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);
      expect(result.current.data).toEqual(mockData);
    });
  });
});
