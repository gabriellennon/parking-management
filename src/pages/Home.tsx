import { useEffect, useState } from "react";
import { servicesType } from "../utils/types";
import { Header } from "./components/Header";
import { EntranceForm } from "./components/EntranceForm";
import { ExitForm } from "./components/ExitForm";
import { useLocation } from "react-router-dom";
import { ToggleButton } from "../components/ToggleButton";

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
            <div className="flex items-center w-full">
              <ToggleButton
                  label="Entrada"
                  isActive={activeService === 'entrance'}
                  onClick={() => setActiveService('entrance')}
              />
              <ToggleButton
                  label="Saída"
                  isActive={activeService === 'exit'}
                  onClick={() => setActiveService('exit')}
              />
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