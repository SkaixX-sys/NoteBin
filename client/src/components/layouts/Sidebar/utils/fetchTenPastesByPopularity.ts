import Paste from "@/components/interfaces/Paste.interface";
import PastebindService from "@/service/pastebinService";
import { AxiosResponse } from "axios";

export const fetchTenPastesByPopularity = async (): Promise<AxiosResponse<Paste[]>> => {
    try {
        return await PastebindService.getTenByMostPopularity()
    } catch (error) {
        console.log(error);

    }
    throw new Error("Паст нет")
} 