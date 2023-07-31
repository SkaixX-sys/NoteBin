import handleInputChange from "@/service/handleInputChange";
import { FC, useState, ChangeEvent, PropsWithChildren, KeyboardEvent } from "react";
import CommentServices from "@/service/commentService";
import { useUserStore } from "@/store/user-store";
import toast from "react-hot-toast";
import { errorNotify } from "@/utils/notificationsTypes";

interface AreaCommentProps {
    pasteId: string | string[] | undefined,
    refetch: () => void
}
export const AreaComment: FC<AreaCommentProps> = ({ pasteId, refetch }) => {
    const [comment, setComment] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange({ event, setState: setComment });
    };

    const userId = useUserStore((item) => item.id)
    const isAuth = useUserStore((item) => item.isAuth)

    function handleTextareaKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && event.shiftKey) {
            setComment(comment + "\n");
            event.preventDefault();
        } else if (event.key === 'Enter') {
            createComment();
            event.preventDefault();
        }
    }

    const createComment = async () => {
        if (!isAuth) {
            return errorNotify("Вы не авторизованы")
        }
        if (comment.length < 5) {
            return errorNotify("Сообщение слишком короткое")
        }
        const commentData = await CommentServices.create(comment, userId, pasteId)
        refetch()
        setComment("")
    }

    return (
        <div className="p-1 m-2 w-1/3 mx-auto">
            <textarea
                onChange={handleChange}
                value={comment}
                rows={4}
                className="border rounded-md w-full p-1 placeholder:text-gray-400 block"
                placeholder="Напишите комментарий"
                onKeyDown={handleTextareaKeyPress}
                minLength={5}
                maxLength={300}
            />
            <button className="block ms-auto" onClick={createComment}>Отправить комментарий</button>
        </div>
    );
};