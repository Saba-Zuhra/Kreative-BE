import Express from "express";
import { getProfile, updateProfile } from "../controllers/index.js";
import { verifyToken } from "../middleware/index.js";

const router = Express.Router();

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);

export { router };