import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import ArrowLeft from '../assets/icons/arrow_left.svg';
import { Card } from "@radix-ui/themes";
import { vehicleData } from "../utils/types";

export const HistoryDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataVehicle, setDataVehicle] = useState<vehicleData | null>(null);

    useEffect(() => {
        const dataLocation = location.state.data as vehicleData;
        if (dataLocation) {
            setDataVehicle(dataLocation);
        }
    }, [location.state]);

    return (
        <div className="bg-gray-95 min-h-screen">
            <Header />
            <section className="bg-white px-4 pt-8 pb-16 rounded-lg mx-2 my-6">
                <div className="flex items-center justify-start gap-3 mb-5">
                    <button 
                        className="bg-transparent border-none"
                        title="Voltar para a página anterior"
                        onClick={() => navigate(-1)}
                    >
                        <img src={ArrowLeft} alt="ícone de seta apontando bara a esquerda" />
                    </button>
                    <h1 className="text-blue-650 text-2xl font-semibold">Placa {dataVehicle?.plate}</h1>
                </div>
                <div>
                    <Card className="shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="uppercase text-gray-550 text-xs md:text-base">Tempo Atual</span>
                                <p className="text-2xl text-green-950 ">{dataVehicle?.time}</p>
                            </div>
                            <div>
                                <span className="uppercase text-gray-550 text-xs md:text-base">Pagamento</span>
                                <p className="text-2xl text-green-950 ">{dataVehicle?.paid ? 'Pago' : '--'}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    )
}