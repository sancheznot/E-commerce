import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Orders";
import { buffer } from "micro";
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_8e406f586d4ac2761d7392ce1c47e6e15cc8df42713d2409afea399b23677f9e";

export default async function handler(req, res) {
  mongooseConnect();
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      console.log("PaymentIntent was successful!");
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
        console.log({ paid, orderId});
      if (paid && orderId) {
         await Order.findByIdAndUpdate(orderId, {
            paid: true,
            paymentIntent: data.id,
            status: "Complete",
            
        });
      }

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send("ok");
}

// unity-remedy-snazzy-feat
// account id acct_1Nv7kiJ4sNCHySpl

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
