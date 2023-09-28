import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";
import { Order } from "@/models/Orders";
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json({ message: "Sorry we only accept POST requests" });
    return;
  }
  await mongooseConnect();
  const {
    name,
    email,
    city,
    postalcode,
    streetAddress,
    country,
    phone,
    productsInCart,
  } = req.body;
  const productsInCartArray = productsInCart
  const uniqueId = [...new Set(productsInCartArray)];
  const productInfos = await Products.find({ _id: uniqueId });

  let line_items = [];
  for (const productId of uniqueId) {
    const productInfo = productInfos.find(
      (product) => product._id.toString() === productId
    );
    const quantity =
    productsInCartArray.filter((id) => id === productId)?.length || 0;
    if (quantity > 0) {
      line_items.push({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: productInfo.price * 100,
          product_data: {
            name: productInfo.name,
          },
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalcode,
    streetAddress,
    country,
    phone,
    status: "pending",
    paid: false,
    amount: line_items.reduce((acc, curr) => acc + curr.price_data.unit_amount, 0),
  })
    .catch((err) => {
      res.json({ message: "Something went wrong" });
    });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.URL_STRIPE_SUCCESS}/cart?success=1`,
    cancel_url: `${process.env.URL_STRIPE_SUCCESS}/cart?canceled=1`,
    metadata: {
      orderId: orderDoc?._id.toString(),
    },
  });
  res.json({ url: session.url });
}
