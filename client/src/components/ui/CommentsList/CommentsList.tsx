import { FC } from "react";
import { Comment, CommentListProps, UpdateComment, UpdateCommentList } from "./CommentsList.interface";

export const CommentsList: FC<UpdateCommentList> = ({ comments }) => {
  if (comments.length <= 0) {
    return <p className="text-center text-2xl font-bold p-5">Комментариев нет</p>
  }
  console.log(comments.length);
  
  return (
    <>
      {
        comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>{comment.author}</p>
              <p>{comment.dateAt}</p>
              <p className="whitespace-pre-wrap">{comment.comment}</p>
            </div>
          );
        })
      }
    </>
  );
};