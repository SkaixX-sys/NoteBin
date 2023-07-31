import ApiError from "../error/api-error.js";
import CommentModel from "../model/comments.js";
import UserModel from "../model/users.js";
import PasteModel from "./../model/pastes.js";

class CommentService {
  async create(comment, userId, pasteId, dateNow) {
    const candidate = await UserModel.findById(userId);
    if (!candidate) {
      throw ApiError.BadRequest(`Вы не зарегестрированы`);
    }
    const paste = await PasteModel.findById(pasteId);
    if (!paste) {
      throw ApiError.BadRequest(`Запись не найдена`);
    }
    const commentData = await CommentModel.create({
      comment: comment,
      userID: userId,
      pasteID: pasteId,
      dateAt: dateNow,
      author: candidate.username,
    });
    return commentData;
  }

  async update(pasteId, comment, userId, commentId) {
    const commentData = await CommentModel.findById(commentId);
    if (!commentData) {
      throw ApiError.BadRequest(`Запись не найдена`);
    }
    if (
      commentData.userID.toString() !== userId.toString() ||
      userId === null ||
      userId === undefined
    ) {
      throw ApiError.BadRequest(
        `Это не ваш комментарий` + commentData.userID + "/" + userId
      );
    }
    commentData.comment = comment || commentData.comment;
    await commentData.save();

    return commentData;
  }

  async delete(commentId, userId) {
    const commentData = await CommentModel.findById(commentId);
    if (!commentData) {
      throw ApiError.BadRequest(`Запись не найдена`);
    }
    if (
      commentData.userID !== userId ||
      userId === null ||
      userId === undefined
    ) {
      throw ApiError.BadRequest(`Это не ваш комментарий`);
    }
    const comment = await CommentModel.findByIdAndDelete(commentId);

    return comment;
  }

  async getAllByPasteId(pasteId, page, perPage, skips) {
    const comments = await CommentModel.find({ pasteID: pasteId })
      .skip(skips)
      .limit(perPage);
    if (!comments) {
      throw ApiError.BadRequest(`Комментариев пока нет`);
    }
    return comments;
  }

  async getAllByUserId(userId, page, perPage, skips) {
    const comments = await CommentModel.find({ userID: userId })
      .skip(skips)
      .limit(perPage);
    if (!comments) {
      throw ApiError.BadRequest(`Комментариев пока нет`);
    }
    return comments;
  }
}

export default new CommentService();
