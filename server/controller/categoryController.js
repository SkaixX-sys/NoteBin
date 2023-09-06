import CategoryModel from "./../model/categories.js";

class CategoryController {
  async create(request, response, next) {
    try {
      const { category } = request.body;
      const data = await CategoryModel.create({ category });
      return response.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAll(request, response, next) {
    try {
      const categories = await CategoryModel.find();

      if (!categories) {
        next(new Error("Categories not found"));
      }

      return response.json(categories);
    } catch (error) {
      next(error);
    }
  }
  async getOne(request, response, next) {
    try {
      const { id } = request.params;
      const category = await CategoryModel.findById(id);

      if (!category) {
        next(new Error("Category not found"));
      }

      return response.json(category);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
