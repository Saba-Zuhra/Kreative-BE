import Express from "express";
import { getRecommendation } from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";
const router = Express.Router();

router.get("/", verifyToken, getRecommendation);

export { router };
