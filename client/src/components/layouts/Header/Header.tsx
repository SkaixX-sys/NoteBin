import { useUserStore } from "@/store/user-store"
import Link from "next/link"
import React, { FC } from "react"

export const Header: FC = () => {

    const isAuth = useUserStore((item) => item.isAuth)
    const username = useUserStore((item) => item.username)
    const logout = useUserStore((item) => item.logout)

    const [isBurgerMenuActive, setIsBurgerMenuActive] = React.useState<boolean>(false)

    const handleBurgerMenuActiveChange = (isBurgerMenuActive: boolean) => {
        isBurgerMenuActive ? setIsBurgerMenuActive(false) : setIsBurgerMenuActive(true)
    }

    return (
        <div className="flex justify-between items-center h-11 w-full mx-auto px-3 relative">
            <Link className="ease-in-out duration-200 hover:text-black text-gray-500 lg:w-1/3" href="/">NotePin</Link>
            <div
                className="ease-in-out duration-200 hover:text-black text-gray-500 flex flex-col justify-between items-center h-5 lg:hidden"
                onClick={() => handleBurgerMenuActiveChange(isBurgerMenuActive)}
            >
                <span className={` w-5 h-px bg-black ease-in-out duration-200 ${isBurgerMenuActive ? " rotate-45 translate-y-[9px]" : ""}`}></span>
                <span className={` w-5 h-px bg-black ease-in-out duration-200 ${isBurgerMenuActive ? "hidden" : ""}`}></span>
                <span className={` w-5 h-px bg-black ease-in-out duration-200 ${isBurgerMenuActive ? "-rotate-45 -translate-y-[9px]" : ""}`}></span>
            </div>
            <div className="hidden lg:flex lg:w-1/3 justify-between items-center">
                <Link className=" ease-in-out duration-200 hover:text-black text-gray-500" href="/">Главная</Link>
                <Link className=" ease-in-out duration-200 hover:text-black text-gray-500" href="/create">Создать пасту</Link>
                <Link className=" ease-in-out duration-200 hover:text-black text-gray-500" href="/pastebins">Все пасты</Link>
            </div>
            {!isAuth ? (<div className="hidden lg:flex h-11 justify-end items-center gap-3 lg:w-1/3">
                <Link className=" ease-in-out duration-200 hover:text-black text-gray-500" href="/registration">Регистрация</Link>
                <Link className=" ease-in-out duration-200 hover:text-black text-gray-500" href="/login">Авторизация</Link>
            </div>) : (
                <div className="hidden lg:flex h-11 justify-between items-center gap-3 lg:w-1/3">
                    <div className=" ease-in-out duration-200 hover:text-black text-gray-500 cursor-pointer" onClick={() => logout()} >Выход</div>
                </div>
            )}
            <div
                className={`${!isBurgerMenuActive ? "hidden" : "visible"} absolute top-[100%] bg-black w-[50vw] h-[50vh] ease-in-out duration-200 right-0 lg:hidden`}
            >

            </div>
        </div>
    )
}