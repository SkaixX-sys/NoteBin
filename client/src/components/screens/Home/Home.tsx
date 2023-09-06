import { FC } from "react"
import Link from 'next/link';
import Image from "next/image";

export const Home: FC = () => {
    return (
        <>
            <div className="w-full h-[90vh] flex justify-center items-center flex-col overflow-y-auto">
                <h1 className="text-center text-3xl lg:text-[40px] xl:text-6xl font-bold">Создавай и делись</h1>
                <h2 className="text-center text-lg lg:text-lg xl:text-xl mt-2 font-medium opacity-40">любой текстовой информацией</h2>
                <Link href="/create" className="mt-4 rounded-lg text-white py-2 px-4 bg-blue-400 hover:bg-blue-500 text-xl lg:text-[22px] xl:text-2xl">Создать пост</Link>
            </div>
        </>
    )
}