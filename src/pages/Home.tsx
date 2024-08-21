import { useEffect, useState } from "react";
import clsx from 'clsx';
import { servicesType } from "../utils/types";
import { Header } from "./components/Header";
import { EntranceForm } from "./components/EntranceForm";
import { ExitForm } from "./components/ExitForm";
import { useLocation } from "react-router-dom";

export const Home = () => {
    const [activeService, setActiveService] = useState<servicesType>('entrance');
    const location = useLocation();

    useEffect(() => {
      const actualService = location.pathname.split('/')[1];
      if(actualService.length){
        setActiveService(activeService);
      }
    },[activeService, location]);
  
    return (
      <main className="bg-gray-95 min-h-screen">
        <Header />
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
            <div className="bg-white px-4 py-8">
              {activeService === 'entrance' ? (
                <EntranceForm />
              ): (
                <ExitForm />
              )}
            </div>
          </div>
        </section>
      </main>
    )
}