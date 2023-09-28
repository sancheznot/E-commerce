import  { model, Schema, models } from "mongoose";

const OrdersSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalcode: String,
    streetAddress: String,
    country: String,
    phone: String,
    status: String,
    paymentIntent: String,
    paid: Boolean,
    amount: Number,
    }, {
    timestamps: true,
    
});

export const Order =
  models.Order || model("Order", OrdersSchema);
