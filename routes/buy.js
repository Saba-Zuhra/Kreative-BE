import Express from "express";
import { verifyToken } from "../middleware/index.js";
import { buyProducts } from "../controllers/index.js";

const router = Express.Router();

router.post("/", verifyToken, buyProducts);

export { router };
