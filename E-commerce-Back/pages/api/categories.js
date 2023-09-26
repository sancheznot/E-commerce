import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";
import { getServerSession } from "next-auth";
import { AuthOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);
  
  if (method === "GET") {
    const categories = await Categories.find().populate("parent");
    res.status(200).json({ success: true, data: categories });
  }

  if (method === "POST") {
    const { name, parentCategories, properties } = req.body;
    const category = await Categories.create({
      name,
      parent: parentCategories,
      properties,
    });
    res.status(200).json({ success: true, data: category });
  }
  if (method === "PUT") {
    const { name, parentCategories, properties, _id } = req.body;
    const CategoryRes = await Categories.updateOne(
      { _id },
      { name, parent: parentCategories, properties }
    );
    res.status(200).json({ success: true, data: CategoryRes });
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    await Categories.deleteOne({ _id });
    res.status(200).json(true);
  }
}
