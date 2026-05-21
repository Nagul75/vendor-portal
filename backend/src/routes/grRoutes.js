import express from "express";
import { getGoodsReceipts } from "../controllers/grController.js";
import validateVendorId from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:vendorId", validateVendorId, getGoodsReceipts);

export default router;
