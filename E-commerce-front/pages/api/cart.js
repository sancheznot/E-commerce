import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";

export default async function handler(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Products.find({ _id: { $in: ids } }));
}
