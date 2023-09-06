import CategoryService from "@/service/categoryService/categoryService"

export const fetchCategories = async () => {
    try {
        const data = await CategoryService.fetchAll()
        return data
    } catch (error) {
        throw error
    }
}
export const fetchCategory = async (id: string) => {
    try {
        const data = await CategoryService.fetchOne(id)
        return data
    } catch (error) {
        throw error
    }
}