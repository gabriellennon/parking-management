import * as z from 'zod';
import InputMask from 'react-input-mask';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { exitParkingSchema } from "../../utils/schema";

type ExitParkingFormData = z.infer<typeof exitParkingSchema>;

export const ExitForm = () => {
    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<ExitParkingFormData>({
        resolver: zodResolver(exitParkingSchema)
      });
    
      const handlePlateChange = (value: string) => {
        const rawValue = value.replace("-", "");
        if(rawValue.length == 7) {
          setValue("plateLicenseNumber", rawValue);
        }
      };
    
      const onSubmit: SubmitHandler<ExitParkingFormData> = (data) => {
        console.log(data);
      };
      
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
                    onChange={(e) => handlePlateChange(e.target.value)} 
                />
                {errors.plateLicenseNumber?.message && (
                    <p className="text-red-500 text-sm mt-1">
                        {String(errors.plateLicenseNumber.message)}
                    </p>
                )}
            </div>
            <div className='flex flex-col items-center justify-center gap-3'>
                <button 
                    className="bg-purple-550 uppercase text-white rounded-md py-4 px-24 text-center mt-3 w-full font-medium disabled:bg-gray-150 disabled:text-gray-550 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!isValid}
                >
                    pagamento
                </button>
                <button 
                    className="text-purple-550 border border-purple-550 bg-transparent uppercase  rounded-md py-4 px-24 text-center mt-3 w-full font-medium disabled:text-gray-550 disabled:border-gray-150 disabled:cursor-not-allowed"
                    type="button"
                    disabled={!isValid}
                    onClick={() => {console.log('teste')}}
                >
                    saída
                </button>
                <button
                    className="text-blue-650 uppercase bg-transparent text-center mt-3 w-full font-medium"
                >
                    Ver Histórico
                </button>
            </div>
        </form>
    )
}