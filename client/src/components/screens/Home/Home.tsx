import { FC } from "react"
import Link from 'next/link';

export const Home: FC = () => {
    return (
        <div className="w-full h-5/6 flex justify-center items-center flex-col overflow-y-auto">
            <h1 className="text-center text-5xl font-bold">Создавай и делись</h1>
            <h1 className="text-center text-1xl mt-2 font-medium opacity-40">любой текстовой информацией</h1>
            <Link href="/create" className="hover:underline hover:underline-offset-4 underline-offset-2 mt-4 opacity-70 hover:opacity-100 ease-in-out duration-75">Создать pastebin</Link>
        </div>
    )
}