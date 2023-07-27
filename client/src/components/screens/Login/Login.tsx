import React, { FC, useState } from 'react'
import Input from '@/components/ui/input/Input';
import Link from 'next/link';
import { useUserStore } from '@/store/user-store';
import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/router';

const Login: FC = () => {

    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const login = useUserStore((item) => item.login)

    const router = useRouter()

    const isAuth = useUserStore((item) => item.isAuth)

    if(isAuth) {
        router.push('/')
        return null
    }

    return (
        <div className='flex justify-center items-center flex-col h-5/6'>
            <div className='border rounded shadow-lg pt-3 px-6 pb-6 flex items-center justify-center flex-col w-1/4'>
                <h2 className='text-center text-2xl font-semibold mb-4 mt-2'>Авторизация</h2>
                <form className='flex flex-col gap-1 w-full'>
                    <Input type="text" setState={setEmail} htmlFor="email" state={email} labelChildren="Почта" />
                    <Input type="password" setState={setPassword} htmlFor="password" state={password} labelChildren="Пароль" />
                </form>
                <div className='text-md mb-8 ms-auto'>Еще нет аккаунта? <Link href="/registration" className=' text-blue-600 hover:text-blue-800'>Регистрация</Link></div>
                <Button onClickFunction={login} password={password} email={email}>Войти</Button>
            </div>
            
        </div>
    )
}

export default Login
