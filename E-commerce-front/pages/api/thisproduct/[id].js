import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";

export default async function handler(req, res) {
  mongooseConnect();
  const { id } = req.query;
  const oneProduct = await Products.findById({ _id: id });
    res.status(200).json(oneProduct);
}
