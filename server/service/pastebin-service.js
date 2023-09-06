import PasteModel from "../model/pastes.js";
import UserModel from "../model/users.js";
import ApiError from "./../error/api-error.js";
import CommentModel from "../model/comments.js";
import Redis from "ioredis";
import VKCloud from "../aws/aws-object.js";
import {
  generateAndStoreHashes,
  generateUniqueHash,
} from "./../hash-service/hash-service.js";
class PastebinService {
  async create({ name, category, nameCreator, text, userID, userIP }) {
    const redisClient = new Redis({ maxRetriesPerRequest: 0 });
    redisClient.on("error", () => {});

    let uniqueHash;
    try {
      uniqueHash = await redisClient.spop("unique_hashes");
    } catch (error) {
      console.error("Редис не доступен");
    }
    if (!uniqueHash) {
      uniqueHash = generateUniqueHash();
      generateAndStoreHashes()
        .then(() => {
          console.log("Уникальные хэши успешно сохранены в Redis.");
          redisClient.quit();
        })
        .catch((error) => {
          console.error("Ошибка редиса");
          redisClient.quit();
        });
      console.log("Используем сгенерированный хэш:", uniqueHash);
    } else {
      console.log("Используем хэш из Redis:", uniqueHash);
    }

    const isCreated = await VKCloud.createObject(uniqueHash, text);
    if (isCreated) {
      text = uniqueHash;
    }
    const pastebinData = await PasteModel.create({
      name,
      category,
      nameCreator,
      text,
      userID,
      userIP,
    });
    redisClient.quit();
    return pastebinData;
  }

  async update({ name, category, nameCreator, text, userID, id, userIP }) {
    const pastebinExemplar = await PasteModel.findById(id);

    if (userID !== null || userID === undefined) {
      if (pastebinExemplar.userID !== userID) {
        throw ApiError.BadRequest(
          `У вас нет доступа для редактирования пасты с именем - ${pastebinExemplar.name}`
        );
      }
    }

    if (userIP !== null || userIP === undefined) {
      if (pastebinExemplar.userIP !== userIP) {
        throw ApiError.BadRequest(
          `У вас нет доступа для редактирования пасты с именем - ${pastebinExemplar.name}`
        );
      }
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

    const object = await VKCloud.fetchObject(paste.text);
    if (object !== undefined) {
      paste.text = object;
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

  async getTenByMostPopularity() {
    try {
      const redisClient = new Redis({ maxRetriesPerRequest: 1 });

      redisClient.on("error", () => {});

      let isConn = true;

      const cacheKey = "getTenByMostPopularity";
      let cacheData;

      try {
        cacheData = await redisClient.get(cacheKey);
      } catch (error) {
        console.error("Error connecting to Redis:", error);
        isConn = false;
      }

      if (isConn && cacheData) {
        redisClient.quit();
        return JSON.parse(cacheData);
      } else {
        const paste = await PasteModel.aggregate([
          { $sort: { views: -1 } },
          { $limit: 10 },
        ]);

        if (isConn) {
          redisClient.setex(cacheKey, 300, JSON.stringify(paste));
          redisClient.quit();
        } else {
          console.log("Using database data due to Redis connection issue.");
        }

        return paste;
      }
    } catch (error) {
      console.error("Error in getTenByMostPopularity:", error);
      throw error;
    }
  }
}

export default new PastebinService();
