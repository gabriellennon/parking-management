import { Dialog } from "@radix-ui/themes";
import { Loading } from "./Loading";
import DoneSvg from '../assets/icons/done.svg';
import { useEffect } from "react";

type DialogParkingProps = {
    title: string;
    plate: string;
    titleButtonSubmit: string;
    handleSubmit: () => void;
    isLoading?: boolean;
    isSuccess?: boolean;
    successTitle?: string;
}

export const DialogParking = ({ plate, title, titleButtonSubmit, handleSubmit, isLoading, isSuccess, successTitle }: DialogParkingProps) => {

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    return (
        <Dialog.Content maxWidth="450px">
            {!isLoading && !isSuccess && (
                <Dialog.Description size="2" mb="4" className="text-center">
                    {title}
                </Dialog.Description>
            )}
            {!isLoading && !isSuccess && (
                <div className="w-full flex flex-col justify-center items-center gap-6">
                    <h3 className="text-blue-650 text-2xl font-semibold uppercase">{plate}</h3>
                    <button 
                        className="bg-purple-550 uppercase text-white rounded-md py-4 px-24 text-center mt-3 w-full font-medium"
                        onClick={handleSubmit}
                    >
                        {titleButtonSubmit}
                    </button>
                    <Dialog.Close>
                        <button 
                            className="text-blue-650 uppercase bg-transparent text-center mt-3 w-full font-medium"
                        >
                            Voltar
                        </button>
                    </Dialog.Close>
                </div>
            )}
            {isLoading && <Loading title="Confirmando..." />}
            {isSuccess && (
                <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
                    <img src={DoneSvg} alt="ícone de check informando sucesso na ação" />
                    <p className="text-base text-gray-800 uppercase">{successTitle}</p>
                </div>
            )}
        </Dialog.Content>
    )
}