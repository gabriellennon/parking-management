import { Spinner } from "@radix-ui/themes"

type LoadingProps = {
    title: string;
}

export const Loading = ({ title }: LoadingProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
            <Spinner size="3" />
            <p className="text-base text-gray-800">{title}</p>
        </div>
    )
}