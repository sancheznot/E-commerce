import mongoose, { model, Schema, models } from "mongoose";

const CategoriesSchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Categories" },
  properties: [{ type: Object }],
});

export const Categories =
  models?.Categories || model("Categories", CategoriesSchema);
