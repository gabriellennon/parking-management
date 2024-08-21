import * as z from 'zod';
import InputMask from 'react-input-mask';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { exitParkingSchema } from "../../utils/schema";
import { Link } from 'react-router-dom';
import { Dialog } from '@radix-ui/themes';
import { DialogParking } from '../../components/DialogParking';
import { useRegisterExitParking, useRegisterPaymentParking } from '../../hooks/useParking';
import { useEffect } from 'react';

type ExitParkingFormData = z.infer<typeof exitParkingSchema>;

export const ExitForm = () => {
    const { handlePay, loading, error, success } = useRegisterPaymentParking();
    const { handleRegisterExit, loading: isLoadingExit, error: isErrorExit, success: isSuccessExit } = useRegisterExitParking();
    
    const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm<ExitParkingFormData>({
        resolver: zodResolver(exitParkingSchema)
    });

    const onSubmit: SubmitHandler<ExitParkingFormData> = async (data) => {
        await handlePay(data.plateLicenseNumber);
    };

    const onExitSubmit: SubmitHandler<ExitParkingFormData> = async (data) => {
        await handleRegisterExit(data.plateLicenseNumber);
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
        }

        if(isErrorExit) {
            toast.error(isErrorExit);
        }

    },[error, isErrorExit])
      
    return (
            <form>
                <div className="w-full flex flex-col justify-start items-start gap-3">
                    <label htmlFor="plateLicenseNumber" className="block text-base text-gray-550">Número da placa:</label>
                    <InputMask 
                        type="text" 
                        className="bg-yellow-350 border border-gray-300 uppercase text-gray-900 text-xl rounded-md block w-full py-4 px-24 text-center" 
                        required 
                        id="plateLicenseNumber"
                        {...register("plateLicenseNumber")}
                        placeholder="AAA-9999"
                        mask="aaa-9999"
                        maskChar=""
                    />
                    {errors.plateLicenseNumber?.message && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.plateLicenseNumber.message)}
                        </p>
                    )}
                </div>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <button 
                                className="bg-purple-550 uppercase text-white rounded-md py-4 px-24 text-center mt-3 w-full font-medium disabled:bg-gray-150 disabled:text-gray-550 disabled:cursor-not-allowed"
                                type="button"
                                disabled={!isValid}
                            >
                                pagamento
                            </button>
                        </Dialog.Trigger>
                        <DialogParking 
                            plate={getValues().plateLicenseNumber} 
                            title='Confima o pagamento da placa abaixo?' 
                            titleButtonSubmit='Confirmar' 
                            handleSubmit={handleSubmit(onSubmit)}
                            isLoading={loading}
                            isSuccess={success}
                            successTitle='Pago!'
                        />
                    </Dialog.Root>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <button 
                                className="text-purple-550 border border-purple-550 bg-transparent uppercase  rounded-md py-4 px-24 text-center mt-3 w-full font-medium disabled:text-gray-550 disabled:border-gray-150 disabled:cursor-not-allowed"
                                type="button"
                                disabled={!isValid}
                            >
                                saída
                            </button>
                        </Dialog.Trigger>
                        <DialogParking 
                            plate={getValues().plateLicenseNumber} 
                            title='Confirma a saída do veiculo da placa abaixo?' 
                            titleButtonSubmit='Liberar Saída' 
                            handleSubmit={handleSubmit(onExitSubmit)}
                            isLoading={isLoadingExit}
                            isSuccess={isSuccessExit}
                            successTitle='SAÍDA LIBERADA'
                        />
                    </Dialog.Root>
                    {isValid && getValues().plateLicenseNumber && (
                        <Link
                            to={`/history/${getValues().plateLicenseNumber}`}
                            className="text-blue-650 uppercase bg-transparent text-center mt-3 w-full font-medium"
                        >
                            Ver Histórico
                        </Link>
                    )}
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </form>
    )
}