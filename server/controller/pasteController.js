import Paste from "../model/pastes.js";

class PastesController {
  async create(request, response, next) {
    try {
      const newPasteData = request.body;
      const pasteExemplar = new Paste(newPasteData);
      await pasteExemplar.save();
      response.status(201).send(pasteExemplar);
    } catch (error) {
      console.error(error);
      response.status(500).send("Create error");
    }
  }

  async update(request, response, next) {
    try {
      const pasteData = request.body;
      const pasteId = request.params.id;
      const paste = await Paste.findByIdAndUpdate(pasteId, pasteData);
      response.status(201).send(paste);
    } catch (error) {
      console.error(error);
      response.status(500).send("Update error");
    }
  }

  async getAll(request, response, next) {
    try {
      const page = parseInt(request.query.page) || 1;
      const perPage = parseInt(request.query.perPage) || 10;
      const skips = perPage * (page - 1);
      const pastes = await Paste.find().skip(skips).limit(perPage);
      response.status(201).send(pastes);
    } catch (error) {
      console.error(error);
      response.status(500).send("Pastes not found");
    }
  }

  async getNameNameCreatorCategory(request, response, next) {
    try {
      const page = parseInt(request.query.page) || 1;
      const perPage = parseInt(request.query.perPage) || 10;
      const skips = perPage * (page - 1);
      const pastes = await Paste.find()
        .select("name nameCreator category")
        .skip(skips)
        .limit(perPage);
      response.status(201).send(pastes);
    } catch (error) {
      console.error(error);
      response.status(500).send("Pastes not found");
    }
  }

  async getOne(request, response, next) {
    try {
      const pasteId = request.params.id;
      const paste = await Paste.findById(pasteId);
      response.status(201).send(paste);
    } catch (error) {
      console.error(error);
      response.status(500).send("Paste not found");
    }
  }

  async delete(request, response, next) {
    try {
      const pasteId = request.params.id;
      const paste = await Paste.findByIdAndDelete(pasteId);
      response.status(201).send(paste);
    } catch (error) {
      console.error(error);
      response.status(500).send("Delete error");
    }
  }
}

export default new PastesController();
