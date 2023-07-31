import mongoose from "mongoose";
import PasteModel from "../model/pastes.js";
import UserModel from "../model/users.js";
import ApiError from "./../error/api-error.js";
import CommentModel from "../model/comments.js";

class PastebinService {
  async create({ name, category, nameCreator, text, userID }) {
    const pastebinData = await PasteModel.create({
      name,
      category,
      nameCreator,
      text,
      userID,
    });
    return pastebinData;
  }

  async update({ name, category, nameCreator, text, userID, id }) {
    const pastebinExemplar = await PasteModel.findById(id);
    if (
      pastebinExemplar.userID !== userID ||
      userID === null ||
      userID === undefined
    ) {
      throw ApiError.BadRequest(
        `У вас нет доступа для редактирования пасты с именем - ${pastebinExemplar.name}`
      );
    }

    pastebinExemplar.name = name || pastebinExemplar.name;
    pastebinExemplar.category = category || pastebinExemplar.category;
    pastebinExemplar.nameCreator = nameCreator || pastebinExemplar.nameCreator;
    pastebinExemplar.text = text || pastebinExemplar.text;
    await pastebinExemplar.save();

    return pastebinExemplar;
  }

  async getAll(page, perPage, skips) {
    const pastes = await PasteModel.find().skip(skips).limit(perPage);
    return pastes;
  }

  async getNameNameCreatorCategory(page, perPage, skips) {
    const pastes = await PasteModel.find()
      .select("name nameCreator category")
      .skip(skips)
      .limit(perPage);
    return pastes;
  }

  async getOne(id) {
    const paste = await PasteModel.findById(id);
    if (!paste) {
      throw ApiError.BadRequest(`Паста не найдена`);
    }
    return paste;
  }

  async delete(id, userID) {
    const pastebinExemplar = await PasteModel.findById(id);
    if (!pastebinExemplar) {
      throw ApiError.BadRequest(`Паста не найдена`);
    }
    if (
      pastebinExemplar.userID !== userID ||
      userID === null ||
      userID === undefined
    ) {
      throw ApiError.BadRequest(
        `У вас нет доступа для удаления пасты с именем - ${pastebinExemplar.name}`
      );
    }

    const paste = await PasteModel.findByIdAndDelete(id);
    const comments = await CommentModel.deleteMany({ pasteID: id });
    return paste;
  }

  async getAllByUserId(id) {
    const candidate = await UserModel.findById(id);
    if (!candidate) {
      throw ApiError.BadRequest(`Пользователь не найден в системе`);
    }
    const paste = await PasteModel.find({ userID: id });
    return paste;
  }
}

export default new PastebinService();
