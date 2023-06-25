import { Products } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      const oneProduct = await Products.findOne({ _id: req.query.id });
      res.status(200).json({ success: true, data: oneProduct });
    } else {
      const ProductRes = await Products.find({});
      res.status(200).json({ success: true, data: ProductRes });
    }
  }
  if (method === "POST") {
    const { productName, description, price, images, category } = req.body;
    const ProductRes = await Products.create({
      name: productName,
      description,
      price,
      images,
      category,
    });
    res.status(200).json({ success: true, data: ProductRes });
  }
  if (method === "PUT") {
    const { productName, description, price, images, category, _id } = req.body;
    const ProductRes = await Products.updateOne(
      { _id },
      { name: productName, description, price, images, category }
    );
    res.status(200).json({ success: true, data: ProductRes });
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Products.deleteOne({ _id: req.query.id });
      res.status(200).json(true);
    }
  }
}
