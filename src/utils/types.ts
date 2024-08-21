import { UseFormRegister } from "react-hook-form";

export type servicesType = 'entrance' | 'exit';

export type vehicleData = {
    time: string;
    paid: boolean;
    left: boolean;
    plate: string;
    reservation: string;
}

export type ActionButtonProps = {
    label: string;
    onClick: () => void;
    isLoading: boolean;
    isValid: boolean;
}

export type PlateInputProps = {
    register: UseFormRegister<{ plateLicenseNumber: string; }>;
    errors: {
        plateLicenseNumber?: {
            message?: string;
        };
    };
}
