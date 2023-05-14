import mongoose from "mongoose";

const products = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  retail_price: {
    type: Number,
    required: true,
  },
  discounted_price: {
    type: Number,
    required: true,
  },
  product_category_tree: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  product_rating: {
    type: Number || String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  }
});

export const product = mongoose.model("products", products) || mongoose.model("products");