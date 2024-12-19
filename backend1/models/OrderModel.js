import mongoose from "mongoose";

const orderSchcema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],

    payment: {},

    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },

    status: {
      type: String,
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Not Processed",
    },
  },
  { timeStamps: true }
);

export default mongoose.model("Order", orderSchcema);
