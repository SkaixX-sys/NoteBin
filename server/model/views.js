import { Schema, model } from "mongoose";

const ViewsSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  userIP: { type: String },
  pasteID: { type: Schema.Types.ObjectId, ref: "Paste", required: true },
});

const ViewModel = model("View", ViewsSchema);

export default ViewModel;
