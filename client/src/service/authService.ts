import $host from "@/api";
import { AxiosResponse } from "axios";
import AuthResponse from "../components/interfaces/AuthResponse.interface";
import { User } from "../components/interfaces/User";


export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $host.post<AuthResponse>('api/user/login', { email, password })
    }

    static async registration(email: string, password: string, username: string): Promise<AxiosResponse<AuthResponse>> {
        return $host.post<AuthResponse>('api/user/registration', { email, password, username })
    }

    static async logout(): Promise<void> {
        return $host.post('api/user/logout')
    }

    static async fetchUsers(): Promise<AxiosResponse<User[]>> {
        return $host.get<User[]>('api/user/users')
    }
}