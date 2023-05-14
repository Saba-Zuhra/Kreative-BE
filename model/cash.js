import mongoose from "mongoose";

const cashes = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

export const cash = mongoose.model("cash", cashes) || mongoose.model("cash"); 