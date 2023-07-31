import ViewService from "@/service/viewService"

export const incrementView = async (userIP: string | null, userID: string | null, pasteID: string | string[] | undefined) => {
    try {
        const ViewData = ViewService.create(userIP, userID, pasteID)
        return ViewData
    } catch (error: any) {
        console.log(error);

    }
    throw new Error("Не удалось получить комментарии");
}