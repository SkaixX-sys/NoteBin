import ViewModel from "../model/views.js";
import PasteModel from "./../model/pastes.js";

class ViewController {
  async create(request, response, next) {
    try {
      const { userID, userIP, pasteID } = request.body;

      // Проверяем, если приходит userID, то ищем запись с таким pasteID и userID
      if (userID) {
        const existingView = await ViewModel.findOne({ pasteID, userID });

        if (existingView) {
          return null;
        }
      }

      // Проверяем, если приходит userIP, то ищем запись с таким pasteID и userIP
      if (userIP) {
        const existingView = await ViewModel.findOne({ pasteID, userIP });

        if (existingView) {
          return null;
        }
      }

      // Если комбинации уникальны, то создаем новую запись
      const viewData = await ViewModel.create({ userID, userIP, pasteID });
      const post = await PasteModel.findById(pasteID);
      if (!post) {
        return response.status(409).json({
          message: "Такой пост не найден",
        });
      }
      post.views += 1;
      await post.save();
      return response.json(viewData);
    } catch (error) {
      next(error);
    }
  }
}

export default new ViewController();
