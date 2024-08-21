import * as z from 'zod';
import InputMask from 'react-input-mask';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { entranceParkingSchema } from "../../utils/schema";
import { Loading } from '../../components/Loading';
import { ResultProccess } from './ResultProccess';
import { useRegisterParking } from '../../hooks/useParking';
import { useEffect } from 'react';

type EntranceParkingFormData = z.infer<typeof entranceParkingSchema>;

export const EntranceForm = () => {
    const { submitPlate, loading, error, success } = useRegisterParking();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<EntranceParkingFormData>({
        resolver: zodResolver(entranceParkingSchema)
    });
    
    const onSubmit: SubmitHandler<EntranceParkingFormData> = async (data) => {
        await submitPlate(data.plateLicenseNumber);
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
        }
    },[error])

    if(loading) return <Loading title='Registrando' />

    if(!loading && success) return <ResultProccess title='Registrado!' />
      
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
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
                    // onChange={(e) => handlePlateChange(e.target.value)} 
                />
                {errors.plateLicenseNumber?.message && (
                    <p className="text-red-500 text-sm mt-1">
                        {String(errors.plateLicenseNumber.message)}
                    </p>
                )}
            </div>
            <button 
                className="bg-green-550 uppercase text-white rounded-md py-4 px-24 text-center mt-3 w-full font-medium disabled:bg-gray-150 disabled:text-gray-550 disabled:cursor-not-allowed"
                type="submit"
                disabled={!isValid}
            >
                confirmar entrada
            </button>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </form>
    )
}