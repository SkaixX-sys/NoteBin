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

const parseCommentsNewLines = (comments: Comment[]) => {
    updatedComments = comments.map((comment: Comment) => {
        return {
            ...comment,
            comment: comment.comment.split('\n').map((line, index) => {
                return (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                );
            }),
        };
    });
    return updatedComments
}

const PastebinDetails: FC = () => {
    const [page, setPage] = useState<number>(1)
    const isAuth = useUserStore((item) => item.isAuth)
    const userID = useUserStore((item) => item.id)
    const { query } = useRouter();
    const pasteId = query.id
    useEffect(() => {
        if (pasteId !== undefined) {
            const fetchData = async () => {
                if (isAuth) {
                    await incrementView(null, userID, pasteId);
                    console.log("авторизован");
                } else {
                    const ip = await getUserIp();
                    await incrementView(ip, null, pasteId);
                    console.log("НЕавторизован");
                }
            };
            fetchData();
        }
    }, []);

    const paste = useQuery<Paste, Error>(`onePaste${pasteId}`, () => fetchOnePaste(pasteId).then(res => res.data))
    const comments = useQuery<Comment[], Error>(`comments${pasteId}`, () => fetchComments(pasteId, page).then(res => res.data))
    if (comments.isSuccess && comments.data) {
        parseCommentsNewLines(comments.data);
    }

    const handleRefresh = () => {
        comments.refetch()
    };

    return (
        <div className='p-3'>
            {paste.isLoading || comments.isLoading ? (
                <h3 className="text-center font-semibold text-xl">Идет загрузка...</h3>
            ) : paste.isError || comments.isError ? (
                <h3 className="text-center font-semibold text-xl">Ошибка при получении данных</h3>
            ) : (
                <>
                    {paste.data && ( // Добавляем проверку paste.data
                        <div className="rounded-lg shadow p-6">
                            <h1 className="text-2xl font-bold mb-4">{paste.data.name}</h1>
                            <p className="text-gray-500 text-sm mb-2">Автор: {paste.data.nameCreator}</p>
                            <p className="text-gray-500 text-sm mb-2">Категория: {paste.data.category}</p>
                            <p className="border py-3 px-2 text-black text-sm mb-2">{paste.data.text}</p>
                        </div>
                    )}
                    <div>
                        <AreaComment pasteId={pasteId?.toString()} refetch={handleRefresh} />
                        {comments.data && ( // Добавляем проверку comments.data
                            <CommentsList comments={updatedComments} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default PastebinDetails
