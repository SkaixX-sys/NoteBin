export default interface LikeResponse {
    _id: string,
    userIP: string | null,
    userID: string | null,
    pasteID: string,
    __v: string,
    isLiked: boolean
}