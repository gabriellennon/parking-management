import DoneSvg from '../../assets/icons/done.svg';

type ResultProccessProps = {
    title: string;
}

export const ResultProccess = ({ title }: ResultProccessProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
            <img src={DoneSvg} alt="ícone redondo com um símbolo de check no meio dele informando que foi registrado" />
            <p className="text-base text-gray-800 uppercase">{title}</p>
        </div>
    )
}