import { FC, useState } from "react"
import { UseQueryResult, useQuery } from "react-query";
import PastebindService, { PasteDetails } from '@/service/pastebinService';
import { AxiosResponse } from "axios";
import Link from "next/link";

const fetchPasteDetails = async (page: number): Promise<AxiosResponse<PasteDetails[]>> => {
        const data = await PastebindService.getNameNameCreatorCategory(page)
        return data
}

const Pastebins: FC = () => {
    const [page, setPage] = useState<number>(1)
    const { data, isLoading, isError } = useQuery(['pastes', page], () => fetchPasteDetails(page),
        { keepPreviousData: true })
        

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
        <div className="p-3 w-2/3">
            {data.data.map((paste: PasteDetails) => {
                return (
                    <Link href={`/pastebins/${paste._id}`} key={paste._id} className="mb-1">
                        <ul className="flex border hover:shadow-lg duration-150 ease-in-out mb-1 py-2 px-3">
                            <div className="w-2/3">
                                <li>{paste.name}</li>
                                <li>{paste.nameCreator}</li>
                            </div>
                            <div className="w-1/3 flex justify-end items-center">
                                <li>{paste.category}</li>
                            </div>
                        </ul>
                    </Link>
                );
            })}
            <button onClick={
                () => {
                    setPage((p) => (p - 1))
                }
            }
                disabled={page === 1}
            >Previous
            </button>
            <button onClick={() => { setPage((p) => (p + 1)) }}>
                Next
            </button>
        </div>
    );
}
export default Pastebins