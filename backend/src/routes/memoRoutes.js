import express from "express";
import { getMemoList } from "../controllers/memoController.js";
import validateVendorId from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:vendorId", validateVendorId, getMemoList);

export default router;
