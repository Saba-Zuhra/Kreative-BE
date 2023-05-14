import mongoose from "mongoose";
import { validateEmail } from "../utils/validators.js";

const users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: validateEmail,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  totalItemsBought: {
    type: Number,
    default: 0,
  },
  totalAmountSpent: {
    type: Number,
    default: 0,
  },
  productsBought: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  recommendedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

export const user = mongoose.model("users", users) || mongoose.model("users");
