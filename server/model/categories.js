import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  category: { type: String },
});

const Category = model("Category", categorySchema);

export default Category;
