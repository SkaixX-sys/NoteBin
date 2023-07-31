import { Schema, model } from "mongoose";

const pastesSchema = new Schema({
  name: { type: String },
  category: { type: String },
  nameCreator: { type: String },
  text: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

const Paste = model("Paste", pastesSchema);

export default Paste;
