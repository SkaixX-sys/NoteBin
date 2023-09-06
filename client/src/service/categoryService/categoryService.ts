import $host from "@/api";
import { AxiosResponse } from "axios";
import CategoryResponse from "./categoryResponse.interface";
import CategoryRequest from "./categoryRequest.interface";

export default class CategoryService {
    static async create(category: string): Promise<AxiosResponse<CategoryRequest>> {
        return $host.post<CategoryRequest>('api/category/', { category })
    }
    static async fetchAll(): Promise<AxiosResponse<CategoryResponse>> {
        return $host.get<CategoryResponse>('api/category/')
    }
    static async fetchOne(id: string): Promise<AxiosResponse<CategoryResponse>> {
        return $host.get<CategoryResponse>(`api/category/${id}`)
    }
}