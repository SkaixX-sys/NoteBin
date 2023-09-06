import { CommentResponse } from "@/components/interfaces/CommentResponse.interface"
import CommentServices from "@/service/commentService"
import { AxiosResponse } from "axios"

export const fetchComments = async (id: string | undefined | string[], page: number): Promise<AxiosResponse<CommentResponse[]>> => {
    try {
        const comments = await CommentServices.getAllByPasteId(id)
        return comments
    } catch (error: any) {
        console.log(error);
        throw new Error("Не удалось получить комментарии");
    }
}