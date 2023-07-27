import Paste from '@/components/interfaces/Paste.interface'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'
import PastebindService from '@/service/pastebinService';
import { AxiosResponse } from 'axios';

const fetchOnePaste = async (id: string | undefined | string[]): Promise<AxiosResponse<Paste>> => {
    try {
        const data = await PastebindService.getOne(id)
        console.log(data);

        return data
    } catch (error: any) {
        return error
    }
}

const PastebinDetails: FC = () => {

    const { query } = useRouter();
    const pasteId = query.id

    const { data, isLoading, isError } = useQuery(`onePaste${pasteId}`, () => fetchOnePaste(pasteId))


    if (isLoading) {
        return <h3 className="text-center font-semibold text-xl">Идет загрузка...</h3>
    }

    if (isError) {
        return <h3 className="text-center font-semibold text-xl">Ошибка при получении данных</h3>
    }

    if (!data) {
        return <h3 className="text-center font-semibold text-xl">Данных нет</h3>
    }

    return (
        <div className='px-10'>
            <ul>
                <li className='text-2xl font-semibold'>{data.data.name}</li>
                <li className='opacity-90 mb-6 mt-3'>Автор: {data.data.nameCreator}</li>
                <li className='opacity-90'>Кагеория: {data.data.category}</li>
                <li className='border p-3'>{data.data.text}</li>
            </ul>
        </div>
    )
}

export default PastebinDetails
