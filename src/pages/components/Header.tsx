import clsx from 'clsx';
import ParkingLogo from '../../assets/icons/logo_parking.svg';
import { useState } from 'react';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    const menuItemClassName = clsx("md:block md:text-lg text-xl",{
      visible: mobileMenuOpen,
      hidden: !mobileMenuOpen
    })

    return (
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
    )
}