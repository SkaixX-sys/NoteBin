import $host from "@/api"
import Paste from "../components/interfaces/Paste.interface"
import { AxiosResponse } from "axios"

export type CreatePaste = Omit<Paste, "_id">
export type PasteDetails = Omit<Paste, "text">


export default class PastebindService {

    static async getAll(page?: number, perPage?: number): Promise<AxiosResponse<Paste[]>> {
        return await $host.get<Paste[]>('/api/paste/', {
            params: {
                page: page,
                perPage: perPage
            }
        })
    }

    static async getNameNameCreatorCategory(page?: number, perPage?: number): Promise<AxiosResponse<PasteDetails[]>> {
        return await $host.get<PasteDetails[]>('/api/paste/pasteDetails', {
            params: {
                page: page,
                perPage: perPage
            }
        })
    }

    static async getOne(id: string | undefined | string[]): Promise<AxiosResponse<Paste>> {
        return await $host.get<Paste>('/api/paste/getPaste/' + id)
    }

    static async create(paste: CreatePaste): Promise<AxiosResponse<Paste>> {
        return await $host.post<Paste>('/api/paste/', paste)
    }

    static async put(id: string, paste: CreatePaste): Promise<AxiosResponse<CreatePaste>> {
        return await $host.put<CreatePaste>('/api/paste/' + id, paste)
    }

    static async remove(id: string): Promise<AxiosResponse<number>> {
        return await $host.delete<number>('/api/paste/' + id)
    }
    static async getTenByMostPopularity(): Promise<AxiosResponse<Paste[]>> {
        return await $host.get<Paste[]>('/api/paste/getTenByMostPopularity/')
    }
}

