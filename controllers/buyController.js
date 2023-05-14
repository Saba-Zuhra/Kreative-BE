import { buy } from "../model/buy.js";
import { product } from "../model/product.js";
import { user } from "../model/users.js";
import { recommendation } from "../model/recommendation.js";

import { sendMailWithAttachment } from "../utils/email.js";

import { fileURLToPath } from "url";
import path from "path";

const buyProducts = async (req, res) => {
  const { user_id, email } = req.user;
  const { products } = req.body;

  if (!products) {
    return res.status(400).json("incorrect form submission");
  }
  const date = new Date();
  const userResult = await user.findById({ _id: user_id });

  // products = [{product_id, quantity, amount}]
  // add products to buy table if exists on product table and update user table
  for (let i = 0; i < products.length; i++) {
    const product_id = products[i]._id;
    const quantity = products[i].quantity;
    const amount = products[i].retail_price * products[i].quantity;

    const result = await product.findById({ _id: product_id });
    if (result) {
      const result1 = await buy.create({
        product_id,
        quantity,
        amount,
        date,
        userId: user_id,
      });

      if (result1) {
        // update user table and add totalItemsBought and totalAmountSpent and update productsBought
        const result2 = await user.updateOne(
          { _id: user_id },
          {
            $inc: { totalItemsBought: +1, totalAmountSpent: +amount },
            $push: { productsBought: product_id },
          }
        );
        if (!result2) {
          return res.status(401).json("User not found");
        }
      } else {
        return res.status(401).json("buy not created");
      }
    } else {
      return res.status(401).json("product not found");
    }
  }

  // send email to user
  const pathToAttachment = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../views/payment.pdf"
  );
  await sendMailWithAttachment(
    email,
    "Order Placed Successfully",
    `<h3>You have placed an order on ${date.toString()}</h3>`,
    [
      {
        filename: "payment.pdf",
        path: pathToAttachment,
        contentType: "application/pdf",
      },
    ]
  );
  return res.status(201).json("All products bought successfully");
};

export { buyProducts };
