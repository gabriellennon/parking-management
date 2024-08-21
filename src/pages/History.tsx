import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from "./components/Header";
import ArrowLeft from '../assets/icons/arrow_left.svg';
import { Card } from "@radix-ui/themes";
import { vehicleData } from "../utils/types";
import { useGetHistoryParking } from "../hooks/useParking";
import { Loading } from "./components/Loading";

export const History = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [plate, setPlate] = useState<string | null>();
    const { data, loading, error, fetchHistoryParking, refetch } = useGetHistoryParking();

    const handleGoToDetails = (dataVehicle: vehicleData | null) => {
        if(dataVehicle){
            navigate(`/history/details/${dataVehicle.plate}`, {
                state: {
                    data: dataVehicle
                }
            })
        }
    }

    useEffect(() => {
        const plateVehicle = location.pathname.split('/history/')[1];
        setPlate(plateVehicle)
        if(!data) {
            fetchHistoryParking(plateVehicle)
        }
    },[location, fetchHistoryParking, data]);

    useEffect(() => {
        if(error) {
            toast.error(error);
        }
    },[error])

    if(loading) return <Loading />

    return (
        <div className="bg-gray-95 min-h-screen">
            <Header />
            <section className="bg-white px-4 pt-8 pb-16 rounded-lg mx-2 my-6">
                <div className="flex items-center justify-start gap-3 mb-5">
                    <button 
                        className="bg-transparent border-none"
                        title="Voltar para o início"
                        onClick={() => navigate('/')}
                    >
                        <img src={ArrowLeft} alt="ícone de seta apontando bara a esquerda" />
                    </button>
                    <h1 className="text-blue-650 text-2xl font-semibold">Placa {plate?.toUpperCase()}</h1>
                </div>
                <div>
                    {data ? (
                        <>{data.map(vehicle => (
                            <Card 
                                key={vehicle.plate}
                                onClick={() => handleGoToDetails(vehicle)}
                                className="shadow-lg hover:cursor-pointer" 
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="uppercase text-gray-550 text-xs md:text-base">Tempo Atual</span>
                                        <p className="text-2xl text-green-950 ">{vehicle.time}</p>
                                    </div>
                                    <div>
                                        <span className="uppercase text-gray-550 text-xs md:text-base">Pagamento</span>
                                        <p className="text-2xl text-green-950 ">{vehicle.paid ? 'Pago' : '--'}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}</>
                    ):(
                        <div>
                            <h2>Ops, algo deu errado.</h2>
                            <button 
                                className="bg-red-700 uppercase text-white rounded-md py-4 px-24 text-center mt-3 w-full font-medium" 
                                onClick={refetch}
                            >
                                Tentar novamente
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}