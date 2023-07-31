import { Schema, model } from "mongoose";

const commentsSchema = new Schema({
  comment: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: "User", require: true },
  pasteID: { type: Schema.Types.ObjectId, ref: "Paste", require: true },
  dateAt: { type: String },
  author: { type: String },
//   childComment: { type: Schema.Types.ObjectId, ref: "Comment" },
});

export default model("Comment", commentsSchema);
