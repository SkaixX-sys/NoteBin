import Link from "next/link"
import { FC } from "react"

export const Footer: FC = () => {
    return (
        <div className="absolute bottom-2 text-center w-full">
            <div className="ease-in-out duration-200 hover:text-black text-gray-500">&copy; 2023 NoteBin. Все права соблюдены.</div>
        </div>
    )
}