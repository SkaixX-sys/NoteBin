import { FC } from "react";
import { Comment, CommentListProps, UpdateComment, UpdateCommentList } from "./CommentsList.interface";

export const CommentsList: FC<UpdateCommentList> = ({ comments }) => {
  return (
    <>
      {comments ? (
        comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>{comment.author}</p>
              <p>{comment.dateAt}</p>
              <p>{comment.comment}</p>
            </div>
          );
        })
      ) : (
        <p className="text-center text-2xl font-bold p-5">Комментариев нет</p>
      )}
    </>
  );
};