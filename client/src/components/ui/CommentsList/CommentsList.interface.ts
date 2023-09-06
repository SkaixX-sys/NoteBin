import { CommentResponse } from "@/components/interfaces/CommentResponse.interface";

export interface Comment extends CommentResponse {
}

export interface CommentListProps {
    comments: Comment[]
}

export interface UpdateComment {
    comment: string
    userID: string;
    pasteID: string;
    dateAt: string;
    author: string;
    _id: string;
}
export interface UpdateCommentList {
    comments: UpdateComment[]
}