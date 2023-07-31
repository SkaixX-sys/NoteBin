import $host from "@/api"
import { AxiosResponse } from "axios"
import ViewResponse from "@/components/interfaces/ViewResponse.interface"

export default class ViewService {

    static async create(userIP: string | null, userID: string | null, pasteID: string | string[] | undefined): Promise<AxiosResponse<ViewResponse>> {
        return await $host.post<ViewResponse>('/api/view/create', {
            userIP:userIP,
            userID:userID,
            pasteID:pasteID,
        })
    }
}

