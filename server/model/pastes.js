import { Schema, model } from "mongoose";

const pastesSchema = new Schema({
  name: { type: String },
  category: { type: String },
  nameCreator: { type: String },
  text: { type: String },
});

const Paste = model("Paste", pastesSchema);

export default Paste;
