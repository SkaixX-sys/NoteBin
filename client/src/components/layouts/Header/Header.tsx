import { useUserStore } from "@/store/user-store"
import Link from "next/link"
import { FC } from "react"

export const Header: FC = () => {

    const isAuth = useUserStore((item) => item.isAuth)
    const username = useUserStore((item) => item.username)
    const logout = useUserStore((item) => item.logout)

    return (
        <div className="flex justify-between items-center h-11 w-1/3 mx-auto">
            <Link className="ease-in-out duration-200 hover:text-black text-gray-500" href="/">Главная</Link>
            <Link className="ease-in-out duration-200 hover:text-black text-gray-500" href="/create">Создать пасту</Link>
            <Link className="ease-in-out duration-200 hover:text-black text-gray-500" href="/pastebins">Все пасты</Link>
            {!isAuth ? (<div className="h-11 absolute right-6 top-0 flex justify-between items-center gap-3">
                <Link className="ease-in-out duration-200 hover:text-black text-gray-500" href="/registration">Регистрация</Link>
                <Link className="ease-in-out duration-200 hover:text-black text-gray-500" href="/login">Авторизация</Link>
            </div>) : (
                <div className="h-11 absolute right-6 top-0 flex justify-between items-center gap-3">
                    <div className="ease-in-out duration-200 hover:text-black text-gray-500 cursor-pointer" onClick={() => logout()} >Выход</div>
                </div>
            )}
        </div>
    )
}