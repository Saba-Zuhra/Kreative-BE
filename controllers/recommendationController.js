import { recommendation } from "../model/recommendation.js";
import { user } from "../model/users.js";
import { product } from "../model/product.js";
import { ObjectId, Types } from "mongoose";

const productsLimit = 300;
const recommendationLimit = 20;
const hex = /[0-9A-Fa-f]{6}/g;

const getRecommendation = async (req, res) => {
  const { user_id } = req.user;
  try {
    const products = await product.find({}).limit(productsLimit);
    const _user = await user.findById({ _id: user_id });

    const productsBought = products.filter((product) =>
      _user.productsBought.includes(product._id)
    );
    if (productsBought.length === 0) {
      return res.status(401).json("User has not bought any product");
    }

    const productsUnbought = products.filter(
      (product) => !_user.productsBought.includes(product._id)
    );
    let count = 0;
    const rankedList = productsUnbought
      .map((prod) => {
        const pct = JSON.parse(prod.product_category_tree)[0].split(" >> ")[1];
        // console.log(pct);
        return {
          product: prod,
          similarityScore:
            (pct ===
              products.filter((p) => {
                const pct1 = JSON.parse(p.product_category_tree)[0].split(
                  " >> "
                )[1];
                return {
                  pct1,
                };
              })) *
            prod.product_rating,
        };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore);

    res
      .status(200)
      .json(
        rankedList.slice(0, recommendationLimit).map((prod) => prod.product)
      );
  } catch (error) {
    console.log(error);
    res.status(401).json("Error in generating recommendations");
  }
};

export { getRecommendation };
