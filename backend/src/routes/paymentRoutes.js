import express from "express";
import { getPaymentAging } from "../controllers/paymentController.js";
import validateVendorId from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:vendorId", validateVendorId, getPaymentAging);

export default router;
