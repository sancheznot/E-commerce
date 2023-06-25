import mongoose , { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  images: {type: [String]},
  category: {type: mongoose.Types.ObjectId, ref: "Categories" }
});

export const Products =
  models.Product || model("Product", ProductSchema);
