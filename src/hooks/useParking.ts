import { useCallback, useState } from 'react';
import { getHistoryParkingService, registerParkingService } from '../services/parkingService';
import { vehicleData } from '../utils/types';

export const useRegisterParking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitPlate = async (plate: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await registerParkingService(plate);
      setSuccess(true);
      return data;
    } catch (err) {
        console.error(err)
        setError('Erro ao enviar a placa. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { submitPlate, loading, error, success };
};

export const useGetHistoryParking = () => {
  const [data, setData] = useState<vehicleData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [idPlate, setIdPlate] = useState<string | null>(null);

  const fetchHistoryParking = useCallback(async (plate: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setIdPlate(plate);

    try {
      const data = await getHistoryParkingService(plate);
      setData(data)
      setSuccess(true);
    } catch (err) {
      console.error(err)
      setError('Erro ao consultar o histórico dessa placa. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = () => {
    if (idPlate) {
      fetchHistoryParking(idPlate);
    }
  };

  return { fetchHistoryParking, loading, error, success, data, refetch };
};
