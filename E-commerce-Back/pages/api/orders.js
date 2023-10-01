import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Orders";

export default async function handler(req, res) {
  await mongooseConnect();
  if (req.method === "GET") {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
}
