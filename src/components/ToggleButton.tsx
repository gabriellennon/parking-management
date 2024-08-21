import clsx from "clsx";

type ToggleButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
};

export const ToggleButton = ({ label, isActive, onClick }: ToggleButtonProps) => {
    return (
        <button
            className={clsx("py-3 px-14 rounded-t-lg w-[50%]", {
                'bg-white border-b-2 border-blue-550 text-blue-550': isActive,
                'bg-gray-94 border-none text-gray-550': !isActive
            })}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
