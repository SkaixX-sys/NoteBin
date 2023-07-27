import AuthResponse from "@/components/interfaces/AuthResponse.interface";
import AuthService from "@/service/authService";
import { errorNotify, successNotify } from "@/utils/notificationsTypes";
import axios from "axios";
import { create } from "zustand";

interface UserStore {
    id: string | null,
    username: string | null,
    email: string | null,
    isAuth: boolean | null,
    login: (email: string, password: string) => Promise<void>,
    registration: (email: string, password: string, username: string) => Promise<void>,
    logout: () => Promise<void>,
    checkAuth: () => Promise<void>,
}


export const useUserStore = create<UserStore>((set) => ({
    id: null,
    username: null,
    email: null,
    isAuth: null,
    login: async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password)
            const user = response.data.user
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            set({
                id: user.id,
                username: user.username,
                email: user.email,
                isAuth: true,
            })
            successNotify("Авторизация прошла успешно")
        } catch (error: any) {
            errorNotify(error.response?.data?.message)
        }
    },
    registration: async (email: string, password: string, username: string) => {
        try {
            const response = await AuthService.registration(email, password, username)
            const user = response.data.user
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            set({
                id: user.id,
                username: user.username,
                email: user.email,
                isAuth: true,
            })
            successNotify("Регистрация прошла успешно")
        } catch (error: any) {
            errorNotify(error.response?.data?.message)
        }
    },
    logout: async () => {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            set({
                id: null,
                username: null,
                email: null,
                isAuth: false,
            })
            successNotify("Вы успешно вышли")
        } catch (error: any) {
            errorNotify(error.response?.data?.message)
        }
    },
    checkAuth: async () => {
        try {
            const response = await axios.get<AuthResponse>(`${process.env.NEXT_APP_API_URL}/api/user/refresh`, { withCredentials: true })
            const user = response.data.user
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            set({
                id: user.id,
                username: user.username,
                email: user.email,
                isAuth: true,
            })
        } catch (error) {
            console.log(error);
        }
    }
}))

