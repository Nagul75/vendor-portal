import express from "express";
import { getPurchaseOrders } from "../controllers/poController.js";
import validateVendorId from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:vendorId", validateVendorId, getPurchaseOrders);

export default router;
