import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  userIP: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, unique: true },
});

export default model("Token", TokenSchema);
