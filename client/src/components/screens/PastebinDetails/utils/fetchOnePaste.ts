import Paste from '@/components/interfaces/Paste.interface';
import PastebinService from '@/service/pastebinService';
import { AxiosResponse } from 'axios';

export const fetchOnePaste = async (id: string | undefined | string[]): Promise<AxiosResponse<Paste>> => {
    try {
        const data = await PastebinService.getOne(id)
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error("Не удалось получить комментарии");
    }
}