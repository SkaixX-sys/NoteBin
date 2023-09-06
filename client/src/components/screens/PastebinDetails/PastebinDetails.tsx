import Paste from '@/components/interfaces/Paste.interface'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { AreaComment } from '../../ui/AreaComment/AreaComment';
import { CommentsList } from '@/components/ui/CommentsList/CommentsList';
import { Comment, UpdateComment } from '@/components/ui/CommentsList/CommentsList.interface';
import { useUserStore } from '@/store/user-store';
import { getUserIp } from './utils/getUserIp';
import { incrementView } from './utils/incrementView';
import { fetchOnePaste } from './utils/fetchOnePaste';
import { fetchComments } from './utils/fetchComments';

let updatedComments: UpdateComment[];


const PastebinDetails: FC = () => {
    const [page, setPage] = useState<number>(1)
    const [userIp, setUserIp] = useState<string>("")
    const isAuth = useUserStore((item) => item.isAuth)
    const userID = useUserStore((item) => item.id)
    const { query } = useRouter();
    const pasteId = query.id
    useEffect(() => {
        console.log("useEffect отработа");

        if (pasteId !== undefined) {
            const fetchData = async () => {
                if (isAuth) {
                    await incrementView(null, userID, pasteId);
                    console.log("авторизован");
                } else {
                    const ip = await getUserIp();
                    setUserIp(ip)
                    console.log(userIp);

                    await incrementView(ip, null, pasteId);
                    console.log("НЕавторизован");
                }
            };
            fetchData();
        }
    }, []);

    const paste = useQuery<Paste, Error>(`onePaste${pasteId}`, () => fetchOnePaste(pasteId).then(res => res.data))
    const comments = useQuery<Comment[], Error>(`comments${pasteId}`, () => fetchComments(pasteId, page).then(res => res.data))

    const handleRefresh = () => {
        comments.refetch()
    };


    return (
        <div className='p-3 w-3/4'>
            {paste.isLoading || comments.isLoading ? (
                <h3 className="text-center font-semibold text-xl">Идет загрузка...</h3>
            ) : paste.isError || comments.isError ? (
                <h3 className="text-center font-semibold text-xl">Ошибка при получении данных</h3>
            ) : (
                <>
                    {paste.data && (
                        <div className="rounded-lg shadow p-6">
                            <h1 className="text-2xl font-bold mb-4">{paste.data.name}</h1>
                            <p className="text-gray-500 text-sm mb-2">Автор: {paste.data.nameCreator}</p>
                            <p className="text-gray-500 text-sm mb-2">Категория: {paste.data.category}</p>
                            <p className="text-gray-500 text-sm mb-2">Количество Просмотров: {paste.data.views}</p>
                            <p className="border py-3 px-2 text-black text-sm mb-2 whitespace-pre-line">{paste.data.text}</p>
                        </div>
                    )}
                    <div>
                        <AreaComment pasteId={pasteId?.toString()} refetch={handleRefresh} />
                        {comments.data && (
                            <CommentsList comments={comments.data} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default PastebinDetails
