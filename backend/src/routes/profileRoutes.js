import express from "express";
import { getProfile } from "../controllers/profileController.js";
import validateVendorId from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:vendorId", validateVendorId, getProfile);

export default router;
