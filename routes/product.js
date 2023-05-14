import Express from "express";
import { handleGetProducts, handleGetAllProducts, createProduct, updateProduct } from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";

const router = Express.Router();

router.get("/:id", handleGetProducts);
router.get("/", handleGetAllProducts);
router.post("/", verifyToken, createProduct);
router.put("/", verifyToken, updateProduct);

export { router };