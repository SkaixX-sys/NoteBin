import React, { FC, useState } from 'react'
import Input from '@/components/ui/input/Input';
import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import { useUserStore } from '../../../store/user-store';
import { useRouter } from 'next/router';

const Registration: FC = () => {

    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const router = useRouter()

    const registration = useUserStore((item) => item.registration)
    const isAuth = useUserStore((item) => item.isAuth)

    if(isAuth) {
        router.push('/')
        return null
    }

    return (
        <div className='flex justify-center items-center flex-col h-5/6'>
            <div className='border rounded shadow-lg pt-3 px-6 pb-6 flex items-center justify-center flex-col w-1/4'>
                <h2 className='text-center text-2xl font-semibold mb-4 mt-2'>Регистрация</h2>
                <form className='flex flex-col gap-1 w-full'>
                    <Input type="text" setState={setUsername} htmlFor="username" state={username} labelChildren="Имя пользователя" />
                    <Input type="text" setState={setEmail} htmlFor="email" state={email} labelChildren="Почта" />
                    <Input type="password" setState={setPassword} htmlFor="password" state={password} labelChildren="Пароль" />
                </form>
                <div className='text-md mb-8 ms-auto'>Уже есть аккаунт? <Link href="/login" className=' text-blue-600 hover:text-blue-800'>Авторизация</Link></div>
                <Button onClickFunction={registration} username={username} password={password} email={email}>Создать аккаунт</Button>
            </div>
        </div>
    )
}

export default Registration
