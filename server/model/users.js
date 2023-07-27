import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String},
  password: { type: String},
  email: { type: String, unique: true },
});

export default model("User", UserSchema);
