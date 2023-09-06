import CommentService from "../service/comment-service.js";

class CommentController {
  async create(request, response, next) {
    try {
      const { comment, userId, pasteId } = request.body;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("ru-RU");
      const commentData = await CommentService.create(
        comment,
        userId,
        pasteId,
        formattedDate
      );
      return response.json(commentData);
    } catch (error) {
      next(error);
    }
  }

  async put(request, response, next) {
    try {
      const { id } = request.params;
      const { comment, userId, pasteId } = request.body;
      const commentData = await CommentService.update(
        pasteId,
        comment,
        userId,
        id
      );
      return response.json(commentData);
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const { commentId } = request.params;
      const { userId } = request.body;
      const commentData = await CommentService.delete(commentId, userId);
      return response.json(commentData);
    } catch (error) {
      next(error);
    }
  }
  async getAllByPasteId(request, response, next) {
    try {
      const { id } = request.params;
      const page = parseInt(request.query.page) || 1;
      const perPage = parseInt(request.query.perPage) || 20;
      const skips = perPage * (page - 1);
      const commentData = await CommentService.getAllByPasteId(
        id,
        page,
        perPage,
        skips
      );
      if (!commentData) {
        throw "Комменатриев нет";
      }
      return response.json(commentData);
    } catch (error) {
      next(error);
    }
  }
  async getAllByUserId(request, response, next) {
    try {
      const { id } = request.params;
      const page = parseInt(request.query.page) || 1;
      const perPage = parseInt(request.query.perPage) || 20;
      const skips = perPage * (page - 1);
      const commentData = await CommentService.getAllByUserId(
        id,
        page,
        perPage,
        skips
      );
      return response.json(commentData);
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();
