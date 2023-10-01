import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";

export default async function handler(req, res) {
  await mongooseConnect();
  if (req.method !== "GET") {
    res.json({ message: "Sorry we only accept GET requests" });
    return;
  }
  
  const allproducts = await Products.find({}, null, {sort: {createdAt: -1}});
  res.status(200).json(allproducts);
}
