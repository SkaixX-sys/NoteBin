import AuthResponse from "@/components/interfaces/AuthResponse.interface"
import axios from "axios"

export const API_URL = process.env.NEXT_APP_API_URL

const $host = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$host.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$host.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${process.env.NEXT_APP_API_URL}/api/user/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return $host.request(originalRequest)
        } catch (error) {
            console.log("Не авторизован");

        }
    }
    throw error
})

export default $host