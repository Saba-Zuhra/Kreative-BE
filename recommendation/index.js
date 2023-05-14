// Create recommendation model for product recommendation
import { product } from "../model/product.js";
import { user } from "../model/users.js";

const generateRecommendations = async (userId, maxRecommendations = 10) => {
  try {
    const products = await product.find({});
    const _user = await user.findById({ _id: userId });
    const productsBought = _user.productsBought;
    const productsUnbought = products.filter(
      (product) => !productsBought.includes(product._id)
    );
    const rankedList = productsUnbought
      .map((prod) => ({
        product: prod.product_name,
        similarityScore:
          (prod.product_category_tree ===
            products.filter((p) => productsBought.includes(p._id))[0]
              .product_category_tree) *
          prod.product_rating,
      }))
      .sort((a, b) => b.similarityScore - a.similarityScore);

    return rankedList.slice(0, maxRecommendations).map((prod) => prod.product);
  } catch (error) {
    console.log(error);
  }
};
