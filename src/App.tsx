import { useState } from "react";
import * as z from 'zod';
import clsx from 'clsx';
import InputMask from 'react-input-mask';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { entranceParkingSchema } from "./utils/schema";

import ParkingLogo from './assets/icons/logo_parking.svg';
import { servicesType } from "./utils/types";

type EntranceParkingFormData = z.infer<typeof entranceParkingSchema>;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<servicesType>('entrance');

  const menuItemClassName = clsx("md:block md:text-lg text-xl",{
    visible: mobileMenuOpen,
    hidden: !mobileMenuOpen
  })

  // const formEntrance = useForm<z.infer<typeof entranceParkingSchema>>({
  //   resolver: zodResolver(entranceParkingSchema),
  // });

  const { register, handleSubmit, formState: { errors } } = useForm<EntranceParkingFormData>({
    resolver: zodResolver(entranceParkingSchema)
  });

  const onSubmit: SubmitHandler<EntranceParkingFormData> = (data) => {
    console.log(data);
  };

  return (
    <main className="bg-gray-95 min-h-screen">
      <header className={clsx(
        "bg-blue-550 text-white p-5 flex flex-col md:flex-row gap-5", {
        'h-screen': mobileMenuOpen,
      })}>
        <a className="text-4xl md:text-lg">
          <img src={ParkingLogo} alt="Logo do managment parking, simbolizada por um círculo branco com um P dentro dele" />
        </a>
        <a className={menuItemClassName}>Entrada</a>
        <a className={menuItemClassName}>Saída</a>

        <button 
          className="md:hidden absolute right-4 top-6"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={clsx("w-10 h-1 bg-white mb-1 transition-all duration-500 ease-in-out",{
            "rotate-45 translate-y-2": mobileMenuOpen
          })}></div>
          <div className={clsx("w-10 h-1 bg-white mb-1",{
            hidden: mobileMenuOpen
          })}></div>
          <div className={clsx("w-10 h-1 bg-white mb-1 transition-all duration-500 ease-in-out",{
            "-rotate-45": mobileMenuOpen
          })}></div>
        </button>
      </header>
      <section className="py-11 px-2 rounded-lg">
        <div>
          {/* header do switch */}
          <div className="flex items-center w-full">
            <button 
              className={clsx("py-3 px-14 rounded-t-lg w-[50%]", {
                'bg-white border-b-2 border-blue-550 text-blue-550': activeService === 'entrance',
                'bg-gray-94 border-none text-gray-550': activeService !== 'entrance'
              })}
              onClick={() => setActiveService('entrance')}
            >
              Entrada
            </button>
            <button 
              className={clsx("py-3 px-14 rounded-t-lg w-[50%]", {
                'bg-white border-b-2 border-blue-550 text-blue-550': activeService === 'exit',
                'bg-gray-94 border-none text-gray-550': activeService !== 'exit'
              })}
              onClick={() => setActiveService('exit')}
            >
              Saída
            </button>
          </div>
          {/* body do switch */}
          <div className="bg-white px-4 py-8">
            <form 
              onSubmit={handleSubmit(onSubmit)} 
            >
              <div className="w-full flex flex-col justify-start items-start gap-3">
                <label htmlFor="plateLicenseNumber" className="block text-base text-gray-550">Número da placa:</label>
                <InputMask 
                  type="text" 
                  className="bg-yellow-350 border border-gray-300 text-gray-900 text-xl rounded-md block w-full py-4 px-24 text-center" 
                  required 
                  id="plateLicenseNumber"
                  {...register("plateLicenseNumber")}
                  placeholder="AAA-0000"
                  mask="aaa-9999"
                  maskChar=""
                />
                {errors.plateLicenseNumber?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.plateLicenseNumber.message)}
                  </p>
                )}
              </div>
              <button 
                className="bg-green-550 uppercase text-white rounded-md py-4 px-24 text-center mt-3 w-full font-medium"
                type="submit"
              >
                CONFIRMAR ENTRADA
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
