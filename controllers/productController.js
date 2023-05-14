import { product } from "../model/product.js";

const handleGetProducts = async (req, res) => {
  const { id } = req.params;

  if (!product_name) {
    return res.status(400).json("incorrect form submission");
  }

  const result = await product.findById({ id });

  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(401).json("product not found");
  }
};

const handleGetAllProducts = async (req, res) => {
  const result = await product.find({}).limit(20);
  if (result) {
    // get first 20 products
    return res.status(201).json(result);
  } else {
    return res.status(401).json("product not found");
  }
};

const createProduct = async (req, res) => {
  const {
    product_name,
    retail_price,
    discounted_price,
    product_category_tree,
    description,
    product_rating,
    brand,
  } = req.body;

  if (
    !product_name ||
    !retail_price ||
    !discounted_price ||
    !product_category_tree ||
    !description ||
    !product_rating ||
    !brand
  ) {
    return res.status(400).json("incorrect form submission");
  }

  const result = await product.create({
    product_name,
    retail_price,
    discounted_price,
    product_category_tree,
    description,
    product_rating,
    brand,
  });

  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(401).json("product not created");
  }
};

const updateProduct = async (req, res) => {
  const {
    product_name,
    retail_price,
    discounted_price,
    product_category_tree,
    description,
    product_rating,
    brand,
  } = req.body;

  if (
    !product_name ||
    !retail_price ||
    !discounted_price ||
    !product_category_tree ||
    !description ||
    !product_rating ||
    !brand
  ) {
    return res.status(400).json("incorrect form submission");
  }

  const result = await product.update({
    product_name,
    retail_price,
    discounted_price,
    product_category_tree,
    description,
    product_rating,
    brand,
  });

  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(401).json("product not updated");
  }
};

export {
  handleGetProducts,
  handleGetAllProducts,
  createProduct,
  updateProduct,
};
