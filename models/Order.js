import mongoose from "mongoose";

const OrderStatus = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      cardLast4Digits: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ["Credit Card", "PayPal", "Google Pay", "Apple Pay"],
        required: true,
      },
      status: {
        type: String,
        enum: ["Paid", "Failed", "Pending"],
        required: true,
      },
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      contactNumber: { type: String, required: true },
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema); // ✅ Fix: Export with ESM
