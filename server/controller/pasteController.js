import PastebinService from "../service/pastebin-service.js";

class PastesController {
  async create(request, response, next) {
    try {
      const { name, category, nameCreator, text, userID, userIP } =
        request.body;
      const pastebinData = await PastebinService.create({
        name,
        category,
        nameCreator,
        text,
        userID,
        userIP,
      });
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }

  async update(request, response, next) {
    try {
      const { name, category, nameCreator, text, userID } = request.body;
      const { id } = request.params;
      const pastebinData = await PastebinService.update({
        name,
        category,
        nameCreator,
        text,
        userID,
        id,
      });
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }

  async getAll(request, response, next) {
    try {
      const page = parseInt(request.query.page) || 1;
      const perPage = parseInt(request.query.perPage) || 10;
      const skips = perPage * (page - 1);
      const pastebinData = await PastebinService.getAll(page, perPage, skips);
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }

  async getNameNameCreatorCategory(request, response, next) {
    try {
      const page = parseInt(request.query.page) || 1;
      const perPage = parseInt(request.query.perPage) || 10;
      const skips = perPage * (page - 1);
      const pastebinData = await PastebinService.getNameNameCreatorCategory(
        page,
        perPage,
        skips
      );
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }

  async getOne(request, response, next) {
    try {
      const { id } = request.params;
      const pastebinData = await PastebinService.getOne(id);
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const { userId } = request.body;
      const pastebinData = await PastebinService.delete(id, userId);
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }
  async getAllByUserId(request, response, next) {
    try {
      const { userId } = request.body;
      const pastebinData = await PastebinService.getAllByUserId(userId);
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }

  async getTenByMostPopularity(request, response, next) {
    try {
      const pastebinData = await PastebinService.getTenByMostPopularity();
      return response.json(pastebinData);
    } catch (error) {
      next(error);
    }
  }
}

export default new PastesController();
