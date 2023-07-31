import $host from "@/api";
import { AxiosResponse } from "axios";
import { CommentResponse } from "@/components/interfaces/CommentResponse.interface";


export default class CommentServices {
    static async create(comment: string, userId: string | null, pasteId: string | string[] | undefined): Promise<AxiosResponse<CommentResponse>> {
        return $host.post<CommentResponse>('api/comments/', {
            comment, userId, pasteId
        })
    }
    static async delete(userId: string, commentId: string): Promise<AxiosResponse<CommentResponse>> {
        return $host.delete<CommentResponse>('api/comments/', {
            data: {
                userId: userId,
            },
            params: {
                id: commentId
            }
        })
    }
    static async put(
        pasteId: string,
        comment: string,
        userId: string,
        commentId: string
    ): Promise<AxiosResponse<CommentResponse>> {
        return $host.put<CommentResponse>('api/comments/', {
            params: {
                id: commentId
            },
            data: {
                comment: comment,
                userId: userId,
                pasteId: pasteId
            }
        })
    }
    static async getAllByPasteId(
        pasteId: string | undefined | string[],
        page?: number,
        perPage?: number
    ): Promise<AxiosResponse<CommentResponse[]>> {
        return $host.get<CommentResponse[]>(`api/comments/getAllByPasteId/${pasteId}`, {
            params: {
                page: page,
                perPage: perPage
            }
        })
    }

    static async getAllByUserId(
        userId: string,
        page?: number,
        perPage?: number
    ): Promise<AxiosResponse<CommentResponse[]>> {
        return $host.get<CommentResponse[]>('api/comments/getAllByUserId/', {
            params: {
                id: userId,
                page: page,
                perPage: perPage
            }
        })
    }

}