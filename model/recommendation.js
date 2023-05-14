import mongoose from "mongoose";

const recommendations = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const recommendation =
  mongoose.model("recommendations", recommendations) ||
  mongoose.model("recommendations");
