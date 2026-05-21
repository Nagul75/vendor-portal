import express from "express";
import { getRfqs } from "../controllers/rfqController.js";
import validateVendorId from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:vendorId", validateVendorId, getRfqs);

export default router;
