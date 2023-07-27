import { Schema, model } from "mongoose";

const commentsSchema = new Schema({
  text: { type: String },
  category: { type: String },
  nameCreator: { type: String },
  text: { type: String },
});

const Comment = model("Comment", commentsSchema);

export default Comment;
