import Express from "express";
import { handleCash, handleGetCash } from "../controllers/index.js";
import { verifyToken } from "../middleware/index.js";

const router = Express.Router();

router.post("/", verifyToken, handleCash);
router.get("/", verifyToken, handleGetCash);

export { router };